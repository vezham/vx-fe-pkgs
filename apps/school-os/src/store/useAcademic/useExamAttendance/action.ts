import { initialRows as examAttendanceData } from './data'
import type { ExamAttendanceResponse, RQExamAttendance } from './types'

const ExamAttendances = {
  list: async (_rq: RQExamAttendance): Promise<ExamAttendanceResponse> => {
    void _rq

    return Promise.resolve(examAttendanceData)
  }
}

export { ExamAttendances }
