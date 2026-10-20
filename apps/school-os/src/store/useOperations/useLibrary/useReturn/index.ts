import { useQuery } from '@tanstack/react-query'

import { Return } from './action'
import { returnBooksConfig, returnData } from './data'
import type { RQReturn } from './types'

export * from './data'
export * from './types'

const CK_RETURN = 'return'

const useList = (rq: RQReturn = {}) =>
  useQuery({
    queryKey: [CK_RETURN, rq],
    queryFn: () => Return.list(rq),
    initialData: returnData
  })

export const useReturn = { list: useList }

export { returnBooksConfig }
