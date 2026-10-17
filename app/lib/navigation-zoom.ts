export function navigationZoomIn(rangeMeters: number): number {
  return Math.max(20, rangeMeters * 0.75);
}

export function navigationZoomOut(rangeMeters: number): number {
  return Math.min(10_000, rangeMeters * 1.33);
}
