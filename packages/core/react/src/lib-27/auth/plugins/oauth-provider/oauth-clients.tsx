'use client'

import { useMemo, useState } from 'react'

import {
  validateAbsoluteUrlList,
  validateStringLength
} from '@vezham/auth-ui-core'
import {
  type ManagedOAuthClient,
  type OAuthClientInput,
  type OAuthClientManager,
  type OAuthClientOwner,
  type OAuthProviderAuthClient,
  createBetterAuthOAuthClientManager,
  oauthProviderPlugin
} from '@vezham/auth-ui-core/plugins/oauth-provider'
import {
  useAuth,
  useAuthPlugin,
  useCopyToClipboard,
  useSession
} from '@vezham/auth-ui-react'
import {
  useCreateOAuthClient,
  useDeleteOAuthClient,
  useOAuthClients,
  useRotateOAuthClientSecret,
  useSetOAuthClientDisabled,
  useUpdateOAuthClient
} from '@vezham/auth-ui-react/plugins/oauth-provider'
import {
  Refresh as ArrowRotateLeft,
  CheckRead as Check,
  AddCircle as CirclePlus,
  Code,
  Copy,
  Pen as Pencil,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Card,
  type CardProps,
  Input,
  InputGroup,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  Switch,
  TextArea,
  TextField,
  cn,
  toast
} from '@vezham/react-v3'

import { isAuthFormFieldInvalid, useAuthForm } from '../../auth-form'

type ClientAction =
  | { kind: 'delete'; client: ManagedOAuthClient }
  | { kind: 'rotate'; client: ManagedOAuthClient }

type OAuthClientFormValues = {
  applicationType: 'native' | 'web'
  clientName: string
  clientUri: string
  logoUri: string
  redirectUris: string
  scope: string
}

export type OAuthClientsProps = {
  manager: OAuthClientManager
  owner: OAuthClientOwner
  ownerKey?: string
  className?: string
  variant?: CardProps['variant']
}

const lines = (value: string) =>
  Array.from(
    new Set(
      value
        .split(/\r?\n/)
        .map(entry => entry.trim())
        .filter(Boolean)
    )
  )

const getOAuthClientFormValues = (
  client?: ManagedOAuthClient
): OAuthClientFormValues => ({
  applicationType: client?.application_type === 'native' ? 'native' : 'web',
  clientName: client?.client_name ?? '',
  clientUri: client?.client_uri ?? '',
  logoUri: client?.logo_uri ?? '',
  redirectUris: client?.redirect_uris.join('\n') ?? '',
  scope: client?.scope ?? ''
})

const useOAuthClientForm = (options: {
  defaultValues: OAuthClientFormValues
  onSubmit: (props: { value: OAuthClientFormValues }) => Promise<void>
}) => useAuthForm(options)

type OAuthClientFormApi = ReturnType<typeof useOAuthClientForm>

type OAuthClientListLabels = {
  application: string
  createClient: string
  deleteClient: string
  disabled: string
  editClient: string
  enabled: string
  noOAuthClients: string
  noOAuthClientsDescription: string
  redirectUrls: string
  rotateSecret: string
}

const OAuthClientRow = ({
  client,
  labels,
  managerCanSetDisabled,
  togglePending,
  onDelete,
  onEdit,
  onRotate,
  onToggle
}: {
  client: ManagedOAuthClient
  labels: OAuthClientListLabels
  managerCanSetDisabled: boolean
  togglePending: boolean
  onDelete: (client: ManagedOAuthClient) => void
  onEdit: (client: ManagedOAuthClient) => void
  onRotate: (client: ManagedOAuthClient) => void
  onToggle: (clientId: string, disabled: boolean) => void
}) => (
  <div className="flex flex-col gap-3 border-b border-dashed pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
    <div className="flex min-w-0 gap-3">
      <div className="bg-surface-secondary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Code size={16} className="size-4" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium">
            {client.client_name || labels.application}
          </p>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              client.disabled
                ? 'bg-danger-soft text-danger-soft-foreground'
                : 'bg-success-soft text-success-soft-foreground'
            )}>
            {client.disabled ? labels.disabled : labels.enabled}
          </span>
        </div>
        <p className="text-muted mt-1 truncate font-mono text-xs">
          {client.client_id}
        </p>
        <p className="text-muted mt-1 text-xs">
          {client.redirect_uris.length} {labels.redirectUrls.toLowerCase()}
        </p>
      </div>
    </div>
    <div className="flex shrink-0 flex-wrap items-center gap-1">
      {managerCanSetDisabled ? (
        <Switch
          aria-label={`${client.client_name || client.client_id}: ${
            client.disabled ? labels.disabled : labels.enabled
          }`}
          size="sm"
          isSelected={!client.disabled}
          isDisabled={togglePending}
          onChange={enabled => onToggle(client.client_id, !enabled)}>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      ) : null}
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label={labels.editClient}
        onPress={() => onEdit(client)}>
        <Pencil size={16} />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label={labels.rotateSecret}
        onPress={() => onRotate(client)}>
        <ArrowRotateLeft size={16} />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label={labels.deleteClient}
        onPress={() => onDelete(client)}>
        <TrashBin size={16} />
      </Button>
    </div>
  </div>
)

