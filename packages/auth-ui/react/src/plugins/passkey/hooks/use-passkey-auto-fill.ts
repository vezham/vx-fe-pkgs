'use client'

import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import {
  type PasskeyAuthClient,
  type SignInPasskeyOptions,
  isConditionalMediationAvailable,
  isPasskeyAutoFillEnabled,
  passkeyAutoFillOptions
} from '@vezham/auth-ui-core/plugins/passkey'
import type { BetterFetchOption } from '@vezham/auth/client'

import { useAuth } from '../../../components/auth/auth-provider'

export type UsePasskeyAutoFillOptions =
  SignInPasskeyOptions<PasskeyAuthClient> & {
    /**
     * Skip the conditional request on views where passkey sign-in doesn't
     * apply, such as sign-up.
     * @default true
     */
    enabled?: boolean
    /** Fetch callbacks for the passkey verification request. */
    fetchOptions?: BetterFetchOption
  }

/**
 * Offer the user's passkeys through the browser's autofill dropdown (WebAuthn
 * conditional UI) for as long as the calling component is mounted.
 *
 * Does nothing when the passkey plugin isn't registered, when its `autoFill`
 * option is off, or when the browser can't service a conditionally mediated
 * request. Pair it with the `webauthn` autocomplete token on the identifier
 * field. See `withPasskeyAutoFill` in `@vezham/auth-ui-core/plugins/passkey`.
 *
 * The request stays open until the user picks a passkey or the page
 * navigates. The Better Auth passkey client doesn't expose WebAuthn's abort
 * signal, so unmounting only stops a pending availability probe from starting
 * one.
 *
 * @param authClient - The Better Auth client with the passkey plugin.
 * @param options - React Query options forwarded to the sign-in mutation.
 */
export const usePasskeyAutoFill = (
  authClient: PasskeyAuthClient,
  options?: UsePasskeyAutoFillOptions
) => {
  const { plugins } = useAuth()
  const { enabled = true, fetchOptions, ...mutationOptions } = options ?? {}
  const { mutate: signInPasskey } = useMutation({
    ...passkeyAutoFillOptions<PasskeyAuthClient>(authClient),
    ...mutationOptions
  })
  const started = useRef(false)

  const active = enabled && isPasskeyAutoFillEnabled(plugins)

  useEffect(() => {
    if (started.current || !active) return undefined

    let cancelled = false

    void isConditionalMediationAvailable().then(available => {
      if (!available || cancelled) return

      started.current = true
      signInPasskey({ autoFill: true, fetchOptions })
    })

    return () => {
      cancelled = true
    }
  }, [active, fetchOptions, signInPasskey])
}
