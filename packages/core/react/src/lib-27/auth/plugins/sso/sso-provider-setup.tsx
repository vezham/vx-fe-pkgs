'use client'

import { useState } from 'react'

import { validateAbsoluteUrl, validateStringLength } from '@vezham/auth-ui-core'
import type {
  RegisterSsoProviderData,
  RegisterSsoProviderParams,
  SsoAuthClient,
  SsoLocalization
} from '@vezham/auth-ui-core/plugins/sso'
import { ssoPlugin } from '@vezham/auth-ui-core/plugins/sso'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useRegisterSsoProvider } from '@vezham/auth-ui-react/plugins/sso'
import { CodeFile as FileCode, Key } from '@vezham/icons-react'
import {
  Alert,
  Card,
  type CardProps,
  FieldError,
  Input,
  Label,
  Tabs,
  TextArea,
  TextField,
  cn
} from '@vezham/react-v3'

import { isAuthFormFieldInvalid, useAuthForm } from '../../auth-form'

type SsoProtocol = 'oidc' | 'saml'

type SsoProviderFormValues = {
  clientId: string
  clientSecret: string
  domain: string
  entryPoint: string
  identityProviderMetadata: string
  issuer: string
  organizationId: string
  protocol: SsoProtocol
  providerId: string
}

const useSsoProviderForm = (options: {
  defaultValues: SsoProviderFormValues
  onSubmit: (props: { value: SsoProviderFormValues }) => Promise<void>
}) => useAuthForm(options)

export type SsoProviderSetupProps = {
  defaultOrganizationId?: string
  organizationId?: string
  onRegistered?: (provider: RegisterSsoProviderData) => void
} & Omit<CardProps, 'children'>

const getErrorMessage = (error: Error | null) => {
  const details: unknown = error && 'error' in error ? error.error : undefined
  const message =
    details && typeof details === 'object' && 'message' in details
      ? details.message
      : undefined
  return typeof message === 'string' ? message : error?.message
}

type SsoProviderForm = ReturnType<typeof useSsoProviderForm>

type SsoProtocolFieldsProps = {
  authLocalization: { auth: { fieldRequired: string } }
  form: SsoProviderForm
  ssoLocalization: SsoLocalization
}

