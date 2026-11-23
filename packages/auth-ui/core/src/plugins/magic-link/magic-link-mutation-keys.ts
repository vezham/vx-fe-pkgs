/**
 * Mutation keys contributed by the magic-link plugin.
 *
 * Kept under the shared `["auth", "signIn", ...]` namespace as the built-in
 * sign-in mutation keys so consumers can match the whole sign-in surface
 * with `useIsMutating({ mutationKey: ["auth", "signIn"] })` regardless of
 * which strategy is in flight.
 *
 * @example
 * ```ts
 * useIsMutating({ mutationKey: magicLinkMutationKeys.signIn })
 * ```
 */
export const magicLinkMutationKeys = {
  /** Key for `signIn.magicLink`. */
  signIn: ['auth', 'signIn', 'magicLink'] as const
} as const
