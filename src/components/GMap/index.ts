import type { PointsTabWithFeature } from '@/utils/formatGeoJson'
import type { HexbinLayerConfig } from 'leaflet'

export interface HexLayerIndexWithFeature {
  o: PointsTabWithFeature
  point: [number, number]
}
export const options: HexbinLayerConfig = {
  duration: 300,
  opacity: 0.6,
  colorScaleExtent: [20, 50],
  radiusScaleExtent: [3, 15],
  colorRange: ['#06301b', ' #86f7be'],
  radiusRange: [5, 12],
  pointerEvents: 'all',
}
