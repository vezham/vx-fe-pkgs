import { createLazyFileRoute } from '@tanstack/react-router'

import SchedulePage from '@pages/academic/classes/schedule'

export const Route = createLazyFileRoute('/academic/classes/schedule/')({
  component: SchedulePage
})
