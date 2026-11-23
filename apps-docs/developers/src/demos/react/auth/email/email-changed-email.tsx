// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const EmailChangedEmailDemo = () => (
  <EmailPreview title="Email Changed Email Preview">
    <AuthEmail.EmailChanged
      oldEmail="old@example.com"
      newEmail="new@example.com"
      appName="Vezham"
      supportEmail="support@example.com"
      revertURL="https://example.com/revert-email"
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
