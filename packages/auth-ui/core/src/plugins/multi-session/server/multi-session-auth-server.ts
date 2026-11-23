import type { Auth } from '@vezham/auth'
import type { multiSession } from '@vezham/auth/plugins'

export type MultiSessionAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof multiSession>] }>,
  'api'
>
