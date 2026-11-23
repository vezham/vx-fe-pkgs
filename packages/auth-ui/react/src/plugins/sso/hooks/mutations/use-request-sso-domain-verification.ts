import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type RequestSsoDomainVerificationOptions,
  type SsoAuthClient,
  requestSsoDomainVerificationOptions
} from '@vezham/auth-ui-core/plugins/sso'

import { useSession } from '../../../../hooks/queries/use-session'

/** Create a mutation for issuing a fresh SSO domain-verification token. */
export const useRequestSsoDomainVerification = <
  TAuthClient extends SsoAuthClient
>(
  authClient: TAuthClient,
  options?: RequestSsoDomainVerificationOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  return useMutation(
    {
      ...requestSsoDomainVerificationOptions(authClient, session?.user.id),
      ...options
    },
    queryClient
  )
}
