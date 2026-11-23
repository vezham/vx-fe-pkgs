'use client'

import { useSelector } from '@tanstack/react-form'
import { useState } from 'react'

import type { SsoAuthClient } from '@vezham/auth-ui-core/plugins/sso'
import { ssoPlugin } from '@vezham/auth-ui-core/plugins/sso'
import {
  useAuth,
  useAuthPlugin,
  useCopyToClipboard
} from '@vezham/auth-ui-react'
import {
  useRequestSsoDomainVerification,
  useVerifySsoDomain
} from '@vezham/auth-ui-react/plugins/sso'
import { CheckRead as Check, Copy } from '@vezham/icons-react'
import {
  Alert,
  Button,
  Card,
  type CardProps,
  FieldError,
  Input,
  InputGroup,
  Label,
  Spinner,
  TextField,
  cn,
  toast
} from '@vezham/react-v3'

import { useAuthForm } from '../../auth-form'

export type SsoDomainVerificationProps = {
  defaultProviderId?: string
  defaultToken?: string
  tokenPrefix?: string
} & Omit<CardProps, 'children'>

const getErrorMessage = (error: Error | null) => {
  const details: unknown = error && 'error' in error ? error.error : undefined
  const message =
    details && typeof details === 'object' && 'message' in details
      ? details.message
      : undefined
  return typeof message === 'string' ? message : error?.message
}

/** DNS token renewal and verification for an existing SSO provider. */
export const SsoDomainVerification = ({
  className,
  defaultProviderId = '',
  defaultToken = '',
  tokenPrefix = 'better-auth-token',
  variant,
  ...props
}: SsoDomainVerificationProps) => {
  const { authClient, localization: authLocalization } =
    useAuth<SsoAuthClient>()
  const { localization } = useAuthPlugin(ssoPlugin)
  const [token, setToken] = useState(defaultToken)
  const [verified, setVerified] = useState(false)
  const requestToken = useRequestSsoDomainVerification(authClient, {
    onSuccess: data => setToken(data.domainVerificationToken)
  })
  const verify = useVerifySsoDomain(authClient, {
    onSuccess: () => setVerified(true)
  })
  const form = useAuthForm({
    defaultValues: { providerId: defaultProviderId },
    onSubmit: async ({ value }) => {
      setVerified(false)
      await verify.mutateAsync({ providerId: value.providerId })
    }
  })
  const providerId = useSelector(form.store, state => state.values.providerId)
  const host = providerId ? `_${tokenPrefix}-${providerId}` : ''
  const hostCopy = useCopyToClipboard({
    onError: error => {
      console.error('[Vezham Auth] Copy failed', error)
      toast.danger(authLocalization.errors.copyFailed)
    }
  })
  const tokenCopy = useCopyToClipboard({
    onError: error => {
      console.error('[Vezham Auth] Copy failed', error)
      toast.danger(authLocalization.errors.copyFailed)
    }
  })
  const error =
    requestToken.submittedAt > verify.submittedAt
      ? requestToken.error
      : verify.error

  return (
    <Card className={cn(className)} variant={variant} {...props}>
      <Card.Header>
        <Card.Title>{localization.domainVerification}</Card.Title>
        <Card.Description>
          {localization.domainVerificationDescription}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form.AppForm>
          <form.AuthFormRoot className="flex flex-col gap-4">
            <form.AppField name="providerId">
              {field => (
                <TextField
                  isRequired
                  name={field.name}
                  onChange={value => {
                    field.handleChange(value.trim())
                    setToken('')
                    setVerified(false)
                  }}
                  value={field.state.value}
                  onBlur={field.handleBlur}>
                  <Label>{localization.providerId}</Label>
                  <Input variant="secondary" />
                  <FieldError />
                </TextField>
              )}
            </form.AppField>

            {token ? (
              <div className="grid gap-3 rounded-lg border p-3">
                <TextField isReadOnly value={host}>
                  <Label>{localization.txtRecordHost}</Label>
                  <InputGroup variant="secondary">
                    <InputGroup.Input className="font-mono text-xs" />
                    <InputGroup.Suffix className="px-0">
                      <Button
                        aria-label={localization.copyDnsHost}
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={() => void hostCopy.copy(host)}>
                        {hostCopy.copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>
                <TextField isReadOnly value={token}>
                  <Label>{localization.txtRecordValue}</Label>
                  <InputGroup variant="secondary">
                    <InputGroup.Input className="font-mono text-xs" />
                    <InputGroup.Suffix className="px-0">
                      <Button
                        aria-label={localization.copyDnsValue}
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        onPress={() => void tokenCopy.copy(token)}>
                        {tokenCopy.copied ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>
              </div>
            ) : null}

            {error ? (
              <Alert status="danger">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>
                    {getErrorMessage(error)}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}
            {verified ? (
              <Alert status="success">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Description>
                    {localization.domainVerified}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            ) : null}

            <div className="flex flex-wrap justify-end gap-2">
              <Button
                isDisabled={!providerId || verify.isPending}
                isPending={requestToken.isPending}
                type="button"
                variant="outline"
                onPress={() => {
                  setVerified(false)
                  requestToken.mutate({ providerId })
                }}>
                {requestToken.isPending ? (
                  <Spinner color="current" size="sm" />
                ) : null}
                {localization.requestNewToken}
              </Button>
              <form.AuthFormSubmitButton
                isPending={verify.isPending}
                isDisabled={
                  !providerId || requestToken.isPending || verify.isPending
                }>
                {localization.verifyDomain}
              </form.AuthFormSubmitButton>
            </div>

            <span className="sr-only" aria-live="polite">
              {token && !verified
                ? localization.domainVerificationRequested
                : ''}
            </span>
          </form.AuthFormRoot>
        </form.AppForm>
      </Card.Content>
    </Card>
  )
}
