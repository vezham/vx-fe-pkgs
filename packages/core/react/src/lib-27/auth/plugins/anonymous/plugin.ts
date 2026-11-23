import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type AnonymousPluginOptions,
  anonymousPlugin as coreAnonymousPlugin
} from '@vezham/auth-ui-core/plugins/anonymous'

import { AnonymousButton } from './anonymous-button'

export const anonymousPlugin = createAuthPlugin(
  coreAnonymousPlugin.id,
  (options: AnonymousPluginOptions = {}) => ({
    ...coreAnonymousPlugin(options),
    authButtons: [AnonymousButton]
  })
)
