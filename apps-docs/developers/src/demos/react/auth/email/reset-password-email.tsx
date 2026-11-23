// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const ResetPasswordEmailDemo = () => (
  <EmailPreview title="Reset Password Email Preview">
    <AuthEmail.ResetPassword
      url="https://example.com/auth/reset-password?token=example-token"
      appName="Vezham"
      email="user@example.com"
      expirationMinutes={60}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
