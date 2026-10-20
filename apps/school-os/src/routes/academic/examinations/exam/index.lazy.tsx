import { createLazyFileRoute } from '@tanstack/react-router'

import ExamPage from '@pages/academic/examinations/exam'

export const Route = createLazyFileRoute('/academic/examinations/exam/')({
  component: ExamPage
})
