import { IconNames } from '@/icons/IconNames'
import { RouteNames, RouteTitles, RoutePaths } from '@/router/routesEnum'

export interface MenuItems {
  title: string
  path: string
  iconName: IconNames
}

export const menuItems: MenuItems[] = [
  {
    title: RouteTitles[RouteNames.HOME],
    path: RoutePaths[RouteNames.HOME],
    iconName: IconNames.HOME,
  },
  {
    title: RouteTitles[RouteNames.GREEN_SPACES],
    path: RoutePaths[RouteNames.GREEN_SPACES],
    iconName: IconNames.MAP,
  },
  {
    title: RouteTitles[RouteNames.USER_PARAMETERS],
    path: RoutePaths[RouteNames.USER_PARAMETERS],
    iconName: IconNames.SETTINGS,
  },
]
