<script setup lang="ts">
import GBarChart from '@/components/GBarChart/GBarChart.vue'
import type { IndicatorValue } from '@/types/enums/indicators'
import { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQuery'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpaces'
import type { OverpassElement, OverpassResponse } from '@/types/interfaces/overpassResponse'
import { ref, type PropType, watch } from 'vue'

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

const labels = ref<string[]>([])
const data = ref<number[]>([])
const colors = ref<string[]>([])

watch(
  () => props.overpassData,
  (newOverpassData) => {
    if (newOverpassData && props.greenSpacesItem) {
      updateChartData(newOverpassData)
    }
  },
)

const updateChartData = (overpassData: OverpassResponse) => {
  const count: Record<string, number> = {}

  overpassData.elements.forEach((element: OverpassElement) => {
    countElementType(element, count)
  })

  labels.value = []
  data.value = []
  colors.value = []

  props.greenSpacesItem.forEach((item) => {
    if (count[item.value]) {
      labels.value.push(item.labelKey)
      data.value.push(count[item.value])
      colors.value.push(item.color)
    }
  })
}

const countElementType = (element: OverpassElement, count: Record<string, number>) => {
  const { leisure, landuse, natural } = element.tags || {}

  let elementType: string | undefined = undefined
  if (leisure && Object.values(LeisureType).includes(leisure as LeisureType)) {
    elementType = leisure
  } else if (landuse && Object.values(LanduseType).includes(landuse as LanduseType)) {
    elementType = landuse
  } else if (natural && Object.values(NaturalType).includes(natural as NaturalType)) {
    elementType = natural
  }

  if (elementType) {
    count[elementType] = (count[elementType] || 0) + 1
  }
}
</script>

<template>
  <div class="flex-col items-center">
    <GBarChart :labels="labels" :data="data" :colors="colors" />
  </div>
</template>
