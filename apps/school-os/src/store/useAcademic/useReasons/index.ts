import { useQuery } from '@tanstack/react-query'

import { Reasons } from './action'
import { reasonsData } from './data'
import type { RQReasons } from './types'

export * from './data'
export * from './types'

const CK_REASONS = 'reasons'

const useList = (rq: RQReasons = {}) =>
  useQuery({
    queryKey: [CK_REASONS, rq],
    queryFn: () => Reasons.list(rq),
    initialData: reasonsData
  })

export const useReasons = { list: useList }
