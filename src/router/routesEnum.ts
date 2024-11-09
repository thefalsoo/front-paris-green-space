export enum RouteNames {
  HOME = 'home',
  GREEN_SPACES = 'green-spaces',
  USER_PARAMETERS = 'user-parameters',
}

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