const OAuthClientList = ({
  clients,
  isPending,
  labels,
  managerCanSetDisabled,
  togglePending,
  onCreate,
  onDelete,
  onEdit,
  onRotate,
  onToggle
}: {
  clients: ManagedOAuthClient[]
  isPending: boolean
  labels: OAuthClientListLabels
  managerCanSetDisabled: boolean
  togglePending: boolean
  onCreate: () => void
  onDelete: (client: ManagedOAuthClient) => void
  onEdit: (client: ManagedOAuthClient) => void
  onRotate: (client: ManagedOAuthClient) => void
  onToggle: (clientId: string, disabled: boolean) => void
}) => {
  if (isPending) {
    return (
      <div className="flex min-h-28 items-center justify-center">
        <Spinner aria-label={labels.application} />
      </div>
    )
  }

  if (!clients.length) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
        <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
          <Code size={16} />
        </div>
        <div className="flex max-w-sm flex-col gap-1">
          <p className="text-sm font-medium">{labels.noOAuthClients}</p>
          <p className="text-muted text-sm">
            {labels.noOAuthClientsDescription}
          </p>
        </div>
        <Button size="sm" variant="outline" onPress={onCreate}>
          {labels.createClient}
        </Button>
      </div>
    )
  }

  return (
    <>
      {clients.map(client => (
        <OAuthClientRow
          key={client.client_id}
          client={client}
          labels={labels}
          managerCanSetDisabled={managerCanSetDisabled}
          togglePending={togglePending}
          onDelete={onDelete}
          onEdit={onEdit}
          onRotate={onRotate}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

type OAuthClientEditorLabels = {
  applicationType: string
  applicationUrl: string
  cancel: string
  clientName: string
  createClient: string
  editClient: string
  invalidUrl: string
  logoUrl: string
  nativeApplication: string
  redirectUrls: string
  redirectUrlsDescription: string
  saveChanges: string
  scopes: string
  webApplication: string
}

const OAuthClientEditor = ({
  form,
  isOpen,
  isEditing,
  labels,
  requiredMessage,
  onOpenChange
}: {
  form: OAuthClientFormApi
  isOpen: boolean
  isEditing: boolean
  labels: OAuthClientEditorLabels
  requiredMessage: string
  onOpenChange: (open: boolean) => void
}) => (
  <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
    <Modal.Container>
      <Modal.Dialog>
        <form.AppForm>
          <form.AuthFormRoot>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon>
                {isEditing ? <Pencil size={16} /> : <CirclePlus size={16} />}
              </Modal.Icon>
              <Modal.Heading>
                {isEditing ? labels.editClient : labels.createClient}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4 overflow-visible">
              <form.AppField
                name="clientName"
                validators={{
                  onChange: ({ value }) =>
                    validateStringLength(value, {
                      requiredMessage,
                      trim: true
                    })
                }}>
                {field => (
                  <TextField
                    isRequired
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    value={field.state.value}
                    isInvalid={
                      isAuthFormFieldInvalid(field.state.meta) || undefined
                    }
                    validationBehavior="aria">
                    <Label>{labels.clientName}</Label>
                    <Input variant="secondary" />
                    <field.AuthFormFieldError />
                  </TextField>
                )}
              </form.AppField>
              <form.Field name="applicationType">
                {field => (
                  <Select
                    name={field.name}
                    onChange={value =>
                      field.handleChange(value === 'native' ? 'native' : 'web')
                    }
                    value={field.state.value}
                    variant="secondary">
                    <Label>{labels.applicationType}</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="web">
                          {labels.webApplication}
                        </ListBox.Item>
                        <ListBox.Item id="native">
                          {labels.nativeApplication}
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                )}
              </form.Field>
              <form.AppField
                name="redirectUris"
                validators={{
                  onChange: ({ value }) =>
                    validateAbsoluteUrlList(value, {
                      invalidMessage: labels.invalidUrl,
                      requiredMessage
                    })
                }}>
                {field => (
                  <TextField
                    isRequired
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    value={field.state.value}
                    isInvalid={
                      isAuthFormFieldInvalid(field.state.meta) || undefined
                    }
                    validationBehavior="aria">
                    <Label>{labels.redirectUrls}</Label>
                    <TextArea rows={3} variant="secondary" />
                    <p className="text-muted text-xs">
                      {labels.redirectUrlsDescription}
                    </p>
                    <field.AuthFormFieldError />
                  </TextField>
                )}
              </form.AppField>
              {(
                [
                  ['clientUri', labels.applicationUrl, 'url'],
                  ['logoUri', labels.logoUrl, 'url'],
                  ['scope', labels.scopes, 'text']
                ] as const
              ).map(([name, label, type]) => (
                <form.Field key={name} name={name}>
                  {field => (
                    <TextField
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      value={field.state.value}>
                      <Label>{label}</Label>
                      <Input
                        placeholder={
                          name === 'scope' ? 'openid profile email' : undefined
                        }
                        type={type}
                        variant="secondary"
                      />
                    </TextField>
                  )}
                </form.Field>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onPress={() => onOpenChange(false)}>
                {labels.cancel}
              </Button>
              <form.AuthFormSubmitButton>
                {isEditing ? labels.saveChanges : labels.createClient}
              </form.AuthFormSubmitButton>
            </Modal.Footer>
          </form.AuthFormRoot>
        </form.AppForm>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
)

export const OAuthClients = ({
  manager,
  owner,
  ownerKey,
  className,
  variant
}: OAuthClientsProps) => {
  const { localization: oauthLocalization } = useAuthPlugin(oauthProviderPlugin)
  const { localization } = useAuth()
  const clients = useOAuthClients(manager, owner, ownerKey)
  const createClient = useCreateOAuthClient(manager, owner, ownerKey)
  const updateClient = useUpdateOAuthClient(manager, owner, ownerKey)
  const deleteClient = useDeleteOAuthClient(manager, owner, ownerKey)
  const rotateSecret = useRotateOAuthClientSecret(manager, owner, ownerKey)
  const setDisabled = useSetOAuthClientDisabled(manager, owner, ownerKey)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<ManagedOAuthClient>()
  const [action, setAction] = useState<ClientAction>()
  const [secret, setSecret] = useState<ManagedOAuthClient>()
  const { copied, copy, reset } = useCopyToClipboard({
    onError: error => {
      console.error('[Vezham Auth] Copy failed', error)
      toast.danger(localization.errors.copyFailed)
    }
  })
  const form = useOAuthClientForm({
    defaultValues: getOAuthClientFormValues(),
    onSubmit: async ({ value }) => {
      const input: OAuthClientInput = {
        client_name: value.clientName.trim(),
        application_type: value.applicationType,
        redirect_uris: lines(value.redirectUris),
        client_uri: value.clientUri.trim() || undefined,
        logo_uri: value.logoUri.trim() || undefined,
        scope: value.scope.trim() || undefined
      }

      try {
        if (editingClient) {
          await updateClient.mutateAsync({
            clientId: editingClient.client_id,
            update: input
          })
          setEditorOpen(false)
          return
        }

        const client = await createClient.mutateAsync(input)
        setEditorOpen(false)
        setSecret(client)
      } catch {
        // vx-bot/NOTE: The mutation keeps its error state for the host application.
      }
    }
  })

  const openCreate = () => {
    setEditingClient(undefined)
    form.reset(getOAuthClientFormValues())
    setEditorOpen(true)
  }

  const openEdit = (client: ManagedOAuthClient) => {
    setEditingClient(client)
    form.reset(getOAuthClientFormValues(client))
    setEditorOpen(true)
  }

  const confirmAction = () => {
    if (!action) return

    if (action.kind === 'delete') {
      deleteClient.mutate(action.client.client_id, {
        onSuccess: () => setAction(undefined)
      })
      return
    }

    rotateSecret.mutate(action.client.client_id, {
      onSuccess: client => {
        setAction(undefined)
        setSecret(client)
      }
    })
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="truncate text-sm font-semibold">
            {oauthLocalization.oauthClients}
          </h2>
          <p className="text-muted text-sm">
            {oauthLocalization.oauthClientsDescription}
          </p>
        </div>
        <Button
          className="shrink-0"
          size="sm"
          onPress={openCreate}
          isDisabled={clients.isPending}>
          <CirclePlus size={16} />
          {oauthLocalization.createClient}
        </Button>
      </div>

      <Card variant={variant}>
        <Card.Content className="flex flex-col gap-4">
          <OAuthClientList
            clients={clients.data ?? []}
            isPending={clients.isPending}
            labels={oauthLocalization}
            managerCanSetDisabled={Boolean(manager.setDisabled)}
            togglePending={setDisabled.isPending}
            onCreate={openCreate}
            onDelete={client => setAction({ kind: 'delete', client })}
            onEdit={openEdit}
            onRotate={client => setAction({ kind: 'rotate', client })}
            onToggle={(clientId, disabled) =>
              setDisabled.mutate({ clientId, disabled })
            }
          />
        </Card.Content>
      </Card>

      <OAuthClientEditor
        form={form}
        isOpen={editorOpen}
        isEditing={Boolean(editingClient)}
        labels={oauthLocalization}
        requiredMessage={localization.auth.fieldRequired}
        onOpenChange={setEditorOpen}
      />

      <AlertDialog.Backdrop
        isOpen={Boolean(action)}
        onOpenChange={open => !open && setAction(undefined)}>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                {action?.kind === 'delete' ? (
                  <TrashBin size={16} />
                ) : (
                  <ArrowRotateLeft size={16} />
                )}
              </AlertDialog.Icon>
              <AlertDialog.Heading>
                {action?.kind === 'delete'
                  ? oauthLocalization.deleteClientTitle
                  : oauthLocalization.rotateSecretTitle}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              {action?.kind === 'delete'
                ? oauthLocalization.deleteClientDescription
                : oauthLocalization.rotateSecretDescription}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="ghost" onPress={() => setAction(undefined)}>
                {oauthLocalization.cancel}
              </Button>
              <Button
                variant="danger"
                isPending={deleteClient.isPending || rotateSecret.isPending}
                onPress={confirmAction}>
                {action?.kind === 'delete'
                  ? oauthLocalization.deleteClient
                  : oauthLocalization.rotateSecret}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>

      <Modal.Backdrop
        isOpen={Boolean(secret)}
        onOpenChange={open => {
          if (!open) {
            setSecret(undefined)
            reset()
          }
        }}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon>
                <Code size={16} />
              </Modal.Icon>
              <Modal.Heading>
                {secret?.client_name || oauthLocalization.clientSecret}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4 overflow-visible">
              <p className="text-muted text-sm">
                {oauthLocalization.clientSecretWarning}
              </p>
              <TextField value={secret?.client_id ?? ''}>
                <Label>{oauthLocalization.clientId}</Label>
                <Input
                  readOnly
                  className="font-mono text-xs"
                  variant="secondary"
                />
              </TextField>
              <TextField value={secret?.client_secret ?? ''}>
                <Label>{oauthLocalization.clientSecret}</Label>
                <InputGroup variant="secondary">
                  <InputGroup.Input readOnly className="font-mono text-xs" />
                  <InputGroup.Suffix className="px-0">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      aria-label={
                        copied
                          ? localization.settings.copiedToClipboard
                          : localization.settings.copyToClipboard
                      }
                      onPress={() =>
                        void (
                          secret?.client_secret && copy(secret.client_secret)
                        )
                      }>
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onPress={() => {
                  setSecret(undefined)
                  reset()
                }}>
                {oauthLocalization.continue}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  )
}

export const UserOAuthClients = (
  props: Omit<OAuthClientsProps, 'manager' | 'owner' | 'ownerKey'>
) => {
  const { authClient } = useAuth<OAuthProviderAuthClient>()
  const { clientManager } = useAuthPlugin(oauthProviderPlugin)
  const { data: session } = useSession(authClient)
  const defaultManager = useMemo(
    () => createBetterAuthOAuthClientManager(authClient),
    [authClient]
  )

  return (
    <OAuthClients
      {...props}
      manager={clientManager ?? defaultManager}
      owner={{ type: 'user' }}
      ownerKey={session?.user.id}
    />
  )
}

export const OrganizationOAuthClients = ({
  organizationId,
  organizationSlug,
  ...props
}: Omit<OAuthClientsProps, 'manager' | 'owner' | 'ownerKey'> & {
  organizationId: string
  organizationSlug: string
}) => {
  const { organizationClientManager } = useAuthPlugin(oauthProviderPlugin)

  if (!organizationClientManager) return null

  return (
    <OAuthClients
      {...props}
      manager={organizationClientManager}
      owner={{ type: 'organization', organizationId, organizationSlug }}
      ownerKey={`organization:${organizationId}:${organizationSlug}`}
    />
  )
}
