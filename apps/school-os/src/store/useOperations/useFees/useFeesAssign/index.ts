import { useQuery } from '@tanstack/react-query'

import { FeesAssign } from './action'
import { feesAssignConfig, feesAssignData } from './data'
import type { RQFeesAssign } from './types'

export * from './data'
export * from './types'

const CK_FEES_ASSIGN = 'fees-assign'

const useList = (rq: RQFeesAssign = {}) =>
  useQuery({
    queryKey: [CK_FEES_ASSIGN, rq],
    queryFn: () => FeesAssign.list(rq),
    initialData: feesAssignData
  })

export const useFeesAssign = { list: useList }

export { feesAssignConfig }
