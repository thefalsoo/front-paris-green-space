<script setup lang="ts">
import GreenSpacesBarChart from '@/views/GreenSpaces/components/GreenSpacesBarChart.vue'
import type { IndicatorValue } from '@/types/enums/indicatorsEnums'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import { type PropType } from 'vue'

const props = defineProps({
  overpassData: {
    type: Object as PropType<OverpassResponse | null>,
    required: false,
  },
  greenSpacesItem: {
    type: Array as PropType<GreenSpacesItem[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  indicatorsTypeValue: {
    type: String as PropType<IndicatorValue>,
    required: false,
  },
})
</script>

<template>
  <div class="flex flex-col h-screen space-y-4 p-4">
    <p class="text-xl font-semibold">Statistiques</p>
    <div class="flex flex-row justify-start">
      <GreenSpacesBarChart
        :overpassData="props.overpassData"
        :greenSpacesItem="props.greenSpacesItem"
        :loading="loading"
        :indicatorsTypeValue="indicatorsTypeValue"
      />
    </div>
  </div>
</template>
