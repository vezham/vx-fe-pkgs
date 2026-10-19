import { createLazyFileRoute } from '@tanstack/react-router'

import ReportsLayoutPage from '@pages/reports/layout'

export const Route = createLazyFileRoute('/reports')({
  component: ReportsLayoutPage
})
