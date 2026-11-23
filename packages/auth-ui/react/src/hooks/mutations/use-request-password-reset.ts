import { useMutation } from '@tanstack/react-query'

import {
  type AuthClient,
  type RequestPasswordResetOptions,
  requestPasswordResetOptions
} from '@vezham/auth-ui-core'

/**
 * Create a mutation for requesting a password reset email.
 */
export const useRequestPasswordReset = <TAuthClient extends AuthClient>(
  authClient: TAuthClient,
  options?: RequestPasswordResetOptions<TAuthClient>
) => {
  return useMutation({
    ...requestPasswordResetOptions(authClient),
    ...options
  })
}
