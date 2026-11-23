import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type VerifyEmailOtpOptions,
  verifyEmailOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useVerifyEmailOtp = <TAuthClient extends EmailOtpAuthClient>(
  authClient: TAuthClient,
  options?: VerifyEmailOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...verifyEmailOtpOptions(authClient), ...options },
    queryClient
  )
}
