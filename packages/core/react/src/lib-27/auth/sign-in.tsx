import { useIsMutating } from '@tanstack/react-query'
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
import {
  AuthPrompts,
  useAuth,
  useFetchOptions,
  useSignInEmail
} from '@vezham/auth-ui-react'
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

import { isAuthFormFieldInvalid, useAuthForm } from './auth-form'
import { FieldSeparator } from './field-separator'
import { useSignInContinuation } from './lib/use-sign-in-continuation'
import { LastUsedBadge } from './plugins/last-login-method/last-used-badge'
import { ProviderButtons, type SocialLayout } from './provider-buttons'
import { ReauthenticationNotice } from './reauthentication'

export interface SignInProps {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
}

/**
 * Render the sign-in UI using auth context for configuration and localization.
 *
 * @returns The sign-in JSX element containing email/password fields, optional magic-link button, and social provider buttons.
 */
export const SignIn = ({
  className,
  socialLayout,
  socialPosition = 'bottom',
  variant
}: SignInProps) => {
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
  } = useAuth()

  const { fetchOptions, resetFetchOptions } = useFetchOptions()
  const continueSignIn = useSignInContinuation()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { mutateAsync: signInEmail, isPending: signInEmailPending } =
    useSignInEmail(authClient, {
      meta: { errorPresentation: 'inline' },
      onError: () => resetFetchOptions(),
      onSuccess: data => continueSignIn(data)
    })

  const form = useAuthForm({
    defaultValues: { email: '', password: '', rememberMe: false },
    onSubmit: async ({ value }) => {
      const email = value.email.trim()
      try {
        await signInEmail({
          email,
          password: value.password,
          ...(emailAndPassword?.rememberMe
            ? { rememberMe: value.rememberMe }
            : {}),
          fetchOptions
        })
      } catch (error) {
        if (getAuthErrorCode(error) !== 'EMAIL_NOT_VERIFIED') throw error

        sessionStorage.setItem('vezham.auth.verify-email', email)
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

  const Captcha = plugins.find(plugin =>
    Boolean(plugin.captchaComponent)
  )?.captchaComponent

  const passkeyAutoFill = isPasskeyAutoFillEnabled(plugins)

  const showSeparator = emailAndPassword?.enabled && !!socialProviders?.length

  return (
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
            {!!socialProviders?.length && (
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
                    validateEmailAddress(value, {
                      invalidMessage: localization.auth.invalidEmail,
                      requiredMessage: localization.auth.fieldRequired
                    })
                }}>
                {field => (
                  <TextField
                    isInvalid={
                      isAuthFormFieldInvalid(field.state.meta) || undefined
                    }
                    name={field.name}
                    type="email"
                    autoComplete={withPasskeyAutoFill('email', passkeyAutoFill)}
                    isDisabled={isPending}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    validationBehavior="aria">
                    <Label>{localization.auth.email}</Label>

                    <Input
                      placeholder={localization.auth.emailPlaceholder}
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
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
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
                  isPending={signInEmailPending}
                  className="relative w-full overflow-visible"
                  isDisabled={isPending}>
                  {localization.auth.signIn}

                  <LastUsedBadge method="email" floating />
                </form.AuthFormSubmitButton>

                {plugins.flatMap(plugin =>
                  plugin.authButtons?.map((AuthButton, index) => (
                    <AuthButton
                      key={`${plugin.id}-${index.toString()}`}
                      view="signIn"
                    />
                  ))
                )}
              </div>
            </form.AuthFormRoot>
          </form.AppForm>
        )}

        {socialPosition === 'bottom' && (
          <>
            {showSeparator && (
              <FieldSeparator>{localization.auth.or}</FieldSeparator>
            )}

            {!!socialProviders?.length && (
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
}
