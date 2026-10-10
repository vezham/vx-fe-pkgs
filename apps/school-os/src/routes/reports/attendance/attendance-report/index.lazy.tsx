import { createLazyFileRoute } from '@tanstack/react-router'

import AttendanceReportPage from '@pages/reports/attendance/attendance-report'

export const Route = createLazyFileRoute(
  '/reports/attendance/attendance-report/'
)({
  component: AttendanceReportPage
})
