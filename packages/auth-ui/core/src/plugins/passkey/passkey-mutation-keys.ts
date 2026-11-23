/**
 * Mutation keys contributed by the passkey plugin.
 *
 * `signIn` is kept under the shared `["auth", "signIn", ...]` namespace so
 * consumers can match user-initiated sign-in attempts with
 * `useIsMutating({ mutationKey: ["auth", "signIn"] })`. Conditional autofill
 * lives outside that namespace because its request intentionally stays pending
 * while the form remains usable.
 */
export const passkeyMutationKeys = {
  /** Key for `signIn.passkey`. */
  signIn: ['auth', 'signIn', 'passkey'] as const,
  /** Key for the non-blocking conditional passkey autofill request. */
  autoFill: ['auth', 'passkey', 'autoFill'] as const,
  /** Key for `passkey.addPasskey`. */
  addPasskey: ['auth', 'passkey', 'addPasskey'] as const,
  /** Key for `passkey.deletePasskey`. */
  deletePasskey: ['auth', 'passkey', 'deletePasskey'] as const,
  /** Key for `passkey.updatePasskey`. */
  updatePasskey: ['auth', 'passkey', 'updatePasskey'] as const
} as const
