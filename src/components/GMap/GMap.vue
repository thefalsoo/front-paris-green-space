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
import ProgressSpinner from 'primevue/progressspinner'
import { useI18n } from 'vue-i18n'

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
  loading: {
    type: Boolean,
    default: false,
  },
})

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let currentLayer: L.Layer | null = null

const { t } = useI18n()
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
                const text = itemCount + ' ' + t('interface.trees')
                return `
        <div class="relative bg-gray-800 text-white p-2 rounded-lg shadow-lg text-center">
          <p class="font-bold text-green">${text}</p>

          <!-- Triangle pointer -->
          <div class="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-gray-800"></div>
        </div>
      `
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
  <div class="mapWithLoader">
    <div ref="mapContainer" id="map" class="map-container relative"></div>
    <div
      v-if="props.loading"
      class="absolute top-12 right-1 transform -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </div>
</template>

<style scoped>
.mapWithLoader {
  width: 100%;
  height: 50vh;
  z-index: 1;
  position: relative;
}
#map {
  width: 100%;
  height: 100%;
  z-index: 1;
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
