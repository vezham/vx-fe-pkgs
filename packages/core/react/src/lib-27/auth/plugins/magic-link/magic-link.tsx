import { useIsMutating } from '@tanstack/react-query'

import {
  authMutationKeys,
  getAuthCallbackURL,
  validateEmailAddress
} from '@vezham/auth-ui-core'
import type { MagicLinkAuthClient } from '@vezham/auth-ui-core/plugins/magic-link'
import { magicLinkPlugin } from '@vezham/auth-ui-core/plugins/magic-link'
import { getSsoFallbackEmail } from '@vezham/auth-ui-core/plugins/sso'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useSignInMagicLink } from '@vezham/auth-ui-react/plugins/magic-link'
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
import { FieldSeparator } from '../../field-separator'
import { ProviderButtons, type SocialLayout } from '../../provider-buttons'
import { ReauthenticationNotice } from '../../reauthentication'
import { MAGIC_LINK_SENT_STORAGE_KEY } from './magic-link-sent'

export type MagicLinkProps = {
  className?: string
  socialLayout?: SocialLayout
  socialPosition?: 'top' | 'bottom'
  variant?: CardProps['variant']
}

/**
 * Magic-link sign-in form.
 *
 * @param socialLayout - Provider button layout.
 * @param socialPosition - `"top"` or `"bottom"`. Defaults to `"bottom"`.
 * @param variant - Card variant.
 */
export const MagicLink = ({
  className,
  socialLayout,
  socialPosition = 'bottom',
  variant
}: MagicLinkProps) => {
  const {
    authClient,
    basePaths,
    baseURL,
    emailAndPassword,
    localization,
    navigate,
    plugins,
    redirectTo,
    socialProviders,
    viewPaths
  } = useAuth<MagicLinkAuthClient>()
  const { localization: magicLinkLocalization, viewPaths: magicLinkViewPaths } =
    useAuthPlugin(magicLinkPlugin)

  const { mutateAsync: signInMagicLink, isPending: signInMagicLinkPending } =
    useSignInMagicLink(authClient, {
      meta: { errorPresentation: 'inline' },
      onSuccess: (_data, variables) => {
        sessionStorage.setItem(MAGIC_LINK_SENT_STORAGE_KEY, variables.email)
        navigate({
          to: `${basePaths.auth}/${magicLinkViewPaths.auth.magicLinkSent}`
        })
      }
    })

  const signInMutating = useIsMutating({
    mutationKey: authMutationKeys.signIn.all
  })
  const signUpMutating = useIsMutating({
    mutationKey: authMutationKeys.signUp.all
  })
  const isPending = signInMutating + signUpMutating > 0

  const form = useAuthForm({
    defaultValues: { email: getSsoFallbackEmail() },
    onSubmit: async ({ value }) =>
      signInMagicLink({
        email: value.email,
        callbackURL: getAuthCallbackURL(baseURL, redirectTo)
      })
  })

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
      </Card.Header>

      <Card.Content className="gap-4">
        {socialPosition === 'top' && (
          <>
            {!!socialProviders?.length && (
              <ProviderButtons socialLayout={socialLayout} view="magicLink" />
            )}

            {showSeparator && (
              <FieldSeparator>{localization.auth.or}</FieldSeparator>
            )}
          </>
        )}

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

            <div className="flex flex-col gap-3">
              <form.AuthFormSubmitButton
                isPending={signInMagicLinkPending}
                className="w-full"
                isDisabled={isPending}>
                {magicLinkLocalization.sendMagicLink}
              </form.AuthFormSubmitButton>

              {plugins.flatMap(plugin =>
                (plugin.authButtons ?? []).map((AuthButton, index) => (
                  <AuthButton
                    key={`${plugin.id}-${index.toString()}`}
                    view="magicLink"
                  />
                ))
              )}
            </div>
          </form.AuthFormRoot>
        </form.AppForm>

        {socialPosition === 'bottom' && (
          <>
            {showSeparator && (
              <FieldSeparator>{localization.auth.or}</FieldSeparator>
            )}

            {!!socialProviders?.length && (
              <ProviderButtons socialLayout={socialLayout} view="magicLink" />
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
