import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GreenSpaces from '@/views/GreenSpaces.vue'
import UserParameters from '@/views/UserParameters.vue'
import { RouteNames, RoutePaths } from './routesEnum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RoutePaths[RouteNames.HOME],
      name: RouteNames.HOME,
      component: HomeView,
    },
    {
      path: RoutePaths[RouteNames.GREEN_SPACES],
      name: RouteNames.GREEN_SPACES,
      component: GreenSpaces,
    },
    {
      path: RoutePaths[RouteNames.USER_PARAMETERS],
      name: RouteNames.USER_PARAMETERS,
      component: UserParameters,
    },
  ],
})

export default router
