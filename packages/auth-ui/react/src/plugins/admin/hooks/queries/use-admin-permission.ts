import {
  type QueryClient,
  type UseQueryOptions,
  useQuery
} from '@tanstack/react-query'

import {
  type AdminAuthClient,
  type AdminPermission,
  type AdminPermissionResponse,
  adminPermissionOptions
} from '@vezham/auth-ui-core/plugins/admin'

import { useSession } from '../../../../hooks/queries/use-session'

export type UseAdminPermissionOptions = Omit<
  UseQueryOptions<AdminPermissionResponse>,
  'queryKey'
>

/** Check one Admin permission for the acting user. */
export const useAdminPermission = (
  authClient: AdminAuthClient,
  permission: AdminPermission,
  options?: UseAdminPermissionOptions,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)

  return useQuery(
    {
      ...adminPermissionOptions(authClient, session?.user.id, permission),
      ...options
    },
    queryClient
  )
}
