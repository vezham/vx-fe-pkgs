import { createLazyFileRoute } from '@tanstack/react-router'

import ReactionsPage from '@pages/academic/reasons/[id]'

export const Route = createLazyFileRoute('/academic/reasons/$id/')({
  component: ReactionsPage
})
