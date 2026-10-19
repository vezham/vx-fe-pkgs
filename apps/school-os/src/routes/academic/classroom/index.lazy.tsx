import { createLazyFileRoute } from '@tanstack/react-router'

import ClassroomPage from '@pages/academic/classroom'

export const Route = createLazyFileRoute('/academic/classroom/')({
  component: ClassroomPage
})
