import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type DeletePasskeyOptions,
  type PasskeyAuthClient,
  deletePasskeyOptions
} from '@vezham/auth-ui-core/plugins/passkey'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * Create a mutation for deleting a passkey.
 *
 * On success, `MutationInvalidator` awaits invalidation of the user's
 * passkey list (see `meta.awaits`).
 *
 * @param authClient - The Better Auth client with the passkey plugin.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useDeletePasskey = <TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: DeletePasskeyOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  return useMutation(
    {
      ...deletePasskeyOptions(authClient, userId),
      ...options
    },
    queryClient
  )
}
