import type { PointsTabWithFeature } from '@/utils/formatGeoJsonUtility'

export interface HexLayerIndexWithFeature {
  o: PointsTabWithFeature
  point: [number, number]
}
