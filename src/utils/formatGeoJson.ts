import type { Feature, FeatureCollection, Point, Position } from 'geojson'

export const formatGeoJsonToPointsTab = (geoJsonData: FeatureCollection): Position[] => {
  const data: Position[] = geoJsonData.features
    .map((feature: Feature) => {
      if (feature.geometry?.type === 'Point') {
        const [lon, lat] = (feature.geometry as Point).coordinates
        return [lon, lat] as Position
      }
      return null
    })
    .filter((point): point is Position => point !== null) // Utilisation d'un prédicat pour filtrer les positions valides

  return data
}
