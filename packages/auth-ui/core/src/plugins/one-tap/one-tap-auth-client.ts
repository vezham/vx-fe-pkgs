import type { oneTapClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type OneTapAuthClient = AuthClient<{
  plugins: [ReturnType<typeof oneTapClient>]
}>
