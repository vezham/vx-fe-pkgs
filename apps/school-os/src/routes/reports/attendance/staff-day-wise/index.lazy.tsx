import { createLazyFileRoute } from '@tanstack/react-router'

import StaffDayWisePage from '@pages/reports/attendance/staff-day-wise'

export const Route = createLazyFileRoute('/reports/attendance/staff-day-wise/')(
  {
    component: StaffDayWisePage
  }
)
