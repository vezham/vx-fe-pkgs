// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { AuthEmail } from '@vezham/react/auth/email'

import { EmailPreview } from '../email-preview'

export const NewDeviceEmailDemo = () => (
  <EmailPreview title="New Device Email Preview">
    <AuthEmail.NewDevice
      userEmail="user@example.com"
      deviceInfo={{
        browser: 'Chrome 120.0',
        os: 'macOS 14.2',
        location: 'San Francisco, CA',
        ipAddress: '192.168.1.1',
        timestamp: 'January 15, 2024 at 3:30 PM'
      }}
      appName="Vezham"
      supportEmail="support@example.com"
      secureAccountLink="https://example.com/secure-account"
      darkMode={true}
      poweredBy={true}
    />
  </EmailPreview>
)
