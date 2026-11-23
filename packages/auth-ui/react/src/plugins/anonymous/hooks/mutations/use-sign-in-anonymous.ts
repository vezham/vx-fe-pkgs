import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AnonymousAuthClient,
  type SignInAnonymousOptions,
  signInAnonymousOptions
} from '@vezham/auth-ui-core/plugins/anonymous'

/** Create a mutation for signing in with an anonymous guest account. */
export const useSignInAnonymous = <TAuthClient extends AnonymousAuthClient>(
  authClient: TAuthClient,
  options?: SignInAnonymousOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...signInAnonymousOptions(authClient),
      ...options
    },
    queryClient
  )
}
