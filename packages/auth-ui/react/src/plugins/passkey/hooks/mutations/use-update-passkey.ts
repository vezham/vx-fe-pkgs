import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type PasskeyAuthClient,
  type UpdatePasskeyOptions,
  updatePasskeyOptions
} from '@vezham/auth-ui-core/plugins/passkey'

import { useSession } from '../../../../hooks/queries/use-session'

/** Create a mutation for renaming a passkey. */
export const useUpdatePasskey = <TAuthClient extends PasskeyAuthClient>(
  authClient: TAuthClient,
  options?: UpdatePasskeyOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)

  return useMutation(
    {
      ...updatePasskeyOptions(authClient, session?.user.id),
      ...options
    },
    queryClient
  )
}
