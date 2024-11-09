export enum RouteNames {
  HOME = 'home',
  GREEN_SPACES = 'green-spaces',
  USER_PARAMETERS = 'user-parameters',
}

export const routesConfig = {
  [RouteNames.HOME]: { path: '/', title: 'Accueil' },
  [RouteNames.GREEN_SPACES]: { path: '/green-spaces', title: 'Dashboard' },
  [RouteNames.USER_PARAMETERS]: { path: '/user-parameters', title: 'Paramètres utilisateurs' },
}

export const RoutePaths: Record<RouteNames, string> = {
  [RouteNames.HOME]: routesConfig[RouteNames.HOME].path,
  [RouteNames.GREEN_SPACES]: routesConfig[RouteNames.GREEN_SPACES].path,
  [RouteNames.USER_PARAMETERS]: routesConfig[RouteNames.USER_PARAMETERS].path,
}

export const RouteTitles: Record<RouteNames, string> = {
  [RouteNames.HOME]: routesConfig[RouteNames.HOME].title,
  [RouteNames.GREEN_SPACES]: routesConfig[RouteNames.GREEN_SPACES].title,
  [RouteNames.USER_PARAMETERS]: routesConfig[RouteNames.USER_PARAMETERS].title,
}
