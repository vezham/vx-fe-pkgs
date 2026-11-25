import { useIsMutating } from '@tanstack/react-query'
import { type ComponentType, useMemo, useState } from 'react'

import {
  type AdditionalFieldFormValues,
  type AdditionalFields,
  authMutationKeys,
  getAdditionalFieldDefaultValues,
  getAdditionalFieldSubmitValues,
  getAuthCallbackURL,
  getAuthLinkURL,
  isPasswordCompromisedError,
  validateEmailAddress,
  validateMatchingValue,
  validateStringLength
} from '@vezham/auth-ui-core'
import {
  AuthPrompts,
  useAuth,
  useFetchOptions,
  useSignUpEmail
} from '@vezham/auth-ui-react'
import { Eye, EyeClosed as EyeSlash } from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Description,
  FieldError,
  Input,
  InputGroup,
  Label,
  Link,
  TextField,
  cn
} from '@vezham/react-v3'

import {
  getAuthAdditionalFieldValidators,
  isAuthFormFieldInvalid,
  useAuthForm
} from './auth-form'
import { FieldSeparator } from './field-separator'
import { PasswordStrengthMeter } from './password-strength-meter'
import { ProviderButtons, type SocialLayout } from './provider-buttons'

export type SignUpProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
  /**
   * Runs instead of the post-sign-up redirect, but only when the sign-up
   * created an immediately usable session. Email verification still takes
   * priority, and social sign-ups are unaffected.
   */
  onSignUpSuccess?: () => void
}

type SignUpFormValues = {
  additionalFields: AdditionalFieldFormValues
  confirmPassword: string
  email: string
  name: string
  password: string
}

const useSignUpForm = (options: {
  defaultValues: SignUpFormValues
  onSubmit: (props: { value: SignUpFormValues }) => Promise<void>
}) => useAuthForm(options)

type SignUpFormApi = ReturnType<typeof useSignUpForm>

const SignUpIdentityFields = ({
  emailLabels,
  form,
  isDisabled,
  showName,
  variant
}: {
  emailLabels: {
    email: string
    emailPlaceholder: string
    fieldRequired: string
    invalidEmail: string
    name: string
    namePlaceholder: string
  }
  form: SignUpFormApi
  isDisabled: boolean
  showName: boolean
  variant: CardProps['variant']
}) => (
  <>
    {showName ? (
      <form.AppField
        name="name"
        validators={{
          onChange: ({ value }) =>
            validateStringLength(value, {
              requiredMessage: emailLabels.fieldRequired,
              trim: true
            })
        }}>
        {field => (
          <TextField
            name={field.name}
            type="text"
            autoComplete="name"
            isDisabled={isDisabled}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            isInvalid={isAuthFormFieldInvalid(field.state.meta) || undefined}
            validationBehavior="aria">
            <Label>{emailLabels.name}</Label>
            <Input
              placeholder={emailLabels.namePlaceholder}
              required
              variant={variant === 'transparent' ? 'primary' : 'secondary'}
            />
            <field.AuthFormFieldError />
          </TextField>
        )}
      </form.AppField>
    ) : null}

    <form.AppField
      name="email"
      validators={{
        onChange: ({ value }) =>
          validateEmailAddress(value, {
            invalidMessage: emailLabels.invalidEmail,
            requiredMessage: emailLabels.fieldRequired
          })
      }}>
      {field => (
        <TextField
          name={field.name}
          type="email"
          autoComplete="email"
          isDisabled={isDisabled}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={field.handleChange}
          isInvalid={isAuthFormFieldInvalid(field.state.meta) || undefined}
          validationBehavior="aria">
          <Label>{emailLabels.email}</Label>
          <Input
            placeholder={emailLabels.emailPlaceholder}
            required
            variant={variant === 'transparent' ? 'primary' : 'secondary'}
          />
          <field.AuthFormFieldError />
        </TextField>
      )}
    </form.AppField>
  </>
)

