import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OrganizationAuthClient,
  type RemoveMemberOptions,
  removeMemberOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * React mutation hook for removing organization members.
 *
 * @param authClient - The Better Auth client.
 * @param options - Mutation options merged with the core mutation options.
 * @param queryClient - Optional React Query client override.
 */
export const useRemoveMember = <TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: RemoveMemberOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  return useMutation(
    {
      ...removeMemberOptions(authClient, userId),
      ...options
    },
    queryClient
  )
}
