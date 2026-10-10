import type { AppNavigationItem } from '@vx/react'

import { getNavigationChildren } from '@generated/navigation'

export const operationsSidebarItems: AppNavigationItem[] =
  getNavigationChildren('operations')