const SignUpAdditionalFields = ({
  fields,
  form,
  isDisabled,
  position,
  requiredMessage,
  optionalLabel,
  variant
}: {
  fields: AdditionalFields
  form: SignUpFormApi
  isDisabled: boolean
  position: 'above' | 'below'
  requiredMessage: string
  optionalLabel: string
  variant: CardProps['variant']
}) => (
  <>
    {fields
      .filter(field =>
        position === 'above'
          ? field.signUp === 'above'
          : field.signUp !== 'above'
      )
      .map(configuredField => (
        <form.AppField
          key={configuredField.name}
          name={`additionalFields.${configuredField.name}`}
          validators={getAuthAdditionalFieldValidators(
            configuredField,
            requiredMessage
          )}>
          {field => (
            <field.AuthFormAdditionalField
              field={configuredField}
              isPending={isDisabled}
              optionalLabel={optionalLabel}
              variant={variant}
            />
          )}
        </form.AppField>
      ))}
  </>
)

type SignUpField<Value> = {
  AuthFormFieldError: ComponentType
  handleBlur: () => void
  handleChange: (value: Value) => void
  name: string
  state: {
    meta: { isTouched: boolean; isValid: boolean }
    value: Value
  }
}

const SignUpPasswordField = ({
  field,
  isCompromised,
  isDisabled,
  isVisible,
  labels,
  onChange,
  onVisibilityChange,
  passwordLimits,
  variant
}: {
  field: SignUpField<string>
  isCompromised: boolean
  isDisabled: boolean
  isVisible: boolean
  labels: {
    hidePassword: string
    password: string
    passwordCompromised: string
    passwordPlaceholder: string
    showPassword: string
  }
  onChange: (value: string) => void
  onVisibilityChange: () => void
  passwordLimits: { max?: number; min?: number }
  variant: CardProps['variant']
}) => (
  <TextField
    minLength={passwordLimits.min}
    maxLength={passwordLimits.max}
    name={field.name}
    autoComplete="new-password"
    isDisabled={isDisabled}
    onBlur={field.handleBlur}
    value={field.state.value}
    onChange={onChange}
    isInvalid={
      isAuthFormFieldInvalid(field.state.meta) || isCompromised || undefined
    }
    validationBehavior="aria">
    <Label>{labels.password}</Label>
    <InputGroup variant={variant === 'transparent' ? 'primary' : 'secondary'}>
      <InputGroup.Input
        placeholder={labels.passwordPlaceholder}
        type={isVisible ? 'text' : 'password'}
        name="password"
        required
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
    {isCompromised ? (
      <FieldError>{labels.passwordCompromised}</FieldError>
    ) : (
      <field.AuthFormFieldError />
    )}
    <PasswordStrengthMeter password={field.state.value} />
  </TextField>
)

