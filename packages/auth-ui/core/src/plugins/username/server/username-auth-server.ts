import type { Auth } from '@vezham/auth'
import type { UsernamePlugin } from '@vezham/auth/plugins'

export type UsernameAuthServer = Pick<
  Auth<{ plugins: [UsernamePlugin] }>,
  'api'
>
