import { createLazyFileRoute } from '@tanstack/react-router'

import GradesPage from '@pages/academic/examinations/grades/[id]'

export const Route = createLazyFileRoute('/academic/examinations/grades/$id/')({
  component: GradesPage
})
