<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import Dialog from 'primevue/dialog'
import GButton from '@/components/GButton/GButton.vue'
import { palette } from '@/constants/palette'
import GSelect, { type GSelectItem } from '@/components/GSelect/GSelect.vue'
import { indicators } from '@/constants/indicators'
import type { IndicatorsType } from '@/types/interfaces/indicatorsInterfaces'
import GFileUpload from '@/components/GFileUpload/GFileUpload.vue'

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
  close: {
    type: Function as PropType<() => void>,
    required: true,
  },
})
const selectedIndicator = ref<IndicatorsType | null>(null)
const uploadedFile = ref<File | null>(null)

const optionsImportIndicators = computed(() =>
  Object.values(indicators).map((indicator) => ({
    label: indicator.title,
    value: indicator.value,
    iconName: indicator.iconName,
    disabled: indicator.disabledImport,
  })),
)
function handleChangeIndicator(item: GSelectItem) {
  if (item) {
    const findIndicator = Object.values(indicators).find(
      (indicator) => indicator.value === item.value,
    )
    if (findIndicator) {
      selectedIndicator.value = findIndicator
    }
  }
}
function handleFileUpload(file: File | null) {
  if (file) {
    uploadedFile.value = file
  }
}
</script>

<template>
  <Dialog
    :visible="props.isModalVisible"
    :show-header="false"
    modal
    :header="$t('interface.importData')"
    :style="{ width: '25rem', backgroundColor: palette.dark, border: 0 }"
  >
    <div class="flex flex-col justify-start space-y-4 p-4">
      <GSelect
        :options="optionsImportIndicators"
        :placeholder="$t('interface.selectIndicators')"
        :handleChange="handleChangeIndicator"
      />
      <div v-if="selectedIndicator?.value">
        <GFileUpload :handleUploadFile="(file: File | null) => handleFileUpload(file)" />
      </div>
    </div>
    <div class="flex justify-end space-x-2">
      <GButton :title="$t('interface.import')" :disabled="!uploadedFile" :click="props.close" />
      <GButton :title="$t('interface.close')" :click="props.close" />
    </div>
  </Dialog>
</template>
