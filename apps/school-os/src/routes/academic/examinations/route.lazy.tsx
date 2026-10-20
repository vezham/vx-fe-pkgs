import { createLazyFileRoute } from '@tanstack/react-router'

import ExaminationsLayoutPage from '@pages/academic/examinations/layout'

export const Route = createLazyFileRoute('/academic/examinations')({
  component: ExaminationsLayoutPage
})
