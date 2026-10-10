import { createLazyFileRoute } from '@tanstack/react-router'

import TeacherReportPage from '@pages/reports/attendance/teacher-report'

export const Route = createLazyFileRoute('/reports/attendance/teacher-report/')(
  {
    component: TeacherReportPage
  }
)
