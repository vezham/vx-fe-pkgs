import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type DeleteOrganizationOptions,
  type OrganizationAuthClient,
  deleteOrganizationOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

/**
 * React mutation hook for deleting organizations.
 *
 * @param authClient - The Better Auth client.
 * @param options - Mutation options merged with the core mutation options.
 * @param queryClient - Optional React Query client override.
 */
export const useDeleteOrganization = <
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: DeleteOrganizationOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id

  const mutationOptions = deleteOrganizationOptions(authClient, userId)

  return useMutation(
    {
      ...mutationOptions,
      ...options,
      meta: { ...mutationOptions.meta, ...options?.meta }
    },
    queryClient
  )
}
