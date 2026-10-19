import { createLazyFileRoute } from '@tanstack/react-router'

import ExamResultsPage from '@pages/academic/examinations/exam-results/[id]'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-results/$id/'
)({
  component: ExamResultsPage
})
