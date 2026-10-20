import { useQuery } from '@tanstack/react-query'

import { Syllabus } from './action'
import { syllabusData } from './data'
import type { RQSyllabus } from './types'

export * from './data'
export * from './types'

const CK_SYLLABUS = 'syllabus'

const useList = (rq: RQSyllabus = {}) =>
  useQuery({
    queryKey: [CK_SYLLABUS, rq],
    queryFn: () => Syllabus.list(rq),
    initialData: syllabusData
  })

export const useSyllabus = { list: useList }
