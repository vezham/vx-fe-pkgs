import { useState } from 'react'

import {
  getAuthLinkURL,
  getViewURL,
  isPasswordCompromisedError,
  validateMatchingValue,
  validateStringLength
} from '@vezham/auth-ui-core'
import {
  type EmailOtpAuthClient,
  emailOtpPlugin
} from '@vezham/auth-ui-core/plugins/email-otp'
import {
  useAuth,
  useChangePassword,
  useFetchOptions,
  useListAccounts,
  useRequestPasswordReset,
  useSession
} from '@vezham/auth-ui-react'
import { useRequestPasswordResetOtp } from '@vezham/auth-ui-react/plugins/email-otp'
import { Eye, EyeClosed as EyeSlash } from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  FieldError,
  Fieldset,
  InputGroup,
  Label,
  Skeleton,
  Spinner,
  TextField,
  cn,
  toast
} from '@vezham/react-v3'

import { isAuthFormFieldInvalid, useAuthForm } from '../../auth-form'
import { OpenEmailButton } from '../../open-email-button'
import { PasswordStrengthMeter } from '../../password-strength-meter'

export type ChangePasswordProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Render a card form for changing the authenticated user's password.
 *
 * When the user has a credential account, displays fields for current password,
 * new password, and optionally confirm password. When the user only has social
 * accounts, displays a prompt to set a password via the reset flow.
 *
 * @returns A JSX element containing the change-password or set-password card
 */
export const ChangePassword = ({
  className,
  variant,
  ...props
}: ChangePasswordProps & Omit<CardProps, 'children'>) => {
  const { authClient, emailAndPassword, localization } = useAuth()
  const { data: session } = useSession(authClient)
  const { data: accounts, isPending: isAccountsPending } =
    useListAccounts(authClient)

  const hasCredentialAccount = accounts?.some(
    account => account.providerId === 'credential'
  )

  if (!isAccountsPending && !hasCredentialAccount) {
    return <SetPassword className={className} variant={variant} {...props} />
  }

  return (
    <ChangePasswordForm
      className={className}
      variant={variant}
      emailAndPassword={emailAndPassword}
      localization={localization}
      session={isAccountsPending ? undefined : session}
      {...props}
    />
  )
}

