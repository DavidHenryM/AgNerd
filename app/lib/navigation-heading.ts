import { haversineDistance, type SprayPoint } from "./spray-boom";

export const MIN_NAVIGATION_COURSE_SPEED_MPS = 0.8;

/** Raw GNSS course is a direction of travel, not a reliable heading while stopped. */
export function navigationHeading(
  previousHeadingRadians: number,
  previous: SprayPoint | null,
  current: SprayPoint,
  courseDegrees: number | null,
  speedMps: number | null,
): number {
  if (speedMps !== null && speedMps < MIN_NAVIGATION_COURSE_SPEED_MPS) return previousHeadingRadians;
  if (speedMps !== null && courseDegrees !== null) return courseDegrees * Math.PI / 180;
  if (!previous || haversineDistance(previous.lat, previous.lon, current.lat, current.lon) < 0.5) {
    return previousHeadingRadians;
  }
  const lat1 = previous.lat * Math.PI / 180;
  const lat2 = current.lat * Math.PI / 180;
  const dLon = (current.lon - previous.lon) * Math.PI / 180;
  return Math.atan2(Math.sin(dLon) * Math.cos(lat2),
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon));
}
