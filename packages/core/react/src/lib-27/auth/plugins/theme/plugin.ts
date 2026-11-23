import { createAuthPlugin } from '@vezham/auth-ui-core'

import {
  type ThemePluginOptions,
  themePluginBase
} from '../../lib/theme-plugin-base'
import { Appearance } from './appearance'
import { ThemeToggleItem } from './theme-toggle-item'

export type {
  ThemePluginOptions,
  UseThemeHook
} from '../../lib/theme-plugin-base'

export const themePlugin = createAuthPlugin(
  themePluginBase.id,
  (options: ThemePluginOptions) => ({
    ...themePluginBase(options),
    userMenuItems: [ThemeToggleItem],
    accountCards: [Appearance]
  })
)
