import { createLazyFileRoute } from '@tanstack/react-router'

import ClassRoutinePage from '@pages/academic/class-routine'

export const Route = createLazyFileRoute('/academic/class-routine/')({
  component: ClassRoutinePage
})
