import { createLazyFileRoute } from '@tanstack/react-router'

import GradeReportsPage from '@pages/reports/grade'

export const Route = createLazyFileRoute('/reports/grade/')({
  component: GradeReportsPage
})
