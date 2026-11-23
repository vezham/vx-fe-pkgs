import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type ChangeEmailOptions,
  changeEmailOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for changing the current user's email address.
 */
export const useChangeEmail = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: ChangeEmailOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const mutationOptions = changeEmailOptions(authClient)

  return useMutation(
    {
      ...mutationOptions,
      ...options,
      meta: { ...mutationOptions.meta, ...options?.meta }
    },
    queryClient
  )
}
