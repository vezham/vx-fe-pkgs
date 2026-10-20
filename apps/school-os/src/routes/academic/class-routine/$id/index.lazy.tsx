import { createLazyFileRoute } from '@tanstack/react-router'

import ClassRoutinePage from '@pages/academic/class-routine/[id]'

export const Route = createLazyFileRoute('/academic/class-routine/$id/')({
  component: ClassRoutinePage
})