function SetPassword({
  className,
  variant,
  ...props
}: Omit<CardProps, 'children'>) {
  const {
    authClient,
    basePaths,
    baseURL,
    localization,
    navigate,
    plugins,
    redirectTo,
    viewPaths
  } = useAuth<EmailOtpAuthClient>()
  const emailOtp = plugins.find(
    (plugin): plugin is ReturnType<typeof emailOtpPlugin> =>
      plugin.id === emailOtpPlugin.id
  )
  const useOtp = Boolean(emailOtp?.passwordReset)
  const { data: session } = useSession(authClient)
  const { fetchOptions, resetFetchOptions } = useFetchOptions()
  const [sentEmail, setSentEmail] = useState('')

  const { mutate: requestPasswordReset, isPending: isLinkPending } =
    useRequestPasswordReset(authClient, {
      onError: () => {
        resetFetchOptions()
      },
      onSuccess: (_data, { email }) => {
        setSentEmail(email)
      }
    })

  const { mutate: requestPasswordResetOtp, isPending: isOtpPending } =
    useRequestPasswordResetOtp(authClient, {
      onError: () => resetFetchOptions(),
      onSuccess: (_data, { email }) => {
        // vx-bot/NOTE: react-doctor-disable-next-line react-doctor/auth-token-in-web-storage -- This stores only the submitted email to prefill the next screen, not a credential or token.
        sessionStorage.setItem('vezham.auth.reset-password-otp', email)
        navigate({
          to: getAuthLinkURL(
            getViewURL('', basePaths.auth, viewPaths.auth.resetPassword),
            redirectTo
          )
        })
      }
    })
  const isPending = isLinkPending || isOtpPending

  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent

  const handleSetPassword = () => {
    if (!session?.user.email) return
    if (useOtp) {
      requestPasswordResetOtp({ email: session.user.email, fetchOptions })
      return
    }
    requestPasswordReset({
      email: session.user.email,
      redirectTo: getViewURL(
        baseURL,
        basePaths.auth,
        viewPaths.auth.resetPassword
      ),
      fetchOptions
    })
  }

  return (
    <div>
      <h2 className={cn('mb-3 text-sm font-semibold')}>
        {localization.settings.changePassword}
      </h2>

      <Card className={cn(className)} variant={variant} {...props}>
        <Card.Content className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm leading-tight font-medium">
              {localization.settings.setPassword}
            </p>

            <p className="text-muted mt-0.5 text-xs">
              {localization.settings.setPasswordDescription}
            </p>
          </div>

          {sentEmail ? (
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="text-sm" role="status">
                {localization.auth.resetLinkSentTo.replace(
                  '{{email}}',
                  sentEmail
                )}
              </p>

              <OpenEmailButton email={sentEmail} className="w-auto" />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3 sm:items-end">
              {Captcha && <div>{Captcha}</div>}

              <Button
                size="sm"
                isPending={isPending}
                isDisabled={!session?.user.email}
                onPress={handleSetPassword}>
                {isPending && <Spinner color="current" size="sm" />}
                {useOtp
                  ? emailOtp?.localization.sendCode
                  : localization.auth.sendResetLink}
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}

type ChangePasswordFormValues = {
  confirmPassword: string
  currentPassword: string
  newPassword: string
}

const useChangePasswordForm = (options: {
  defaultValues: ChangePasswordFormValues
  onSubmit: (props: { value: ChangePasswordFormValues }) => Promise<void>
}) => useAuthForm(options)

type ChangePasswordFormApi = ReturnType<typeof useChangePasswordForm>

type ChangePasswordFieldsProps = {
  emailAndPassword: ReturnType<typeof useAuth>['emailAndPassword']
  form: ChangePasswordFormApi
  isCompromised: boolean
  isCurrentPasswordVisible: boolean
  isNewPasswordVisible: boolean
  isConfirmPasswordVisible: boolean
  isPending: boolean
  localization: ReturnType<typeof useAuth>['localization']
  session: ReturnType<typeof useSession>['data']
  setIsCompromised: (value: boolean) => void
  setIsConfirmPasswordVisible: (value: boolean) => void
  setIsCurrentPasswordVisible: (value: boolean) => void
  setIsNewPasswordVisible: (value: boolean) => void
  variant: CardProps['variant']
}

const ChangePasswordFields = ({
  emailAndPassword,
  form,
  isCompromised,
  isCurrentPasswordVisible,
  isNewPasswordVisible,
  isConfirmPasswordVisible,
  isPending,
  localization,
  session,
  setIsCompromised,
  setIsConfirmPasswordVisible,
  setIsCurrentPasswordVisible,
  setIsNewPasswordVisible,
  variant
}: ChangePasswordFieldsProps) => (
  <Card.Content>
    <form.AppForm>
      <form.AuthFormRoot>
        <Fieldset className="w-full gap-4">
          <Fieldset.Group>
            <form.AppField
              name="currentPassword"
              validators={{
                onChange: ({ value }) =>
                  validateStringLength(value, {
                    requiredMessage: localization.auth.fieldRequired
                  })
              }}>
              {field => (
                <TextField
                  name={field.name}
                  isDisabled={isPending || !session}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
                  validationBehavior="aria">
                  <Label>{localization.settings.currentPassword}</Label>

                  <InputGroup
                    className={cn(!session && 'hidden')}
                    variant={
                      variant === 'transparent' ? 'primary' : 'secondary'
                    }>
                    <InputGroup.Input
                      autoComplete="current-password"
                      name="currentPassword"
                      placeholder={
                        localization.settings.currentPasswordPlaceholder
                      }
                      required
                      type={isCurrentPasswordVisible ? 'text' : 'password'}
                    />

                    <InputGroup.Suffix className="px-0">
                      <Button
                        isIconOnly
                        aria-label={
                          isCurrentPasswordVisible
                            ? localization.auth.hidePassword
                            : localization.auth.showPassword
                        }
                        size="sm"
                        variant="ghost"
                        onPress={() =>
                          setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                        }
                        isDisabled={isPending}>
                        {isCurrentPasswordVisible ? (
                          <EyeSlash size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>

                  {!session && (
                    <Skeleton className="h-10 w-full rounded-xl md:h-9" />
                  )}

                  <field.AuthFormFieldError />
                </TextField>
              )}
            </form.AppField>

            <form.AppField
              name="newPassword"
              validators={{
                onChange: ({ value }) =>
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
              }}>
              {field => {
                const isInvalid =
                  isAuthFormFieldInvalid(field.state.meta) || isCompromised

                return (
                  <TextField
                    minLength={emailAndPassword?.minPasswordLength}
                    maxLength={emailAndPassword?.maxPasswordLength}
                    isDisabled={isPending || !session}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={value => {
                      field.handleChange(value)
                      setIsCompromised(false)
                    }}
                    isInvalid={isInvalid || undefined}
                    validationBehavior="aria">
                    <Label>{localization.auth.newPassword}</Label>

                    <InputGroup
                      className={cn(!session && 'hidden')}
                      variant={
                        variant === 'transparent' ? 'primary' : 'secondary'
                      }>
                      <InputGroup.Input
                        name="newPassword"
                        type={isNewPasswordVisible ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder={localization.auth.newPasswordPlaceholder}
                        required
                      />

                      <InputGroup.Suffix className="px-0">
                        <Button
                          isIconOnly
                          aria-label={
                            isNewPasswordVisible
                              ? localization.auth.hidePassword
                              : localization.auth.showPassword
                          }
                          size="sm"
                          variant="ghost"
                          onPress={() =>
                            setIsNewPasswordVisible(!isNewPasswordVisible)
                          }
                          isDisabled={isPending}>
                          {isNewPasswordVisible ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>

                    {!session && (
                      <Skeleton className="h-10 w-full rounded-xl md:h-9" />
                    )}

                    {isCompromised ? (
                      <FieldError>
                        {localization.auth.passwordCompromised}
                      </FieldError>
                    ) : (
                      <field.AuthFormFieldError />
                    )}

                    <PasswordStrengthMeter password={field.state.value} />
                  </TextField>
                )
              }}
            </form.AppField>

            {emailAndPassword?.confirmPassword && (
              <form.AppField
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ['newPassword'],
                  onChange: ({ fieldApi, value }) =>
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
                    }) ??
                    validateMatchingValue(
                      value,
                      fieldApi.form.getFieldValue('newPassword'),
                      localization.auth.passwordsDoNotMatch
                    )
                }}>
                {field => (
                  <TextField
                    minLength={emailAndPassword?.minPasswordLength}
                    maxLength={emailAndPassword?.maxPasswordLength}
                    isDisabled={isPending || !session}
                    isRequired
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    isInvalid={
                      isAuthFormFieldInvalid(field.state.meta) || undefined
                    }
                    validationBehavior="aria">
                    <Label>{localization.auth.confirmPassword}</Label>

                    <InputGroup
                      className={cn(!session && 'hidden')}
                      variant={
                        variant === 'transparent' ? 'primary' : 'secondary'
                      }>
                      <InputGroup.Input
                        name="confirmPassword"
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder={
                          localization.auth.confirmPasswordPlaceholder
                        }
                        required
                      />

                      <InputGroup.Suffix className="px-0">
                        <Button
                          isIconOnly
                          aria-label={
                            isConfirmPasswordVisible
                              ? localization.auth.hidePassword
                              : localization.auth.showPassword
                          }
                          size="sm"
                          variant="ghost"
                          onPress={() =>
                            setIsConfirmPasswordVisible(
                              !isConfirmPasswordVisible
                            )
                          }
                          isDisabled={isPending}>
                          {isConfirmPasswordVisible ? (
                            <EyeSlash size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button>
                      </InputGroup.Suffix>
                    </InputGroup>

                    {!session && (
                      <Skeleton className="h-10 w-full rounded-xl md:h-9" />
                    )}

                    <field.AuthFormFieldError />
                  </TextField>
                )}
              </form.AppField>
            )}
          </Fieldset.Group>

          <Fieldset.Actions>
            <form.AuthFormSubmitButton isDisabled={!session} size="sm">
              {localization.settings.updatePassword}
            </form.AuthFormSubmitButton>
          </Fieldset.Actions>
        </Fieldset>
      </form.AuthFormRoot>
    </form.AppForm>
  </Card.Content>
)

function ChangePasswordForm({
  className,
  variant,
  emailAndPassword,
  localization,
  session,
  ...props
}: {
  emailAndPassword: ReturnType<typeof useAuth>['emailAndPassword']
  localization: ReturnType<typeof useAuth>['localization']
  session: ReturnType<typeof useSession>['data']
} & Omit<CardProps, 'children'>) {
  const { authClient } = useAuth<EmailOtpAuthClient>()
  const [isCompromised, setIsCompromised] = useState(false)
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false)

  const { mutateAsync: changePassword, isPending } = useChangePassword(
    authClient,
    {
      onError: error => {
        // vx-bot/NOTE: The haveIBeenPwned plugin rejects on the password itself, so it
        // vx-bot/NOTE: belongs against the field rather than in a toast.
        setIsCompromised(isPasswordCompromisedError(error))
      },
      onSuccess: () => {
        form.reset()
        toast.success(localization.settings.changePasswordSuccess)
      }
    }
  )

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const form = useChangePasswordForm({
    defaultValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: ''
    },
    onSubmit: async ({ value }) => {
      try {
        await changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
          revokeOtherSessions: true
        })
      } catch {
        // vx-bot/NOTE: The mutation reports the error through its configured handler.
      }
    }
  })

  return (
    <div>
      <h2 className={cn('mb-3 text-sm font-semibold')}>
        {localization.settings.changePassword}
      </h2>

      <Card className={cn('gap-4 p-4', className)} variant={variant} {...props}>
        <ChangePasswordFields
          emailAndPassword={emailAndPassword}
          form={form}
          isCompromised={isCompromised}
          isCurrentPasswordVisible={isCurrentPasswordVisible}
          isNewPasswordVisible={isNewPasswordVisible}
          isConfirmPasswordVisible={isConfirmPasswordVisible}
          isPending={isPending}
          localization={localization}
          session={session}
          setIsCompromised={setIsCompromised}
          setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
          setIsCurrentPasswordVisible={setIsCurrentPasswordVisible}
          setIsNewPasswordVisible={setIsNewPasswordVisible}
          variant={variant}
        />
      </Card>
    </div>
  )
}
