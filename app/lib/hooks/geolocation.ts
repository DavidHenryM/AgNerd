import { useEffect, useMemo, useRef, useState } from "react";

type PositionFix = {
  latitude: number;
  longitude: number;
  locationTimestamp: number;
  heading: number | null;
  speed: number | null;
  accuracy: number | null;
};

type PositionSource = "gnss-status" | "browser" | "none";

type GnssDebugInfo = {
  statusFilePresent: boolean | null;
  resolvedStatusFile: string | null;
};

type GnssPositionResponse = {
  ok: boolean;
  service?: {
    statusFilePresent?: boolean;
    firstPresentStatusFile?: string | null;
    resolvedStatusFile?: string | null;
    statusFileReadError?: string | null;
    statusFileParseError?: string | null;
    latestMissingInFile?: string | null;
  };
  latestPosition: {
    timestamp: string;
    latitude: number;
    longitude: number;
    heading: number | null;
    speedKnots?: number | null;
  } | null;
};

const GNSS_POLL_INTERVAL_MS = 1000;
const ENABLE_BROWSER_GEO_FALLBACK =
  process.env.NEXT_PUBLIC_ENABLE_BROWSER_GEO_FALLBACK === "true";

function asNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function gnssToFix(position: NonNullable<GnssPositionResponse["latestPosition"]>): PositionFix | null {
  const latitude = asNumberOrNull(position.latitude);
  const longitude = asNumberOrNull(position.longitude);
  if (latitude === null || longitude === null) {
    return null;
  }

  const timestampMs = Date.parse(position.timestamp);

  return {
    latitude,
    longitude,
    locationTimestamp: Number.isNaN(timestampMs) ? Date.now() : timestampMs,
    heading: asNumberOrNull(position.heading),
    speed: asNumberOrNull(position.speedKnots),
    accuracy: null,
  };
}

const useGeolocation = () => {
  const [backendFix, setBackendFix] = useState<PositionFix | null>(null);
  const [browserFix, setBrowserFix] = useState<PositionFix | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [gnssDebug, setGnssDebug] = useState<GnssDebugInfo>({
    statusFilePresent: null,
    resolvedStatusFile: null,
  });
  const backendAvailableRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function pollBackendOnce() {
      try {
        const response = await fetch("/api/gnss/status", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`GNSS status request failed with ${response.status}`);
        }

        const payload = (await response.json()) as GnssPositionResponse;
        const nextFix = payload.latestPosition ? gnssToFix(payload.latestPosition) : null;

        if (!cancelled) {
          setGnssDebug({
            statusFilePresent:
              typeof payload.service?.statusFilePresent === "boolean"
                ? payload.service.statusFilePresent
                : null,
            resolvedStatusFile:
              typeof payload.service?.resolvedStatusFile === "string"
                ? payload.service.resolvedStatusFile
                : typeof payload.service?.firstPresentStatusFile === "string"
                  ? payload.service.firstPresentStatusFile
                : null,
          });
          setBackendFix(nextFix);
          backendAvailableRef.current = nextFix !== null;
          if (nextFix) {
            setError(null);
            setLoading(false);
          } else if (payload.service?.statusFilePresent === false) {
            setError("GNSS status file not found");
          } else if (payload.service?.statusFileReadError) {
            setError(`GNSS status file read error: ${payload.service.statusFileReadError}`);
          } else if (payload.service?.statusFileParseError) {
            setError(`GNSS status file parse error: ${payload.service.statusFileParseError}`);
          } else if (payload.service?.latestMissingInFile) {
            setError("GNSS status file has no latest position payload");
          } else {
            setError("GNSS status available but no latest fix payload");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setGnssDebug({
            statusFilePresent: null,
            resolvedStatusFile: null,
          });
          setBackendFix(null);
          backendAvailableRef.current = false;
          setError(err instanceof Error ? err.message : "Unable to fetch GNSS status");
        }
      }
    }

    void pollBackendOnce();
    const intervalId = window.setInterval(() => {
      void pollBackendOnce();
    }, GNSS_POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!ENABLE_BROWSER_GEO_FALLBACK) {
      return;
    }

    if (!navigator.geolocation) {
      if (!backendFix) {
        setError("Geolocation is not supported by your browser");
        setLoading(false);
      }
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const watchId = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        setBrowserFix({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationTimestamp: position.timestamp,
          heading: asNumberOrNull(position.coords.heading),
          speed: asNumberOrNull(position.coords.speed),
          accuracy: asNumberOrNull(position.coords.accuracy),
        });

        if (!backendAvailableRef.current) {
          setError(null);
        }
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        if (!backendAvailableRef.current) {
          setError(err.message);
        }
        setBrowserFix(null);
        setLoading(false);
      },
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const activeFix = useMemo(() => backendFix ?? browserFix, [backendFix, browserFix]);
  const positionSource: PositionSource = backendFix
    ? "gnss-status"
    : browserFix
      ? "browser"
      : "none";

  return {
    latitude: activeFix?.latitude ?? null,
    longitude: activeFix?.longitude ?? null,
    locationTimestamp: activeFix?.locationTimestamp ?? null,
    heading: activeFix?.heading ?? null,
    speed: activeFix?.speed ?? null,
    accuracy: activeFix?.accuracy ?? null,
    positionSource,
    gnssDebug,
    error,
    loading,
  };
};

export default useGeolocation;
