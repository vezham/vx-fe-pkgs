import { createAuthPlugin } from '@vezham/auth-ui-core'
import {
  type EmailOtpPluginOptions,
  emailOtpPlugin as coreEmailOtpPlugin
} from '@vezham/auth-ui-core/plugins/email-otp'

import { ChangeEmailOtp } from './change-email-otp'
import { EmailOtp } from './email-otp'
import { EmailOtpButton } from './email-otp-button'
import { ForgotPasswordOtp } from './forgot-password-otp'
import { ResetPasswordOtp } from './reset-password-otp'
import { VerifyEmailOtp } from './verify-email-otp'

export const emailOtpPlugin = createAuthPlugin(
  coreEmailOtpPlugin.id,
  (options: EmailOtpPluginOptions = {}) => {
    const plugin = coreEmailOtpPlugin(options)

    return {
      ...plugin,
      authButtons: plugin.signIn ? [EmailOtpButton] : [],
      // vx-bot/NOTE: Each flow is opt-in because it replaces a link-based view outright.
      // vx-bot/NOTE: Turning one on without the matching server option would leave the
      // vx-bot/NOTE: user waiting for a code that never arrives.
      views: {
        auth: {
          ...(plugin.signIn && { emailOtp: EmailOtp }),
          ...(plugin.emailVerification && { verifyEmail: VerifyEmailOtp }),
          ...(plugin.passwordReset && {
            forgotPassword: ForgotPasswordOtp,
            resetPassword: ResetPasswordOtp
          })
        }
      },
      // vx-bot/NOTE: Conditional, not an override: when `emailAndPassword.enabled === false`
      // vx-bot/NOTE: the `<Auth>` router renders this at `/auth/sign-in` instead of the
      // vx-bot/NOTE: disabled password form.
      ...(plugin.signIn && {
        fallbackViews: { auth: { signIn: EmailOtp } }
      }),
      ...(plugin.changeEmail && {
        cardOverrides: { account: { changeEmail: ChangeEmailOtp } }
      })
    }
  }
)
