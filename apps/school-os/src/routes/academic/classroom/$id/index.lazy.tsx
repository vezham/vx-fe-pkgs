import { createLazyFileRoute } from '@tanstack/react-router'

import ClassroomPage from '@pages/academic/classroom/[id]'

export const Route = createLazyFileRoute('/academic/classroom/$id/')({
  component: ClassroomPage
})
