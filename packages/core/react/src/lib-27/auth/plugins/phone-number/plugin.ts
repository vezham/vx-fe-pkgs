import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type PhoneNumberPluginOptions,
  phoneNumberPlugin as corePhoneNumberPlugin
} from '@vezham/auth-ui-core/plugins/phone-number'

import { ChangePhoneNumber } from './change-phone-number'
import { ForgotPhoneNumberPassword } from './forgot-phone-number-password'
import { PhoneNumber } from './phone-number'
import { PhoneNumberButton } from './phone-number-button'
import { ResetPhoneNumberPassword } from './reset-phone-number-password'

export const phoneNumberPlugin = createAuthPlugin(
  corePhoneNumberPlugin.id,
  (options: PhoneNumberPluginOptions = {}) => {
    const plugin = corePhoneNumberPlugin(options)
    const hasSignIn = plugin.signIn || plugin.passwordSignIn

    return {
      ...plugin,
      authButtons: hasSignIn ? [PhoneNumberButton] : [],
      views: {
        auth: {
          ...(hasSignIn ? { phoneNumber: PhoneNumber } : {}),
          ...(hasSignIn && plugin.passwordReset
            ? {
                phoneNumberForgotPassword: ForgotPhoneNumberPassword,
                phoneNumberResetPassword: ResetPhoneNumberPassword
              }
            : {})
        }
      },
      ...(hasSignIn && {
        fallbackViews: { auth: { signIn: PhoneNumber } }
      }),
      accountCards: plugin.changePhoneNumber ? [ChangePhoneNumber] : []
    }
  }
)
