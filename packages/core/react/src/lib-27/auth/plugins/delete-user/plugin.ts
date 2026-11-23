import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type DeleteUserPluginOptions,
  deleteUserPlugin as coreDeleteUserPlugin
} from '@vezham/auth-ui-core/plugins/delete-user'

import { DangerZone } from './danger-zone'

export const deleteUserPlugin = createAuthPlugin(
  coreDeleteUserPlugin.id,
  (options: DeleteUserPluginOptions = {}) => ({
    ...coreDeleteUserPlugin(options),
    securityCards: [DangerZone]
  })
)
