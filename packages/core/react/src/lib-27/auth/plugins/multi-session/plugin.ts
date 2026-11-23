import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type MultiSessionPluginOptions,
  multiSessionPlugin as coreMultiSessionPlugin
} from '@vezham/auth-ui-core/plugins/multi-session'

import { ManageAccounts } from './manage-accounts'
import { SwitchAccountSubmenu } from './switch-account-submenu'

export const multiSessionPlugin = createAuthPlugin(
  coreMultiSessionPlugin.id,
  (options: MultiSessionPluginOptions = {}) => ({
    ...coreMultiSessionPlugin(options),
    accountCards: [ManageAccounts],
    userMenuItems: [SwitchAccountSubmenu]
  })
)
