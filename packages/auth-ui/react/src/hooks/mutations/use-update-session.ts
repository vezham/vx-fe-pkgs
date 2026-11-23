import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type UpdateSessionOptions,
  updateSessionOptions
} from '@vezham/auth-ui-core'

/** Create a mutation for updating additional fields on the current session. */
export const useUpdateSession = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: UpdateSessionOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...updateSessionOptions(authClient),
      ...options
    },
    queryClient
  )
}
