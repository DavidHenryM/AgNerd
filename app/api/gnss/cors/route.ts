import { access, readFile } from "node:fs/promises";
import { prisma } from "@lib/prisma";
import { Resource } from "cesium";

export const dynamic = "force-dynamic";

const GA_CORS_SITES_URL = "https://metadata.gnss.ga.gov.au/api/corsSites";
const GA_NTRIP_HOST = process.env.GA_NTRIP_HOST || process.env.NTRIP_HOST || "ntrip.data.gnss.ga.gov.au";
const GA_NTRIP_PORT = process.env.GA_NTRIP_PORT || process.env.NTRIP_PORT || "443";
const CESIUM_ION_TOKEN = process.env.CESIUM_ION_TOKEN || process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || "";
const CESIUM_COUNTRY_CACHE_TTL_MS = 5 * 60 * 1000;
const CESIUM_COUNTRY_CACHE_PRECISION = 4;

type GACorsSite = {
  id: number;
  name: string | null;
  description: string | null;
  fourCharacterId: string | null;
  domesNumber: string | null;
  approximatePosition: {
    type?: string;
    coordinates?: unknown;
  } | null;
  siteStatus: string | null;
  _links?: {
    self?: {
      href?: string;
    };
  };
};

type GACorsPage = {
  _embedded?: {
    corsSites?: GACorsSite[];
  };
  page?: {
    size?: number;
    totalElements?: number;
    totalPages?: number;
    number?: number;
  };
};

type NormalizedSite = {
  id: number;
  fourCharacterId: string | null;
  name: string | null;
  latitude: number | null;
  longitude: number | null;
  heightMeters: number | null;
  siteStatus: string | null;
  selfHref: string | null;
};

function badRequest(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

function parseBoolean(value: string | null): boolean {
  if (!value) return false;
  return value.toLowerCase() === "true" || value === "1";
}

function parseOptionalNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}

function toLatLon(site: GACorsSite): { latitude: number; longitude: number; heightMeters: number | null } | null {
  const coords = site.approximatePosition?.coordinates;
  if (!Array.isArray(coords) || coords.length < 2) {
    return null;
  }

  const first = typeof coords[0] === "number" ? coords[0] : Number.NaN;
  const second = typeof coords[1] === "number" ? coords[1] : Number.NaN;
  const third = typeof coords[2] === "number" ? coords[2] : null;

  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    return null;
  }

  // GA response appears to provide coordinates as [latitude, longitude, elevation].
  const latitude = first;
  const longitude = second;

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }

  return {
    latitude,
    longitude,
    heightMeters: third,
  };
}

function normalizeSite(site: GACorsSite): NormalizedSite {
  const latLon = toLatLon(site);
  return {
    id: site.id,
    fourCharacterId: site.fourCharacterId ?? null,
    name: site.name ?? null,
    latitude: latLon?.latitude ?? null,
    longitude: latLon?.longitude ?? null,
    heightMeters: latLon?.heightMeters ?? null,
    siteStatus: site.siteStatus ?? null,
    selfHref: site._links?.self?.href ?? null,
  };
}

