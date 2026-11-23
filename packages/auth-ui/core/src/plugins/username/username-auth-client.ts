import type { usernameClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type UsernameAuthClient = AuthClient<{
  plugins: [ReturnType<typeof usernameClient<{ displayUsername: true }>>]
}>
