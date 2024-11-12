<script setup lang="ts">
import { type PropType } from 'vue'
import GSelect from '@/components/GSelect/GSelect.vue'
import type { SelectItem } from '@/types/interfaces/gSelect'
import { IndicatorValue } from '@/types/enums/indicators'
import GGroupSwitchs, { type SwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'

const props = defineProps({
  options: {
    type: Array as PropType<SelectItem[]>,
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
  handleChange: {
    type: Function as PropType<(params: SelectItem) => void>,
    required: true,
  },
  filtersGreenSpaces: {
    type: Array as PropType<SwitchItems[]>,
    required: true,
  },
  handleChangeFiltersGreenSpaces: {
    type: Function as PropType<(params: SwitchItems[]) => void>,
    required: true,
  },
})
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-4">
      <p class="text-lg font-bold">Indicateurs</p>
      <GSelect
        :options="props.options"
        placeholder="Sélectionner un indicateur"
        :loading="props.loading"
        :handleChange="(item: SelectItem) => props.handleChange(item)"
      />
    </div>
    <div v-if="indicatorsTypeValue === IndicatorValue.GREEN_SPACES" class="space-y-4">
      <p class="text-lg font-bold">Filtres</p>
      <GGroupSwitchs
        :items="props.filtersGreenSpaces"
        :show-legend="true"
        :handleChangeSwitchs="(item: SwitchItems[]) => props.handleChangeFiltersGreenSpaces(item)"
      />
    </div>
  </div>
</template>
