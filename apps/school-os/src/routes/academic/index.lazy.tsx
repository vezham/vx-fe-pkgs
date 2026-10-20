import { createLazyFileRoute } from '@tanstack/react-router'

import AcademicDashboardPage from '@pages/academic/dashboard'

export const Route = createLazyFileRoute('/academic/')({
  component: AcademicDashboardPage
})