function haversineDistanceKm(fromLat: number, fromLon: number, toLat: number, toLon: number): number {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRadians(toLat - fromLat);
  const dLon = toRadians(toLon - fromLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(fromLat)) * Math.cos(toRadians(toLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

function buildNtripPath(stationCode: string): string | null {
  const user = process.env.GA_NTRIP_USER || process.env.NTRIP_USER;
  const password = process.env.GA_NTRIP_PASSWORD || process.env.NTRIP_PASSWORD;
  if (!user || !password) {
    return null;
  }

  return `ntrip://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${GA_NTRIP_HOST}:${GA_NTRIP_PORT}/${stationCode}`;
}

// ── Position auto-detection ──────────────────────────────────────────────────
// Priority 1: GNSS status file (written in real-time by gnss-reader).
// Priority 2: Most recent GeoPoint created via the /api/gnss/position ingest
//             route — which always sets `heading` (even null) unlike farm/
//             paddock geometry rows that only set lat/lon.  We filter to rows
//             with an explicit livestockUnitPositionId OR heading IS NOT NULL
//             to avoid picking up manually-entered farm coordinates that may
//             lack a hemisphere sign.

const GNSS_STATUS_FILE = process.env.GNSS_STATUS_FILE ?? "/tmp/agnerd-gnss-status.json";

async function readPositionFromStatusFile(): Promise<{ latitude: number; longitude: number } | null> {
  const candidates = [
    GNSS_STATUS_FILE,
    "/tmp/agnerd-gnss-status.json",
    "/var/tmp/agnerd-gnss-status.json",
  ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      const raw = await readFile(candidate, "utf8");
      const parsed = JSON.parse(raw) as unknown;

      if (!parsed || typeof parsed !== "object") continue;

      const latest = (parsed as { latest?: unknown }).latest;
      if (!latest || typeof latest !== "object") continue;

      const { latitude, longitude } = latest as { latitude?: unknown; longitude?: unknown };
      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude)
      ) {
        continue;
      }

      return { latitude, longitude };
    } catch {
      continue;
    }
  }

  return null;
}

async function readPositionFromDb(): Promise<{ latitude: number; longitude: number } | null> {
  // Prefer GeoPoints that come from the GNSS ingest route. Those rows have a
  // `heading` column set (even when null the column exists) and are linked to a
  // LivestockUnitPosition.  As a safe fallback we also accept rows where
  // heading is explicitly non-null, which excludes static geometry entries.
  const latest =
    (await prisma.geoPoint.findFirst({
      where: { livestockUnitPositionId: { not: null } },
      orderBy: { id: "desc" },
      select: { latitude: true, longitude: true },
    })) ??
    (await prisma.geoPoint.findFirst({
      where: { heading: { not: null } },
      orderBy: { id: "desc" },
      select: { latitude: true, longitude: true },
    }));

  if (!latest) return null;

  const { latitude, longitude } = latest;
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }

  return { latitude, longitude };
}

async function autoDetectPosition(): Promise<{
  latitude: number;
  longitude: number;
  source: "status-file" | "database";
} | null> {
  const fromFile = await readPositionFromStatusFile();
  if (fromFile) {
    return { ...fromFile, source: "status-file" };
  }

  const fromDb = await readPositionFromDb();
  if (fromDb) {
    return { ...fromDb, source: "database" };
  }

  return null;
}

