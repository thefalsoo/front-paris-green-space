<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import GMap from '@/components/GMap/GMap.vue'
import type { Feature, FeatureCollection } from 'geojson'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import PropertyDetails from './components/PropertyDetails.vue'

const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
  },
  selectedIndicator: {
    type: Object as PropType<IndicatorsType | null>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const itemFeature = ref<Feature | null>(null)

watch(
  () => props.geoJsonData,
  () => {
    itemFeature.value = null
  },
)

const handleClick = (feature: Feature) => {
  itemFeature.value = feature
}

// Computed property for dynamic class for GMap container
const mapWidthClass = computed(() => {
  return itemFeature.value ? 'w-4/5' : 'w-full'
})
</script>

<template>
  <div :class="mapWidthClass">
    <GMap
      :geoJsonData="props.geoJsonData"
      :overpassElementType="props.selectedIndicator?.overpassElementType"
      :handleClic="(feature) => handleClick(feature)"
      :handleClicMultiPointsWithFeature="(item) => console.log(item)"
      :loading="props.loading"
    />
  </div>

  <div v-if="itemFeature" class="w-1/5 p">
    <PropertyDetails :itemFeature="itemFeature" :selectedIndicator="props.selectedIndicator" />
  </div>
</template>

<style scoped></style>
