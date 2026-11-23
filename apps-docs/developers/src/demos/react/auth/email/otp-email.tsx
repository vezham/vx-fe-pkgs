// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const OtpEmailDemo = () => (
  <EmailPreview title="One-Time Password Email Preview">
    <AuthEmail.Otp
      verificationCode="123456"
      email="user@example.com"
      appName="Vezham"
      expirationMinutes={10}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
