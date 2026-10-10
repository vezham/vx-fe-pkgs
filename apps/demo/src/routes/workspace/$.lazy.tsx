import { createLazyFileRoute } from '@tanstack/react-router'

import NavigationDemoContent from '@pages/navigation-demo/content'

export const Route = createLazyFileRoute('/workspace/$')({
  component: NavigationDemoContent
})
