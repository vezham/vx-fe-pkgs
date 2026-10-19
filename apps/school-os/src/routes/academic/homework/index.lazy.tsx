import { createLazyFileRoute } from '@tanstack/react-router'

import HomeWorkPage from '@pages/academic/homework'

export const Route = createLazyFileRoute('/academic/homework/')({
  component: HomeWorkPage
})
