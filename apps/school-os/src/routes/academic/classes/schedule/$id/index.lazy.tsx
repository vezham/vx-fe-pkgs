import { createLazyFileRoute } from '@tanstack/react-router'

import SchedulePage from '@pages/academic/classes/schedule/[id]'

export const Route = createLazyFileRoute('/academic/classes/schedule/$id/')({
  component: SchedulePage
})
