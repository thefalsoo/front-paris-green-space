<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMenu from './components/navigation/NavigationMenu.vue'
import GHeader from './components/GHeader/GHeader.vue'
</script>

<template>
  <div class="flex md:h-screen flex-row bg-black">
    <aside class="bg-gray-800 text-white fixed top-0 left-0 h-full z-10">
      <NavigationMenu />
    </aside>

    <main class="flex-1 flex flex-col">
      <GHeader class="fixed top-0 left-16 w-full z-10" />
      <div class="w-full h-full pt-24 pb-8 pl-32 pr-8">
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
