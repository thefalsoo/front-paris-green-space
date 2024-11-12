<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import '@asymmetrik/leaflet-d3'
import type { PropType } from 'vue'
import type { FeatureCollection, Position } from 'geojson'
import { formatGeoJsonToPointsTab } from '@/utils/formatGeoJson'
import { options } from '.'
import { OverpassElementType } from '@/types/enums/overpassResponse'

const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
  },
  overpassElementType: {
    type: String as PropType<OverpassElementType | null>,
    required: false,
  },
})

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let currentLayer: L.LayerGroup | null = null
// Fonction d'initialisation de la carte
const initMap = async () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([48.8566, 2.3522], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  if (props.geoJsonData) {
    addGeoJsonLayer(props.geoJsonData)
  }
}

// Fonction pour ajouter une couche GeoJSON avec des hexbins
const addGeoJsonLayer = (geoJsonData: FeatureCollection) => {
  if (currentLayer) {
    map?.removeLayer(currentLayer)
  }
  switch (props.overpassElementType) {
    case OverpassElementType.NODE: {
      const data: Position[] = formatGeoJsonToPointsTab(geoJsonData)
      const hexLayer = L.hexbinLayer(options).addTo(map!)
      hexLayer.data(data)
      currentLayer = hexLayer
      break
    }

    case OverpassElementType.WAY: {
      const geoJsonLayer = L.geoJSON(geoJsonData).addTo(map!)
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
      initMap()
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
.hexbin-hexagon {
  stroke: #000;
  stroke-width: 0.5px;
}

.hexbin-container:hover .hexbin-hexagon {
  transition: 200ms;
  stroke: orange;
  stroke-width: 1px;
  stroke-opacity: 1;
}

.hexbin-tooltip {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid black;
  background-color: white;
}
</style>
