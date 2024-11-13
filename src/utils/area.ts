import type { Position } from 'geojson'

const RADIUS_EARTH_METERS = 6371000

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function calculateRingArea(ring: Position[]): number {
  let area = 0
  const numPoints = ring.length

  for (let i = 0; i < numPoints; i++) {
    const [lon1, lat1] = ring[i].slice(0, 2)
    const [lon2, lat2] = ring[(i + 1) % numPoints].slice(0, 2)

    const φ1 = toRadians(lat1)
    const φ2 = toRadians(lat2)
    const λ1 = toRadians(lon1)
    const λ2 = toRadians(lon2)

    area += (λ2 - λ1) * (2 + Math.sin(φ1) + Math.sin(φ2))
  }

  area = Math.abs((area * RADIUS_EARTH_METERS * RADIUS_EARTH_METERS) / 2)
  return area
}

export function calculatePolygonArea(coordinates: Position[][]): number {
  let totalArea = 0

  for (let i = 0; i < coordinates.length; i++) {
    const ringArea = calculateRingArea(coordinates[i])

    totalArea += (i === 0 ? 1 : -1) * ringArea
  }

  return totalArea
}
