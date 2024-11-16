<script setup lang="ts">
import GreenSpacesBarChart from '@/views/GreenSpaces/components/GreenSpacesCharts.vue'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import { type PropType } from 'vue'
import { greenSpacesItems } from '@/constants/greenSpaces'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import { IndicatorValue } from '@/types/enums/indicatorsEnums'
import TreesCharts from './TreesCharts.vue'

const props = defineProps({
  overpassData: {
    type: Object as PropType<OverpassResponse | null>,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedIndicator: {
    type: Object as PropType<IndicatorsType | null>,
    required: true,
  },
})
</script>

<template>
  <div v-if="selectedIndicator?.value == IndicatorValue.GREEN_SPACES" class="flex w-full">
    <GreenSpacesBarChart
      :overpassData="props.overpassData"
      :greenSpacesItem="greenSpacesItems"
      :loading="loading"
    />
  </div>
  <div v-if="selectedIndicator?.value == IndicatorValue.TREES" class="flex w-full">
    <TreesCharts
      :overpassData="props.overpassData"
      :greenSpacesItem="greenSpacesItems"
      :loading="loading"
    />
  </div>
</template>
