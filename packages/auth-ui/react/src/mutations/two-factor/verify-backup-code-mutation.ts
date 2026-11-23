import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type TwoFactorAuthClient,
  type VerifyBackupCodeOptions,
  verifyBackupCodeOptions
} from '@vezham/auth-ui-core/plugins/two-factor'

export const useVerifyBackupCode = <TAuthClient extends TwoFactorAuthClient>(
  authClient: TAuthClient,
  options?: VerifyBackupCodeOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    { ...verifyBackupCodeOptions(authClient), ...options },
    queryClient
  )
}
