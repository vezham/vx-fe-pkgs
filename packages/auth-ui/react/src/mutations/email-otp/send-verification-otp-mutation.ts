import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type SendVerificationOtpOptions,
  sendVerificationOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useSendVerificationOtp = <TAuthClient extends EmailOtpAuthClient>(
  authClient: TAuthClient,
  options?: SendVerificationOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...sendVerificationOtpOptions(authClient), ...options },
    queryClient
  )
}