const SsoProtocolFields = ({
  authLocalization,
  form,
  ssoLocalization
}: SsoProtocolFieldsProps) => (
  <form.Field name="protocol">
    {protocolField => (
      <Tabs
        selectedKey={protocolField.state.value}
        onSelectionChange={key =>
          protocolField.handleChange(key === 'saml' ? 'saml' : 'oidc')
        }
        variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label={ssoLocalization.providerSetup}>
            <Tabs.Tab id="oidc">
              <Key size={16} aria-hidden="true" className="text-muted" />
              {ssoLocalization.oidc}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="saml">
              <FileCode size={16} aria-hidden="true" className="text-muted" />
              {ssoLocalization.saml}
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="oidc">
          <div className="grid gap-4 sm:grid-cols-2">
            <form.AppField
              name="clientId"
              validators={{
                onChange: ({ value }) =>
                  validateStringLength(value, {
                    requiredMessage: authLocalization.auth.fieldRequired,
                    trim: true
                  })
              }}>
              {field => (
                <TextField
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
                  isRequired
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  value={field.state.value}
                  validationBehavior="aria">
                  <Label>{ssoLocalization.clientId}</Label>
                  <Input autoComplete="off" variant="secondary" />
                  <field.AuthFormFieldError />
                </TextField>
              )}
            </form.AppField>
            <form.AppField
              name="clientSecret"
              validators={{
                onChange: ({ value }) =>
                  validateStringLength(value, {
                    requiredMessage: authLocalization.auth.fieldRequired,
                    trim: true
                  })
              }}>
              {field => (
                <TextField
                  isInvalid={
                    isAuthFormFieldInvalid(field.state.meta) || undefined
                  }
                  isRequired
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  value={field.state.value}
                  validationBehavior="aria">
                  <Label>{ssoLocalization.clientSecret}</Label>
                  <Input
                    autoComplete="new-password"
                    type="password"
                    variant="secondary"
                  />
                  <field.AuthFormFieldError />
                </TextField>
              )}
            </form.AppField>
          </div>
        </Tabs.Panel>
        <Tabs.Panel className="flex flex-col gap-4 pt-4" id="saml">
          <form.AppField
            name="entryPoint"
            validators={{
              onChange: ({ value }) =>
                validateAbsoluteUrl(value, {
                  invalidMessage: ssoLocalization.invalidUrl,
                  requiredMessage: authLocalization.auth.fieldRequired
                })
            }}>
            {field => (
              <TextField
                isInvalid={
                  isAuthFormFieldInvalid(field.state.meta) || undefined
                }
                isRequired
                name={field.name}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
                validationBehavior="aria">
                <Label>{ssoLocalization.entryPoint}</Label>
                <Input type="url" variant="secondary" />
                <field.AuthFormFieldError />
              </TextField>
            )}
          </form.AppField>
          <form.AppField
            name="identityProviderMetadata"
            validators={{
              onChange: ({ value }) =>
                validateStringLength(value, {
                  requiredMessage: authLocalization.auth.fieldRequired,
                  trim: true
                })
            }}>
            {field => (
              <TextField
                isInvalid={
                  isAuthFormFieldInvalid(field.state.meta) || undefined
                }
                isRequired
                name={field.name}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
                validationBehavior="aria">
                <Label>{ssoLocalization.identityProviderMetadata}</Label>
                <TextArea
                  className="font-mono text-xs"
                  rows={8}
                  variant="secondary"
                />
                <field.AuthFormFieldError />
              </TextField>
            )}
          </form.AppField>
        </Tabs.Panel>
      </Tabs>
    )}
  </form.Field>
)

type SsoProviderFormFieldsProps = {
  authLocalization: { auth: { fieldRequired: string } }
  created: boolean
  form: SsoProviderForm
  isOrganizationFixed: boolean
  register: ReturnType<typeof useRegisterSsoProvider>
  ssoLocalization: SsoLocalization
}

const SsoProviderFormFields = ({
  authLocalization,
  created,
  form,
  isOrganizationFixed,
  register,
  ssoLocalization
}: SsoProviderFormFieldsProps) => (
  <Card.Content>
    <form.AppForm>
      <form.AuthFormRoot className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <form.AppField
            name="providerId"
            validators={{
              onChange: ({ value }) =>
                validateStringLength(value, {
                  requiredMessage: authLocalization.auth.fieldRequired,
                  trim: true
                })
            }}>
            {field => (
              <TextField
                isInvalid={
                  isAuthFormFieldInvalid(field.state.meta) || undefined
                }
                isRequired
                name={field.name}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
                validationBehavior="aria">
                <Label>{ssoLocalization.providerId}</Label>
                <Input variant="secondary" />
                <field.AuthFormFieldError />
              </TextField>
            )}
          </form.AppField>
          <form.AppField
            name="domain"
            validators={{
              onChange: ({ value }) =>
                validateStringLength(value, {
                  requiredMessage: authLocalization.auth.fieldRequired,
                  trim: true
                })
            }}>
            {field => (
              <TextField
                isInvalid={
                  isAuthFormFieldInvalid(field.state.meta) || undefined
                }
                isRequired
                name={field.name}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
                validationBehavior="aria">
                <Label>{ssoLocalization.domain}</Label>
                <Input placeholder="example.com" variant="secondary" />
                <field.AuthFormFieldError />
              </TextField>
            )}
          </form.AppField>
        </div>

        <form.AppField
          name="issuer"
          validators={{
            onChange: ({ value }) =>
              validateAbsoluteUrl(value, {
                invalidMessage: ssoLocalization.invalidUrl,
                requiredMessage: authLocalization.auth.fieldRequired
              })
          }}>
          {field => (
            <TextField
              isInvalid={isAuthFormFieldInvalid(field.state.meta) || undefined}
              isRequired
              name={field.name}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              value={field.state.value}
              validationBehavior="aria">
              <Label>{ssoLocalization.issuer}</Label>
              <Input
                placeholder="https://idp.example.com"
                type="url"
                variant="secondary"
              />
              <field.AuthFormFieldError />
            </TextField>
          )}
        </form.AppField>

        {!isOrganizationFixed ? (
          <form.Field name="organizationId">
            {field => (
              <TextField
                name={field.name}
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}>
                <Label>{ssoLocalization.organizationId}</Label>
                <Input variant="secondary" />
                <FieldError />
              </TextField>
            )}
          </form.Field>
        ) : null}

        <SsoProtocolFields
          authLocalization={authLocalization}
          form={form}
          ssoLocalization={ssoLocalization}
        />

        {register.error ? (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                {getErrorMessage(register.error)}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null}
        {created ? (
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                {ssoLocalization.providerCreated}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        ) : null}

        <form.AuthFormSubmitButton
          className="self-end"
          isDisabled={register.isPending}>
          {ssoLocalization.addProvider}
        </form.AuthFormSubmitButton>
      </form.AuthFormRoot>
    </form.AppForm>
  </Card.Content>
)

