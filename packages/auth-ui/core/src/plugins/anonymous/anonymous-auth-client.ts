import type { anonymousClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type AnonymousAuthClient = AuthClient<{
  plugins: [ReturnType<typeof anonymousClient>]
}>
