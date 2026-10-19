import { createLazyFileRoute } from '@tanstack/react-router'

import LeaveReportsPage from '@pages/reports/leave'

export const Route = createLazyFileRoute('/reports/leave/')({
  component: LeaveReportsPage
})
