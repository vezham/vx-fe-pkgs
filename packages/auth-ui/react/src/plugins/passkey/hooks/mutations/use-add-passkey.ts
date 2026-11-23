import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AddPasskeyOptions,
  type PasskeyAuthClient,
  addPasskeyOptions
} from '@vezham/auth-ui-core/plugins/passkey'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * Create a mutation for registering a new passkey.
 *
 * On success, `MutationInvalidator` awaits invalidation of the user's
 * passkey list (see `meta.awaits`).
 *
 * @param authClient - The Better Auth client with the passkey plugin.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useAddPasskey = <TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: AddPasskeyOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  return useMutation(
    {
      ...addPasskeyOptions(authClient, userId),
      ...options
    },
    queryClient
  )
}
