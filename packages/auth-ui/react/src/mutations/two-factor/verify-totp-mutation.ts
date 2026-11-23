import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type TwoFactorAuthClient,
  type VerifyTotpOptions,
  verifyTotpOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useVerifyTotp = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: VerifyTotpOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...verifyTotpOptions(authClient), ...options },
    queryClient
  )
}
