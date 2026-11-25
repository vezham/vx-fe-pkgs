import { useEffect, useMemo, useState } from 'react'

import {
  type AdditionalFieldFormValues,
  type AdditionalFields,
  fieldsWithModelValues,
  getAdditionalFieldDefaultValues,
  getAdditionalFieldSubmitValues,
  validateStringLength
} from '@vezham/auth-ui-core'
import type { OrganizationTeamsAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useAddTeamMember,
  useCreateTeam,
  useHasPermission,
  useListOrganizationMembers,
  useListTeamMembers,
  useListTeams,
  useListUserTeams,
  useRemoveTeam,
  useRemoveTeamMember,
  useUpdateTeam
} from '@vezham/auth-ui-react/plugins/organization'
import {
  AddCircle as CirclePlus,
  Pen as Pencil,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Card,
  Input,
  Label,
  ListBox,
  Select,
  Spinner,
  TextField,
  toast
} from '@vezham/react-v3'

import {
  getAuthAdditionalFieldValidators,
  isAuthFormFieldInvalid,
  useAuthForm
} from '../../auth-form'

type Team = { id: string; name: string; [key: string]: unknown }

type TeamFormValue = {
  additionalFields: AdditionalFieldFormValues
  name: string
}

const useTeamForm = <TFormData extends TeamFormValue>(options: {
  defaultValues: TFormData
  onSubmit: (props: { value: TFormData }) => Promise<void>
}) => useAuthForm(options)

type TeamFormApi = ReturnType<typeof useTeamForm<TeamFormValue>>

type TeamMemberLabels = {
  addTeamMember: string
  removeTeamMember: string
  teamMemberLimitReached: string
  teamMembers: string
}

const submitTeamForm = async ({
  canUpdate,
  configuredFields,
  createTeam,
  organizationId,
  team,
  teamLimitReached,
  updateTeam,
  value
}: {
  canUpdate: boolean
  configuredFields: AdditionalFields
  createTeam: ReturnType<typeof useCreateTeam>['mutateAsync']
  organizationId: string
  team?: Team
  teamLimitReached: boolean
  updateTeam: ReturnType<typeof useUpdateTeam>['mutateAsync']
  value: TeamFormValue
}) => {
  const name = value.name.trim()
  if (!name || !organizationId || (!team && teamLimitReached)) return
  if (team && !canUpdate) return

  const data = {
    ...getAdditionalFieldSubmitValues(configuredFields, value.additionalFields),
    name,
    organizationId
  }

  try {
    if (team) await updateTeam({ teamId: team.id, data })
    else await createTeam(data)
  } catch {
    // vx-bot/NOTE: The mutation reports the error through its configured handler.
  }
}

