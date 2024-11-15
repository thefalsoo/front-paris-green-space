<script setup lang="ts">
import { ref, type PropType } from 'vue'
import GSelect, { type GSelectItem } from '@/components/GSelect/GSelect.vue'
import { IndicatorValue } from '@/types/enums/indicatorsEnums'
import GGroupSwitchs, { type GSwitchItems } from '@/components/GGroupSwitchs/GGroupSwitchs.vue'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import GButton from '@/components/GButton/GButton.vue'
import { IconNamesPrime } from '@/types/enums/iconNamesEnums'
import ImportModal from './components/modal/ImportModal.vue'

const props = defineProps({
  optionsIndicators: {
    type: Array as PropType<GSelectItem[]>,
    required: true,
  },
  filtersGreenSpaces: {
    type: Array as PropType<GSwitchItems[]>,
    required: true,
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
  handleChangeIndicator: {
    type: Function as PropType<(params: GSelectItem) => void>,
    required: true,
  },

  handleChangeFiltersGreenSpaces: {
    type: Function as PropType<(params: GSwitchItems[]) => void>,
    required: true,
  },
})

const isModalVisible = ref(false)

function openModalImport() {
  isModalVisible.value = true
}

function closeModalImport() {
  isModalVisible.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-4">
      <p class="text-lg font-bold text-white">Indicateurs</p>
      <GSelect
        :options="props.optionsIndicators"
        placeholder="Sélectionner un indicateur"
        :loading="props.loading"
        :handleChange="handleChangeIndicator"
      />
    </div>

    <div v-if="selectedIndicator?.value === IndicatorValue.GREEN_SPACES" class="space-y-4">
      <p class="text-lg font-bold text-white">Filtres les espaces verts</p>
      <div class="flex flex-wrap md:flex-col md:overflow-hidden space-y-2">
        <GGroupSwitchs
          :items="props.filtersGreenSpaces"
          :show-legend="true"
          :loading="props.loading"
          maxWidthLabel="200px"
          :handleChangeSwitchs="props.handleChangeFiltersGreenSpaces"
        />
      </div>
    </div>

    <div class="space-y-4">
      <p class="text-lg font-bold text-white">Importer des données</p>
      <GButton
        title="Importer csv"
        :iconName="IconNamesPrime.FILE_IMPORT"
        :click="openModalImport"
      />
    </div>
  </div>

  <ImportModal :isModalVisible="isModalVisible" :close="closeModalImport" />
</template>
