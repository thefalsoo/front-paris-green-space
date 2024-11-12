import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GreenSpaces from '@/views/GreenSpaces/GreenSpacesView.vue'
import UserParameters from '@/views/UserParameters.vue'
import { RouteNames } from '@/types/enums/routes'

export const routesConfig = {
  [RouteNames.HOME]: { path: '/', titleKey: 'navigation.home' },
  [RouteNames.GREEN_SPACES]: { path: '/green-spaces', titleKey: 'navigation.greenSpaces' },
  [RouteNames.USER_PARAMETERS]: { path: '/user-parameters', titleKey: 'navigation.userParameters' },
}

export const RoutePaths: Record<RouteNames, string> = {
  [RouteNames.HOME]: routesConfig[RouteNames.HOME].path,
  [RouteNames.GREEN_SPACES]: routesConfig[RouteNames.GREEN_SPACES].path,
  [RouteNames.USER_PARAMETERS]: routesConfig[RouteNames.USER_PARAMETERS].path,
}

export const RouteTitles: Record<RouteNames, string> = {
  [RouteNames.HOME]: routesConfig[RouteNames.HOME].titleKey,
  [RouteNames.GREEN_SPACES]: routesConfig[RouteNames.GREEN_SPACES].titleKey,
  [RouteNames.USER_PARAMETERS]: routesConfig[RouteNames.USER_PARAMETERS].titleKey,
}

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
