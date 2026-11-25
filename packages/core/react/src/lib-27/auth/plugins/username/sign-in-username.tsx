import { useIsMutating } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useState } from 'react'

import {
  authMutationKeys,
  getAuthErrorCode,
  getAuthLinkURL,
  validateEmailAddress,
  validateStringLength
} from '@vezham/auth-ui-core'
import {
  isPasskeyAutoFillEnabled,
  withPasskeyAutoFill
} from '@vezham/auth-ui-core/plugins/passkey'
import type {
  UsernameAuthClient,
  UsernameLocalization
} from '@vezham/auth-ui-core/plugins/username'
import { usernamePlugin } from '@vezham/auth-ui-core/plugins/username'
import {
  AuthPrompts,
  useAuth,
  useAuthPlugin,
  useFetchOptions,
  useSignInEmail
} from '@vezham/auth-ui-react'
import { useSignInUsername } from '@vezham/auth-ui-react/plugins/username'
import { Eye, EyeClosed as EyeSlash } from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Checkbox,
  Description,
  Input,
  InputGroup,
  Label,
  Link,
  TextField,
  cn
} from '@vezham/react-v3'

import { isAuthFormFieldInvalid, useAuthForm } from '../../auth-form'
import { FieldSeparator } from '../../field-separator'
import { useSignInContinuation } from '../../lib/use-sign-in-continuation'
import { ProviderButtons, type SocialLayout } from '../../provider-buttons'
import { ReauthenticationNotice } from '../../reauthentication'
import { LastUsedBadge } from '../last-login-method/last-used-badge'

type UsernameFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const useUsernameForm = (options: {
  defaultValues: UsernameFormValues
  onSubmit: (props: { value: UsernameFormValues }) => Promise<void>
}) => useAuthForm(options)

type UsernameForm = ReturnType<typeof useUsernameForm>

export interface SignInUsernameProps {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
}

type SignInUsernameViewProps = {
  authButtons: ReactNode[]
  basePaths: ReturnType<typeof useAuth>['basePaths']
  Captcha?: ReactNode
  className?: string
  emailAndPassword: ReturnType<typeof useAuth>['emailAndPassword']
  form: UsernameForm
  hasSocialProviders: boolean
  isPasswordVisible: boolean
  isPending: boolean
  isSignInPending: boolean
  localization: ReturnType<typeof useAuth>['localization']
  onTogglePassword: () => void
  passkeyAutoFill: boolean
  socialLayout?: SocialLayout
  socialPosition: 'top' | 'bottom'
  showSeparator: boolean
  usernameLocalization: UsernameLocalization
  variant?: CardProps['variant']
  viewPaths: ReturnType<typeof useAuth>['viewPaths']
}

