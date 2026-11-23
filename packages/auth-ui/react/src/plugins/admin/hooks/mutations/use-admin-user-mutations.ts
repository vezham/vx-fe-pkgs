import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AdminAuthClient,
  banAdminUserOptions,
  createAdminUserOptions,
  impersonateAdminUserOptions,
  removeAdminUserOptions,
  revokeAdminUserSessionOptions,
  revokeAdminUserSessionsOptions,
  setAdminUserPasswordOptions,
  setAdminUserRoleOptions,
  unbanAdminUserOptions,
  updateAdminUserOptions
} from '@vezham/auth-ui-core/plugins/admin'

import { useSession } from '../../../../hooks/queries/use-session'

export const useCreateAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    createAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useUpdateAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    updateAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useSetAdminUserRole = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    setAdminUserRoleOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useSetAdminUserPassword = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const mutation = useMutation(
    setAdminUserPasswordOptions(authClient, () => {
      setTimeout(() => mutation.reset(), 0)
    }),
    queryClient
  )

  return mutation
}

export const useBanAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    banAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useUnbanAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    unbanAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useRevokeAdminUserSession = (
  authClient: AdminAuthClient,
  targetUserId?: string,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    revokeAdminUserSessionOptions(authClient, data?.user.id, targetUserId),
    queryClient
  )
}

export const useRevokeAdminUserSessions = (
  authClient: AdminAuthClient,
  targetUserId?: string,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    revokeAdminUserSessionsOptions(authClient, data?.user.id, targetUserId),
    queryClient
  )
}

export const useImpersonateAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    impersonateAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}

export const useRemoveAdminUser = (
  authClient: AdminAuthClient,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    removeAdminUserOptions(authClient, data?.user.id),
    queryClient
  )
}
