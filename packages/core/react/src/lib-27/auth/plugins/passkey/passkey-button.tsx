import { useIsMutating, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import {
  type AuthView,
  authMutationKeys,
  authQueryKeys
} from '@vezham/auth-ui-core'
import type { PasskeyAuthClient } from '@vezham/auth-ui-core/plugins/passkey'
import { passkeyPlugin } from '@vezham/auth-ui-core/plugins/passkey'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  usePasskeyAutoFill,
  useSignInPasskey
} from '@vezham/auth-ui-react/plugins/passkey'
import { Scanner as Fingerprint } from '@vezham/icons-react'
import { Button, Spinner } from '@vezham/react-v3'

export type PasskeyButtonProps = {
  autoFill?: boolean
  /** @remarks `AuthView` */
  view?: AuthView
}

export const PasskeyButton = ({
  autoFill = true,
  view
}: PasskeyButtonProps) => {
  const { authClient, localization, redirectTo, navigate } =
    useAuth<PasskeyAuthClient>()
  const { localization: passkeyLocalization } = useAuthPlugin(passkeyPlugin)
  const queryClient = useQueryClient()

  const handleSuccess = useCallback(async () => {
    await queryClient.invalidateQueries(
      { queryKey: authQueryKeys.session },
      { cancelRefetch: false }
    )
    navigate({ to: redirectTo })
  }, [navigate, queryClient, redirectTo])
  const fetchOptions = useMemo(
    () => ({ onSuccess: handleSuccess }),
    [handleSuccess]
  )

  const { mutate: signInPasskey, isPending: passkeyPending } =
    useSignInPasskey(authClient)

  // vx-bot/NOTE: Surface passkeys in the browser's autofill dropdown on every view where
  // vx-bot/NOTE: this button is shown.
  usePasskeyAutoFill(authClient, {
    enabled: autoFill && view !== 'signUp',
    fetchOptions
  })

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  // vx-bot/NOTE: Passkey sign-in isn't relevant on the sign-up flow.
  if (view === 'signUp') return null

  return (
    <Button
      className="w-full"
      variant="tertiary"
      isDisabled={isPending}
      isPending={passkeyPending}
      onPress={() => signInPasskey({ autoFill: false, fetchOptions })}>
      {passkeyPending ? (
        <Spinner color="current" size="sm" />
      ) : (
        <Fingerprint size={16} />
      )}
      {localization.auth.continueWith.replace(
        '{{provider}}',
        passkeyLocalization.passkey
      )}
    </Button>
  )
}
