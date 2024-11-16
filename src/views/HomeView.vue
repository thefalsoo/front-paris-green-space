<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main>
    <p class="text-white">{{ t('navigation.home') }}</p>
  </main>
</template>
