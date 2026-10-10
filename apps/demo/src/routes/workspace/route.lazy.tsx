import { createLazyFileRoute } from '@tanstack/react-router'

import NavigationDemoLayout from '@pages/navigation-demo'

export const Route = createLazyFileRoute('/workspace')({
  component: () => <NavigationDemoLayout menuKey="workspace" />
})
