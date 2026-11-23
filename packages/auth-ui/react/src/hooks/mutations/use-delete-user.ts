import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type DeleteUserOptions,
  deleteUserOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for deleting the authenticated user's account.
 *
 * Wraps `authClient.deleteUser` and forwards React Query mutation options
 * such as `onSuccess`, `onError`, and `retry`.
 *
 * @param authClient - The Better Auth client.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useDeleteUser = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: DeleteUserOptions<TAuthClient>
) => {
  return useMutation({
    ...deleteUserOptions(authClient),
    ...options
  })
}
