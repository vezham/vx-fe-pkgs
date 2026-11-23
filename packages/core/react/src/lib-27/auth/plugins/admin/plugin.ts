import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type AdminPluginOptions,
  adminPlugin as coreAdminPlugin
} from '@vezham/auth-ui-core/plugins/admin'

import { StopImpersonating } from './stop-impersonating'

export const adminPlugin = createAuthPlugin(
  coreAdminPlugin.id,
  (options: AdminPluginOptions = {}) => ({
    ...coreAdminPlugin(options),
    userMenuItems: [StopImpersonating]
  })
)
