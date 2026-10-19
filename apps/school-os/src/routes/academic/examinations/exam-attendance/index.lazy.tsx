import { createLazyFileRoute } from '@tanstack/react-router'

import ExamAttendancePage from '@pages/academic/examinations/exam-attendance'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-attendance/'
)({
  component: ExamAttendancePage
})
