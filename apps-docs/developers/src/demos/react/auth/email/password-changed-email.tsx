// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const PasswordChangedEmailDemo = () => (
  <EmailPreview title="Password Changed Email Preview">
    <AuthEmail.PasswordChanged
      email="user@example.com"
      timestamp="January 15, 2024 at 3:30 PM"
      appName="Vezham"
      supportEmail="support@example.com"
      secureAccountURL="https://example.com/secure-account"
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
