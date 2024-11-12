<script setup lang="ts">
import { ref, defineProps, watch, type PropType } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'

export interface SwitchItems {
  label: string
  value: string
  checked: boolean
  color?: string
}

const props = defineProps({
  items: {
    type: Array as PropType<SwitchItems[]>,
    required: true,
  },
  handleChangeSwitchs: {
    type: Function as PropType<(params: SwitchItems[]) => void>,
    required: true,
  },
  showLegend: {
    type: Boolean,
    default: false, // Par défaut, la légende est désactivée
  },
})

const switchs = ref<SwitchItems[]>(props.items)

watch(
  switchs,
  (newVal) => {
    props.handleChangeSwitchs(newVal)
  },
  { deep: true },
)

function toggleSwitch(item: SwitchItems) {
  item.checked = !item.checked
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="options in switchs"
      :key="options.value"
      class="flex items-center space-x-4 cursor-pointer"
    >
      <ToggleSwitch v-model="options.checked" :id="options.value" />
      <div class="flex items-center space-x-4" @click="toggleSwitch(options)">
        <div
          v-if="props.showLegend"
          :style="{ backgroundColor: options.color || '#ccc' }"
          class="w-4 h-4 rounded-full"
        ></div>

        <label
          :for="options.value"
          class="text-lg font-medium text-gray-800 cursor-pointer transition-colors duration-150 hover:text-blue-500 active:scale-95"
        >
          {{ options.label }}
        </label>
      </div>
    </div>
  </div>
</template>
