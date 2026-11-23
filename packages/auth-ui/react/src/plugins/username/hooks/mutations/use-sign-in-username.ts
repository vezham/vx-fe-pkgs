import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type SignInUsernameOptions,
  type UsernameAuthClient,
  signInUsernameOptions
} from '@vezham/auth-ui-core/plugins/username'

/**
 * Create a mutation for username/password sign-in.
 *
 * On success, `MutationInvalidator` awaits invalidation of the session
 * query so the new session is refetched (see `meta.awaits`).
 *
 * @param authClient - The Better Auth client with the username plugin.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useSignInUsername = <TAuthClient extends UsernameAuthClient>(
  authClient: TAuthClient,
  options?: SignInUsernameOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const mutationOptions = signInUsernameOptions(authClient)

  return useMutation(
    {
      ...mutationOptions,
      ...options,
      meta: { ...mutationOptions.meta, ...options?.meta }
    },
    queryClient
  )
}
