import type { AnyDataTag, DataTag, QueryKey } from '@tanstack/query-core'

// vx-bot/NOTE: A named interface preserves TanStack's symbol brands across emitted package declarations.
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type -- The interface keeps the external symbol properties named in inferred declarations.
export interface AuthQueryDataTag<TData, TError> extends DataTag<
  unknown,
  TData,
  TError
> {}

export type TaggedAuthQueryKey<
  TKey extends QueryKey,
  TData,
  TError
> = TKey extends AnyDataTag ? TKey : TKey & AuthQueryDataTag<TData, TError>

/**
 * Types a Better Auth request that resolves with the response data.
 *
 * Client requests resolve with the data when `fetchOptions.throw` is set, and
 * server API calls always do. TypeScript cannot resolve those result types
 * for a generic client or server, so the caller names the data type.
 *
 * @param request - The pending Better Auth request.
 * @returns The same promise, typed with the response data.
 */
export const authRequestData = <TData>(
  request: Promise<unknown>
): Promise<TData> => {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- generic Better Auth method types cannot be resolved to the data type
  return request as Promise<TData>
}

/**
 * Brands a query key with its data and error types, as TanStack Query's
 * `queryOptions` helper does, so that `getQueryData` infers the data type.
 *
 * @param queryKey - The query key to brand.
 * @returns The same key, typed as a `DataTag`.
 */
export const tagQueryKey = <TData, TError, const TKey extends QueryKey>(
  queryKey: TKey
): TaggedAuthQueryKey<TKey, TData, TError> => {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- DataTag is a type-only brand with no runtime value
  return queryKey as TaggedAuthQueryKey<TKey, TData, TError>
}
