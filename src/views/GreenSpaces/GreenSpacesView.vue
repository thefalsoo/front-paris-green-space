<script setup lang="ts">
import { ref, computed } from 'vue'
import { getGreenSpaces, getTrees } from '@/services/overpassService'
import {
  formatGreenSpacesOverPassToGeoJson,
  formatTreesToGeoJson,
} from '@/utils/formatOverpassUtility'
import type { FeatureCollection } from 'geojson'
import { IndicatorValue } from '@/types/enums/indicatorsEnums'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import type { OverpassResponse } from '@/types/interfaces/overpassResponseInterfaces'
import IndicatorAndFilter from './IndicatorAndFilter.vue'
import Card from 'primevue/card'
import { generateQueryParamsFromFilters } from '@/utils/filterUtility'
import { greenSpacesItems } from '@/constants/greenSpaces'
import type { GSelectItem } from '@/components/GSelect/GSelect.vue'
import { indicators } from '@/constants/indicators'
import type { GSwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'
import MapAndAnalytics from './MapAndAnalytics.vue'

const filter: GSwitchItems[] = greenSpacesItems.map((item) => ({
  label: item.labelKey,
  value: item.value,
  checked: false,
  color: item.color,
}))

const overpassResponse = ref<OverpassResponse | null>(null)
const geoJson = ref<FeatureCollection | null>(null)
const selectedIndicator = ref<IndicatorsType | null>(null)
const dataIsLoading = ref<boolean>(false)
const filtersGreenSpaces = ref<GSwitchItems[]>(filter)

const optionsIndicators = computed(() =>
  Object.values(indicators).map((indicator) => ({
    label: indicator.title,
    value: indicator.value,
    iconName: indicator.iconName,
  })),
)

async function loadData() {
  if (!selectedIndicator.value) {
    console.error('No selected indicator to load data for.')
    return
  }

  dataIsLoading.value = true
  try {
    const indicatorValue = selectedIndicator.value.value
    let data: OverpassResponse | null = null

    switch (indicatorValue) {
      case IndicatorValue.TREES:
        data = await getTrees()
        geoJson.value = formatTreesToGeoJson(data)
        break
      case IndicatorValue.GREEN_SPACES:
        const queryParams = generateQueryParamsFromFilters(filtersGreenSpaces.value)
        data = await getGreenSpaces(queryParams)
        geoJson.value = formatGreenSpacesOverPassToGeoJson(data, greenSpacesItems)
        break
    }

    overpassResponse.value = data
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  } finally {
    dataIsLoading.value = false
  }
}

function handleChangeIndicator(item: GSelectItem) {
  if (item) {
    const findIndicator = Object.values(indicators).find(
      (indicator) => indicator.value === item.value,
    )
    if (findIndicator) {
      selectedIndicator.value = findIndicator
      loadData()
    }
  }
}

async function handleChangeFiltersGreenSpaces(item: GSwitchItems[]) {
  if (item) {
    filtersGreenSpaces.value = item
    loadData()
  }
}
</script>

<template>
  <div class="flex flex-row h-full w-full gap-4">
    <div class="flex flex-col w-1/6 h-full">
      <Card class="h-full">
        <template #content>
          <IndicatorAndFilter
            :selectedIndicator="selectedIndicator"
            :optionsIndicators="optionsIndicators"
            :filtersGreenSpaces="filtersGreenSpaces"
            :loading="dataIsLoading"
            :handleChangeIndicator="handleChangeIndicator"
            :handleChangeFiltersGreenSpaces="handleChangeFiltersGreenSpaces"
          />
        </template>
      </Card>
    </div>

    <div class="flex flex-col w-5/6 h-full">
      <Card class="h-full">
        <template #content>
          <MapAndAnalytics
            :greenSpacesItems="greenSpacesItems"
            :selectedIndicator="selectedIndicator"
            :geoJsonData="geoJson"
            :overpassResponse="overpassResponse"
            :loading="dataIsLoading"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
