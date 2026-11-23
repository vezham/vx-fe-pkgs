import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type ApiKeyAuthClient,
  type UpdateApiKeyOptions,
  updateApiKeyOptions
} from '@vezham/auth-ui-core/plugins/api-key'

import { useSession } from '../../../../hooks/queries/use-session'

export const useUpdateApiKey = <TAuthClient extends ApiKeyAuthClient>(
  authClient: TAuthClient,
  options?: UpdateApiKeyOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...updateApiKeyOptions(authClient, session?.user.id), ...options },
    queryClient
  )
}
