import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type SignUpEmailOptions,
  signUpEmailOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for email/password sign-up.
 */
export const useSignUpEmail = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SignUpEmailOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...signUpEmailOptions(authClient),
      ...options
    },
    queryClient
  )
}
