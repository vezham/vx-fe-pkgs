import { useIsMutating } from '@tanstack/react-query'

import { authMutationKeys } from '@vezham/auth-ui-core'
import type { AnonymousAuthClient } from '@vezham/auth-ui-core/plugins/anonymous'
import { anonymousPlugin } from '@vezham/auth-ui-core/plugins/anonymous'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useSignInAnonymous } from '@vezham/auth-ui-react/plugins/anonymous'
import { User as Person } from '@vezham/icons-react'
import { Button, Spinner } from '@vezham/react-v3'

/** Sign in with a temporary anonymous account. */
export const AnonymousButton = () => {
  const { authClient, navigate, redirectTo } = useAuth<AnonymousAuthClient>()
  const { localization } = useAuthPlugin(anonymousPlugin)
  const { mutate: signInAnonymous, isPending: anonymousPending } =
    useSignInAnonymous(authClient, {
      onSuccess: () => navigate({ to: redirectTo })
    })

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  return (
    <Button
      className="w-full"
      variant="tertiary"
      isDisabled={isPending}
      isPending={anonymousPending}
      onPress={() => signInAnonymous()}>
      {anonymousPending ? (
        <Spinner color="current" size="sm" />
      ) : (
        <Person size={16} />
      )}
      {localization.continueAsGuest}
    </Button>
  )
}
