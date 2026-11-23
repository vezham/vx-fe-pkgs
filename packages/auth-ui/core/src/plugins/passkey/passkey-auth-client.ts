import type { passkeyClient } from '@vezham/auth-passkey/client'

import type { AuthClient } from '../../lib/auth-client'

export type PasskeyAuthClient = AuthClient<{
  plugins: [ReturnType<typeof passkeyClient>]
}>
