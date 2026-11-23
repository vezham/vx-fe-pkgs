import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type ResetPasswordOptions,
  resetPasswordOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for completing a password reset.
 */
export const useResetPassword = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: ResetPasswordOptions<TAuthClient>
) => {
  return useMutation({
    ...resetPasswordOptions(authClient),
    ...options
  })
}