const renderSignInUsernameCard = ({
  authButtons,
  basePaths,
  Captcha,
  className,
  emailAndPassword,
  form,
  hasSocialProviders,
  isPasswordVisible,
  isPending,
  isSignInPending,
  localization,
  onTogglePassword,
  passkeyAutoFill,
  socialLayout,
  socialPosition,
  showSeparator,
  usernameLocalization,
  variant,
  viewPaths
}: SignInUsernameViewProps) => (
  <Card
    className={cn('w-full max-w-sm gap-4 md:p-6', className)}
    variant={variant}>
    <AuthPrompts view="signIn" />
    <ReauthenticationNotice />
    <Card.Header>
      <Card.Title className="mb-1 text-xl font-semibold">
        {localization.auth.signIn}
      </Card.Title>
    </Card.Header>

    <Card.Content className="gap-4">
      {socialPosition === 'top' && (
        <>
          {hasSocialProviders && (
            <ProviderButtons socialLayout={socialLayout} view="signIn" />
          )}

          {showSeparator && (
            <FieldSeparator>{localization.auth.or}</FieldSeparator>
          )}
        </>
      )}

      {emailAndPassword?.enabled && (
        <form.AppForm>
          <form.AuthFormRoot
            className="flex flex-col gap-4"
            serverErrorMessage={localization.errors.generic}>
            <form.AppField
              name="email"
              validators={{
                onChange: ({ value }) =>
                  value.includes('@')
                    ? validateEmailAddress(value, {
                        invalidMessage: localization.auth.invalidEmail,
                        requiredMessage: localization.auth.fieldRequired
                      })
                    : validateStringLength(value, {
                        requiredMessage: localization.auth.fieldRequired,
                        trim: true
                      })
              }}>
              {field => (
                <TextField
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
                  name={field.name}
                  type="text"
                  autoComplete={withPasskeyAutoFill(
                    'username',
                    passkeyAutoFill
                  )}
                  isDisabled={isPending}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  validationBehavior="aria">
                  <Label>{usernameLocalization.username}</Label>

                  <Input
                    placeholder={
                      usernameLocalization.usernameOrEmailPlaceholder
                    }
                    variant={
                      variant === 'transparent' ? 'primary' : 'secondary'
                    }
                    required
                  />

                  <field.AuthFormFieldError />
                </TextField>
              )}
            </form.AppField>

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
                <TextField
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
                  minLength={emailAndPassword?.minPasswordLength}
                  maxLength={emailAndPassword?.maxPasswordLength}
                  name={field.name}
                  autoComplete={withPasskeyAutoFill(
                    'current-password',
                    passkeyAutoFill
                  )}
                  isDisabled={isPending}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  validationBehavior="aria">
                  <Label>{localization.auth.password}</Label>

                  <InputGroup
                    variant={
                      variant === 'transparent' ? 'primary' : 'secondary'
                    }>
                    <InputGroup.Input
                      placeholder={localization.auth.passwordPlaceholder}
                      type={isPasswordVisible ? 'text' : 'password'}
                      required
                    />

                    <InputGroup.Suffix className="px-0">
                      <Button
                        isIconOnly
                        aria-label={
                          isPasswordVisible
                            ? localization.auth.hidePassword
                            : localization.auth.showPassword
                        }
                        size="sm"
                        variant="ghost"
                        onPress={onTogglePassword}
                        isDisabled={isPending}>
                        {isPasswordVisible ? (
                          <EyeSlash size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>

                  <field.AuthFormFieldError />
                </TextField>
              )}
            </form.AppField>

            {emailAndPassword?.rememberMe && (
              <form.AppField name="rememberMe">
                {field => (
                  <Checkbox
                    name={field.name}
                    isDisabled={isPending}
                    isSelected={field.state.value}
                    onChange={field.handleChange}
                    variant={
                      variant === 'transparent' ? 'primary' : 'secondary'
                    }>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>

                      {localization.auth.rememberMe}
                    </Checkbox.Content>
                  </Checkbox>
                )}
              </form.AppField>
            )}

            {Captcha && <div className="flex justify-center">{Captcha}</div>}

            <form.AuthFormServerError />

            <div className="flex flex-col gap-3">
              <form.AuthFormSubmitButton
                isPending={isSignInPending}
                className="relative w-full overflow-visible"
                isDisabled={isSignInPending || isPending}>
                {localization.auth.signIn}

                <LastUsedBadge method={['email', 'username']} floating />
              </form.AuthFormSubmitButton>

              {authButtons}
            </div>
          </form.AuthFormRoot>
        </form.AppForm>
      )}

      {socialPosition === 'bottom' && (
        <>
          {showSeparator && (
            <FieldSeparator>{localization.auth.or}</FieldSeparator>
          )}

          {hasSocialProviders && (
            <ProviderButtons socialLayout={socialLayout} view="signIn" />
          )}
        </>
      )}
    </Card.Content>

    <Card.Footer className="flex-col gap-3">
      {emailAndPassword?.enabled && emailAndPassword?.forgotPassword && (
        <Link
          href={`${basePaths.auth}/${viewPaths.auth.forgotPassword}`}
          className="text-sm no-underline hover:underline">
          {localization.auth.forgotPasswordLink}
        </Link>
      )}

      {emailAndPassword?.enabled && (
        <Description className="text-sm">
          {localization.auth.needToCreateAnAccount}{' '}
          <Link
            href={`${basePaths.auth}/${viewPaths.auth.signUp}`}
            className="text-accent decoration-accent-hover no-underline hover:underline">
            {localization.auth.signUp}
          </Link>
        </Description>
      )}
    </Card.Footer>
  </Card>
)

