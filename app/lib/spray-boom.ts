export interface SprayPoint {
  lat: number;
  lon: number;
}

export interface SprayBoom {
  left: SprayPoint;
  right: SprayPoint;
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
