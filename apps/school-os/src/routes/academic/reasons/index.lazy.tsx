import { createLazyFileRoute } from '@tanstack/react-router'

import ReactionsPage from '@pages/academic/reasons'

export const Route = createLazyFileRoute('/academic/reasons/')({
  component: ReactionsPage
})
