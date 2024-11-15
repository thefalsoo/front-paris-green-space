<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'
import Select from 'primevue/select'
import GIcon from '../GIcon/GIcon.vue'
import type { IconNamesMaterial } from '@/types/enums/iconNamesEnums'

export interface GSelectItem {
  label: string
  value: string
  iconName?: IconNamesMaterial
  disabled?: boolean
}

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  options: {
    type: Array as PropType<GSelectItem[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Sélectionner une option',
  },
  optionLabel: {
    type: String,
    required: false,
    default: 'label',
  },
  handleChange: {
    type: Function as PropType<(params: GSelectItem) => void>,
    required: true,
  },
})

const selectedValue = ref<GSelectItem | null>(null)

function handleChangeSelectValue() {
  if (selectedValue.value) {
    props.handleChange(selectedValue.value)
  } else {
    selectedValue.value = null
  }
}

const filteredOptions = computed(() => {
  return props.options.filter((option) => !option.disabled)
})
</script>

<template>
  <div>
    <Select
      v-model="selectedValue"
      :options="filteredOptions"
      :optionLabel="props.optionLabel"
      :placeholder="props.placeholder"
      :loading="props.loading"
      :disabled="props.loading || props.disabled"
      class="w-full"
      variant="filled"
      size="small"
      @change="handleChangeSelectValue"
    >
      <template #option="options">
        <div
          class="flex items-center"
          :class="options.option.disabled ? 'text-gray-400 cursor-not-allowed' : undefined"
        >
          <div v-if="options.option.iconName" class="mr-2">
            <GIcon
              :name="options.option.iconName"
              :color="options.option.disabled ? 'text-gray-400' : undefined"
            />
          </div>
          <div>{{ options.option.label }}</div>
        </div>
      </template>
    </Select>
  </div>
</template>
