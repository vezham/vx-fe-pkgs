import type { twoFactorClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type TwoFactorAuthClient = AuthClient<{
  plugins: [ReturnType<typeof twoFactorClient>]
}>
