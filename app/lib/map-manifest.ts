export interface MapManifest {
  id: string;
  title: string;
  bounds: [number, number, number, number];
  minZoom: number;
  maxZoom: number;
  format: "png" | "jpg";
  attribution: string;
  capturedAt: string;
  resolutionMeters: number;
}

export function parseMapManifest(value: unknown): MapManifest {
  if (!value || typeof value !== "object") throw new Error("Invalid local imagery manifest");
  const m = value as Partial<MapManifest>;
  if (typeof m.id !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(m.id) ||
    typeof m.title !== "string" || !m.title ||
    typeof m.attribution !== "string" || !m.attribution ||
    typeof m.capturedAt !== "string" || Number.isNaN(Date.parse(m.capturedAt)) ||
    typeof m.resolutionMeters !== "number" || !Number.isFinite(m.resolutionMeters) || m.resolutionMeters <= 0 ||
    typeof m.minZoom !== "number" || typeof m.maxZoom !== "number" ||
    !Number.isInteger(m.minZoom) || !Number.isInteger(m.maxZoom) ||
    m.minZoom < 0 || m.maxZoom > 22 || m.minZoom > m.maxZoom ||
    (m.format !== "png" && m.format !== "jpg") ||
    !Array.isArray(m.bounds) || m.bounds.length !== 4 || !m.bounds.every(Number.isFinite)) {
    throw new Error("Invalid local imagery manifest");
  }
  const [west, south, east, north] = m.bounds;
  if (west < -180 || east > 180 || south < -85 || north > 85 || west >= east || south >= north) {
    throw new Error("Invalid local imagery bounds");
  }
  return m as MapManifest;
}
