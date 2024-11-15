<script setup lang="ts">
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import type { FeatureCollection } from 'geojson'
import type { PropType } from 'vue'
import MapContainer from './MapContainer.vue'
import AnalyticsBoard from './components/AnalyticsBoard.vue'

const props = defineProps({
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
  <div class="flex flex-col h-full">
    <div class="flex flex-row w-full">
      <MapContainer
        :geoJsonData="geoJsonData"
        :selectedIndicator="props.selectedIndicator"
        :loading="props.loading"
      />
    </div>
    <div class="flex w-full pt-4">
      <AnalyticsBoard
        :overpassData="props.overpassResponse"
        :loading="props.loading"
        :selectedIndicator="props.selectedIndicator"
      />
    </div>
  </div>
</template>

<style scoped></style>
