import { createLazyFileRoute } from '@tanstack/react-router'

import HomeWorkPage from '@pages/academic/homework/[id]'

export const Route = createLazyFileRoute('/academic/homework/$id/')({
  component: HomeWorkPage
})
