<script setup lang="ts">
import { computed, type PropType, ref, watchEffect } from 'vue'
import type { Feature } from 'geojson'
import type { LeisureType, LanduseType, NaturalType } from '@/types/enums/overpassQueryEnums'
import type { GreenSpaceLabel } from '@/types/enums/greenSpacesEnums'
import { greenSpacesItems } from '@/constants/greenSpaces'
import { calculatePolygonArea } from '@/utils/areaUtility'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import { OverpassElementType } from '@/types/enums/overpassResponseEnums'
import { IndicatorValue } from '@/types/enums/indicatorsEnums'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  itemFeature: {
    type: Object as PropType<Feature | null>,
    required: true,
  },
  selectedIndicator: {
    type: Object as PropType<IndicatorsType | null>,
    required: true,
  },
})

const surfaceArea = ref<number | null>(null)

watchEffect(() => {
  if (
    props.itemFeature?.geometry.type === 'Polygon' &&
    props.selectedIndicator?.overpassElementType === OverpassElementType.WAY
  ) {
    surfaceArea.value = calculatePolygonArea(props.itemFeature.geometry.coordinates)
  } else {
    surfaceArea.value = null
  }
})

const getLabelByFeatureType = (
  spaceType: LeisureType | LanduseType | NaturalType,
): GreenSpaceLabel | string => {
  return greenSpacesItems.find((item) => item.value === spaceType)?.labelKey || 'Non défini'
}

const formattedSurface = computed(() => (surfaceArea.value ? surfaceArea.value.toFixed(2) : null))

const itemProperties = computed(() => {
  const propsData = props.itemFeature?.properties || {}
  return {
    name: propsData.name,
    start_date: propsData.start_date,
    space_type: propsData.space_type,
    genus: propsData.genus,
    circumference: propsData.circumference,
    height: propsData.height,
  }
})

const hasProperties = computed(() =>
  Boolean(
    itemProperties.value.name ||
      itemProperties.value.start_date ||
      itemProperties.value.space_type ||
      formattedSurface.value ||
      itemProperties.value.genus ||
      itemProperties.value.circumference ||
      itemProperties.value.height,
  ),
)
const { t } = useI18n()

const propertyTitle = computed(() =>
  props.selectedIndicator?.value === IndicatorValue.GREEN_SPACES
    ? t('interface.spaceProperties')
    : t('interface.treeProperties'),
)
</script>

<template>
  <div class="space-y-4 pl-4">
    <p class="text-lg font-bold text-white">{{ propertyTitle }}</p>

    <div v-if="hasProperties">
      <p v-if="itemProperties.name" class="text-white">Nom : {{ itemProperties.name }}</p>
      <p v-if="itemProperties.start_date" class="text-white">
        {{ $t('interface.buildDate') }} : {{ itemProperties.start_date }}
      </p>
      <p v-if="itemProperties.space_type" class="text-white">
        {{ $t('interface.spaceType') }} : {{ getLabelByFeatureType(itemProperties.space_type) }}
      </p>
      <p v-if="formattedSurface" class="text-white">
        {{ $t('interface.area') }} : {{ formattedSurface }} m²
      </p>
      <p v-if="itemProperties.genus" class="text-white">
        {{ $t('interface.genus') }} : {{ itemProperties.genus }}
      </p>
      <p v-if="itemProperties.circumference" class="text-white">
        {{ $t('interface.circumference') }} : {{ itemProperties.circumference }} m
      </p>
      <p v-if="itemProperties.height" class="text-white">
        {{ $t('interface.height') }} : {{ itemProperties.height }} {{ $t('interface.foot') }}
      </p>
    </div>

    <div v-else>
      <p class="text-white">{{ $t('interface.noProperties') }}</p>
    </div>
  </div>
</template>

<style scoped></style>
