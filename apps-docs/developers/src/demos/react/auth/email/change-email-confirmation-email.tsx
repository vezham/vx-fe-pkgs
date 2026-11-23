// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const ChangeEmailConfirmationEmailDemo = () => (
  <EmailPreview title="Change Email Confirmation Preview">
    <AuthEmail.ChangeEmailConfirmation
      url="https://example.com/api/auth/change-email/verify?token=example-token"
      appName="Vezham"
      currentEmail="current@example.com"
      newEmail="new@example.com"
      expirationMinutes={60}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
