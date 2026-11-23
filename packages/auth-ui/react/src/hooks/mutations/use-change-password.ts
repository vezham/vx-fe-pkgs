import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type ChangePasswordOptions,
  changePasswordOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for changing the authenticated user's password.
 */
export const useChangePassword = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: ChangePasswordOptions<TAuthClient>
) => {
  return useMutation({
    ...changePasswordOptions(authClient),
    ...options
  })
}
