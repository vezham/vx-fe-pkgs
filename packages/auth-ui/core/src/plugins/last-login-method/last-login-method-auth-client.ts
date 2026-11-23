import type { lastLoginMethodClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type LastLoginMethodAuthClient = AuthClient<{
  plugins: [ReturnType<typeof lastLoginMethodClient>]
}>
