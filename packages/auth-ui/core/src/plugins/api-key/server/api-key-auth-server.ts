import type { Auth } from '@vezham/auth'
import type { apiKey } from '@vezham/auth-api-key'

export type ApiKeyAuthServer = Pick<
  Auth<{ plugins: [ReturnType<typeof apiKey>] }>,
  'api'
>
