<script setup lang="ts">
import Button from 'primevue/button'
import type { PropType } from 'vue'
import type { ButtonSeverity } from '../../types/enums/gButtonEnums'
import type { IconNamesPrime } from '@/types/enums/iconNamesEnums'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  click: {
    type: Function as PropType<() => void>,
    required: true,
  },
  tooltipText: {
    type: String,
    required: false,
  },
  iconName: {
    type: String as PropType<IconNamesPrime>,
    required: false,
  },
  severity: {
    type: String as PropType<ButtonSeverity>,
    required: false,
    default: 'contrast',
  },
})
</script>

<template>
  <Button
    :label="props.title"
    v-tooltip.right="{
      value: tooltipText,
    }"
    :severity="severity"
    :icon="iconName"
    :disabled="disabled"
    @click="props.click"
    :aria-label="title"
  />
</template>

<style scoped></style>
