import { createLazyFileRoute } from '@tanstack/react-router'

import StudentReportsPage from '@pages/reports/student'

export const Route = createLazyFileRoute('/reports/student/')({
  component: StudentReportsPage
})
