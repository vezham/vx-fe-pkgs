// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const MagicLinkEmailDemo = () => (
  <EmailPreview title="Magic Link Email Preview">
    <AuthEmail.MagicLink
      url="https://example.com/auth/verify?token=example-token"
      appName="Vezham"
      email="user@example.com"
      expirationMinutes={5}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
