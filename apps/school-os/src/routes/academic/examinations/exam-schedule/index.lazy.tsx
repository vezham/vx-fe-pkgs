import { createLazyFileRoute } from '@tanstack/react-router'

import ExamSchedulePage from '@pages/academic/examinations/exam-schedule'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-schedule/'
)({
  component: ExamSchedulePage
})
