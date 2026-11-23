import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type ChangeEmailOtpOptions,
  type EmailOtpAuthClient,
  changeEmailOtpOptions
} from '@vezham/auth-ui-core/plugins/email-otp'

export const useChangeEmailOtp = <TAuthClient extends EmailOtpAuthClient>(
  authClient: TAuthClient,
  options?: ChangeEmailOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...changeEmailOtpOptions(authClient), ...options },
    queryClient
  )
}
