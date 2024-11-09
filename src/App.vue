<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMenu from './components/navigation/NavigationMenu.vue'
</script>

<template>
  <div class="flex h-screen">
    <aside>
      <NavigationMenu />
    </aside>

    <main class="flex-1 p-6 bg-black">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
