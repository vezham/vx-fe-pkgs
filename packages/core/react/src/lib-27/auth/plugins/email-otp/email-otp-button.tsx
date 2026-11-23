import { useIsMutating } from '@tanstack/react-query'

import {
  type AuthView,
  authMutationKeys,
  getAuthLinkURL
} from '@vezham/auth-ui-core'
import { emailOtpPlugin } from '@vezham/auth-ui-core/plugins/email-otp'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Keyboard, Lock } from '@vezham/icons-react'
import { Link, cn } from '@vezham/react-v3'
import { buttonVariants } from '@vezham/styles-v3'

export type EmailOtpButtonProps = {
  /** @remarks `AuthView` */
  view?: AuthView
}

/**
 * Toggle button between password sign-in and the emailed-code route.
 *
 * @param view - Current auth view. On `"emailOtp"` this links back to password sign-in.
 */
export const EmailOtpButton = ({ view }: EmailOtpButtonProps) => {
  const { basePaths, emailAndPassword, localization, redirectTo, viewPaths } =
    useAuth()
  const { localization: emailOtpLocalization, viewPaths: emailOtpViewPaths } =
    useAuthPlugin(emailOtpPlugin)

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  const isEmailOtpView = view === 'emailOtp'

  // vx-bot/NOTE: On the code view this button switches back to password sign-in. With
  // vx-bot/NOTE: password auth disabled there's nowhere to switch to, so hide it.
  if (isEmailOtpView && !emailAndPassword?.enabled) return null

  return (
    <Link
      href={getAuthLinkURL(
        `${basePaths.auth}/${isEmailOtpView ? viewPaths.auth.signIn : emailOtpViewPaths.auth.emailOtp}`,
        redirectTo
      )}
      isDisabled={isPending}
      className={cn(
        buttonVariants({ variant: 'tertiary' }),
        'w-full gap-2',
        isPending && 'status-disabled'
      )}>
      {isEmailOtpView ? <Lock size={16} /> : <Keyboard size={16} />}

      {localization.auth.continueWith.replace(
        '{{provider}}',
        isEmailOtpView
          ? localization.auth.password
          : emailOtpLocalization.emailOtp
      )}
    </Link>
  )
}
