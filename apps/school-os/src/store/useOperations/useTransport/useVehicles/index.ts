import { useQuery } from '@tanstack/react-query'

import { Vehicles } from './action'
import { vehiclesConfig, vehiclesData } from './data'
import type { RQVehicles } from './types'

export * from './data'
export * from './types'

const CK_VEHICLES = 'vehicles'

const useList = (rq: RQVehicles = {}) =>
  useQuery({
    queryKey: [CK_VEHICLES, rq],
    queryFn: () => Vehicles.list(rq),
    initialData: vehiclesData
  })

export const useVehicles = { list: useList }

export { vehiclesConfig }
