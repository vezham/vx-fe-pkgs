import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type RevokeSessionOptions,
  revokeSessionOptions
} from '@vezham/auth-ui-core'

import { useSession } from '../queries/use-session'

/**
 * Create a mutation for revoking a user session.
 */
export const useRevokeSession = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: RevokeSessionOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  return useMutation(
    {
      ...revokeSessionOptions(authClient, userId),
      ...options
    },
    queryClient
  )
}
