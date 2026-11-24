import { useSelector } from '@tanstack/react-form'
import { useEffect, useState } from 'react'

import { getAuthLinkURL, validateEmailAddress } from '@vezham/auth-ui-core'
import type { EmailOtpAuthClient } from '@vezham/auth-ui-core/plugins/email-otp'
import { emailOtpPlugin } from '@vezham/auth-ui-core/plugins/email-otp'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useSendVerificationOtp,
  useVerifyEmailOtp
} from '@vezham/auth-ui-react/plugins/email-otp'
import {
  Button,
  Card,
  type CardProps,
  Description,
  Input,
  Label,
  Link,
  TextField,
  cn,
  toast
} from '@vezham/react-v3'

import { setAuthFormServerError, useAuthForm } from '../../auth-form'
import {
  RESEND_COOLDOWN_SECONDS,
  useResendCooldown
} from '../../lib/use-resend-cooldown'
import { useSessionStorageValue } from '../../lib/use-session-storage-value'
import { OpenEmailButton } from '../../open-email-button'
import { OtpField } from '../../otp-field'

/** `sessionStorage` key the sign-up and sign-in flows store the pending address under. */
export const VERIFY_EMAIL_STORAGE_KEY = 'vezham.auth.verify-email'

export type VerifyEmailOtpProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Verify an email address with a code instead of a link.
 *
 * Replaces the built-in `<VerifyEmail />` view when the email-OTP plugin runs
 * with `emailVerification: true`. The address comes from session storage when
 * sign-up or sign-in put it there; otherwise the user types it and requests a
 * code. Sign-up already triggered a send, so the resend button starts on
 * cooldown just like the link-based view.
 *
 * @param className - Additional CSS classes applied to the card.
 * @param variant - Card variant.
 */
export const VerifyEmailOtp = ({ className, variant }: VerifyEmailOtpProps) => {
  const {
    authClient,
    basePaths,
    localization,
    navigate,
    redirectTo,
    viewPaths
  } = useAuth<EmailOtpAuthClient>()
  const { localization: emailOtpLocalization, otpLength } =
    useAuthPlugin(emailOtpPlugin)

  const otpClient = authClient
  const storedEmail = useSessionStorageValue(VERIFY_EMAIL_STORAGE_KEY)

  const [submittedEmail, setEmail] = useState<string>()
  const email = submittedEmail ?? storedEmail

  const { cooldown, isCoolingDown, startCooldown } = useResendCooldown()

  // vx-bot/NOTE: Sign-up already sent a code to this address, so restoring it also starts
  // vx-bot/NOTE: the cooldown — otherwise the hydrated render would offer an immediate
  // vx-bot/NOTE: resend and walk straight into the server's rate limit.
  useEffect(() => {
    if (storedEmail) startCooldown(RESEND_COOLDOWN_SECONDS)
  }, [startCooldown, storedEmail])

  const { mutateAsync: sendVerificationOtp, isPending: isSending } =
    useSendVerificationOtp(otpClient, {
      onSuccess: (_data, { email: sentTo }) => {
        sessionStorage.setItem(VERIFY_EMAIL_STORAGE_KEY, sentTo)
        setEmail(sentTo)
        startCooldown()
        toast.success(emailOtpLocalization.codeSent)
      }
    })

  const { mutateAsync: verifyEmailOtp, isPending: isVerifying } =
    useVerifyEmailOtp(otpClient, {
      onError: () => form.setFieldValue('code', ''),
      onSuccess: () => {
        sessionStorage.removeItem(VERIFY_EMAIL_STORAGE_KEY)
        toast.success(emailOtpLocalization.emailVerified)
        navigate({ to: redirectTo })
      }
    })

  const isPending = isSending || isVerifying

  const verifyCode = async (completedCode: string) => {
    if (isPending || !email) return undefined

    return verifyEmailOtp({ email, otp: completedCode })
  }

  const form = useAuthForm({
    defaultValues: { code: '', email: '' },
    onSubmit: async ({ value }) => {
      if (!email) {
        await sendVerificationOtp({
          email: value.email,
          type: 'email-verification'
        })
        return
      }

      await verifyCode(value.code)
    }
  })
  const codeComplete = useSelector(
    form.store,
    state => state.values.code.length === otpLength
  )

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.verifyEmail}
        </Card.Title>

        {email && (
          <Card.Description>
            {emailOtpLocalization.codeSentTo.replace('{{email}}', email)}
          </Card.Description>
        )}
      </Card.Header>

      <Card.Content className="gap-4">
        <form.AppForm>
          <form.AuthFormRoot className="flex flex-col gap-4">
            {email ? (
              <form.AppField name="code">
                {field => (
                  <OtpField
                    isDisabled={isPending}
                    label={emailOtpLocalization.code}
                    length={otpLength}
                    name={field.name}
                    value={field.state.value}
                    variant={variant}
                    onChange={field.handleChange}
                    onComplete={completedCode =>
                      void verifyCode(completedCode).catch(error =>
                        setAuthFormServerError(
                          form,
                          error,
                          localization.auth.callbackFailedTitle
                        )
                      )
                    }
                  />
                )}
              </form.AppField>
            ) : (
              <form.AppField
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    validateEmailAddress(value, {
                      invalidMessage: localization.auth.invalidEmail,
                      requiredMessage: localization.auth.fieldRequired
                    })
                }}>
                {field => (
                  <TextField
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    isDisabled={isPending}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    validationBehavior="aria">
                    <Label>{localization.auth.email}</Label>

                    <Input
                      placeholder={localization.auth.emailPlaceholder}
                      required
                      variant={
                        variant === 'transparent' ? 'primary' : 'secondary'
                      }
                    />

                    <field.AuthFormFieldError />
                  </TextField>
                )}
              </form.AppField>
            )}

            <form.AuthFormServerError />

            <div className="flex flex-col gap-3">
              <form.AuthFormSubmitButton
                isPending={isPending}
                className="w-full"
                isDisabled={isPending || (Boolean(email) && !codeComplete)}>
                {email
                  ? emailOtpLocalization.verifyCode
                  : emailOtpLocalization.sendCode}
              </form.AuthFormSubmitButton>

              {email && <OpenEmailButton email={email} variant="secondary" />}

              {email && (
                <Button
                  className="w-full"
                  variant="tertiary"
                  isDisabled={isPending || isCoolingDown}
                  onPress={() =>
                    void sendVerificationOtp({
                      email,
                      type: 'email-verification'
                    }).catch(error =>
                      setAuthFormServerError(
                        form,
                        error,
                        localization.auth.callbackFailedTitle
                      )
                    )
                  }>
                  {isCoolingDown
                    ? localization.auth.resendIn.replace(
                        '{{seconds}}',
                        String(cooldown)
                      )
                    : localization.auth.resend}
                </Button>
              )}
            </div>
          </form.AuthFormRoot>
        </form.AppForm>
      </Card.Content>

      <Card.Footer className="flex-col gap-3">
        <Description className="text-sm">
          {localization.auth.alreadyVerifiedYourEmail}{' '}
          <Link
            href={getAuthLinkURL(
              `${basePaths.auth}/${viewPaths.auth.signIn}`,
              redirectTo
            )}
            className="text-accent decoration-accent-hover no-underline hover:underline">
            {localization.auth.signIn}
          </Link>
        </Description>
      </Card.Footer>
    </Card>
  )
}
