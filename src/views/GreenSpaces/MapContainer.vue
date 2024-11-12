<script setup lang="ts">
import GMap from '@/components/GMap/GMap.vue'
import type { FeatureCollection } from 'geojson'
import { OverpassElementType } from '@/types/enums/overpassResponse'
import type { PropType } from 'vue'
import type { IndicatorTitles } from '@/types/enums/indicators'

const props = defineProps({
  geoJsonData: {
    type: Object as PropType<FeatureCollection | null>,
    required: false,
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
</script>

<template>
  <div class="space-y-4">
    <div class="flex">
      <p class="text-lg font-bold">
        {{ props.indicatorTitle || 'Carte interactive - sélectionner un indicateur' }}
      </p>
    </div>
    <GMap :geoJsonData="props.geoJsonData" :overpassElementType="props.overpassElementType" />
  </div>
</template>
