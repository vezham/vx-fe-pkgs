import { createLazyFileRoute } from '@tanstack/react-router'

import SectionPage from '@pages/academic/section'

export const Route = createLazyFileRoute('/academic/section/')({
  component: SectionPage
})
