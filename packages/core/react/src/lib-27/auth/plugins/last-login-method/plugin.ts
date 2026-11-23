import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type LastLoginMethodPluginOptions,
  lastLoginMethodPlugin as coreLastLoginMethodPlugin
} from '@vezham/auth-ui-core/plugins/last-login-method'

export const lastLoginMethodPlugin = createAuthPlugin(
  coreLastLoginMethodPlugin.id,
  (options: LastLoginMethodPluginOptions = {}) => ({
    ...coreLastLoginMethodPlugin(options)
  })
)
