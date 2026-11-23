import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type AddTeamMemberOptions,
  type CreateTeamOptions,
  type OrganizationTeamsAuthClient,
  type RemoveTeamMemberOptions,
  type RemoveTeamOptions,
  type UpdateTeamOptions,
  addTeamMemberOptions,
  createTeamOptions,
  removeTeamMemberOptions,
  removeTeamOptions,
  updateTeamOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export const useCreateTeam = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options?: CreateTeamOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...createTeamOptions(authClient, data?.user.id), ...options },
    queryClient
  )
}
export const useUpdateTeam = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options?: UpdateTeamOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...updateTeamOptions(authClient, data?.user.id), ...options },
    queryClient
  )
}
export const useRemoveTeam = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options?: RemoveTeamOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...removeTeamOptions(authClient, data?.user.id), ...options },
    queryClient
  )
}
export const useAddTeamMember = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options?: AddTeamMemberOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...addTeamMemberOptions(authClient, data?.user.id), ...options },
    queryClient
  )
}
export const useRemoveTeamMember = <T extends OrganizationTeamsAuthClient>(
  authClient: T,
  options?: RemoveTeamMemberOptions<T>,
  queryClient?: QueryClient
) => {
  const { data } = useSession(authClient, undefined, queryClient)
  return useMutation(
    { ...removeTeamMemberOptions(authClient, data?.user.id), ...options },
    queryClient
  )
}