/**
 * Render the username-based sign-in UI.
 *
 * @returns The sign-in JSX element containing username/password fields, optional magic-link button, and social provider buttons.
 */
export const SignInUsername = ({
  className,
  socialLayout,
  socialPosition = 'bottom',
  variant
}: SignInUsernameProps) => {
  const {
    authClient,
    basePaths,
    emailAndPassword,
    localization,
    plugins,
    socialProviders,
    redirectTo,
    viewPaths,
    navigate
  } = useAuth<UsernameAuthClient>()

  const { fetchOptions, resetFetchOptions } = useFetchOptions()
  const continueSignIn = useSignInContinuation()

  const { localization: usernameLocalization } = useAuthPlugin(usernamePlugin)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { mutateAsync: signInEmail, isPending: isSignInEmailPending } =
    useSignInEmail(authClient, {
      meta: { errorPresentation: 'inline' },
      onError: () => resetFetchOptions(),
      onSuccess: data => {
        sessionStorage.removeItem('vezham.auth.verify-email')
        continueSignIn(data)
      }
    })

  const { mutateAsync: signInUsername, isPending: isSignInUsernamePending } =
    useSignInUsername(authClient, {
      meta: { errorPresentation: 'inline' },
      onError: () => resetFetchOptions(),
      onSuccess: data => {
        sessionStorage.removeItem('vezham.auth.verify-email')
        continueSignIn(data)
      }
    })

  const form = useUsernameForm({
    defaultValues: { email: '', password: '', rememberMe: false },
    onSubmit: async ({ value }) => {
      const identifier = value.email.trim()
      const isEmail = identifier.includes('@')
      try {
        const params = {
          password: value.password,
          ...(emailAndPassword?.rememberMe
            ? { rememberMe: value.rememberMe }
            : {}),
          fetchOptions
        }
        if (isEmail) {
          await signInEmail({ ...params, email: identifier })
        } else {
          await signInUsername({ ...params, username: identifier })
        }
      } catch (error) {
        if (getAuthErrorCode(error) !== 'EMAIL_NOT_VERIFIED') throw error

        if (isEmail) {
          sessionStorage.setItem('vezham.auth.verify-email', identifier)
        } else {
          sessionStorage.removeItem('vezham.auth.verify-email')
        }
        navigate({
          to: getAuthLinkURL(
            `${basePaths.auth}/${viewPaths.auth.verifyEmail}`,
            redirectTo
          )
        })
      }
    }
  })

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0
  const isSignInPending = isSignInEmailPending || isSignInUsernamePending

  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent

  const passkeyAutoFill = isPasskeyAutoFillEnabled(plugins)

  const showSeparator = emailAndPassword?.enabled && !!socialProviders?.length

  return renderSignInUsernameCard({
    authButtons: plugins.flatMap(
      plugin =>
        plugin.authButtons?.map((AuthButton, index) => (
          <AuthButton key={`${plugin.id}-${index.toString()}`} view="signIn" />
        )) ?? []
    ),
    basePaths,
    Captcha,
    className,
    emailAndPassword,
    form,
    hasSocialProviders: Boolean(socialProviders?.length),
    isPasswordVisible,
    isPending,
    isSignInPending,
    localization,
    onTogglePassword: () => setIsPasswordVisible(value => !value),
    passkeyAutoFill,
    socialLayout,
    socialPosition,
    showSeparator,
    usernameLocalization,
    variant,
    viewPaths
  })
}
