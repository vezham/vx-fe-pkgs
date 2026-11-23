import type { magicLinkClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type MagicLinkAuthClient = AuthClient<{
  plugins: [ReturnType<typeof magicLinkClient>]
}>
