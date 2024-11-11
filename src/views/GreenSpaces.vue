<script setup lang="ts">
import { ref } from 'vue'
import GMap from '@/components/GMap/GMap.vue'
import { getGreenSpaces, getTrees } from '@/services/overpassService'
import { formatGreenSpacesOverPassToGeoJson, formatTreesToGeoJson } from '@/utils/formatOverpass'
import type { FeatureCollection } from 'geojson'
import type { SelectItem } from '@/types/interfaces/gSelect'
import { OverpassElementType } from '@/types/enums/overpassResponse'
import { IndicatorTitles, IndicatorValue } from '@/types/enums/indicators'
import type { IndicatorsType } from '@/types/interfaces/indicators'
import type { OverpassResponse } from '@/types/interfaces/overpassResponse'
import GSelect from '@/components/GSelect/GSelect.vue'
import { IconNamesMaterial } from '@/types/enums/iconNames'

const overpassResponse = ref<OverpassResponse | null>(null)
const geoJson = ref<FeatureCollection | null>(null)
const selectedIndicator = ref<IndicatorsType | null>(null)
const selectIsLoading = ref<boolean>(false)

const indicators = {
  trees: {
    title: IndicatorTitles.Trees,
    value: IndicatorValue.Trees,
    overpassElementType: OverpassElementType.NODE,
    iconName: IconNamesMaterial.TREES,
  },
  parks: {
    title: IndicatorTitles.Parks,
    value: IndicatorValue.Parks,
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
    } else if (indicatorValue === IndicatorValue.Parks) {
      data = await getGreenSpaces()
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
</script>

<template>
  <main>
    <div class="w-64">
      <GSelect
        :options="options"
        placeholder="Sélectionner un indicateurs"
        :loading="selectIsLoading"
        :handleChange="(item: SelectItem) => handleChangeIndicator(item)"
      />
    </div>

    <div>
      <GMap :geoJsonData="geoJson" :overpassElementType="selectedIndicator?.overpassElementType" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
