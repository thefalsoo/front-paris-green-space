<script setup lang="ts">
import { ref } from 'vue'
import { getGreenSpaces, getTrees } from '@/services/overpassService'
import { formatGreenSpacesOverPassToGeoJson, formatTreesToGeoJson } from '@/utils/formatOverpass'
import type { FeatureCollection } from 'geojson'
import type { SelectItem } from '@/types/interfaces/gSelect'
import { OverpassElementType } from '@/types/enums/overpassResponse'
import { IndicatorTitles, IndicatorValue } from '@/types/enums/indicators'
import type { IndicatorsType } from '@/types/interfaces/indicators'
import type { OverpassResponse } from '@/types/interfaces/overpassResponse'
import { IconNamesMaterial } from '@/types/enums/iconNames'
import MapContainer from './MapContainer.vue'
import IndicatorAndFilter from './IndicatorAndFilter.vue'
import Card from 'primevue/card'
import type { SwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'
import { generateQueryParamsFromFilters } from '@/utils/filter'
import type { GreenSpacesItem } from '@/types/interfaces/greenSpacesType'
import AnalyticsBoard from './AnalyticsBoard.vue'
import { LanduseType, LeisureType, NaturalType } from '@/types/enums/overpassQuery'
import { GreenSpaceColor, GreenSpaceLabel } from '@/types/enums/greenSpaces'

const greenSpacesItem: GreenSpacesItem[] = [
  { labelKey: GreenSpaceLabel.PARK, value: LeisureType.PARK, color: GreenSpaceColor.PARK },
  { labelKey: GreenSpaceLabel.GARDEN, value: LeisureType.GARDEN, color: GreenSpaceColor.GARDEN },
  {
    labelKey: GreenSpaceLabel.PLAYGROUND,
    value: LeisureType.PLAYGROUND,
    color: GreenSpaceColor.PLAYGROUND,
  },
  { labelKey: GreenSpaceLabel.PITCH, value: LeisureType.PITCH, color: GreenSpaceColor.PITCH },
  { labelKey: GreenSpaceLabel.FOREST, value: LanduseType.FOREST, color: GreenSpaceColor.FOREST },
  { labelKey: GreenSpaceLabel.WOOD, value: NaturalType.WOOD, color: GreenSpaceColor.WOOD },
  {
    labelKey: GreenSpaceLabel.NATURE_RESERVE,
    value: NaturalType.NATURE_RESERVE,
    color: GreenSpaceColor.NATURE_RESERVE,
  },
]

const filter: SwitchItems[] = greenSpacesItem.map((item) => ({
  label: item.labelKey,
  value: item.value,
  checked: false,
  color: item.color,
}))

const overpassResponse = ref<OverpassResponse | null>(null)
const geoJson = ref<FeatureCollection | null>(null)
const selectedIndicator = ref<IndicatorsType | null>(null)
const selectIsLoading = ref<boolean>(false)
const filtersGreenSpaces = ref<SwitchItems[]>(filter)

const indicators = {
  trees: {
    title: IndicatorTitles.Trees,
    value: IndicatorValue.Trees,
    overpassElementType: OverpassElementType.NODE,
    iconName: IconNamesMaterial.TREES,
  },
  parks: {
    title: IndicatorTitles.GREEN_SPACES,
    value: IndicatorValue.GREEN_SPACES,
    overpassElementType: OverpassElementType.WAY,
    iconName: IconNamesMaterial.PARK,
  },
}

const options: SelectItem[] = Object.values(indicators).map((indicator) => ({
  label: indicator.title,
  value: indicator.value,
  iconName: indicator.iconName,
}))

async function loadIndicatorData(indicatorValue: IndicatorValue) {
  selectIsLoading.value = true
  try {
    let data: OverpassResponse | null = null
    if (indicatorValue === IndicatorValue.Trees) {
      data = await getTrees()
      geoJson.value = formatTreesToGeoJson(data)
    } else if (indicatorValue === IndicatorValue.GREEN_SPACES) {
      const queryParams = generateQueryParamsFromFilters(filtersGreenSpaces.value)
      data = await getGreenSpaces(queryParams)

      geoJson.value = formatGreenSpacesOverPassToGeoJson(data)
    }
    overpassResponse.value = data
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  } finally {
    selectIsLoading.value = false
  }
}

function handleChangeIndicator(item: SelectItem) {
  if (item) {
    selectedIndicator.value =
      item.value === IndicatorValue.Trees ? indicators.trees : indicators.parks
    loadIndicatorData(item.value as IndicatorValue)
  }
}

async function handleChangeFiltersGreenSpaces(item: SwitchItems[]) {
  if (item) {
    filtersGreenSpaces.value = item
    const queryParams = generateQueryParamsFromFilters(filtersGreenSpaces.value)
    selectIsLoading.value = true
    try {
      const data = await getGreenSpaces(queryParams)
      console.log('data', data)

      geoJson.value = formatGreenSpacesOverPassToGeoJson(data)
      console.log('geoJson', geoJson.value)

      overpassResponse.value = data
    } catch (error) {
      console.error('Erreur lors de la récupération des espaces verts :', error)
    } finally {
      selectIsLoading.value = false
    }
  }
}
</script>

<template>
  <div class="flex flex-row h-full w-full gap-4">
    <div class="flex flex-col w-1/6 h-full">
      <Card class="h-full">
        <template #content>
          <IndicatorAndFilter
            :indicatorsTypeValue="selectedIndicator?.value"
            :options="options"
            :filtersGreenSpaces="filtersGreenSpaces"
            :loading="selectIsLoading"
            :handleChange="(item: SelectItem) => handleChangeIndicator(item)"
            :handleChangeFiltersGreenSpaces="
              (item: SwitchItems[]) => handleChangeFiltersGreenSpaces(item)
            "
          />
        </template>
      </Card>
    </div>

    <div class="flex flex-col w-5/6 h-full">
      <Card class="h-full">
        <template #content>
          <div class="flex flex-col">
            <MapContainer
              :indicatorTitle="selectedIndicator?.title"
              :geoJsonData="geoJson"
              :overpassElementType="selectedIndicator?.overpassElementType"
            />
            <AnalyticsBoard
              :overpassData="overpassResponse"
              :greenSpacesItem="greenSpacesItem"
              :indicatorsTypeValue="selectedIndicator?.value"
              :loading="selectIsLoading"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
