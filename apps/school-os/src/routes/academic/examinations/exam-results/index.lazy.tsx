import { createLazyFileRoute } from '@tanstack/react-router'

import ExamResultsPage from '@pages/academic/examinations/exam-results'

export const Route = createLazyFileRoute(
  '/academic/examinations/exam-results/'
)({
  component: ExamResultsPage
})
