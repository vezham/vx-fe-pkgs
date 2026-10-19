import { useQuery } from '@tanstack/react-query'

import { FeesGroup } from './action'
import { feesGroupConfig, feesGroupData } from './data'
import type { RQFeesGroup } from './types'

export * from './data'
export * from './types'

const CK_FEES_GROUP = 'fees-group'

const useList = (rq: RQFeesGroup = {}) =>
  useQuery({
    queryKey: [CK_FEES_GROUP, rq],
    queryFn: () => FeesGroup.list(rq),
    initialData: feesGroupData
  })

export const useFeesGroup = { list: useList }

export { feesGroupConfig }
