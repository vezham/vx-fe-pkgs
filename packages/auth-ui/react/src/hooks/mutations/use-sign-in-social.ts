import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type SignInSocialOptions,
  signInSocialOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for social sign-in.
 */
export const useSignInSocial = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: SignInSocialOptions<TAuthClient>
) => {
  return useMutation({
    ...signInSocialOptions(authClient),
    ...options
  })
}
