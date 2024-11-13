<script setup lang="ts">
import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'
import { Icon } from '@iconify/vue'
import type { PropType } from 'vue'

const props = defineProps({
  name: {
    type: String as PropType<IconNamesMaterial>,
    required: true,
  },
})
</script>

<template>
  <Icon :icon="props.name" />
</template>
