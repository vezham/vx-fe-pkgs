import { useSelector } from '@tanstack/react-form'
import { type ComponentType, useEffect, useState } from 'react'

import {
  getAuthLinkURL,
  isPasswordCompromisedError,
  validateEmailAddress,
  validateStringLength
} from '@vezham/auth-ui-core'
import type { EmailOtpAuthClient } from '@vezham/auth-ui-core/plugins/email-otp'
import { emailOtpPlugin } from '@vezham/auth-ui-core/plugins/email-otp'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useResetPasswordOtp } from '@vezham/auth-ui-react/plugins/email-otp'
import { Eye, EyeClosed as EyeSlash } from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Description,
  Input,
  InputGroup,
  Label,
  Link,
  TextField,
  cn,
  toast,
  useIsHydrated
} from '@vezham/react-v3'

import {
  isAuthFormFieldInvalid,
  setAuthFormServerError,
  submitAuthForm,
  useAuthForm
} from '../../auth-form'
import { useSessionStorageValue } from '../../lib/use-session-storage-value'
import { OpenEmailButton } from '../../open-email-button'
import { OtpField } from '../../otp-field'
import { PasswordStrengthMeter } from '../../password-strength-meter'
import { RESET_PASSWORD_OTP_STORAGE_KEY } from './forgot-password-otp'

export type ResetPasswordOtpProps = {
  className?: string
  variant?: CardProps['variant']
}

type ResetPasswordField<Value> = {
  AuthFormFieldError: ComponentType
  handleBlur: () => void
  handleChange: (value: Value) => void
  name: string
  state: {
    meta: { isTouched: boolean; isValid: boolean }
    value: Value
  }
}

