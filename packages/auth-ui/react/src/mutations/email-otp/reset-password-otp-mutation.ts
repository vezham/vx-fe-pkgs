import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type ResetPasswordOtpOptions,
  resetPasswordOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useResetPasswordOtp = <TAuthClient extends EmailOtpAuthClient>(
  authClient: TAuthClient,
  options?: ResetPasswordOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...resetPasswordOtpOptions(authClient), ...options },
    queryClient
  )
}
