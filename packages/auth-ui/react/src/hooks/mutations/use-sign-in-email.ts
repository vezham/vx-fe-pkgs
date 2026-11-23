import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type SignInEmailOptions,
  signInEmailOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for email/password sign-in.
 */
export const useSignInEmail = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SignInEmailOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const mutationOptions = signInEmailOptions(authClient)

  return useMutation(
    {
      ...mutationOptions,
      ...options,
      meta: { ...mutationOptions.meta, ...options?.meta }
    },
    queryClient
  )
}
