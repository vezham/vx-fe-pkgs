import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type CreateRoleOptions,
  type DeleteRoleOptions,
  type OrganizationRolesAuthClient,
  type UpdateRoleOptions,
  createRoleOptions,
  deleteRoleOptions,
  updateRoleOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export const useCreateRole = <T extends OrganizationRolesAuthClient>(
  authClient: T,
  organizationId: string | undefined,
  options?: CreateRoleOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    {
      ...createRoleOptions(authClient, data?.user.id, organizationId),
      ...options
    },
    queryClient
  )
}

export const useUpdateRole = <T extends OrganizationRolesAuthClient>(
  authClient: T,
  organizationId: string | undefined,
  options?: UpdateRoleOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    {
      ...updateRoleOptions(authClient, data?.user.id, organizationId),
      ...options
    },
    queryClient
  )
}

export const useDeleteRole = <T extends OrganizationRolesAuthClient>(
  authClient: T,
  organizationId: string | undefined,
  options?: DeleteRoleOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    {
      ...deleteRoleOptions(authClient, data?.user.id, organizationId),
      ...options
    },
    queryClient
  )
}
