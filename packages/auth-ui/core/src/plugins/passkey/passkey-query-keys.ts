import { authQueryKeys } from '../../lib/auth-query-keys'

/** Query key factory for passkey queries, scoped per user. */
export const passkeyQueryKeys = {
  all: (userId: string | undefined) =>
    [...authQueryKeys.user(userId), 'passkey'] as const,

  lists: (userId: string | undefined) =>
    [...passkeyQueryKeys.all(userId), 'list'] as const,

  list: <TQuery = undefined>(userId: string | undefined, query?: TQuery) =>
    [...passkeyQueryKeys.lists(userId), query ?? null] as const
} as const
