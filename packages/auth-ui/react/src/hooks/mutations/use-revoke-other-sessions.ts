import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type RevokeOtherSessionsOptions,
  revokeOtherSessionsOptions
} from '@vezham/auth-ui-core'

import { useSession } from '../queries/use-session'

/** Create a mutation for revoking every session except the current one. */
export const useRevokeOtherSessions = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: RevokeOtherSessionsOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)

  return useMutation(
    {
      ...revokeOtherSessionsOptions(authClient, session?.user.id),
      ...options
    },
    queryClient
  )
}
