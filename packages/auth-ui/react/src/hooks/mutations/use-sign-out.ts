import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type SignOutOptions,
  signOutOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for signing the current user out.
 */
export const useSignOut = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SignOutOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...signOutOptions(authClient),
      ...options
    },
    queryClient
  )
}
