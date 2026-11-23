import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type UpdateUserOptions,
  updateUserOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for updating the authenticated user's profile.
 *
 * On success, `MutationInvalidator` awaits invalidation of the session
 * query so the updated user fields are reflected (see `meta.awaits`).
 *
 * @param authClient - The Better Auth client.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useUpdateUser = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: UpdateUserOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...updateUserOptions(authClient),
      ...options
    },
    queryClient
  )
}