const SignUpConfirmPasswordField = ({
  field,
  isDisabled,
  isVisible,
  labels,
  onVisibilityChange,
  passwordLimits,
  variant
}: {
  field: SignUpField<string>
  isDisabled: boolean
  isVisible: boolean
  labels: {
    confirmPassword: string
    confirmPasswordPlaceholder: string
    hidePassword: string
    showPassword: string
  }
  onVisibilityChange: () => void
  passwordLimits: { max?: number; min?: number }
  variant: CardProps['variant']
}) => (
  <TextField
    minLength={passwordLimits.min}
    maxLength={passwordLimits.max}
    name={field.name}
    autoComplete="new-password"
    isDisabled={isDisabled}
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={field.handleChange}
    isInvalid={isAuthFormFieldInvalid(field.state.meta) || undefined}
    validationBehavior="aria">
    <Label>{labels.confirmPassword}</Label>
    <InputGroup variant={variant === 'transparent' ? 'primary' : 'secondary'}>
      <InputGroup.Input
        name="confirmPassword"
        placeholder={labels.confirmPasswordPlaceholder}
        type={isVisible ? 'text' : 'password'}
        required
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

const SignUpSocialOptions = ({
  isVisible,
  position,
  separatorLabel,
  showProviders,
  showSeparator,
  socialLayout
}: {
  isVisible: boolean
  position: 'top' | 'bottom'
  separatorLabel: string
  showProviders: boolean
  showSeparator: boolean
  socialLayout?: SocialLayout
}) =>
  isVisible ? (
    <>
      {position === 'top' ? (
        <>
          {showProviders && (
            <ProviderButtons socialLayout={socialLayout} view="signUp" />
          )}
          {showSeparator ? (
            <FieldSeparator>{separatorLabel}</FieldSeparator>
          ) : null}
        </>
      ) : (
        <>
          {showSeparator ? (
            <FieldSeparator>{separatorLabel}</FieldSeparator>
          ) : null}
          {showProviders && (
            <ProviderButtons socialLayout={socialLayout} view="signUp" />
          )}
        </>
      )}
    </>
  ) : null

const SignUpFooter = ({
  href,
  labels
}: {
  href: string
  labels: { alreadyHaveAnAccount: string; signIn: string }
}) => (
  <Card.Footer className="flex-col gap-3">
    <Description className="text-sm">
      {labels.alreadyHaveAnAccount}{' '}
      <Link
        href={href}
        className="text-accent decoration-accent-hover no-underline hover:underline">
        {labels.signIn}
      </Link>
    </Description>
  </Card.Footer>
)

/**
 * Render a sign-up form with name, email, password (and optional confirm password) fields, optional social provider buttons, and password visibility controls.
 *
 * The component reflects request state by disabling inputs and showing a pending indicator during sign-up or social sign-in.
 *
 * @param className - Additional CSS classes applied to the outer card container
 * @param socialLayout - Social layout to apply to the provider buttons component
 * @param socialPosition - Position of social provider buttons relative to the form; `"top"` or `"bottom"` (default `"bottom"`)
 * @param onSignUpSuccess - Replaces the post-sign-up redirect when the new account is immediately usable
 * @returns The sign-up form React element
 */
export const SignUp = ({
  className,
  socialLayout,
  socialPosition = 'bottom',
  variant,
  onSignUpSuccess
}: SignUpProps) => {
  const {
    additionalFields,
    authClient,
    basePaths,
    baseURL,
    emailAndPassword,
    localization,
    plugins,
    redirectTo,
    socialProviders,
    viewPaths,
    navigate
  } = useAuth()

  const { fetchOptions, resetFetchOptions } = useFetchOptions()

  const [isCompromised, setIsCompromised] = useState(false)

  const { mutateAsync: signUpEmail } = useSignUpEmail(authClient, {
    onError: error => {
      // vx-bot/NOTE: The haveIBeenPwned plugin rejects on the password itself, so
      // vx-bot/NOTE: it belongs against the field rather than in a toast.
      setIsCompromised(isPasswordCompromisedError(error))

      resetFetchOptions()
    },
    onSuccess: (_data, { email }) => {
      if (emailAndPassword?.requireEmailVerification) {
        sessionStorage.setItem('vezham.auth.verify-email', email)
        navigate({
          to: getAuthLinkURL(
            `${basePaths.auth}/${viewPaths.auth.verifyEmail}`,
            redirectTo
          )
        })
      } else if (onSignUpSuccess) {
        onSignUpSuccess()
      } else {
        navigate({ to: redirectTo })
      }
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent
  const signUpFields = useMemo(
    () => additionalFields?.filter(field => field.signUp) ?? [],
    [additionalFields]
  )
  const form = useSignUpForm({
    defaultValues: {
      additionalFields: getAdditionalFieldDefaultValues(signUpFields),
      confirmPassword: '',
      email: '',
      name: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      try {
        await signUpEmail({
          name: emailAndPassword?.name === false ? '' : value.name,
          email: value.email.trim(),
          password: value.password,
          ...getAdditionalFieldSubmitValues(
            signUpFields,
            value.additionalFields
          ),
          callbackURL: getAuthCallbackURL(baseURL, redirectTo),
          fetchOptions
        })
      } catch {
        // vx-bot/NOTE: The mutation reports the error through its configured handler.
      }
    }
  })

  const showSeparator = emailAndPassword?.enabled && !!socialProviders?.length

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <AuthPrompts view="signUp" />
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.auth.signUp}
        </Card.Title>
      </Card.Header>

      <Card.Content className="gap-4">
        <SignUpSocialOptions
          isVisible={socialPosition === 'top'}
          position="top"
          separatorLabel={localization.auth.or}
          showProviders={Boolean(socialProviders?.length)}
          showSeparator={Boolean(showSeparator)}
          socialLayout={socialLayout}
        />

        {emailAndPassword?.enabled && (
          <form.AppForm>
            <form.AuthFormRoot className="flex flex-col gap-4">
              <SignUpIdentityFields
                emailLabels={{
                  email: localization.auth.email,
                  emailPlaceholder: localization.auth.emailPlaceholder,
                  fieldRequired: localization.auth.fieldRequired,
                  invalidEmail: localization.auth.invalidEmail,
                  name: localization.auth.name,
                  namePlaceholder: localization.auth.namePlaceholder
                }}
                form={form}
                isDisabled={isPending}
                showName={emailAndPassword.name !== false}
                variant={variant}
              />

              <SignUpAdditionalFields
                fields={signUpFields}
                form={form}
                isDisabled={isPending}
                position="above"
                requiredMessage={localization.auth.fieldRequired}
                optionalLabel={localization.auth.optional}
                variant={variant}
              />

              <form.AppField
                name="password"
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
                {field => (
                  <SignUpPasswordField
                    field={field}
                    isCompromised={isCompromised}
                    isDisabled={isPending}
                    isVisible={isPasswordVisible}
                    labels={localization.auth}
                    onChange={value => {
                      field.handleChange(value)
                      setIsCompromised(false)
                    }}
                    onVisibilityChange={() =>
                      setIsPasswordVisible(!isPasswordVisible)
                    }
                    passwordLimits={{
                      max: emailAndPassword?.maxPasswordLength,
                      min: emailAndPassword?.minPasswordLength
                    }}
                    variant={variant}
                  />
                )}
              </form.AppField>

              {emailAndPassword?.confirmPassword && (
                <form.AppField
                  name="confirmPassword"
                  validators={{
                    onChangeListenTo: ['password'],
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
                        fieldApi.form.getFieldValue('password'),
                        localization.auth.passwordsDoNotMatch
                      )
                  }}>
                  {field => (
                    <SignUpConfirmPasswordField
                      field={field}
                      isDisabled={isPending}
                      isVisible={isConfirmPasswordVisible}
                      labels={localization.auth}
                      onVisibilityChange={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      passwordLimits={{
                        max: emailAndPassword?.maxPasswordLength,
                        min: emailAndPassword?.minPasswordLength
                      }}
                      variant={variant}
                    />
                  )}
                </form.AppField>
              )}

              <SignUpAdditionalFields
                fields={signUpFields}
                form={form}
                isDisabled={isPending}
                position="below"
                requiredMessage={localization.auth.fieldRequired}
                optionalLabel={localization.auth.optional}
                variant={variant}
              />

              {Captcha && <div className="flex justify-center">{Captcha}</div>}

              <div className="flex flex-col gap-3">
                <form.AuthFormSubmitButton
                  className="w-full"
                  isDisabled={isPending}>
                  {localization.auth.signUp}
                </form.AuthFormSubmitButton>

                {plugins.flatMap(plugin =>
                  plugin.authButtons?.map((AuthButton, index) => (
                    <AuthButton
                      key={`${plugin.id}-${index.toString()}`}
                      view="signUp"
                    />
                  ))
                )}
              </div>
            </form.AuthFormRoot>
          </form.AppForm>
        )}

        <SignUpSocialOptions
          isVisible={socialPosition === 'bottom'}
          position="bottom"
          separatorLabel={localization.auth.or}
          showProviders={Boolean(socialProviders?.length)}
          showSeparator={Boolean(showSeparator)}
          socialLayout={socialLayout}
        />
      </Card.Content>

      <SignUpFooter
        href={getAuthLinkURL(
          `${basePaths.auth}/${viewPaths.auth.signIn}`,
          redirectTo
        )}
        labels={localization.auth}
      />
    </Card>
  )
}
