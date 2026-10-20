import { initialRows as examData } from './data'
import type { ExamResponse, RQExam } from './types'

const Exams = {
  list: async (_rq: RQExam): Promise<ExamResponse> => {
    void _rq

    return Promise.resolve(examData)
  }
}

export { Exams }
