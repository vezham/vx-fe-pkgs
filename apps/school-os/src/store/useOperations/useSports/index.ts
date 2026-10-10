import { useQuery } from '@tanstack/react-query'

import { Sports } from './action'
import { sportsData } from './data'
import type { RQSports } from './types'

export * from './data'
export * from './types'

const CK_SPORTS = 'sports'

const useList = (rq: RQSports = {}) =>
  useQuery({
    queryKey: [CK_SPORTS, rq],
    queryFn: () => Sports.list(rq),
    initialData: sportsData
  })

export const useSports = { list: useList }
