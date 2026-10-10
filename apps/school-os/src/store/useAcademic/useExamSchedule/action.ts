import { initialRows as examScheduleData } from './data'
import type { ExamScheduleResponse, RQExamSchedule } from './types'

const ExamSchedules = {
  list: async (_rq: RQExamSchedule): Promise<ExamScheduleResponse> => {
    void _rq

    return Promise.resolve(examScheduleData)
  }
}

export { ExamSchedules }
