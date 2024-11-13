<script setup lang="ts">
import GMap from '@/components/GMap/GMap.vue'
import type { Feature, FeatureCollection } from 'geojson'
import { ref, type PropType } from 'vue'
import { calculatePolygonArea } from '@/utils/areaUtility'
import type { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpaceLabel } from '@/types/enums/greenSpacesEnums'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'

const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
  },
  greenSpacesItems: {
    type: Object as PropType<GreenSpacesItem[] | null>,
    required: true,
  },
  selectedIndicator: {
    type: Object as PropType<IndicatorsType | null>,
    required: true,
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
  const label = props.greenSpacesItems?.find((item) => item.value === spaceType)?.labelKey
  return label ? label : 'Non défini'
}
</script>

<template>
  <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
    <div class="flex-1">
      <GMap
        :geoJsonData="props.geoJsonData"
        :overpassElementType="props.selectedIndicator?.overpassElementType"
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
