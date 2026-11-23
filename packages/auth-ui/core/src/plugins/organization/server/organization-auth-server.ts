import type { Auth } from '@vezham/auth'
import type { organization } from '@vezham/auth/plugins'

export type OrganizationAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof organization>] }>,
  'api'
>
