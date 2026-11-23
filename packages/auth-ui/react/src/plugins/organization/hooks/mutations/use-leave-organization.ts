import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type LeaveOrganizationOptions,
  type OrganizationAuthClient,
  leaveOrganizationOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * React mutation hook for leaving organizations.
 *
 * @param authClient - The Better Auth client.
 * @param options - Mutation options merged with the core mutation options.
 * @param queryClient - Optional React Query client override.
 */
export const useLeaveOrganization = <
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: LeaveOrganizationOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  return useMutation(
    {
      ...leaveOrganizationOptions(authClient, userId),
      ...options
    },
    queryClient
  )
}
