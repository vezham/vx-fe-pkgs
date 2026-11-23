import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type UsernamePluginOptions,
  usernamePlugin as coreUsernamePlugin
} from '@vezham/auth-ui-core/plugins/username'

import { SignInUsername } from './sign-in-username'
import { UsernameField } from './username-field'

export const usernamePlugin = createAuthPlugin(
  coreUsernamePlugin.id,
  (options: UsernamePluginOptions = {}) => {
    const core = coreUsernamePlugin(options)

    return {
      ...core,
      // vx-bot/NOTE: Copies keep plugin-owned objects unmutated.
      additionalFields: core.additionalFields?.map(field =>
        field.name === 'username'
          ? {
              ...field,
              render: UsernameField
            }
          : field
      ),
      views: {
        auth: { signIn: SignInUsername }
      }
    }
  }
)
