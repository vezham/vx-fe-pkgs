import { createLazyFileRoute } from '@tanstack/react-router'

import ClassReportsPage from '@pages/reports/class'

export const Route = createLazyFileRoute('/reports/class/')({
  component: ClassReportsPage
})
