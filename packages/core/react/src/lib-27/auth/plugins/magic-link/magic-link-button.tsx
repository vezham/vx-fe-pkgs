import { useIsMutating } from '@tanstack/react-query'

import { type AuthView, authMutationKeys } from '@vezham/auth-ui-core'
import { magicLinkPlugin } from '@vezham/auth-ui-core/plugins/magic-link'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Letter as Envelope, Lock } from '@vezham/icons-react'
import { Link, cn } from '@vezham/react-v3'
import { buttonVariants } from '@vezham/styles-v3'

export type MagicLinkButtonProps = {
  /** @remarks `AuthView` */
  view?: AuthView
}

/**
 * Toggle button between the password sign-in and magic-link routes.
 *
 * @param view - Current auth view. On `"magicLink"` this links back to password sign-in.
 */
export const MagicLinkButton = ({ view }: MagicLinkButtonProps) => {
  const { basePaths, emailAndPassword, viewPaths, localization } = useAuth()
  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  const { localization: magicLinkLocalization, viewPaths: magicLinkViewPaths } =
    useAuthPlugin(magicLinkPlugin)

  const isMagicLinkView = view === 'magicLink'

  // vx-bot/NOTE: On the magic-link view this button switches back to password sign-in.
  // vx-bot/NOTE: With password auth disabled there's nowhere to switch to, so hide it.
  // vx-bot/NOTE: (Other views — e.g. a phone-number plugin's surface — still get a
  // vx-bot/NOTE: "Continue with Magic Link" link.)
  if (isMagicLinkView && !emailAndPassword?.enabled) return null

  return (
    <Link
      href={`${basePaths.auth}/${isMagicLinkView ? viewPaths.auth.signIn : magicLinkViewPaths.auth.magicLink}`}
      isDisabled={isPending}
      className={cn(
        buttonVariants({ variant: 'tertiary' }),
        'w-full gap-2',
        isPending && 'status-disabled'
      )}>
      {isMagicLinkView ? <Lock size={16} /> : <Envelope size={16} />}

      {localization.auth.continueWith.replace(
        '{{provider}}',
        isMagicLinkView
          ? localization.auth.password
          : magicLinkLocalization.magicLink
      )}
    </Link>
  )
}
