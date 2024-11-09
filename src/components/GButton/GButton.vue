<script setup lang="ts">
import Button from 'primevue/button'
import { IconNames } from '@/icons/IconNames'
import type { PropType } from 'vue'
import type { ButtonVariant } from '.';

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
    type: String as PropType<IconNames>,
    required: false,
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    required: false,
    default: 'contrast',
  },
})
</script>

<template>
  <Button
    :severity="variant"
    :icon="iconName"
    :disabled="disabled"
    @click="props.click"
    :aria-label="title"
  />
</template>

<style scoped></style>
