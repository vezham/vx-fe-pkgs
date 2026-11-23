import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type PasskeyPluginOptions,
  passkeyPlugin as corePasskeyPlugin
} from '@vezham/auth-ui-core/plugins/passkey'

import { PasskeyButton } from './passkey-button'
import { Passkeys } from './passkeys'

export const passkeyPlugin = createAuthPlugin(
  corePasskeyPlugin.id,
  (options: PasskeyPluginOptions = {}) => ({
    ...corePasskeyPlugin(options),
    authButtons: [PasskeyButton],
    securityCards: [Passkeys]
  })
)
