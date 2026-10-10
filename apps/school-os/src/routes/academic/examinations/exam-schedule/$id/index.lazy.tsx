import { createLazyFileRoute } from '@tanstack/react-router'

import ExamSchedulePage from '@pages/academic/examinations/exam-schedule/[id]'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-schedule/$id/'
)({
  component: ExamSchedulePage
})