async function fetchCorsPage(page: number, size: number): Promise<GACorsPage> {
  const url = new URL(GA_CORS_SITES_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Geoscience Australia request failed with ${response.status}`);
  }

  return (await response.json()) as GACorsPage;
}

async function fetchAllCorsSites(size: number): Promise<{ sites: GACorsSite[]; totalPages: number }> {
  const firstPage = await fetchCorsPage(0, size);
  const firstSites = firstPage._embedded?.corsSites ?? [];
  const totalPages = Math.max(1, firstPage.page?.totalPages ?? 1);

  if (totalPages === 1) {
    return { sites: firstSites, totalPages };
  }

  const results = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) => fetchCorsPage(index + 1, size)),
  );

  const allSites = [
    ...firstSites,
    ...results.flatMap((entry) => entry._embedded?.corsSites ?? []),
  ];

  return { sites: allSites, totalPages };
}

type CesiumReverseGeocodeResponse = {
  features?: Array<{
    properties?: {
      country_code?: string;
      country?: string;
    };
  }>;
};

type DetectedCountry = {
  countryCode: string | null;
  countryName: string | null;
};

const cesiumCountryCache = new Map<string, { expiresAt: number; value: DetectedCountry }>();

function countryCacheKey(latitude: number, longitude: number): string {
  const lat = latitude.toFixed(CESIUM_COUNTRY_CACHE_PRECISION);
  const lon = longitude.toFixed(CESIUM_COUNTRY_CACHE_PRECISION);
  return `${lat},${lon}`;
}

async function detectCountryCodeWithCesium(
  latitude: number,
  longitude: number,
): Promise<DetectedCountry> {
  const key = countryCacheKey(latitude, longitude);
  const now = Date.now();
  const cached = cesiumCountryCache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }
  if (cached && cached.expiresAt <= now) {
    cesiumCountryCache.delete(key);
  }

  if (!CESIUM_ION_TOKEN) {
    return { countryCode: null, countryName: null };
  }

  const resource = new Resource({
    url: "https://api.cesium.com/v1/geocode/reverse",
    queryParameters: {
      lat: String(latitude),
      lon: String(longitude),
      access_token: CESIUM_ION_TOKEN,
    },
  });

  const payload = (await resource.fetchJson()) as CesiumReverseGeocodeResponse;
  const first = payload.features?.[0]?.properties;

  const detectedCountry: DetectedCountry = {
    countryCode: typeof first?.country_code === "string" ? first.country_code.toUpperCase() : null,
    countryName: typeof first?.country === "string" ? first.country : null,
  };

  cesiumCountryCache.set(key, {
    value: detectedCountry,
    expiresAt: now + CESIUM_COUNTRY_CACHE_TTL_MS,
  });

  return detectedCountry;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const countryParam = url.searchParams.get("country");
  const country = countryParam ? countryParam.trim().toUpperCase() : "AU";

  if (country.length !== 2) {
    return badRequest("country must be a two-letter code.");
  }

  if (country !== "AU") {
    return Response.json(
      {
        ok: false,
        country,
        error: `CORS station provider for country '${country}' is not yet implemented.`,
      },
      { status: 501 },
    );
  }

  const raw = parseBoolean(url.searchParams.get("raw"));
  const closestCodeOnly = parseBoolean(url.searchParams.get("closestCodeOnly"));
  const closestNtripPath = parseBoolean(url.searchParams.get("closestNtripPath"));
  const latParam = parseOptionalNumber(url.searchParams.get("lat"));
  const lonParam = parseOptionalNumber(url.searchParams.get("lon"));
  const limitRaw = parseOptionalNumber(url.searchParams.get("limit"));
  const limit = Math.max(1, Math.min(50, Math.floor(limitRaw ?? 1)));

  // Validate explicit lat/lon if provided.
  if ((latParam !== null) !== (lonParam !== null)) {
    return badRequest("Both lat and lon must be provided together.");
  }
  if (latParam !== null && (latParam < -90 || latParam > 90)) {
    return badRequest("lat out of range.");
  }
  if (lonParam !== null && (lonParam < -180 || lonParam > 180)) {
    return badRequest("lon out of range.");
  }

  const closestRequired = closestCodeOnly || closestNtripPath || latParam !== null;

  // Auto-detect lat/lon from latest GNSS fix when a closest-search is requested but no coords supplied.
  let latitude: number | null = latParam;
  let longitude: number | null = lonParam;
  let positionAutoDetected = false;
  let positionAutoDetectSource: "status-file" | "database" | null = null;

  if (closestRequired && latitude === null) {
    const detected = await autoDetectPosition();
    if (!detected) {
      return Response.json(
        {
          ok: false,
          error:
            "No GNSS position available for auto-detection. Provide lat and lon explicitly, or ensure a GNSS fix has been recorded.",
        },
        { status: 422 },
      );
    }
    latitude = detected.latitude;
    longitude = detected.longitude;
    positionAutoDetected = true;
    positionAutoDetectSource = detected.source;
  }

  try {
    if (latitude !== null && longitude !== null) {
      const detectedCountry = await detectCountryCodeWithCesium(latitude, longitude);
      if (!detectedCountry.countryCode) {
        return Response.json(
          {
            ok: false,
            country,
            error:
              "Unable to determine country from coordinates via Cesium geocoder. Ensure CESIUM_ION_TOKEN or NEXT_PUBLIC_CESIUM_ION_TOKEN is configured.",
          },
          { status: 502 },
        );
      }

      if (detectedCountry.countryCode !== "AU") {
        return Response.json(
          {
            ok: false,
            country: detectedCountry.countryCode,
            error: `CORS station provider for detected country '${detectedCountry.countryCode}' is not yet implemented.`,
            geocoder: {
              provider: "cesium",
              countryName: detectedCountry.countryName,
            },
          },
          { status: 501 },
        );
      }

      const pageSize = 200;
      const { sites, totalPages } = await fetchAllCorsSites(pageSize);
      void positionAutoDetected;

      const ranked = sites
        .map((site) => {
          const normalized = normalizeSite(site);
          if (normalized.latitude === null || normalized.longitude === null) {
            return null;
          }

          const distanceKm = haversineDistanceKm(
            latitude,
            longitude,
            normalized.latitude,
            normalized.longitude,
          );

          return {
            site,
            normalized,
            distanceKm,
          };
        })
        .filter((entry): entry is { site: GACorsSite; normalized: NormalizedSite; distanceKm: number } => entry !== null)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, limit);

      if (closestCodeOnly || closestNtripPath) {
        const closest = ranked[0] ?? null;
        const stationCode = closest?.normalized.fourCharacterId ?? null;
        const ntripPath = stationCode ? buildNtripPath(stationCode) : null;

        return Response.json({
          ok: true,
          country,
          mode: closestNtripPath ? "closest-ntrip-path" : "closest-code-only",
          query: {
            latitude,
            longitude,
            positionAutoDetected,
            positionAutoDetectSource: positionAutoDetected ? positionAutoDetectSource : undefined,
          },
          source: {
            provider: "geoscience-australia",
            endpoint: GA_CORS_SITES_URL,
            pagesFetched: totalPages,
            siteCount: sites.length,
          },
          result: {
            distanceKm: closest?.distanceKm ?? null,
            stationCode,
            ntripPath: closestNtripPath ? ntripPath : undefined,
          },
          warnings:
            closestNtripPath && stationCode && !ntripPath
              ? ["GA_NTRIP_USER and GA_NTRIP_PASSWORD must be configured to build ntripPath."]
              : undefined,
        });
      }

      return Response.json({
        ok: true,
        country,
        mode: "closest",
        query: {
          latitude,
          longitude,
          limit,
          positionAutoDetected,
          positionAutoDetectSource: positionAutoDetected ? positionAutoDetectSource : undefined,
        },
        source: {
          provider: "geoscience-australia",
          endpoint: GA_CORS_SITES_URL,
          pagesFetched: totalPages,
          siteCount: sites.length,
        },
        results: raw
          ? ranked.map((entry) => ({
              distanceKm: entry.distanceKm,
              normalized: entry.normalized,
              raw: entry.site,
            }))
          : ranked.map((entry) => ({
              distanceKm: entry.distanceKm,
              ...entry.normalized,
            })),
      });
    }

    const page = await fetchCorsPage(0, 200);
    const rawSites = page._embedded?.corsSites ?? [];

    return Response.json({
      ok: true,
      country,
      mode: raw ? "raw" : "normalized",
      source: {
        provider: "geoscience-australia",
        endpoint: GA_CORS_SITES_URL,
        page: page.page?.number ?? 0,
        size: page.page?.size ?? rawSites.length,
        totalElements: page.page?.totalElements ?? rawSites.length,
        totalPages: page.page?.totalPages ?? 1,
      },
      count: rawSites.length,
      results: raw ? rawSites : rawSites.map(normalizeSite),
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        country,
        error: "Failed to fetch CORS stations from Geoscience Australia.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}
