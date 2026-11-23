import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type TwoFactorPluginOptions,
  twoFactorPlugin as coreTwoFactorPlugin
} from '@vezham/auth-ui-core/plugins/two-factor'

import { TwoFactorChallenge } from './two-factor-challenge'
import { TwoFactorSettings } from './two-factor-settings'

export const twoFactorPlugin = createAuthPlugin(
  coreTwoFactorPlugin.id,
  (options: TwoFactorPluginOptions = {}) => ({
    ...coreTwoFactorPlugin(options),
    securityCards: [TwoFactorSettings],
    views: {
      auth: { twoFactor: TwoFactorChallenge }
    }
  })
)
