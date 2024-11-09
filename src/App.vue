<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RoutePaths, RouteNames } from '@/router/routesEnum' // Assurez-vous que le chemin est correct
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink :to="RoutePaths[RouteNames.HOME]">Home</RouterLink>
        <RouterLink :to="RoutePaths[RouteNames.GREEN_SPACES]">Green Spaces</RouterLink>
        <RouterLink :to="RoutePaths[RouteNames.USER_PARAMETERS]">User Parameters</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
