import { useQuery } from '@tanstack/react-query'

import { ExamAttendances } from './action'
import { initialRows as examAttendanceData } from './data'
import type { RQExamAttendance } from './types'

export * from './data'
export * from './types'

const CK_EXAM_ATTENDANCE = 'exam-attendance'

const useList = (rq: RQExamAttendance = {}) =>
  useQuery({
    queryKey: [CK_EXAM_ATTENDANCE, rq],
    queryFn: () => ExamAttendances.list(rq),
    initialData: examAttendanceData
  })

export const useExamAttendance = { list: useList }
