import type { emailOTPClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type EmailOtpAuthClient = AuthClient<{
  plugins: [ReturnType<typeof emailOTPClient>]
}>
