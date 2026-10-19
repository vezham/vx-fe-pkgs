import type { AppNavigationItem } from '@vx/react'

import { getNavigationChildren } from '@generated/navigation'

export const sidebarItems: AppNavigationItem[] =
  getNavigationChildren('academic')
