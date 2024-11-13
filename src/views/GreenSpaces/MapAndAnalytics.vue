<script setup lang="ts">
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import type { FeatureCollection } from 'geojson'
import type { PropType } from 'vue'
import MapContainer from './MapContainer.vue'
import AnalyticsBoard from './components/AnalyticsBoard.vue'

const props = defineProps({
  greenSpacesItems: {
    type: Array as PropType<GreenSpacesItem[]>,
    required: true,
  },
  selectedIndicator: {
    type: Object as PropType<IndicatorsType | null>,
    required: true,
  },
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: true,
  },
  overpassResponse: {
    type: Object as PropType<OverpassResponse | null>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col">
    <MapContainer
      :geoJsonData="geoJsonData"
      :greenSpacesItems="props.greenSpacesItems"
      :selectedIndicator="props.selectedIndicator"
    />
    <AnalyticsBoard
      :overpassData="props.overpassResponse"
      :greenSpacesItem="props.greenSpacesItems"
      :indicatorsTypeValue="props.selectedIndicator?.value"
      :loading="props.loading"
    />
  </div>
</template>

<style scoped></style>
