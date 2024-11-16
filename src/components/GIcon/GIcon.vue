<script setup lang="ts">
import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import { Icon } from '@iconify/vue'
import type { PropType } from 'vue'

const props = defineProps({
  name: {
    type: String as PropType<IconNamesMaterial>,
    required: true,
  },
  size: {
    type: String,
    default: '24',
  },
  color: {
    type: String,
    default: 'black',
  },
})
</script>

<template>
  <Icon
    :icon="props.name"
    :width="props.size"
    :height="props.size"
    :style="{ color: props.color }"
  />
</template>
