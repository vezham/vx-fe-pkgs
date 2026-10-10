import { useQuery } from '@tanstack/react-query'

import { HostelList } from './action'
import { hostelListConfig, hostelListData } from './data'
import type { RQHostelList } from './types'

export * from './data'
export * from './types'

const CK_HOSTEL_LIST = 'hostel-list'

const useList = (rq: RQHostelList = {}) =>
  useQuery({
    queryKey: [CK_HOSTEL_LIST, rq],
    queryFn: () => HostelList.list(rq),
    initialData: hostelListData
  })

export const useHostelList = { list: useList }

export { hostelListConfig }
