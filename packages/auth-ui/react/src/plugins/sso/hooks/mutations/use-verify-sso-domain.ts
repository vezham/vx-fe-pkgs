import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type SsoAuthClient,
  type VerifySsoDomainOptions,
  verifySsoDomainOptions
} from '@vezham/auth-ui-core/plugins/sso'

import { useSession } from '../../../../hooks/queries/use-session'

/** Create a mutation for validating an SSO provider's DNS records. */
export const useVerifySsoDomain = <TAuthClient extends SsoAuthClient>(
  authClient: TAuthClient,
  options?: VerifySsoDomainOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  return useMutation(
    {
      ...verifySsoDomainOptions(authClient, session?.user.id),
      ...options
    },
    queryClient
  )
}
