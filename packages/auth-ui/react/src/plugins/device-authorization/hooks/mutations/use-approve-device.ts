import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type ApproveDeviceOptions,
  type DeviceAuthorizationAuthClient,
  approveDeviceOptions
} from '@vezham/auth-ui-core/plugins/device-authorization'

export const useApproveDevice = <
  TAuthClient extends DeviceAuthorizationAuthClient
>(
  authClient: TAuthClient,
  options?: ApproveDeviceOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  return useMutation(
    {
      ...approveDeviceOptions(authClient),
      ...options
    },
    queryClient
  )
}
