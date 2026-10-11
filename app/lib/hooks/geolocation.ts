import { useEffect, useMemo, useRef, useState } from "react";
import { GnssFixStatus } from "../gnss-status";
import { fetchNavigationApi } from "../navigation-auth";
import { startGnssPolling } from "../gnss-polling";

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
  fixStatus?: GnssFixStatus;
};

function asNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function gnssToFix(position: NonNullable<GnssPositionResponse["latestPosition"]>, status?: GnssFixStatus): PositionFix | null {
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
    accuracy: status?.stale === false ? asNumberOrNull(status.horizontalAccuracyMeters) : null,
  };
}

const useGeolocation = () => {
  const [embedded, setEmbedded] = useState<boolean | null>(null);
  const [backendFix, setBackendFix] = useState<PositionFix | null>(null);
  const [browserFix, setBrowserFix] = useState<PositionFix | null>(null);
  const [backendStatus, setBackendStatus] = useState<GnssFixStatus>({
    fixType: null, satellites: null, horizontalAccuracyMeters: null, stale: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [gnssDebug, setGnssDebug] = useState<GnssDebugInfo>({
    statusFilePresent: null,
    resolvedStatusFile: null,
  });
  const backendAvailableRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetchNavigationApi("/api/deployment", { signal: controller.signal, cache: "no-store" })
      .then(async response => {
        if (!response.ok) throw new Error(`Deployment request failed: HTTP ${response.status}`);
        const result: unknown = await response.json();
        if (!result || typeof result !== "object" || !("mode" in result) ||
          (result.mode !== "embedded" && result.mode !== "online")) throw new Error("Invalid deployment configuration.");
        setEmbedded(result.mode === "embedded");
      }).catch(reason => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (embedded !== true) return;
    let cancelled = false;

    async function pollBackendOnce(signal: AbortSignal) {
      try {
        const response = await fetchNavigationApi("/api/gnss/status", {
          method: "GET",
          cache: "no-store",
          signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
        });

        if (!response.ok) {
          throw new Error(`GNSS status request failed with ${response.status}`);
        }

        const payload = (await response.json()) as GnssPositionResponse;
        const nextFix = payload.latestPosition ? gnssToFix(payload.latestPosition, payload.fixStatus) : null;

        if (!cancelled) {
          setBackendStatus(payload.fixStatus ?? {
            fixType: null, satellites: null, horizontalAccuracyMeters: null, stale: true,
          });
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
          setBackendStatus({ fixType: null, satellites: null, horizontalAccuracyMeters: null, stale: true });
          backendAvailableRef.current = false;
          setError(err instanceof Error ? err.message : "Unable to fetch GNSS status");
        }
      }
    }

    const stopPolling = startGnssPolling(pollBackendOnce);

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [embedded]);

  useEffect(() => {
    if (embedded === null || (embedded && process.env.NEXT_PUBLIC_ENABLE_BROWSER_GEO_FALLBACK !== "true")) {
      return;
    }

    if (!navigator.geolocation) {
      if (!backendAvailableRef.current) {
        // This effect reports a browser capability failure to the hook's consumer.
        // eslint-disable-next-line react/set-state-in-effect
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
  }, [embedded]);

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
    fixType: positionSource === "browser" || backendStatus.stale ? null : backendStatus.fixType,
    satellites: positionSource === "browser" || backendStatus.stale ? null : backendStatus.satellites,
    fixStatusStale: positionSource === "browser" ? false : backendStatus.stale,
    positionSource,
    gnssDebug,
    error,
    loading,
  };
};

export default useGeolocation;
