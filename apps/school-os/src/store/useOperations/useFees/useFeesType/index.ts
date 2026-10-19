import { useQuery } from '@tanstack/react-query'

import { FeesType } from './action'
import { feesTypeConfig, feesTypeData } from './data'
import type { RQFeesType } from './types'

export * from './data'
export * from './types'

const CK_FEES_TYPE = 'fees-type'

const useList = (rq: RQFeesType = {}) =>
  useQuery({
    queryKey: [CK_FEES_TYPE, rq],
    queryFn: () => FeesType.list(rq),
    initialData: feesTypeData
  })

export const useFeesType = { list: useList }

export { feesTypeConfig }
