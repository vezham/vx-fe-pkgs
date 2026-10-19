import { createLazyFileRoute } from '@tanstack/react-router'

import TeacherDayWisePage from '@pages/reports/attendance/teacher-day-wise'

export const Route = createLazyFileRoute(
  '/reports/attendance/teacher-day-wise/'
)({
  component: TeacherDayWisePage
})
