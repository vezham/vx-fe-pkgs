import type { phoneNumberClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type PhoneNumberAuthClient = AuthClient<{
  plugins: [ReturnType<typeof phoneNumberClient>]
}>
