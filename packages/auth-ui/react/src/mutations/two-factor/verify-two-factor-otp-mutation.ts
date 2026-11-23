import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type TwoFactorAuthClient,
  type VerifyTwoFactorOtpOptions,
  verifyTwoFactorOtpOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useVerifyTwoFactorOtp = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: VerifyTwoFactorOtpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...verifyTwoFactorOtpOptions(authClient), ...options },
    queryClient
  )
}
