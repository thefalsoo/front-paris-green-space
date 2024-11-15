<script setup lang="ts">
import { ref, defineProps, watch, type PropType } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'
import type { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import GIcon from '../GIcon/GIcon.vue'

export interface GSwitchItems {
  label: string
  value: string
  checked: boolean
  color?: string
  iconNames?: IconNamesMaterial
}

const props = defineProps({
  items: {
    type: Array as PropType<GSwitchItems[]>,
    required: true,
  },
  handleChangeSwitchs: {
    type: Function as PropType<(params: GSwitchItems[]) => void>,
    required: true,
  },
  showLegend: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    required: false,
  },
})

const switchs = ref<GSwitchItems[]>(props.items)

watch(
  switchs,
  (newVal) => {
    props.handleChangeSwitchs(newVal)
  },
  { deep: true },
)

function toggleSwitch(item: GSwitchItems) {
  if (!props.loading) {
    item.checked = !item.checked
  }
}
</script>

<template>
  <div
    v-for="options in switchs"
    :key="options.value"
    class="flex items-center space-x-4 max-w-max"
  >
    <div v-if="options.iconNames">
      <GIcon :name="options.iconNames" color="white" />
    </div>

    <div>
      <ToggleSwitch v-model="options.checked" :id="options.value" :disabled="props.loading" />
    </div>

    <div class="flex items-center space-x-4 cursor-pointer" @click="toggleSwitch(options)">
      <div v-if="props.showLegend">
        <div
          :style="{ backgroundColor: options.color || '#ccc' }"
          class="w-4 h-4 rounded-full"
        ></div>
      </div>

      <label
        :for="options.value"
        class="text-md font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
      >
        {{ options.label }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.text-ellipsis {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
