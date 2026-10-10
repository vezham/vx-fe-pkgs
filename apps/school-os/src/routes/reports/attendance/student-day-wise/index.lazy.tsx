import { createLazyFileRoute } from '@tanstack/react-router'

import StudentDayWisePage from '@pages/reports/attendance/student-day-wise'

export const Route = createLazyFileRoute(
  '/reports/attendance/student-day-wise/'
)({
  component: StudentDayWisePage
})
