<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouteTitles } from '@/router/router'

const route = useRoute()

const pageTitle = ref('')

watch(
  () => route.name,
  (newRouteName) => {
    pageTitle.value = RouteTitles[newRouteName as keyof typeof RouteTitles] || 'Page inconnue'
  },
  { immediate: true },
)
</script>

<template>
  <header class="bg-dark text-white py-4 px-6 shadow-md h-16">
    <h1 class="text-2xl font-semibold">{{ $t(pageTitle) }}</h1>
  </header>
</template>
