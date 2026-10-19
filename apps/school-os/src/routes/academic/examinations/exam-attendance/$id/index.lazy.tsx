import { createLazyFileRoute } from '@tanstack/react-router'

import ExamAttendancePage from '@pages/academic/examinations/exam-attendance/[id]'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-attendance/$id/'
)({
  component: ExamAttendancePage
})
