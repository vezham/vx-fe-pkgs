import { useQuery } from '@tanstack/react-query'

import { CollectFees } from './action'
import { collectFeesConfig, collectFeesData } from './data'
import type { RQCollectFees } from './types'

export * from './data'
export * from './types'

const CK_COLLECT_FEES = 'collect-fees'

const useList = (rq: RQCollectFees = {}) =>
  useQuery({
    queryKey: [CK_COLLECT_FEES, rq],
    queryFn: () => CollectFees.list(rq),
    initialData: collectFeesData
  })

export const useCollectFees = { list: useList }

export { collectFeesConfig }
