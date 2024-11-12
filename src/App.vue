<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMenu from './components/navigation/NavigationMenu.vue'
import GHeader from './components/GHeader/GHeader.vue'
</script>

<template>
  <div class="flex h-screen flex-row">
    <!-- Sidebar -->
    <aside class="bg-gray-800 text-white">
      <NavigationMenu />
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col">
      <!-- Fixed Header -->
      <GHeader class="fixed top-0 left-16 w-full z-10" />

      <!-- Content Area below the Header -->
      <div class="flex-1 bg-black pt-24 pb-8 pl-8 pr-8 overflow-hidden">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Box shadow for the header */

/* Main container should take the full height */
main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
