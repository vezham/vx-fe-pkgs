import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OrganizationAuthClient,
  type UpdateMemberRoleOptions,
  updateMemberRoleOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'
import { useActiveOrganization } from '../queries'

/**
 * React mutation hook for updating organization member roles.
 *
 * @param authClient - The Better Auth client.
 * @param options - Mutation options merged with the core mutation options.
 * @param queryClient - Optional React Query client override.
 */
export const useUpdateMemberRole = (
  authClient: OrganizationAuthClient,
  options?: UpdateMemberRoleOptions,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  const { data: activeOrganization } = useActiveOrganization(
    authClient,
    undefined,
    queryClient
  )

  return useMutation(
    {
      ...updateMemberRoleOptions(authClient, userId, activeOrganization?.id),
      ...options
    },
    queryClient
  )
}
