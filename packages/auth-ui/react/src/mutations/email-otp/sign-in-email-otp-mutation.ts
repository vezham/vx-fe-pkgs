import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type EmailOtpAuthClient,
  type SignInEmailOtpOptions,
  signInEmailOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useSignInEmailOtp = <TAuthClient extends EmailOtpAuthClient>(
  authClient: TAuthClient,
  options?: SignInEmailOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...signInEmailOtpOptions(authClient), ...options },
    queryClient
  )
}
