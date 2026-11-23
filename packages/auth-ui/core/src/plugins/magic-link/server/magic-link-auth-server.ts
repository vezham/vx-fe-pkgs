import type { Auth } from '@vezham/auth'
import type { magicLink } from '@vezham/auth/plugins'

export type MagicLinkAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof magicLink>] }>,
  'api'
>
