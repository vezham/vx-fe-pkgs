import { createLazyFileRoute } from '@tanstack/react-router'

import SectionPage from '@pages/academic/section/[id]'

export const Route = createLazyFileRoute('/academic/section/$id/')({
  component: SectionPage
})
