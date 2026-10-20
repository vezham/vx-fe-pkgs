import { createLazyFileRoute } from '@tanstack/react-router'

import DailyAttendancePage from '@pages/reports/attendance/daily-attendance'

export const Route = createLazyFileRoute(
  '/reports/attendance/daily-attendance/'
)({
  component: DailyAttendancePage
})
