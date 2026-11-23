import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type RevokeSessionsOptions,
  revokeSessionsOptions
} from '@vezham/auth-ui-core'

/** Create a mutation for revoking all sessions, including the current one. */
export const useRevokeSessions = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: RevokeSessionsOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...revokeSessionsOptions(authClient),
      ...options
    },
    queryClient
  )
}