/** Self-service form for registering an OIDC or SAML SSO provider. */
export const SsoProviderSetup = ({
  className,
  defaultOrganizationId,
  organizationId: fixedOrganizationId,
  onRegistered,
  variant,
  ...props
}: SsoProviderSetupProps) => {
  const { authClient, localization: authLocalization } =
    useAuth<SsoAuthClient>()
  const { localization } = useAuthPlugin(ssoPlugin)
  const [created, setCreated] = useState(false)
  const register = useRegisterSsoProvider(authClient)
  const form = useSsoProviderForm({
    defaultValues: {
      clientId: '',
      clientSecret: '',
      domain: '',
      entryPoint: '',
      identityProviderMetadata: '',
      issuer: '',
      organizationId: defaultOrganizationId ?? '',
      protocol: 'oidc' as SsoProtocol,
      providerId: ''
    } satisfies SsoProviderFormValues,
    onSubmit: async ({ value }) => {
      setCreated(false)
      const common = {
        providerId: value.providerId.trim(),
        issuer: value.issuer.trim(),
        domain: value.domain.trim(),
        organizationId:
          fixedOrganizationId || value.organizationId.trim() || undefined
      }
      const params =
        value.protocol === 'oidc'
          ? {
              ...common,
              oidcConfig: {
                clientId: value.clientId.trim(),
                clientSecret: value.clientSecret.trim()
              }
            }
          : {
              ...common,
              samlConfig: {
                entryPoint: value.entryPoint.trim(),
                idpMetadata: {
                  metadata: value.identityProviderMetadata.trim()
                }
              }
            }

      try {
        const provider = await register.mutateAsync(
          params as RegisterSsoProviderParams<SsoAuthClient>
        )
        setCreated(true)
        onRegistered?.(provider)
      } catch {
        // vx-bot/NOTE: The mutation exposes its error below the fields.
      }
    }
  })

  return (
    <Card className={cn(className)} variant={variant} {...props}>
      <Card.Header>
        <Card.Title>{localization.providerSetup}</Card.Title>
        <Card.Description>
          {localization.providerSetupDescription}
        </Card.Description>
      </Card.Header>
      <SsoProviderFormFields
        authLocalization={authLocalization}
        created={created}
        form={form}
        isOrganizationFixed={Boolean(fixedOrganizationId)}
        register={register}
        ssoLocalization={localization}
      />
    </Card>
  )
}
