import type { Auth } from '@vezham/auth'
import type { passkey } from '@vezham/auth-passkey'

export type PasskeyAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof passkey>] }>,
  'api'
>
