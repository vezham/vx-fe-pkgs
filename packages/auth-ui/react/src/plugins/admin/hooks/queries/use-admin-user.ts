import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type AdminAuthClient,
  type AdminUserResponse,
  adminUserOptions
} from '@vezham/auth-ui-core/plugins/admin'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseAdminUserOptions = Omit<
  UseQueryOptions<AdminUserResponse>,
  'queryKey'
>

/** Subscribe to the user currently selected in an Admin inspector. */
export const useAdminUser = (
  authClient: AdminAuthClient,
  targetUserId?: string,
  options?: UseAdminUserOptions,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)

  return useQuery(
    {
      ...adminUserOptions(authClient, session?.user.id, targetUserId),
      ...options
    },
    queryClient
  )
}
