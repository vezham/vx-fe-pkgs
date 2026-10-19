import { createLazyFileRoute } from '@tanstack/react-router'

import ExamPage from '@pages/academic/examinations/exam/[id]'

export const Route = createLazyFileRoute('/academic/examinations/exam/$id/')({
  component: ExamPage
})
