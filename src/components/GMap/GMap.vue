<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import '@asymmetrik/leaflet-d3'
import type { PropType } from 'vue'
import type { Feature, FeatureCollection } from 'geojson'
import {
  formatGeoJsonToPointsTabWithFeature,
  type PointsTabWithFeature,
} from '@/utils/formatGeoJsonUtility'
import { OverpassElementType } from '@/types/enums/overpassResponseEnums'
import { hexbinLayerConfig } from '@/constants/hexbinLayerConfig'
import type { HexLayerIndexWithFeature } from '@/types/interfaces/mapInterfaces'
const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
  },
  overpassElementType: {
    type: String as PropType<OverpassElementType | null>,
    required: false,
  },
  handleClic: {
    type: Function as PropType<(feature: Feature) => void>,
    required: true,
  },
  handleClicMultiPointsWithFeature: {
    type: Function as PropType<(feature: HexLayerIndexWithFeature[]) => void>,
    required: true,
  },
})

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let currentLayer: L.Layer | null = null

const initMap = async () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([48.8566, 2.3522], 12)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  if (props.geoJsonData) {
    addGeoJsonLayer(props.geoJsonData)
  }
}
const addGeoJsonLayer = (geoJsonData: FeatureCollection) => {
  if (currentLayer) {
    map?.removeLayer(currentLayer)
  }

  switch (props.overpassElementType) {
    case OverpassElementType.NODE: {
      const data: PointsTabWithFeature[] = formatGeoJsonToPointsTabWithFeature(geoJsonData)
      const hexLayer = L.hexbinLayer({
        ...hexbinLayerConfig,
        duration: 200,
      }).hoverHandler(
        L.HexbinHoverHandler.compound({
          handlers: [
            L.HexbinHoverHandler.resizeFill(),
            L.HexbinHoverHandler.tooltip({
              tooltipContent: function (d) {
                const itemCount = d.length

                return `<div class="bg-white border border-gray-300 rounded-lg shadow-lg p-2 text-center">
                          <p class="text-lg font-bold text-blue-500">${itemCount} éléments</p>
                        </div>`
              },
            }),
          ],
        }),
      )

      hexLayer.addTo(map!)

      hexLayer
        .dispatch()
        .on('click', function (d: PointerEvent, index: HexLayerIndexWithFeature[]) {
          if (index.length === 1) {
            props.handleClic(index[0].o[2])
          } else {
            props.handleClicMultiPointsWithFeature(index)
          }
        })

      hexLayer.data(data)

      currentLayer = hexLayer
      break
    }

    case OverpassElementType.WAY: {
      const geoJsonLayer = L.geoJSON(geoJsonData, {
        style: (feature) => {
          return {
            color: feature?.properties.color || 'red',
            weight: 2,
            opacity: 1,
            fillColor: feature?.properties.color || 'red',
            fillOpacity: 0.5,
          }
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            layer.openPopup()
            props.handleClic(feature)
          })
        },
      }).addTo(map!)
      currentLayer = geoJsonLayer
      break
    }

    default: {
      console.warn('Error')
      break
    }
  }
}

watch(
  () => props.geoJsonData,
  (newGeoJsonData) => {
    if (newGeoJsonData && map) {
      addGeoJsonLayer(newGeoJsonData)
    }
  },
  { immediate: true },
)

onMounted(() => {
  initMap()
})
</script>

<template>
  <div ref="mapContainer" id="map" class="map-container"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  border-radius: 10px;
}

:root {
  --leaflet-tile-filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3)
    brightness(0.7);
}

@media (prefers-color-scheme: dark) {
  .leaflet-tile {
    filter: var(--leaflet-tile-filter, none);
  }

  .leaflet-container {
    background: #303030;
  }
}

.hexbin-hexagon {
  stroke: #000;
  stroke-width: 0.5px;
  transition: 200ms;
}

.hexbin-hexagon:hover {
  stroke: orange;
  stroke-width: 1px;
  stroke-opacity: 1;
}
</style>
