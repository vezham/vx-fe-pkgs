import { useEffect } from 'react'

import { getViewURL } from '@vezham/auth-ui-core'
import { useAuth, useChangeEmail, useSession } from '@vezham/auth-ui-react'
import {
  Card,
  type CardProps,
  FieldError,
  Fieldset,
  Input,
  Label,
  Skeleton,
  TextField,
  cn,
  toast
} from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'

export type ChangeEmailProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Render a card containing a form to view and update the authenticated user's email.
 *
 * Shows a loading skeleton until session data is available, displays the current
 * email as the form's default value, and sends a verification email to the
 * new address upon successful submission.
 *
 * @returns A JSX element rendering the change-email card and form
 */
export const ChangeEmail = ({
  className,
  variant,
  ...props
}: ChangeEmailProps & Omit<CardProps, 'children'>) => {
  const { authClient, basePaths, baseURL, localization, viewPaths } = useAuth()
  const { data: session } = useSession(authClient)

  const { mutateAsync: changeEmail, isPending } = useChangeEmail(authClient, {
    onSuccess: () => toast.success(localization.settings.changeEmailSuccess)
  })

  const form = useAuthForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) =>
      changeEmail({
        newEmail: value.email,
        callbackURL: getViewURL(
          baseURL,
          basePaths.settings,
          viewPaths.settings.account
        )
      })
  })
  useEffect(() => {
    if (session) form.setFieldValue('email', session.user.email)
  }, [form, session])

  return (
    <div>
      <h2 className={cn('mb-3 text-sm font-semibold')}>
        {localization.settings.changeEmail}
      </h2>

      <Card className={cn('gap-4 p-4', className)} variant={variant} {...props}>
        <Card.Content>
          <form.AppForm>
            <form.AuthFormRoot>
              <Fieldset className="w-full gap-4">
                <Fieldset.Group>
                  <form.AppField name="email">
                    {field => (
                      <TextField
                        key={`${session?.user.id}-${session?.user.email}-email`}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={field.handleChange}
                        isDisabled={isPending || !session}>
                        <Label>{localization.auth.email}</Label>

                        {session ? (
                          <Input
                            required
                            variant={
                              variant === 'transparent'
                                ? 'primary'
                                : 'secondary'
                            }
                            autoComplete="email"
                            placeholder={localization.auth.emailPlaceholder}
                          />
                        ) : (
                          <Skeleton className="h-10 w-full rounded-xl md:h-9" />
                        )}

                        <FieldError />
                      </TextField>
                    )}
                  </form.AppField>
                </Fieldset.Group>

                <Fieldset.Actions>
                  <form.AuthFormSubmitButton
                    isPending={isPending}
                    isDisabled={!session || isPending}
                    size="sm">
                    {localization.settings.updateEmail}
                  </form.AuthFormSubmitButton>
                </Fieldset.Actions>
              </Fieldset>
            </form.AuthFormRoot>
          </form.AppForm>
        </Card.Content>
      </Card>
    </div>
  )
}
