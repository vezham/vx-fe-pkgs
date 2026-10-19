import { useQuery } from '@tanstack/react-query'

import { ExamSchedules } from './action'
import { initialRows as examScheduleData } from './data'
import type { RQExamSchedule } from './types'

export * from './data'
export * from './types'

const CK_EXAM_SCHEDULE = 'exam-schedule'

const useList = (rq: RQExamSchedule = {}) =>
  useQuery({
    queryKey: [CK_EXAM_SCHEDULE, rq],
    queryFn: () => ExamSchedules.list(rq),
    initialData: examScheduleData
  })

export const useExamSchedule = { list: useList }
