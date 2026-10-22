import {
  type AnyRoute,
  createRouter as createTanstackRouter
} from '@tanstack/react-router'

import { ErrorPage, Loading } from '@vezham/template/components'

import { DefaultNotFound } from './root'

export const createRouter: typeof createTanstackRouter = options => {
  const notFoundComponent = options.defaultNotFoundComponent ?? DefaultNotFound
  const configureRoute = (route: AnyRoute) => {
    // vx-bot/NOTE: Resolve missing pages below the root so the application shell stays mounted.
    if (route !== options.routeTree && !route.options.notFoundComponent) {
      route.update({ notFoundComponent })
    }
    route.children?.forEach(configureRoute)
  }
  if (options.routeTree) configureRoute(options.routeTree)
  return createTanstackRouter({
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPendingComponent: Loading,
    defaultErrorComponent: ErrorPage,
    defaultNotFoundComponent: notFoundComponent,
    ...options
  })
}
