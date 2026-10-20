import { createLazyFileRoute } from '@tanstack/react-router'

import AcademicLayoutPage from '@pages/academic/layout'

export const Route = createLazyFileRoute('/academic')({
  component: AcademicLayoutPage
})
