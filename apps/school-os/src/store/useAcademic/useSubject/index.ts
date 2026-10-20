import { useQuery } from '@tanstack/react-query'

import { Subjects } from './action'
import { subjectData } from './data'
import type { RQSubject } from './types'

export * from './data'
export * from './types'

const CK_SUBJECT = 'subject'

const useList = (rq: RQSubject = {}) =>
  useQuery({
    queryKey: [CK_SUBJECT, rq],
    queryFn: () => Subjects.list(rq),
    initialData: subjectData
  })

export const useSubject = { list: useList }
