export type CoordinatePoint = {
  latitude: number
  longitude: number
  sortOrder?: number
}

const EARTH_RADIUS_METERS = 6_371_000

export function parseCoordinateText(value: string): CoordinatePoint[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [latitudeText, longitudeText] = line.split(",").map((part) => part.trim())
      const latitude = Number(latitudeText)
      const longitude = Number(longitudeText)

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error(`Invalid coordinate on line ${index + 1}. Use 'latitude, longitude'.`)
      }

      return {
        latitude,
        longitude,
        sortOrder: index,
      }
    })
}

export function formatCoordinateText(points: CoordinatePoint[]): string {
  return points
    .slice()
    .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0))
    .map((point) => `${point.latitude}, ${point.longitude}`)
    .join("\n")
}

export function calculatePolygonAreaHa(points: CoordinatePoint[]): number {
  if (points.length < 3) {
    return 0
  }

  const averageLatitudeRadians =
    (points.reduce((sum, point) => sum + point.latitude, 0) / points.length) * (Math.PI / 180)

  const projected = points.map((point) => ({
    x: EARTH_RADIUS_METERS * point.longitude * (Math.PI / 180) * Math.cos(averageLatitudeRadians),
    y: EARTH_RADIUS_METERS * point.latitude * (Math.PI / 180),
  }))

  let doubledArea = 0
  for (let index = 0; index < projected.length; index += 1) {
    const current = projected[index]
    const next = projected[(index + 1) % projected.length]
    doubledArea += current.x * next.y - next.x * current.y
  }

  return Math.abs(doubledArea) / 2 / 10_000
}

export function centroidFromPoints(points: CoordinatePoint[]): CoordinatePoint | null {
  if (points.length === 0) {
    return null
  }

  const total = points.reduce(
    (accumulator, point) => ({
      latitude: accumulator.latitude + point.latitude,
      longitude: accumulator.longitude + point.longitude,
    }),
    { latitude: 0, longitude: 0 }
  )

  return {
    latitude: total.latitude / points.length,
    longitude: total.longitude / points.length,
  }
}

export function formatDateTime(value: Date | string | null | undefined): string {
  if (!value) {
    return "—"
  }

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "—"
  }

  return date.toLocaleString()
}
