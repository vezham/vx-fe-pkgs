import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OrganizationAuthClient,
  type SetActiveOrganizationOptions,
  type SetActiveOrganizationParams,
  organizationQueryKeys,
  setActiveOrganizationOptions
} from '@vezham/auth-ui-core/plugins/organization'

import { useSession } from '../../../../hooks/queries/use-session'
import { useListOrganizations } from '../queries'

type SetActiveOrganizationVariables<
  TAuthClient extends OrganizationAuthClient
> = SetActiveOrganizationParams<TAuthClient> & {
  organizationId?: string | null
  organizationSlug?: string
}

/**
 * React mutation hook for setting the active organization.
 *
 * @param authClient - The Better Auth client.
 * @param options - Mutation options merged with the core mutation options.
 * @param queryClient - Optional React Query client override.
 */
export const useSetActiveOrganization = <
  TAuthClient extends OrganizationAuthClient = OrganizationAuthClient
>(
  authClient: TAuthClient,
  options?: SetActiveOrganizationOptions<TAuthClient>,
  queryClient?: QueryClient
) => {
  const { data: session } = useSession(authClient, undefined, queryClient)
  const userId = session?.user.id
  const { data: organizations } = useListOrganizations(
    authClient,
    undefined,
    queryClient
  )
  const activeOrganizationQueryKey =
    organizationQueryKeys.activeOrganization(userId)

  return useMutation(
    {
      ...setActiveOrganizationOptions(authClient, userId),
      ...options,
      onMutate: async (
        variables: SetActiveOrganizationVariables<TAuthClient>,
        context
      ) => {
        // vx-bot/NOTE: A stored active-organization change does not change entries selected
        // vx-bot/NOTE: by an explicit ID or slug.
        await context.client.cancelQueries({
          queryKey: activeOrganizationQueryKey,
          exact: true
        })

        const previousOrganizations = context.client.getQueriesData({
          queryKey: activeOrganizationQueryKey,
          exact: true
        })

        // vx-bot/NOTE: Optimistically update to the new value
        if (variables?.organizationId === null) {
          context.client.setQueryData(activeOrganizationQueryKey, null)

          return { previousOrganizations }
        }

        const newOrganization = organizations?.find(
          organization =>
            (variables?.organizationId !== undefined &&
              organization.id === variables.organizationId) ||
            (variables?.organizationSlug !== undefined &&
              organization.slug === variables.organizationSlug)
        )

        if (newOrganization) {
          context.client.setQueryData(
            activeOrganizationQueryKey,
            newOrganization
          )
        }

        return { previousOrganizations }
      },
      // vx-bot/NOTE: If the mutation fails,
      // vx-bot/NOTE: use the result returned from onMutate to roll back
      onError: (error, variables, onMutateResult, context) => {
        const previousOrganizations = onMutateResult?.previousOrganizations

        if (previousOrganizations?.length && error.error) {
          for (const [queryKey, data] of previousOrganizations) {
            context.client.setQueryData(queryKey, data)
          }
        }

        return options?.onError?.(error, variables, onMutateResult, context)
      },
      // vx-bot/NOTE: Always refetch the session-selected organization after error or success.
      onSettled: async (data, error, variables, onMutateResult, context) => {
        await context.client.invalidateQueries({
          queryKey: activeOrganizationQueryKey,
          exact: true
        })

        return options?.onSettled?.(
          data,
          error,
          variables,
          onMutateResult,
          context
        )
      }
    },
    queryClient
  )
}
