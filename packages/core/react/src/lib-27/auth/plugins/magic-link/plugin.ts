import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type MagicLinkPluginOptions,
  magicLinkPlugin as coreMagicLinkPlugin
} from '@vezham/auth-ui-core/plugins/magic-link'

import { MagicLink } from './magic-link'
import { MagicLinkButton } from './magic-link-button'
import { MagicLinkSent } from './magic-link-sent'

export const magicLinkPlugin = createAuthPlugin(
  coreMagicLinkPlugin.id,
  (options: MagicLinkPluginOptions = {}) => ({
    ...coreMagicLinkPlugin(options),
    authButtons: [MagicLinkButton],
    views: {
      auth: { magicLink: MagicLink, magicLinkSent: MagicLinkSent }
    },
    // vx-bot/NOTE: Conditional, not an override: when `emailAndPassword.enabled === false`
    // vx-bot/NOTE: the `<Auth>` router renders this at `/auth/sign-in` instead of the
    // vx-bot/NOTE: disabled password form. With password auth on, the built-in `SignIn`
    // vx-bot/NOTE: still wins.
    fallbackViews: {
      auth: { signIn: MagicLink }
    }
  })
)