const TeamsList = ({
  isPending,
  labels,
  onManage,
  teams
}: {
  isPending: boolean
  labels: {
    manage: string
    noTeams: string
    noTeamsDescription: string
    team: string
  }
  onManage: (team: Team) => void
  teams: Team[]
}) => {
  if (isPending) return <Spinner />
  if (!teams.length) {
    return (
      <Card>
        <Card.Content className="gap-1">
          <p className="text-sm font-medium">{labels.noTeams}</p>
          <p className="text-muted text-sm">{labels.noTeamsDescription}</p>
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Content className="gap-0 p-0">
        {teams.map(team => (
          <div
            className="flex items-center justify-between gap-4 border-b px-4 py-3 last:border-b-0"
            key={team.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{team.name}</p>
              <p className="text-muted text-sm">{labels.team}</p>
            </div>
            <Button onPress={() => onManage(team)} size="sm" variant="outline">
              <Pencil size={16} />
              {labels.manage}
            </Button>
          </div>
        ))}
      </Card.Content>
    </Card>
  )
}

const TeamMembersPanel = ({
  addPending,
  canAddMember,
  canRemoveMember,
  isAddPermissionPending,
  isRemovePermissionPending,
  isPending,
  labels,
  memberLimitReached,
  onAdd,
  onRemove,
  onUserIdChange,
  organizationMembers,
  removePending,
  teamMembers,
  userId
}: {
  addPending: boolean
  canAddMember: boolean
  canRemoveMember: boolean
  isAddPermissionPending: boolean
  isRemovePermissionPending: boolean
  isPending: boolean
  labels: TeamMemberLabels
  memberLimitReached: boolean
  onAdd: () => void
  onRemove: (userId: string) => void
  onUserIdChange: (userId: string) => void
  organizationMembers: Array<{
    userId: string
    user: { name: string; email: string }
  }>
  removePending: boolean
  teamMembers: Array<{ id: string; userId: string }>
  userId?: string
}) => (
  <div className="flex flex-col gap-4 border-t pt-5">
    <div>
      <h3 className="text-sm font-medium">{labels.teamMembers}</h3>
      <p className="text-muted text-sm">{labels.addTeamMember}</p>
    </div>
    {(isAddPermissionPending || canAddMember) && (
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-end">
        <Select
          className="flex-1"
          isDisabled={isAddPermissionPending || memberLimitReached}
          onChange={value => onUserIdChange(String(value))}
          value={userId}>
          <Label>{labels.addTeamMember}</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {organizationMembers
                .filter(
                  member =>
                    !teamMembers.some(
                      teamMember => teamMember.userId === member.userId
                    )
                )
                .map(member => (
                  <ListBox.Item
                    id={member.userId}
                    key={member.userId}
                    textValue={member.user.name || member.user.email}>
                    {member.user.name || member.user.email}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Button
          isDisabled={
            isAddPermissionPending ||
            !userId ||
            addPending ||
            memberLimitReached
          }
          onPress={onAdd}
          type="button">
          <CirclePlus size={16} />
          {labels.addTeamMember}
        </Button>
      </div>
    )}
    {canAddMember && memberLimitReached ? (
      <p className="text-danger text-sm" role="alert">
        {labels.teamMemberLimitReached}
      </p>
    ) : null}
    <div className="flex flex-col gap-2">
      {isPending ? <Spinner /> : null}
      {teamMembers.map(teamMember => {
        const member = organizationMembers.find(
          candidate => candidate.userId === teamMember.userId
        )
        return (
          <div
            className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
            key={teamMember.id}>
            <span className="truncate text-sm">
              {member?.user.name || member?.user.email || teamMember.userId}
            </span>
            {(isRemovePermissionPending || canRemoveMember) && (
              <Button
                aria-label={labels.removeTeamMember}
                isDisabled={isRemovePermissionPending || removePending}
                isIconOnly
                onPress={() => onRemove(teamMember.userId)}
                size="sm"
                type="button"
                variant="tertiary">
                <TrashBin size={16} />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  </div>
)

const TeamDialogMemberPanel = ({
  addMember,
  canAddMember,
  canListMembers,
  canRemoveMember,
  labels,
  memberLimitReached,
  organizationMembers,
  removeMember,
  setUserId,
  team,
  teamMembers,
  userId,
  organizationId
}: {
  addMember: ReturnType<typeof useAddTeamMember>
  canAddMember: ReturnType<typeof useHasPermission>
  canListMembers: boolean
  canRemoveMember: ReturnType<typeof useHasPermission>
  labels: TeamMemberLabels
  memberLimitReached: boolean
  organizationMembers: Array<{
    userId: string
    user: { name: string; email: string }
  }>
  removeMember: ReturnType<typeof useRemoveTeamMember>
  setUserId: (userId: string | undefined) => void
  team?: Team
  teamMembers: ReturnType<typeof useListTeamMembers>
  userId?: string
  organizationId: string
}) => {
  if (!team || !canListMembers) return null

  return (
    <TeamMembersPanel
      addPending={addMember.isPending}
      canAddMember={canAddMember.data?.success === true}
      canRemoveMember={canRemoveMember.data?.success === true}
      isAddPermissionPending={canAddMember.isPending}
      isRemovePermissionPending={canRemoveMember.isPending}
      isPending={teamMembers.isPending}
      labels={labels}
      memberLimitReached={memberLimitReached}
      onAdd={() => {
        if (!canAddMember.data?.success || !userId) return
        addMember.mutate({ teamId: team.id, userId, organizationId })
      }}
      onRemove={memberUserId => {
        if (!canRemoveMember.data?.success) return
        removeMember.mutate({
          teamId: team.id,
          userId: memberUserId,
          organizationId
        })
      }}
      onUserIdChange={setUserId}
      organizationMembers={organizationMembers}
      removePending={removeMember.isPending}
      teamMembers={teamMembers.data ?? []}
      userId={userId}
    />
  )
}

const TeamNameField = ({
  canEdit,
  form,
  isPending,
  label,
  requiredMessage
}: {
  canEdit: boolean
  form: TeamFormApi
  isPending: boolean
  label: string
  requiredMessage: string
}) => (
  <form.AppField
    name="name"
    validators={{
      onChange: ({ value }) =>
        validateStringLength(value, { requiredMessage, trim: true })
    }}>
    {field => (
      <TextField
        isDisabled={isPending || !canEdit}
        isInvalid={isAuthFormFieldInvalid(field.state.meta)}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={field.handleChange}>
        <Label>{label}</Label>
        <Input variant="secondary" />
        <field.AuthFormFieldError />
      </TextField>
    )}
  </form.AppField>
)

const TeamAdditionalFields = ({
  canEdit,
  fields,
  form,
  isPending,
  optionalLabel,
  requiredMessage
}: {
  canEdit: boolean
  fields: AdditionalFields
  form: TeamFormApi
  isPending: boolean
  optionalLabel: string
  requiredMessage: string
}) => (
  <>
    {fields.map(fieldConfig => (
      <form.AppField
        key={fieldConfig.name}
        name={`additionalFields.${fieldConfig.name}`}
        validators={getAuthAdditionalFieldValidators(
          fieldConfig,
          requiredMessage
        )}>
        {field => (
          <field.AuthFormAdditionalField
            field={fieldConfig}
            isPending={isPending || !canEdit}
            optionalLabel={optionalLabel}
          />
        )}
      </form.AppField>
    ))}
  </>
)

const useResetTeamSelection = (
  isOpen: boolean,
  teamId: string | undefined,
  resetSelection: () => void
) => {
  const [previousTeam, setPreviousTeam] = useState({ isOpen, id: teamId })
  if (previousTeam.isOpen !== isOpen || previousTeam.id !== teamId) {
    setPreviousTeam({ isOpen, id: teamId })
    resetSelection()
  }
}

const useResetTeamFormOnOpen = (
  form: TeamFormApi,
  isOpen: boolean,
  configuredFields: AdditionalFields,
  teamName: string | undefined
) => {
  useEffect(() => {
    if (!isOpen) return
    form.reset({
      additionalFields: getAdditionalFieldDefaultValues(configuredFields),
      name: teamName ?? ''
    })
  }, [configuredFields, form, isOpen, teamName])
}

const TeamDialogHeading = ({
  labels,
  team
}: {
  labels: { createTeam: string; renameTeam: string }
  team?: Team
}) => (
  <AlertDialog.Header>
    <AlertDialog.Icon status="default">
      {team ? <Pencil size={16} /> : <CirclePlus size={16} />}
    </AlertDialog.Icon>
    <AlertDialog.Heading>
      {team ? labels.renameTeam : labels.createTeam}
    </AlertDialog.Heading>
  </AlertDialog.Header>
)

const TeamRemovalNotice = ({
  canDelete,
  canRemoveTeam,
  message,
  team
}: {
  canDelete: boolean
  canRemoveTeam: boolean
  message: string
  team?: Team
}) =>
  team && !canRemoveTeam && canDelete ? (
    <p className="text-muted text-sm">{message}</p>
  ) : null

const TeamDialogFooter = ({
  canDelete,
  canDeletePending,
  canEdit,
  canRemoveTeam,
  form,
  labels,
  onCancel,
  onDelete,
  pending,
  removePending,
  team,
  teamLimitReached
}: {
  canDelete: boolean
  canDeletePending: boolean
  canEdit: boolean
  canRemoveTeam: boolean
  form: TeamFormApi
  labels: {
    cancel: string
    createTeam: string
    deleteTeam: string
    saveChanges: string
  }
  onCancel: () => void
  onDelete: () => void
  pending: boolean
  removePending: boolean
  team?: Team
  teamLimitReached: boolean
}) => (
  <AlertDialog.Footer>
    {team && (canDeletePending || canDelete) ? (
      <Button
        isDisabled={canDeletePending || removePending || !canRemoveTeam}
        onPress={onDelete}
        type="button"
        variant="danger-soft">
        <TrashBin size={16} />
        {labels.deleteTeam}
      </Button>
    ) : null}
    <Button
      isDisabled={pending}
      slot="close"
      variant="tertiary"
      onPress={onCancel}>
      {labels.cancel}
    </Button>
    {canEdit ? (
      <form.AuthFormSubmitButton
        isDisabled={pending || (teamLimitReached && !team)}>
        {team ? labels.saveChanges : labels.createTeam}
      </form.AuthFormSubmitButton>
    ) : null}
  </AlertDialog.Footer>
)

export const OrganizationTeams = () => {
  const { authClient } = useAuth<OrganizationTeamsAuthClient>()
  const client = authClient
  const { data: activeOrganization } = useActiveOrganization(client)
  const { data: session } = useSession(client)
  const {
    localization: labels,
    modelFields,
    teamPolicy
  } = useAuthPlugin(organizationPlugin)
  const teams = useListTeams(client, {
    query: { organizationId: activeOrganization?.id }
  })
  const members = useListOrganizationMembers(client)
  const userTeams = useListUserTeams(client, {
    query: { organizationId: activeOrganization?.id ?? '' }
  })
  const userTeamIds = new Set(userTeams.data?.map(team => team.id))
  const activeTeamId = (
    session?.session as { activeTeamId?: string | null } | undefined
  )?.activeTeamId
  const canCreate = useHasPermission(client, {
    organizationId: activeOrganization?.id,
    permissions: { team: ['create'] }
  })
  const teamLimitReached =
    teamPolicy.maximumTeams !== undefined &&
    (teams.data?.length ?? 0) >= teamPolicy.maximumTeams
  const [dialogTeam, setDialogTeam] = useState<Team | null>()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-sm font-semibold">{labels.teams}</h2>
          <p className="text-muted text-sm">{labels.teamsDescription}</p>
        </div>
        {(canCreate.isPending || canCreate.data?.success) && (
          <Button
            isDisabled={canCreate.isPending || teamLimitReached}
            onPress={() => setDialogTeam(null)}>
            <CirclePlus size={16} />
            {labels.createTeam}
          </Button>
        )}
      </div>

      {teamLimitReached && canCreate.data?.success && (
        <p className="text-danger text-sm" role="alert">
          {labels.teamLimitReached}
        </p>
      )}

      <TeamsList
        isPending={teams.isPending}
        labels={labels}
        onManage={setDialogTeam}
        teams={teams.data ?? []}
      />

      <TeamDialog
        activeTeamId={activeTeamId}
        allowRemovingAllTeams={teamPolicy.allowRemovingAllTeams}
        canListMembers={dialogTeam ? userTeamIds.has(dialogTeam.id) : false}
        isOpen={dialogTeam !== undefined}
        maximumMembersPerTeam={teamPolicy.maximumMembersPerTeam}
        onOpenChange={open => !open && setDialogTeam(undefined)}
        organizationId={activeOrganization?.id ?? ''}
        organizationMembers={members.data?.members ?? []}
        team={dialogTeam ?? undefined}
        teamCount={teams.data?.length ?? 0}
        teamFields={modelFields.team}
        teamLimitReached={teamLimitReached}
      />
    </div>
  )
}

function TeamDialog({
  activeTeamId,
  allowRemovingAllTeams,
  canListMembers,
  isOpen,
  maximumMembersPerTeam,
  onOpenChange,
  organizationId,
  organizationMembers,
  team,
  teamCount,
  teamFields,
  teamLimitReached
}: {
  activeTeamId?: string | null
  allowRemovingAllTeams: boolean
  canListMembers: boolean
  isOpen: boolean
  maximumMembersPerTeam?: number
  onOpenChange: (open: boolean) => void
  organizationId: string
  organizationMembers: Array<{
    userId: string
    user: { name: string; email: string }
  }>
  team?: Team
  teamCount: number
  teamFields: AdditionalFields
  teamLimitReached: boolean
}) {
  const { authClient, localization } = useAuth<OrganizationTeamsAuthClient>()
  const client = authClient
  const { localization: labels } = useAuthPlugin(organizationPlugin)
  const teamMembers = useListTeamMembers(client, {
    query: { teamId: team?.id ?? '' },
    enabled: isOpen && !!team && canListMembers
  })
  const canUpdate = useHasPermission(client, {
    organizationId,
    permissions: { team: ['update'] }
  })
  const canDelete = useHasPermission(client, {
    organizationId,
    permissions: { team: ['delete'] }
  })
  const canAddMember = useHasPermission(client, {
    organizationId,
    permissions: { member: ['update'] }
  })
  const canRemoveMember = useHasPermission(client, {
    organizationId,
    permissions: { member: ['delete'] }
  })
  const [userId, setUserId] = useState<string>()
  useResetTeamSelection(isOpen, team?.id, () => setUserId(undefined))
  const createTeam = useCreateTeam(client, {
    onSuccess: () => {
      toast.success(labels.teamCreated)
      onOpenChange(false)
    }
  })
  const updateTeam = useUpdateTeam(client, {
    onSuccess: () => {
      toast.success(labels.teamUpdated)
      onOpenChange(false)
    }
  })
  const removeTeam = useRemoveTeam(client, {
    onSuccess: () => {
      toast.success(labels.teamDeleted)
      onOpenChange(false)
    }
  })
  const addMember = useAddTeamMember(client, {
    onSuccess: () => setUserId(undefined)
  })
  const removeMember = useRemoveTeamMember(client)
  const memberLimitReached =
    maximumMembersPerTeam !== undefined &&
    (teamMembers.data?.length ?? 0) >= maximumMembersPerTeam
  const isActiveTeam = activeTeamId === team?.id
  const canRemoveFinalTeam = allowRemovingAllTeams || teamCount > 1
  const canRemoveTeam = canRemoveFinalTeam && !isActiveTeam
  const teamRemovalDisabledReason = isActiveTeam
    ? labels.activeTeamRemovalDisabled
    : labels.lastTeamRemovalDisabled

  const configuredTeamFields = useMemo(
    () => fieldsWithModelValues(teamFields, team ?? {}),
    [team, teamFields]
  )
  const form = useTeamForm({
    defaultValues: {
      additionalFields: getAdditionalFieldDefaultValues(configuredTeamFields),
      name: team?.name ?? ''
    },
    onSubmit: async ({ value }) =>
      submitTeamForm({
        canUpdate: canUpdate.data?.success === true,
        configuredFields: configuredTeamFields,
        createTeam: createTeam.mutateAsync,
        organizationId,
        team,
        teamLimitReached,
        updateTeam: updateTeam.mutateAsync,
        value
      })
  })

  useResetTeamFormOnOpen(form, isOpen, configuredTeamFields, team?.name)

  const pending = createTeam.isPending || updateTeam.isPending
  const canEdit = !team || canUpdate.data?.success === true

  return (
    <AlertDialog.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="max-w-xl">
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />
              <TeamDialogHeading labels={labels} team={team} />

              <AlertDialog.Body className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto">
                <p className="text-muted text-sm">{labels.teamsDescription}</p>

                <TeamNameField
                  canEdit={canEdit}
                  form={form}
                  isPending={pending}
                  label={labels.name}
                  requiredMessage={localization.auth.fieldRequired}
                />

                <TeamAdditionalFields
                  canEdit={canEdit}
                  fields={configuredTeamFields}
                  form={form}
                  isPending={pending}
                  optionalLabel={localization.settings.optional}
                  requiredMessage={localization.auth.fieldRequired}
                />

                <TeamDialogMemberPanel
                  addMember={addMember}
                  canAddMember={canAddMember}
                  canListMembers={canListMembers}
                  canRemoveMember={canRemoveMember}
                  labels={labels}
                  memberLimitReached={memberLimitReached}
                  organizationMembers={organizationMembers}
                  removeMember={removeMember}
                  setUserId={setUserId}
                  team={team}
                  teamMembers={teamMembers}
                  userId={userId}
                  organizationId={organizationId}
                />

                <TeamRemovalNotice
                  canDelete={canDelete.data?.success === true}
                  canRemoveTeam={canRemoveTeam}
                  message={teamRemovalDisabledReason}
                  team={team}
                />
              </AlertDialog.Body>

              <TeamDialogFooter
                canDelete={canDelete.data?.success === true}
                canDeletePending={canDelete.isPending}
                canEdit={canEdit}
                canRemoveTeam={canRemoveTeam}
                form={form}
                labels={{
                  cancel: localization.settings.cancel,
                  createTeam: labels.createTeam,
                  deleteTeam: labels.deleteTeam,
                  saveChanges: localization.settings.saveChanges
                }}
                onCancel={() => onOpenChange(false)}
                onDelete={() => {
                  if (!team) return
                  removeTeam.mutate({ teamId: team.id, organizationId })
                }}
                pending={pending}
                removePending={removeTeam.isPending}
                team={team}
                teamLimitReached={teamLimitReached}
              />
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
