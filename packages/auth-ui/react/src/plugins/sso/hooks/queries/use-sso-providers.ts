import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type SsoAuthClient,
  type SsoProviderResponse,
  type SsoProvidersResponse,
  ssoProviderOptions,
  ssoProvidersOptions
} from '@vezham/auth-ui-core/plugins/sso'

import { useSession } from '../../../../hooks/queries/use-session'

type SsoProvidersQueryOptions = Omit<
  UseQueryOptions<SsoProvidersResponse>,
  'queryKey'
>
type SsoProviderQueryOptions = Omit<
  UseQueryOptions<SsoProviderResponse>,
  'queryKey'
>

export const useSsoProviders = (
  authClient: SsoAuthClient,
  options: SsoProvidersQueryOptions = {},
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  return useQuery(
    {
      ...ssoProvidersOptions(authClient, session?.user.id),
      ...options
    },
    queryClient
  )
}

export const useSsoProvider = (
  authClient: SsoAuthClient,
  providerId: string | undefined,
  options: SsoProviderQueryOptions = {},
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  return useQuery(
    {
      ...ssoProviderOptions(authClient, session?.user.id, providerId),
      ...options
    },
    queryClient
  )
}
