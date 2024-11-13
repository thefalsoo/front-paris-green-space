<script setup lang="ts">
import GMap from '@/components/GMap/GMap.vue'
import type { Feature, FeatureCollection } from 'geojson'
import { OverpassElementType } from '@/types/enums/overpassResponse'
import { ref, type PropType } from 'vue'
import type { IndicatorTitles } from '@/types/enums/indicators'
import { calculatePolygonArea } from '@/utils/area'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpaces'
import type { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQuery'
import type { GreenSpaceLabel } from '@/types/enums/greenSpaces'

const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
  },
  greenSpacesItem: {
    type: Array as PropType<GreenSpacesItem[]>,
    required: true,
  },
  indicatorTitle: {
    type: String as PropType<IndicatorTitles>,
    required: false,
  },
  overpassElementType: {
    type: String as PropType<OverpassElementType | null>,
    required: false,
  },
})

const itemFeature = ref<Feature | null>(null)
const surfaceArea = ref<number | null>(null)

const calculateArea = (feature: Feature) => {
  if (feature.geometry.type === 'Polygon' && feature.geometry.coordinates.length > 0) {
    const area = calculatePolygonArea(feature.geometry.coordinates)
    surfaceArea.value = area
  }
}

const handleClick = (feature: Feature) => {
  itemFeature.value = feature
  if (feature) {
    calculateArea(feature)
  }
}
function getSpaceTypeLabel(
  spaceType: LeisureType | LanduseType | NaturalType,
): GreenSpaceLabel | string {
  const label = props.greenSpacesItem.find((item) => item.value === spaceType)?.labelKey
  return label ? label : 'Non défini'
}
</script>

<template>
  <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
    <div class="flex-1">
      <GMap
        :geoJsonData="props.geoJsonData"
        :overpassElementType="props.overpassElementType"
        :handleClic="(feature) => handleClick(feature)"
        :handleClicMultiPointsWithFeature="(item) => console.log(item)"
      />
    </div>

    <div v-if="itemFeature" class="flex-1">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Propriétés de l'élément</h2>
      <div v-if="itemFeature.properties" class="space-y-2">
        <p><strong>Name:</strong> {{ itemFeature.properties.name || 'Non défini' }}</p>
        <p>
          <strong>Date de début:</strong> {{ itemFeature.properties.start_date || 'Non défini' }}
        </p>
        <p>
          <strong>Type d'espace:</strong>
          {{ getSpaceTypeLabel(itemFeature.properties.space_type) }}
        </p>
        <div v-if="surfaceArea" class="mt-4">
          <p><strong>Surface:</strong> {{ surfaceArea.toFixed(2) }} m²</p>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-500">Aucune propriété disponible pour cet élément.</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