const PasswordOtpField = ({
  field,
  isDisabled,
  isVisible,
  labels,
  onVisibilityChange,
  variant
}: {
  field: ResetPasswordField<string>
  isDisabled: boolean
  isVisible: boolean
  labels: {
    hidePassword: string
    newPassword: string
    newPasswordPlaceholder: string
    passwordCompromised: string
    showPassword: string
  }
  onVisibilityChange: () => void
  variant: CardProps['variant']
}) => (
  <TextField
    name={field.name}
    autoComplete="new-password"
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={field.handleChange}
    isInvalid={isAuthFormFieldInvalid(field.state.meta)}
    isDisabled={isDisabled}
    validationBehavior="aria">
    <Label>{labels.newPassword}</Label>
    <InputGroup variant={variant === 'transparent' ? 'primary' : 'secondary'}>
      <InputGroup.Input
        placeholder={labels.newPasswordPlaceholder}
        type={isVisible ? 'text' : 'password'}
      />
      <InputGroup.Suffix className="px-0">
        <Button
          isIconOnly
          aria-label={isVisible ? labels.hidePassword : labels.showPassword}
          size="sm"
          variant="ghost"
          onPress={onVisibilityChange}
          isDisabled={isDisabled}>
          {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
    <field.AuthFormFieldError />
    <PasswordStrengthMeter password={field.state.value} />
  </TextField>
)

const ConfirmPasswordOtpField = ({
  field,
  isDisabled,
  isVisible,
  labels,
  onVisibilityChange,
  variant
}: {
  field: ResetPasswordField<string>
  isDisabled: boolean
  isVisible: boolean
  labels: {
    confirmPassword: string
    confirmPasswordPlaceholder: string
    hidePassword: string
    showPassword: string
  }
  onVisibilityChange: () => void
  variant: CardProps['variant']
}) => (
  <TextField
    name={field.name}
    autoComplete="new-password"
    isDisabled={isDisabled}
    isInvalid={isAuthFormFieldInvalid(field.state.meta)}
    validationBehavior="aria"
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={field.handleChange}>
    <Label>{labels.confirmPassword}</Label>
    <InputGroup variant={variant === 'transparent' ? 'primary' : 'secondary'}>
      <InputGroup.Input
        placeholder={labels.confirmPasswordPlaceholder}
        type={isVisible ? 'text' : 'password'}
      />
      <InputGroup.Suffix className="px-0">
        <Button
          isIconOnly
          aria-label={isVisible ? labels.hidePassword : labels.showPassword}
          size="sm"
          variant="ghost"
          onPress={onVisibilityChange}
          isDisabled={isDisabled}>
          {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
    <field.AuthFormFieldError />
  </TextField>
)

const ResetPasswordOtpHeader = ({
  codeSentTo,
  title
}: {
  codeSentTo?: string
  title: string
}) => (
  <Card.Header>
    <Card.Title className="mb-1 text-xl font-semibold">{title}</Card.Title>
    {codeSentTo ? <Card.Description>{codeSentTo}</Card.Description> : null}
  </Card.Header>
)

const ResetPasswordOtpFooter = ({
  href,
  rememberPassword,
  signIn
}: {
  href: string
  rememberPassword: string
  signIn: string
}) => (
  <Card.Footer className="flex-col gap-3">
    <Description className="text-sm">
      {rememberPassword}{' '}
      <Link
        href={href}
        className="text-accent decoration-accent-hover no-underline hover:underline">
        {signIn}
      </Link>
    </Description>
  </Card.Footer>
)

/**
 * Reset a password with an emailed code.
 *
 * Replaces the built-in `<ResetPassword />` view when the email-OTP plugin
 * runs with `passwordReset: true`. There is no token in the URL — the code
 * and the new password are submitted together. The address comes from the
 * forgot-password step, and is asked for again when it isn't there (e.g. the
 * user finishes on another tab).
 *
 * @param className - Additional CSS classes applied to the card.
 * @param variant - Card variant.
 */
const ResetPasswordOtpForm = ({
  className,
  variant
}: ResetPasswordOtpProps) => {
  const {
    authClient,
    basePaths,
    emailAndPassword,
    localization,
    navigate,
    redirectTo,
    viewPaths
  } = useAuth<EmailOtpAuthClient>()
  const { localization: emailOtpLocalization, otpLength } =
    useAuthPlugin(emailOtpPlugin)

  const initialEmail = useSessionStorageValue(RESET_PASSWORD_OTP_STORAGE_KEY)
  const hasStoredEmail = Boolean(initialEmail)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const { mutateAsync: resetPasswordOtp, isPending } = useResetPasswordOtp(
    authClient,
    {
      onError: error => {
        // vx-bot/NOTE: The haveIBeenPwned plugin rejects on the password itself, so
        // vx-bot/NOTE: it belongs against the field rather than in a toast.
        if (isPasswordCompromisedError(error)) {
          setAuthFormServerError(
            form,
            { fields: { password: localization.auth.passwordCompromised } },
            localization.auth.passwordCompromised
          )
        }
        form.setFieldValue('code', '')
      },
      onSuccess: () => {
        sessionStorage.removeItem(RESET_PASSWORD_OTP_STORAGE_KEY)
        toast.success(localization.auth.passwordResetSuccess)
        navigate({ to: `${basePaths.auth}/${viewPaths.auth.signIn}` })
      }
    }
  )

  const validatePassword = (value: string) =>
    validateStringLength(value, {
      maxLength: emailAndPassword?.maxPasswordLength,
      maxLengthMessage: localization.auth.tooLong.replace(
        '{{max}}',
        String(emailAndPassword?.maxPasswordLength)
      ),
      minLength: emailAndPassword?.minPasswordLength,
      minLengthMessage: localization.auth.tooShort.replace(
        '{{min}}',
        String(emailAndPassword?.minPasswordLength)
      ),
      requiredMessage: localization.auth.fieldRequired
    })

  const form = useAuthForm({
    defaultValues: {
      code: '',
      confirmPassword: '',
      email: initialEmail,
      password: ''
    },
    onSubmit: async ({ value }) => {
      await resetPasswordOtp({
        email: value.email,
        otp: value.code,
        password: value.password
      })
    }
  })
  useEffect(() => {
    if (initialEmail) form.setFieldValue('email', initialEmail)
  }, [form, initialEmail])
  const email = useSelector(form.store, state => state.values.email)

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <ResetPasswordOtpHeader
        codeSentTo={
          hasStoredEmail && email
            ? emailOtpLocalization.codeSentTo.replace('{{email}}', email)
            : undefined
        }
        title={localization.auth.resetPassword}
      />

      <Card.Content className="gap-4">
        <form.AppForm>
          <form.AuthFormRoot className="flex flex-col gap-4">
            {!hasStoredEmail && (
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
                    isInvalid={isAuthFormFieldInvalid(field.state.meta)}
                    validationBehavior="aria"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}>
                    <Label>{localization.auth.email}</Label>

                    <Input
                      placeholder={localization.auth.emailPlaceholder}
                      variant={
                        variant === 'transparent' ? 'primary' : 'secondary'
                      }
                    />

                    <field.AuthFormFieldError />
                  </TextField>
                )}
              </form.AppField>
            )}

            <form.AppField
              name="code"
              validators={{
                onChange: ({ value }) =>
                  value.length === otpLength
                    ? undefined
                    : emailOtpLocalization.codeLengthMismatch.replace(
                        '{{length}}',
                        String(otpLength)
                      )
              }}>
              {field => (
                <OtpField
                  isDisabled={isPending}
                  label={emailOtpLocalization.code}
                  length={otpLength}
                  name="otp"
                  value={field.state.value}
                  variant={variant}
                  onChange={field.handleChange}
                  onComplete={() => void submitAuthForm(form)}
                />
              )}
            </form.AppField>

            <form.AppField
              name="password"
              validators={{ onChange: ({ value }) => validatePassword(value) }}>
              {field => (
                <PasswordOtpField
                  field={field}
                  isDisabled={isPending}
                  isVisible={isPasswordVisible}
                  labels={localization.auth}
                  onVisibilityChange={() =>
                    setIsPasswordVisible(!isPasswordVisible)
                  }
                  variant={variant}
                />
              )}
            </form.AppField>

            {emailAndPassword?.confirmPassword && (
              <form.AppField
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ['password'],
                  onChange: ({ value, fieldApi }) =>
                    validatePassword(value) ??
                    (value === fieldApi.form.getFieldValue('password')
                      ? undefined
                      : localization.auth.passwordsDoNotMatch)
                }}>
                {field => (
                  <ConfirmPasswordOtpField
                    field={field}
                    isDisabled={isPending}
                    isVisible={isConfirmPasswordVisible}
                    labels={localization.auth}
                    onVisibilityChange={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    variant={variant}
                  />
                )}
              </form.AppField>
            )}

            <div className="flex flex-col gap-3">
              <form.AuthFormSubmitButton
                isPending={isPending}
                className="w-full"
                isDisabled={isPending}>
                {localization.auth.resetPassword}
              </form.AuthFormSubmitButton>

              {email && <OpenEmailButton email={email} variant="secondary" />}
            </div>
            <form.AuthFormServerError />
          </form.AuthFormRoot>
        </form.AppForm>
      </Card.Content>

      <ResetPasswordOtpFooter
        href={getAuthLinkURL(
          `${basePaths.auth}/${viewPaths.auth.signIn}`,
          redirectTo
        )}
        rememberPassword={localization.auth.rememberYourPassword}
        signIn={localization.auth.signIn}
      />
    </Card>
  )
}

export const ResetPasswordOtp = (props: ResetPasswordOtpProps) => {
  const isHydrated = useIsHydrated()
  return isHydrated ? <ResetPasswordOtpForm {...props} /> : null
}
