<script setup lang="ts">
import { useRouter } from 'vue-router'
import GButton from '../GButton/GButton.vue'
import { menuItems } from '.'
import { ButtonVariant } from '../GButton'

const router = useRouter()

const handleNavigation = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="w-20 h-full bg-dark flex flex-col space-y-4 items-center pt-4">
    <div v-for="item in menuItems" :key="item.path">
      <GButton
        :click="() => handleNavigation(item.path)"
        :tooltip="item.title"
        :iconName="item.iconName"
        :variant="
          router.currentRoute.value.path === item.path
            ? ButtonVariant.SECONDARY
            : ButtonVariant.CONTRAST
        "
        class="w-full"
      />
    </div>
  </div>
</template>
