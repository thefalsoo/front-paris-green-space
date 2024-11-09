<script setup lang="ts">
import { useRouter } from 'vue-router'
import GButton from '../GButton/GButton.vue'
import { menuItems } from '.'
import { ButtonSeverity, ButtonVariant } from '../GButton'

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
        :tooltipText="$t(item.titleKey)"
        :iconName="item.iconName"
        :variant="ButtonVariant.RAISED"
        :severity="
          router.currentRoute.value.path === item.path
            ? ButtonSeverity.SECONDARY
            : ButtonSeverity.CONTRAST
        "
        class="w-full"
      />
    </div>
  </div>
</template>
