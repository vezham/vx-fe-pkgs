import { useQuery } from '@tanstack/react-query'

import { ExamResults } from './action'
import { initialRows as examResultsData } from './data'
import type { RQExamResults } from './types'

export * from './data'
export * from './types'

const CK_EXAM_RESULTS = 'exam-results'

const useList = (rq: RQExamResults = {}) =>
  useQuery({
    queryKey: [CK_EXAM_RESULTS, rq],
    queryFn: () => ExamResults.list(rq),
    initialData: examResultsData
  })

export const useExamResults = { list: useList }
