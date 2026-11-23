import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type IsUsernameAvailableOptions,
  type UsernameAuthClient,
  isUsernameAvailableOptions
} from '@vezham/auth-ui-core/plugins/username'

/**
 * Create a mutation for checking whether a username is available.
 *
 * Wraps `authClient.isUsernameAvailable` and forwards React Query mutation
 * options such as `onSuccess`, `onError`, and `retry`.
 *
 * @param authClient - The Better Auth client with the username plugin.
 * @param options - React Query options forwarded to `useMutation`.
 * @param queryClient - Optional React Query client to scope this mutation to.
 */
export const useIsUsernameAvailable = <TAuthClient extends UsernameAuthClient>(
  authClient: TAuthClient,
  options?: IsUsernameAvailableOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...isUsernameAvailableOptions(authClient),
      ...options
    },
    queryClient
  )
}
