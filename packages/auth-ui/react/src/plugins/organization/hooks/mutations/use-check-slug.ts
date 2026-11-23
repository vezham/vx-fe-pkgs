import { useMutation } from '@tanstack/react-query'

import {
  type CheckSlugOptions,
  type OrganizationAuthClient,
  checkSlugOptions
} from '@vezham/auth-ui-core/plugins/organization'

/**
 * Create a mutation for checking whether an organization slug is available.
 *
 * @param authClient - The Better Auth client with the organization plugin.
 * @param options - React Query options forwarded to `useMutation`.
 */
export const useCheckSlug = <TAuthClient extends OrganizationAuthClient>(
  authClient: TAuthClient,
  options?: CheckSlugOptions<TAuthClient>
) => {
  return useMutation({
    ...checkSlugOptions(authClient),
    ...options
  })
}
