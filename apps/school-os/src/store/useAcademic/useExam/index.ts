import { useQuery } from '@tanstack/react-query'

import { Exams } from './action'
import { initialRows as examData } from './data'
import type { RQExam } from './types'

export * from './data'
export * from './types'

const CK_EXAM = 'exam'

const useList = (rq: RQExam = {}) =>
  useQuery({
    queryKey: [CK_EXAM, rq],
    queryFn: () => Exams.list(rq),
    initialData: examData
  })

export const useExam = { list: useList }
