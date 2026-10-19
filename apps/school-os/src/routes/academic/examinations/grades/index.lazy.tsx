import { createLazyFileRoute } from '@tanstack/react-router'

import GradesPage from '@pages/academic/examinations/grades'

export const Route = createLazyFileRoute('/academic/examinations/grades/')({
  component: GradesPage
})
