import { routesData } from './data'
import type { RQRoutes, RoutesResponse } from './types'

const Routes = {
  list: async (_rq: RQRoutes): Promise<RoutesResponse> => {
    void _rq

    return Promise.resolve(routesData)
  }
}

export { Routes }
