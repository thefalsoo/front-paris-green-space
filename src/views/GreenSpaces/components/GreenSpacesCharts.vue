<script setup lang="ts">
import GBarChart from '@/components/GBarChart/GBarChart.vue'
import GDoughnurChart from '@/components/GDoughnurChart/GDoughnurChart.vue'
import { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesInterfaces'
import type {
  OverpassElement,
  OverpassResponse,
} from '@/types/interfaces/overpassResponseInterfaces'
import { calculatePolygonArea } from '@/utils/areaUtility'
import type { Position } from 'geojson'
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
    default: false,
  },
})

const labels = ref<string[]>([])
const counts = ref<number[]>([])
const areas = ref<number[]>([])
const colors = ref<string[]>([])

watch(
  () => props.overpassData,
  (newOverpassData) => {
    if (newOverpassData) {
      processGreenSpaces(newOverpassData)
    }
  },
)

const processGreenSpaces = (overpassData: OverpassResponse) => {
  const count: Record<string, number> = {}
  const areaByType: Record<string, number> = {}

  overpassData.elements.forEach((element: OverpassElement) => {
    countElementType(element, count)
    calculateElementArea(element, areaByType)
  })

  updateChartData(count, areaByType)
}

const calculateElementArea = (element: OverpassElement, areaByType: Record<string, number>) => {
  if (element.geometry && element.geometry.length > 2) {
    const polygonCoordinates: Position[][] = [
      element.geometry.map((coord) => [coord.lon, coord.lat]),
    ]
    const surface = calculatePolygonArea(polygonCoordinates)
    const elementType = determineElementType(element)
    if (elementType) {
      areaByType[elementType] = (areaByType[elementType] || 0) + surface
    }
  }
}

const countElementType = (element: OverpassElement, count: Record<string, number>) => {
  const elementType = determineElementType(element)
  if (elementType) {
    count[elementType] = (count[elementType] || 0) + 1
  }
}

const determineElementType = (element: OverpassElement): string | undefined => {
  const { leisure, landuse, natural } = element.tags || {}
  if (leisure && Object.values(LeisureType).includes(leisure as LeisureType)) return leisure
  if (landuse && Object.values(LanduseType).includes(landuse as LanduseType)) return landuse
  if (natural && Object.values(NaturalType).includes(natural as NaturalType)) return natural
  return undefined
}

const updateChartData = (count: Record<string, number>, areaByType: Record<string, number>) => {
  labels.value = []
  counts.value = []
  areas.value = []
  colors.value = []

  props.greenSpacesItem.forEach((item) => {
    if (count[item.value]) {
      labels.value.push(item.labelKey)
      counts.value.push(count[item.value])
      areas.value.push(areaByType[item.value] || 0)
      colors.value.push(item.color)
    }
  })
}
</script>

<template>
  <div class="flex flex-wrap w-full gap-4 overflow-hidden">
    <div class="flex-1 min-w-[300px] h-[300px]">
      <GBarChart
        :title="$t('interface.numberOfGreenSpaces')"
        :labels="labels"
        :data="counts"
        :colors="colors"
        :loading="loading"
      />
    </div>
    <div class="flex-1 min-w-[300px] h-[300px]">
      <GDoughnurChart
        :title="$t('interface.pourcentOfVegetation')"
        :labels="labels"
        :data="areas"
        :colors="colors"
        :loading="loading"
      />
    </div>
  </div>
</template>
