import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type GetTotpUriOptions,
  type TwoFactorAuthClient,
  getTotpUriOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useGetTotpUri = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: GetTotpUriOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...getTotpUriOptions(authClient), ...options },
    queryClient
  )
}
