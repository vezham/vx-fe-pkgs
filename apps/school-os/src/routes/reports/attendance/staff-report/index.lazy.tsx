import { createLazyFileRoute } from '@tanstack/react-router'

import StaffReportPage from '@pages/reports/attendance/staff-report'

export const Route = createLazyFileRoute('/reports/attendance/staff-report/')({
  component: StaffReportPage
})
