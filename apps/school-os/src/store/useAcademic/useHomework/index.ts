import { useQuery } from '@tanstack/react-query'

import { Homeworks } from './action'
import { homeworkData } from './data'
import type { RQHomework } from './types'

export * from './data'
export * from './types'

const CK_HOMEWORK = 'homework'

const useList = (rq: RQHomework = {}) =>
  useQuery({
    queryKey: [CK_HOMEWORK, rq],
    queryFn: () => Homeworks.list(rq),
    initialData: homeworkData
  })

export const useHomework = { list: useList }
