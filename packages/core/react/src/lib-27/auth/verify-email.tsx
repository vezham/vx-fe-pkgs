import { useEffect, useState } from 'react'

import { getAuthCallbackURL } from '@vezham/auth-ui-core'
import { useAuth, useSendVerificationEmail } from '@vezham/auth-ui-react'
import {
  Button,
  Card,
  type CardProps,
  Description,
  Link,
  Spinner,
  cn,
  toast
} from '@vezham/react-v3'

import { useSessionStorageValue } from './lib/use-session-storage-value'
import { OpenEmailButton } from './open-email-button'

export type VerifyEmailProps = {
  className?: string
  variant?: CardProps['variant']
}

/** Seconds the resend button stays disabled to prevent spamming the endpoint. */
const RESEND_COOLDOWN_SECONDS = 60

/**
 * Render a card prompting the user to verify their email, with a resend button
 * that is rate-limited by a cooldown timer.
 *
 * The target email is read from `sessionStorage` (set when sign-up or sign-in
 * redirects here); the OpenEmail/Resend controls are only shown when an email
 * is stored. The resend button is disabled while a cooldown is active and shows
 * the remaining seconds.
 *
 * @param className - Additional CSS classes applied to the outer card container
 * @param variant - Variant to apply to the card
 * @returns The verify-email card React element
 */
export const VerifyEmail = ({ className, variant }: VerifyEmailProps) => {
  const {
    authClient,
    basePaths,
    baseURL,
    localization,
    redirectTo,
    viewPaths
  } = useAuth()

  const email = useSessionStorageValue('vezham.auth.verify-email')
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS)

  useEffect(() => {
    if (cooldown <= 0 || !email) return undefined

    const interval = setInterval(() => {
      setCooldown(current => (current > 0 ? current - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [cooldown, email])

  const { mutate: sendVerificationEmail, isPending } = useSendVerificationEmail(
    authClient,
    {
      onSuccess: () => {
        toast.success(localization.auth.verificationEmailSent)
        setCooldown(RESEND_COOLDOWN_SECONDS)
      }
    }
  )

  const isCoolingDown = cooldown > 0

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.verifyEmail}
        </Card.Title>
      </Card.Header>

      <Card.Content className="gap-4">
        <Description className="text-sm">
          {localization.auth.checkYourEmail}
        </Description>

        {email && (
          <div className="flex flex-col gap-3">
            <OpenEmailButton email={email} />

            <Button
              className="w-full"
              variant="tertiary"
              isDisabled={!email || isCoolingDown || isPending}
              isPending={isPending}
              onPress={() =>
                sendVerificationEmail({
                  email,
                  callbackURL: getAuthCallbackURL(baseURL, redirectTo)
                })
              }>
              {isPending && <Spinner color="current" size="sm" />}

              {isCoolingDown
                ? localization.auth.resendIn.replace(
                    '{{seconds}}',
                    String(cooldown)
                  )
                : localization.auth.resend}
            </Button>
          </div>
        )}
      </Card.Content>

      <Card.Footer className="flex-col gap-3">
        <Description className="text-sm">
          {localization.auth.alreadyVerifiedYourEmail}{' '}
          <Link
            href={`${basePaths.auth}/${viewPaths.auth.signIn}`}
            className="text-accent decoration-accent-hover no-underline hover:underline">
            {localization.auth.signIn}
          </Link>
        </Description>
      </Card.Footer>
    </Card>
  )
}
