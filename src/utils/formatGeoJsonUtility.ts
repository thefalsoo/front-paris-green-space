import type { Feature, FeatureCollection, Point } from 'geojson'

export type PointsTabWithFeature = [number, number, Feature]

export const formatGeoJsonToPointsTabWithFeature = (
  geoJsonData: FeatureCollection,
): PointsTabWithFeature[] => {
  const data: PointsTabWithFeature[] = geoJsonData.features
    .map((feature: Feature) => {
      if (feature.geometry?.type === 'Point') {
        const [lon, lat] = (feature.geometry as Point).coordinates
        return [lon, lat, feature] as PointsTabWithFeature
      }
      return null
    })
    .filter((point): point is PointsTabWithFeature => point !== null)

  return data
}
