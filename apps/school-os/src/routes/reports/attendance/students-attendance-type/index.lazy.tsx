import { createLazyFileRoute } from '@tanstack/react-router'

import StudentsAttendanceTypePage from '@pages/reports/attendance/students-attendance-type'

export const Route = createLazyFileRoute(
  '/reports/attendance/students-attendance-type/'
)({
  component: StudentsAttendanceTypePage
})
