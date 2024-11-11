import {
  OverpassElementType,
  type OverpassElement,
  type OverpassResponse,
} from '@/types/overpassResponse'
import type { Feature, FeatureCollection, Geometry, Point } from 'geojson'

export const formatGreenSpacesOverPassToGeoJson = (
  overPassData: OverpassResponse,
): FeatureCollection => {
  const formattedGeoJson: FeatureCollection = {
    type: 'FeatureCollection',
    features: overPassData.elements
      .map((element: OverpassElement) => {
        if (
          element.geometry &&
          (element.type === OverpassElementType.WAY ||
            element.type === OverpassElementType.RELATION)
        ) {
          return {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                element.geometry.map((coord: { lat: number; lon: number }) => [
                  coord.lon,
                  coord.lat,
                ]),
              ],
            },
            properties: element.tags || {},
          } as Feature<Geometry>
        }
        return null
      })
      .filter((f: Feature<Geometry> | null) => f !== null) as Feature<Geometry>[],
  }
  return formattedGeoJson
}

export const formatTreesToGeoJson = (overPassData: OverpassResponse): FeatureCollection => {
  const formattedGeoJson: FeatureCollection = {
    type: 'FeatureCollection',
    features: overPassData.elements
      .filter(
        (element: OverpassElement) =>
          element.type === OverpassElementType.NODE && element.lon && element.lat,
      )
      .map(
        (element: OverpassElement) =>
          ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [element.lon, element.lat],
            } as Point,
            properties: element.tags || {},
          }) as Feature<Point>,
      ),
  }
  return formattedGeoJson
}
