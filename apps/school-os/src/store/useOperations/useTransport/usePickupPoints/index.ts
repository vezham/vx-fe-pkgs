import { useQuery } from '@tanstack/react-query'

import { PickupPoints } from './action'
import { pickupPointsConfig, pickupPointsData } from './data'
import type { RQPickupPoints } from './types'

export * from './data'
export * from './types'

const CK_PICKUP_POINTS = 'pickup-points'

const useList = (rq: RQPickupPoints = {}) =>
  useQuery({
    queryKey: [CK_PICKUP_POINTS, rq],
    queryFn: () => PickupPoints.list(rq),
    initialData: pickupPointsData
  })

export const usePickupPoints = { list: useList }

export { pickupPointsConfig }
