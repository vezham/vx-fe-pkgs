import { initialRows as examResultsData } from './data'
import type { ExamResultsResponse, RQExamResults } from './types'

const ExamResults = {
  list: async (_rq: RQExamResults): Promise<ExamResultsResponse> => {
    void _rq

    return Promise.resolve(examResultsData)
  }
}

export { ExamResults }
