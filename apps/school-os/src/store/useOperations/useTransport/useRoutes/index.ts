import { useQuery } from '@tanstack/react-query'

import { Routes } from './action'
import { routesConfig, routesData } from './data'
import type { RQRoutes } from './types'

export * from './data'
export * from './types'

const CK_ROUTES = 'routes'

const useList = (rq: RQRoutes = {}) =>
  useQuery({
    queryKey: [CK_ROUTES, rq],
    queryFn: () => Routes.list(rq),
    initialData: routesData
  })

export const useRoutes = { list: useList }

export { routesConfig }
