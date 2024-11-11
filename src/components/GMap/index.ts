import type { HexbinLayerConfig } from 'leaflet'

export const options: HexbinLayerConfig = {
  duration: 300,
  opacity: 0.6,
  colorScaleExtent: [20, 50],
  radiusScaleExtent: [3, 15],
  colorRange: ['#86f7be', '#06301b'],
  radiusRange: [5, 12],
  pointerEvents: 'all',
}
