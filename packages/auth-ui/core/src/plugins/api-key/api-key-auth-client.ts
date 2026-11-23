import type { ApiKeyClientPlugin } from '@vezham/auth-api-key/client'

import type { AuthClient } from '../../lib/auth-client'

export type ApiKeyAuthClient = AuthClient<{
  plugins: [ApiKeyClientPlugin]
}>
