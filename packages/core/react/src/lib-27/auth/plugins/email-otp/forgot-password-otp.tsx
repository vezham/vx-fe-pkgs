import { getAuthLinkURL, validateEmailAddress } from '@vezham/auth-ui-core'
import type { EmailOtpAuthClient } from '@vezham/auth-ui-core/plugins/email-otp'
import { emailOtpPlugin } from '@vezham/auth-ui-core/plugins/email-otp'
import { useAuth, useAuthPlugin, useFetchOptions } from '@vezham/auth-ui-react'
import { useRequestPasswordResetOtp } from '@vezham/auth-ui-react/plugins/email-otp'
import {
  Card,
  type CardProps,
  Description,
  Input,
  Label,
  Link,
  TextField,
  cn
} from '@vezham/react-v3'

import { isAuthFormFieldInvalid, useAuthForm } from '../../auth-form'

/** `sessionStorage` key the reset-code form reads the pending address from. */
export const RESET_PASSWORD_OTP_STORAGE_KEY = 'vezham.auth.reset-password-otp'

export type ForgotPasswordOtpProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Request a password-reset code instead of a reset link.
 *
 * Replaces the built-in `<ForgotPassword />` view when the email-OTP plugin
 * runs with `passwordReset: true`. On success the address is stored and the
 * user continues on `/auth/reset-password`, which asks for the code and the
 * new password — the reset-link-sent view is skipped entirely.
 *
 * @param className - Additional CSS classes applied to the card.
 * @param variant - Card variant.
 */
export const ForgotPasswordOtp = ({
  className,
  variant
}: ForgotPasswordOtpProps) => {
  const {
    authClient,
    basePaths,
    localization,
    navigate,
    plugins,
    redirectTo,
    viewPaths
  } = useAuth<EmailOtpAuthClient>()
  const { localization: emailOtpLocalization } = useAuthPlugin(emailOtpPlugin)

  const { fetchOptions, resetFetchOptions } = useFetchOptions()

  const { mutateAsync: requestPasswordResetOtp, isPending } =
    useRequestPasswordResetOtp(authClient, {
      meta: { errorPresentation: 'inline' },
      onError: () => resetFetchOptions(),
      onSuccess: (_data, { email }) => {
        // vx-bot/NOTE: react-doctor-disable-next-line react-doctor/auth-token-in-web-storage -- This stores only the submitted email to prefill the next screen, not a credential or token.
        sessionStorage.setItem(RESET_PASSWORD_OTP_STORAGE_KEY, email)
        navigate({ to: `${basePaths.auth}/${viewPaths.auth.resetPassword}` })
      }
    })

  const form = useAuthForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) =>
      requestPasswordResetOtp({
        email: value.email,
        fetchOptions
      })
  })

  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.forgotPassword}
        </Card.Title>
      </Card.Header>

      <Card.Content className="gap-4">
        <form.AppForm>
          <form.AuthFormRoot
            className="flex flex-col gap-4"
            serverErrorMessage={localization.errors.generic}>
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
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
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

            <form.AuthFormServerError />

            {Captcha && <div className="flex justify-center">{Captcha}</div>}

            <form.AuthFormSubmitButton
              isPending={isPending}
              className="w-full"
              isDisabled={isPending}>
              {emailOtpLocalization.sendCode}
            </form.AuthFormSubmitButton>
          </form.AuthFormRoot>
        </form.AppForm>
      </Card.Content>

      <Card.Footer className="flex-col gap-3">
        <Description className="text-sm">
          {localization.auth.rememberYourPassword}{' '}
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
