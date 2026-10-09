export const GNSS_STATUS_TTL_MS = 5000;

const FIX_TYPES = [
  "NO_FIX", "GPS", "DGPS", "PPS", "RTK_FIXED", "RTK_FLOAT",
  "DEAD_RECKONING", "MANUAL", "SIMULATION", "2D", "3D",
] as const;
export type GnssFixType = typeof FIX_TYPES[number];

export type GnssFixStatus = {
  fixType: GnssFixType | null;
  satellites: number | null;
  horizontalAccuracyMeters: number | null;
  stale: boolean;
};

export function isGnssFixType(value: unknown): value is GnssFixType {
  return typeof value === "string" && FIX_TYPES.some((type) => type === value);
}

function isFresh(value: unknown, now: number): boolean {
  if (typeof value !== "string") return false;
  const age = now - Date.parse(value);
  return Number.isFinite(age) && age >= 0 && age <= GNSS_STATUS_TTL_MS;
}

function nonNegativeNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

export function parseGnssFixStatus(payload: unknown, now = Date.now()): GnssFixStatus {
  if (!payload || typeof payload !== "object") {
    return { fixType: null, satellites: null, horizontalAccuracyMeters: null, stale: true };
  }
  const status = payload as Record<string, unknown>;
  const stale = !isFresh(status.statusFileUpdatedAt, now) || !isFresh(status.lastReadAt, now);
  const fixType = !stale && isGnssFixType(status.fixType) ? status.fixType : null;
  const satellites = stale ? null : nonNegativeNumber(status.satellites);
  return {
    fixType,
    satellites: satellites !== null && Number.isInteger(satellites) ? satellites : null,
    horizontalAccuracyMeters: stale ? null : nonNegativeNumber(status.horizontalAccuracyMeters),
    stale,
  };
}

export function formatGnssFixStatus(fixType: GnssFixType | null, stale: boolean, browser = false) {
  if (browser) return { label: "Browser location", color: "#90CAF9" };
  if (stale) return { label: "Stale / unavailable", color: "#9E9E9E" };
  switch (fixType) {
    case "RTK_FIXED": return { label: "RTK fixed", color: "#00E676" };
    case "RTK_FLOAT": return { label: "RTK float", color: "#FFC107" };
    case "NO_FIX": return { label: "No fix", color: "#FF5252" };
    case "GPS": return { label: "GPS", color: "#90CAF9" };
    case "DGPS": return { label: "DGPS", color: "#00BCD4" };
    case "2D": return { label: "2D fix", color: "#90CAF9" };
    case "3D": return { label: "3D fix", color: "#90CAF9" };
    case "PPS": return { label: "PPS fix", color: "#90CAF9" };
    case "DEAD_RECKONING": return { label: "Dead reckoning", color: "#FFC107" };
    case "MANUAL": return { label: "Manual position", color: "#FFC107" };
    case "SIMULATION": return { label: "Simulation", color: "#FFC107" };
    default: return { label: "Unknown", color: "#9E9E9E" };
  }
}
