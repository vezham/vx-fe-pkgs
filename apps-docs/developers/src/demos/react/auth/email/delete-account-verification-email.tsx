// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const DeleteAccountVerificationEmailDemo = () => (
  <EmailPreview title="Delete Account Verification Preview">
    <AuthEmail.DeleteAccountVerification
      url="https://example.com/api/auth/delete-user/callback?token=example-token"
      appName="Vezham"
      email="user@example.com"
      expirationHours={24}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
