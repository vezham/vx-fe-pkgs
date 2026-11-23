import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OrganizationTeamsAuthClient,
  type SetActiveTeamOptions,
  setActiveTeamOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'

export const useSetActiveTeam = <
  TAuthClient extends OrganizationTeamsAuthClient = OrganizationTeamsAuthClient
>(
  authClient: TAuthClient,
  options?: SetActiveTeamOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)

  return useMutation(
    { ...setActiveTeamOptions(authClient, session?.user.id), ...options },
    queryClient
  )
}
