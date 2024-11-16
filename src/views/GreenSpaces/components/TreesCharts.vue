<script setup lang="ts">
import GBarChart from '@/components/GBarChart/GBarChart.vue'
import type {
  OverpassElement,
  OverpassResponse,
} from '@/types/interfaces/overpassResponseInterfaces'
import { ref, type PropType, watch } from 'vue'

const props = defineProps({
  overpassData: {
    type: Object as PropType<OverpassResponse | null>,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const labels = ref<string[]>([])
const counts = ref<number[]>([])
const colors = ref<string[]>([])

watch(
  () => props.overpassData,
  (newOverpassData) => {
    if (newOverpassData) {
      processGenusTrees(newOverpassData)
    }
  },
)

const processGenusTrees = (overpassData: OverpassResponse) => {
  const count: Record<string, number> = {}
  overpassData.elements.forEach((element: OverpassElement) => {
    const genus = element.tags?.genus
    if (genus) {
      count[genus] = (count[genus] || 0) + 1
    }
  })

  const filteredCount = Object.keys(count)
    .filter((genus) => count[genus] > 100)
    .reduce(
      (acc, genus) => {
        acc[genus] = count[genus]
        return acc
      },
      {} as Record<string, number>,
    )

  updateChartData(filteredCount)
}

const updateChartData = (count: Record<string, number>) => {
  labels.value = []
  counts.value = []
  colors.value = []

  Object.keys(count).forEach((genus) => {
    labels.value.push(genus)
    counts.value.push(count[genus])
    colors.value.push(getColorForGenus(genus))
  })
}

const getColorForGenus = (genus: string): string => {
  const colors = ['#ff5733', '#33ff57', '#3357ff', '#f0e130', '#8e44ad']
  const index = Math.abs(genus.charCodeAt(0) % colors.length)
  return colors[index]
}
</script>

<template>
  <div class="flex flex-wrap w-full gap-4 overflow-hidden">
    <div class="flex-1 min-w-[300px] h-[300px]">
      <GBarChart
        :title="$t('interface.treeByGenus')"
        :labels="labels"
        :data="counts"
        :colors="colors"
        :loading="props.loading"
      />
    </div>
    <div class="flex-1 min-w-[300px] h-[300px]">
      <GBarChart
        :title="$t('interface.treeByGenus')"
        :labels="labels"
        :data="counts"
        :colors="colors"
        :loading="props.loading"
      />
    </div>
  </div>
</template>
