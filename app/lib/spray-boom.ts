export interface SprayPoint {
  lat: number;
  lon: number;
}

export interface SprayBoom {
  left: SprayPoint;
  right: SprayPoint;
}

/** Haversine distance in metres between two lat/lng points. */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export class SprayTrail {
  private previous: { point: SprayPoint; boom: SprayBoom } | null = null;

  reset() {
    this.previous = null;
  }

  update(point: SprayPoint, boom: SprayBoom): { coordinates: number[]; distance: number } | null {
    const previous = this.previous;
    if (!previous) {
      this.previous = { point, boom };
      return null;
    }
    const distance = haversineDistance(previous.point.lat, previous.point.lon, point.lat, point.lon);
    // Keep the last painted endpoints until enough movement accumulates.
    if (distance < 0.5) return null;
    this.previous = { point, boom };
    return { coordinates: sprayStrip(previous.boom, boom), distance };
  }
}

function destination(point: SprayPoint, bearing: number, distance: number): SprayPoint {
  const lat = point.lat * Math.PI / 180;
  const lon = point.lon * Math.PI / 180;
  const angle = distance / 6_371_000;
  const nextLat = Math.asin(Math.sin(lat) * Math.cos(angle) +
    Math.cos(lat) * Math.sin(angle) * Math.cos(bearing));
  const nextLon = lon + Math.atan2(Math.sin(bearing) * Math.sin(angle) * Math.cos(lat),
    Math.cos(angle) - Math.sin(lat) * Math.sin(nextLat));
  return { lat: nextLat * 180 / Math.PI, lon: nextLon * 180 / Math.PI };
}

export function sprayBoom(
  point: SprayPoint,
  headingRadians: number,
  width: number,
  offset: number,
  forwardOffset = 0,
): SprayBoom {
  const centre = destination(point, headingRadians, forwardOffset);
  // Preserve the existing convention: positive offset moves left of travel.
  return {
    left: destination(centre, headingRadians - Math.PI / 2, width / 2 + offset),
    right: destination(centre, headingRadians + Math.PI / 2, width / 2 - offset),
  };
}

export function sprayStrip(previous: SprayBoom, current: SprayBoom): number[] {
  return [previous.left, previous.right, current.right, current.left]
    .flatMap(point => [point.lon, point.lat]);
}
