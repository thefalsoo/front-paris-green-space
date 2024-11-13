import { RoutePaths, RouteTitles } from '@/router/router'
import { IconNamesPrime } from '@/types/enums/iconNamesEnums'
import { RouteNames } from '@/types/enums/routes'
import type { MenuItems } from '@/types/interfaces/navigationInterfaces'

export const menuItems: MenuItems[] = [
  {
    titleKey: RouteTitles[RouteNames.HOME],
    path: RoutePaths[RouteNames.HOME],
    iconName: IconNamesPrime.HOME,
  },
  {
    titleKey: RouteTitles[RouteNames.GREEN_SPACES],
    path: RoutePaths[RouteNames.GREEN_SPACES],
    iconName: IconNamesPrime.MAP,
  },
  {
    titleKey: RouteTitles[RouteNames.USER_PARAMETERS],
    path: RoutePaths[RouteNames.USER_PARAMETERS],
    iconName: IconNamesPrime.SETTINGS,
  },
]
