import type { deviceAuthorizationClient } from '@vezham/auth/client/plugins'

import type { AuthClient } from '../../lib/auth-client'

export type DeviceAuthorizationAuthClient = AuthClient<{
  plugins: [ReturnType<typeof deviceAuthorizationClient>]
}>
