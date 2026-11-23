import { useSelector } from '@tanstack/react-form'
import { useIsMutating } from '@tanstack/react-query'
import { useState } from 'react'

import { authMutationKeys, validateEmailAddress } from '@vezham/auth-ui-core'
import type { EmailOtpAuthClient } from '@vezham/auth-ui-core/plugins/email-otp'
import { emailOtpPlugin } from '@vezham/auth-ui-core/plugins/email-otp'
import { getSsoFallbackEmail } from '@vezham/auth-ui-core/plugins/sso'
import { useAuth, useAuthPlugin, useFetchOptions } from '@vezham/auth-ui-react'
import {
  useSendVerificationOtp,
  useSignInEmailOtp
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
  cn
} from '@vezham/react-v3'

import {
  clearAuthFormServerError,
  isAuthFormFieldInvalid,
  setAuthFormServerError,
  useAuthForm
} from '../../auth-form'
import { FieldSeparator } from '../../field-separator'
import { useResendCooldown } from '../../lib/use-resend-cooldown'
import { useSignInContinuation } from '../../lib/use-sign-in-continuation'
import { OpenEmailButton } from '../../open-email-button'
import { OtpField } from '../../otp-field'
import { ProviderButtons, type SocialLayout } from '../../provider-buttons'
import { ReauthenticationNotice } from '../../reauthentication'

export type EmailOtpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
}

/**
 * Passwordless sign-in with an emailed one-time code.
 *
 * Two steps on one route: enter an email, then enter the code that arrives.
 * The email step never reveals whether an account exists — the server decides
 * whether the code creates an account, mirroring `emailOTP({ disableSignUp })`.
 *
 * @param socialLayout - Provider button layout.
 * @param socialPosition - `"top"` or `"bottom"`. Defaults to `"bottom"`.
 * @param variant - Card variant.
 */
export const EmailOtp = ({
  className,
  socialLayout,
  socialPosition = 'bottom',
  variant
}: EmailOtpProps) => {
  const {
    authClient,
    basePaths,
    emailAndPassword,
    localization,
    plugins,
    socialProviders,
    viewPaths
  } = useAuth<EmailOtpAuthClient>()
  const { localization: emailOtpLocalization, otpLength } =
    useAuthPlugin(emailOtpPlugin)

  const { fetchOptions, resetCaptcha } = useFetchOptions()
  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent
  const otpClient = authClient
  const continueSignIn = useSignInContinuation()
  const { cooldown, isCoolingDown, startCooldown } = useResendCooldown()

  const [codeSent, setCodeSent] = useState(false)

  const { mutateAsync: sendVerificationOtp, isPending: isSending } =
    useSendVerificationOtp(otpClient, {
      onError: () => resetCaptcha(),
      onSuccess: () => {
        resetCaptcha()
        setCodeSent(true)
        startCooldown()
      }
    })

  const { mutateAsync: signInEmailOtp, isPending: isSigningIn } =
    useSignInEmailOtp(otpClient, {
      onError: () => {
        form.setFieldValue('code', '')
        resetCaptcha()
      },
      onSuccess: data => continueSignIn(data)
    })

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0 || isSending

  const sendCode = () => {
    clearAuthFormServerError(form)
    return sendVerificationOtp({
      email: form.state.values.email,
      type: 'sign-in',
      fetchOptions
    })
  }
  const verifyCode = async (completedCode: string) => {
    if (isPending || isSigningIn) return undefined

    return signInEmailOtp({
      email: form.state.values.email,
      otp: completedCode,
      fetchOptions
    })
  }

  const form = useAuthForm({
    defaultValues: { code: '', email: getSsoFallbackEmail() },
    onSubmit: async ({ value }) => {
      if (!codeSent) {
        await sendVerificationOtp({
          email: value.email,
          type: 'sign-in',
          fetchOptions
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
  const email = useSelector(form.store, state => state.values.email)

  const startOver = () => {
    setCodeSent(false)
    form.setFieldValue('code', '')
    clearAuthFormServerError(form)
  }

  const showSeparator = !!socialProviders?.length

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <ReauthenticationNotice />
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.signIn}
        </Card.Title>

        {codeSent && (
          <Card.Description>
            {emailOtpLocalization.codeSentTo.replace('{{email}}', email)}
          </Card.Description>
        )}
      </Card.Header>

      <Card.Content className="gap-4">
        {socialPosition === 'top' && (
          <>
            {!!socialProviders?.length && (
              <ProviderButtons socialLayout={socialLayout} view="emailOtp" />
            )}

            {showSeparator && (
              <FieldSeparator>{localization.auth.or}</FieldSeparator>
            )}
          </>
        )}

        <form.AppForm>
          <form.AuthFormRoot className="flex flex-col gap-4">
            {codeSent ? (
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
            )}

            <form.AuthFormServerError />

            {Captcha && <div className="flex justify-center">{Captcha}</div>}

            <div className="flex flex-col gap-3">
              <form.AuthFormSubmitButton
                isPending={isSending || isSigningIn}
                className="w-full"
                isDisabled={
                  isPending || isSigningIn || (codeSent && !codeComplete)
                }>
                {codeSent
                  ? emailOtpLocalization.verifyCode
                  : emailOtpLocalization.sendCode}
              </form.AuthFormSubmitButton>

              {codeSent ? (
                <div className="flex flex-col gap-3">
                  <OpenEmailButton email={email} variant="secondary" />

                  <Button
                    className="w-full"
                    variant="tertiary"
                    isDisabled={isPending || isSigningIn || isCoolingDown}
                    onPress={() =>
                      void sendCode().catch(error =>
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

                  <Button
                    className="w-full"
                    variant="ghost"
                    isDisabled={isPending || isSigningIn}
                    onPress={startOver}>
                    {emailOtpLocalization.useDifferentEmail}
                  </Button>
                </div>
              ) : (
                plugins.flatMap(plugin =>
                  (plugin.authButtons ?? []).map((AuthButton, index) => (
                    <AuthButton
                      key={`${plugin.id}-${index.toString()}`}
                      view="emailOtp"
                    />
                  ))
                )
              )}
            </div>
          </form.AuthFormRoot>
        </form.AppForm>

        {socialPosition === 'bottom' && !codeSent && (
          <>
            {showSeparator && (
              <FieldSeparator>{localization.auth.or}</FieldSeparator>
            )}

            {!!socialProviders?.length && (
              <ProviderButtons socialLayout={socialLayout} view="emailOtp" />
            )}
          </>
        )}
      </Card.Content>

      {emailAndPassword?.enabled && (
        <Card.Footer className="flex-col gap-3">
          <Description className="text-sm">
            {localization.auth.needToCreateAnAccount}{' '}
            <Link
              href={`${basePaths.auth}/${viewPaths.auth.signUp}`}
              className="text-accent decoration-accent-hover no-underline hover:underline">
              {localization.auth.signUp}
            </Link>
          </Description>
        </Card.Footer>
      )}
    </Card>
  )
}
