import { useQuery } from '@tanstack/react-query'

import { Assign } from './action'
import { assignVehicleConfig, assignVehicleData } from './data'
import type { RQAssign } from './types'

export * from './data'
export * from './types'

const CK_ASSIGN = 'assign'

const useList = (rq: RQAssign = {}) =>
  useQuery({
    queryKey: [CK_ASSIGN, rq],
    queryFn: () => Assign.list(rq),
    initialData: assignVehicleData
  })

export const useAssign = { list: useList }

export { assignVehicleConfig }
