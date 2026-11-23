import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type RequestPasswordResetOtpOptions,
  requestPasswordResetOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useRequestPasswordResetOtp = <
  TAuthClient extends EmailOtpAuthClient
>(
  authClient: TAuthClient,
  options?: RequestPasswordResetOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...requestPasswordResetOtpOptions(authClient), ...options },
    queryClient
  )
}
