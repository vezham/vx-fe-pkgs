/**
 * Mutation keys contributed by the username plugin.
 *
 * `signIn` is kept under the shared `["auth", "signIn", ...]` namespace so
 * consumers can match the whole sign-in surface with
 * `useIsMutating({ mutationKey: ["auth", "signIn"] })`.
 */
export const usernameMutationKeys = {
  /** Key for `signIn.username`. */
  signIn: ['auth', 'signIn', 'username'] as const,
  /**
   * Key for `isUsernameAvailable`. This is technically a read, but it's
   * exposed via better-auth's mutation surface and lives under the mutation
   * factories for parity with other username flows.
   */
  isUsernameAvailable: ['auth', 'isUsernameAvailable'] as const
} as const
