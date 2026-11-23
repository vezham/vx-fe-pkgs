import { useIsMutating } from '@tanstack/react-query'

import {
  type AuthView,
  authMutationKeys,
  getAuthLinkURL
} from '@vezham/auth-ui-core'
import { phoneNumberPlugin } from '@vezham/auth-ui-core/plugins/phone-number'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { Lock, Smartphone } from '@vezham/icons-react'
import { Link, cn } from '@vezham/react-v3'
import { buttonVariants } from '@vezham/styles-v3'

export type PhoneNumberButtonProps = {
  /** Current auth view. */
  view?: AuthView
}

/** Switch between phone-number and password sign-in. */
export const PhoneNumberButton = ({ view }: PhoneNumberButtonProps) => {
  const { basePaths, emailAndPassword, localization, redirectTo, viewPaths } =
    useAuth()
  const { localization: phoneLocalization, viewPaths: phoneNumberViewPaths } =
    useAuthPlugin(phoneNumberPlugin)
  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0
  const isPhoneNumberView = view === 'phoneNumber'

  if (isPhoneNumberView && !emailAndPassword?.enabled) return null

  return (
    <Link
      href={getAuthLinkURL(
        `${basePaths.auth}/${
          isPhoneNumberView
            ? viewPaths.auth.signIn
            : phoneNumberViewPaths.auth.phoneNumber
        }`,
        redirectTo
      )}
      isDisabled={isPending}
      className={cn(
        buttonVariants({ variant: 'tertiary' }),
        'w-full gap-2',
        isPending && 'status-disabled'
      )}>
      {isPhoneNumberView ? <Lock size={16} /> : <Smartphone size={16} />}
      {localization.auth.continueWith.replace(
        '{{provider}}',
        isPhoneNumberView
          ? localization.auth.password
          : phoneLocalization.phoneNumber
      )}
    </Link>
  )
}
