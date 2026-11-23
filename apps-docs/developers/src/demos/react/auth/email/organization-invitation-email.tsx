// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const OrganizationInvitationEmailDemo = () => (
  <EmailPreview title="Organization Invitation Email Preview">
    <AuthEmail.OrganizationInvitation
      url="https://example.com/auth/accept-invitation?invitationId=example"
      email="invitee@example.com"
      inviterName="Jane Doe"
      inviterEmail="jane@example.com"
      organizationName="Acme Inc."
      {...{ role: 'member' }}
      appName="Vezham"
      expirationHours={48}
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
