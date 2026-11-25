import type { ReactNode } from 'react'
import { useState } from 'react'

import { formatAdditionalFieldValue } from '@vezham/auth-ui-core'
import {
  type OrganizationAuthClient,
  type OrganizationRolesAuthClient,
  type OrganizationTeamsAuthClient,
  hasMemberRole,
  memberRoleLabels,
  mergeOrganizationRoleLabels,
  organizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useHasPermission,
  useListRoles,
  useListUserTeams
} from '@vezham/auth-ui-react/plugins/organization'
import type { Member, Organization, User } from '@vezham/auth/client'
import {
  Logout as ArrowRightFromSquare,
  Pen as Pencil,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import { Button, Skeleton, Table } from '@vezham/react-v3'

import { UserView } from '../../user/user-view'
import { EditMemberRolesDialog } from './edit-member-roles-dialog'
import { LeaveOrganizationDialog } from './leave-organization-dialog'
import {
  type OrganizationSelectableRow,
  OrganizationTableSelectRow
} from './organization-table-selection'
import { RemoveMemberDialog } from './remove-member-dialog'

export type OrganizationMemberRowProps = {
  columnIds: readonly string[]
  member: Member & { user: Partial<User> }
  isOwner?: boolean
  ownerCount?: number
  organization: Organization
  selectableRow?: OrganizationSelectableRow<Member & { user: Partial<User> }>
}

type OrganizationRoleLabels = {
  changeMemberRole: string
  leaveOrganization: string
  onlyOwnerActionDisabled: string
  removeMember: string
}

const MemberRoleControls = ({
  canManageTarget,
  canUpdate,
  member,
  onlyOwnerActionDisabled,
  organization,
  protectedRole,
  roleLabels,
  roles,
  updatePending
}: {
  canManageTarget: boolean
  canUpdate: boolean
  member: Member & { user: Partial<User> }
  onlyOwnerActionDisabled: boolean
  organization: Organization
  protectedRole: string
  roleLabels: Pick<OrganizationRoleLabels, 'changeMemberRole'>
  roles: Array<[string, string]>
  updatePending: boolean
}) => {
  const [roleEditorOpen, setRoleEditorOpen] = useState(false)
  return (
    <>
      {canManageTarget && updatePending ? (
        <Button
          aria-label={roleLabels.changeMemberRole}
          isDisabled
          isIconOnly
          size="sm"
          variant="tertiary">
          <Pencil size={16} />
        </Button>
      ) : null}
      {canManageTarget && canUpdate ? (
        <Button
          aria-label={roleLabels.changeMemberRole}
          isIconOnly
          onPress={() => setRoleEditorOpen(true)}
          size="sm"
          variant="tertiary">
          <Pencil size={16} />
        </Button>
      ) : null}
      {canManageTarget && canUpdate ? (
        <EditMemberRolesDialog
          isOpen={roleEditorOpen}
          member={member}
          onOpenChange={setRoleEditorOpen}
          organizationId={organization.id}
          protectedRole={protectedRole}
          protectedRoleRemovalDisabled={onlyOwnerActionDisabled}
          roles={roles}
        />
      ) : null}
    </>
  )
}

const MemberDepartureControls = ({
  canManageTarget,
  canRemove,
  currentUser,
  deletePending,
  member,
  onlyOwnerActionDisabled,
  organization,
  roleLabels
}: {
  canManageTarget: boolean
  canRemove: boolean
  currentUser: boolean
  deletePending: boolean
  member: Member & { user: Partial<User> }
  onlyOwnerActionDisabled: boolean
  organization: Organization
  roleLabels: OrganizationRoleLabels
}) => {
  const [removeOpen, setRemoveOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)
  const disabledTitle = onlyOwnerActionDisabled
    ? roleLabels.onlyOwnerActionDisabled
    : undefined

  return (
    <>
      {currentUser ? (
        <span title={disabledTitle}>
          <Button
            isIconOnly
            size="sm"
            variant="danger-soft"
            aria-label={roleLabels.leaveOrganization}
            isDisabled={onlyOwnerActionDisabled}
            onPress={() => setLeaveOpen(true)}>
            <ArrowRightFromSquare size={16} />
          </Button>
        </span>
      ) : canManageTarget && deletePending ? (
        <Button
          aria-label={roleLabels.removeMember}
          isDisabled
          isIconOnly
          size="sm"
          variant="danger-soft">
          <TrashBin size={16} />
        </Button>
      ) : canManageTarget && canRemove ? (
        <span title={disabledTitle}>
          <Button
            isIconOnly
            size="sm"
            variant="danger-soft"
            aria-label={roleLabels.removeMember}
            isDisabled={onlyOwnerActionDisabled}
            onPress={() => setRemoveOpen(true)}>
            <TrashBin size={16} />
          </Button>
        </span>
      ) : null}
      {currentUser && !onlyOwnerActionDisabled ? (
        <LeaveOrganizationDialog
          isOpen={leaveOpen}
          onOpenChange={setLeaveOpen}
          organization={organization}
        />
      ) : canManageTarget && canRemove && !onlyOwnerActionDisabled ? (
        <RemoveMemberDialog
          isOpen={removeOpen}
          onOpenChange={setRemoveOpen}
          member={member}
        />
      ) : null}
    </>
  )
}

const MemberActionsCell = (props: {
  canManageTarget: boolean
  canRemove: boolean
  canUpdate: boolean
  currentUser: boolean
  deletePending: boolean
  member: Member & { user: Partial<User> }
  onlyOwnerActionDisabled: boolean
  organization: Organization
  protectedRole: string
  roleLabels: OrganizationRoleLabels
  roles: Array<[string, string]>
  updatePending: boolean
}) => (
  <Table.Cell key="actions">
    <div className="flex items-center justify-end gap-1">
      <MemberRoleControls {...props} />
      <MemberDepartureControls {...props} />
    </div>
  </Table.Cell>
)

export const OrganizationMemberRow = ({
  columnIds,
  member,
  isOwner,
  ownerCount,
  organization,
  selectableRow
}: OrganizationMemberRowProps) => {
  const { authClient, locale } = useAuth<
    OrganizationAuthClient &
      OrganizationRolesAuthClient &
      OrganizationTeamsAuthClient
  >()
  const {
    modelFields: { member: memberFields },
    creatorRole,
    dynamicAccessControl,
    localization: organizationLocalization,
    roles
  } = useAuthPlugin(organizationPlugin)

  const { data: session } = useSession(authClient)
  const canReadRoles = useHasPermission(authClient, {
    organizationId: organization.id,
    permissions: { ac: ['read'] }
  })
  const dynamicRoles = useListRoles(authClient, {
    query: { organizationId: organization.id },
    enabled:
      dynamicAccessControl?.enabled === true &&
      canReadRoles.data?.success === true
  })
  const memberTeams = useListUserTeams(authClient, {
    query: {
      organizationId: organization.id,
      userId: member.userId
    },
    enabled: columnIds.includes('teams')
  })

  const { data: hasUpdatePermission, isPending: updatePermissionPending } =
    useHasPermission(authClient, {
      organizationId: organization.id,
      permissions: { member: ['update'] }
    })

  const { data: hasDeletePermission, isPending: deletePermissionPending } =
    useHasPermission(authClient, {
      organizationId: organization.id,
      permissions: { member: ['delete'] }
    })

  const mergedRoles = mergeOrganizationRoleLabels(roles, dynamicRoles.data)
  const roleLabel = memberRoleLabels(member.role, mergedRoles).join(', ')
  const teamNames = memberTeams.data?.map(team => team.name).join(', ')

  const assignableRoles = Object.entries(mergedRoles).filter(
    ([key]) => isOwner || key !== creatorRole
  )

  const isCurrentUser = session?.user.id === member.userId
  const targetIsOwner = hasMemberRole(member.role, creatorRole)
  const canManageTarget = isOwner || !targetIsOwner
  const onlyOwnerActionDisabled =
    targetIsOwner && (ownerCount === undefined || ownerCount <= 1)

  const cells: Record<string, ReactNode> = {
    select: selectableRow && (
      <Table.Cell key="select">
        <OrganizationTableSelectRow
          localization={organizationLocalization}
          row={selectableRow}
        />
      </Table.Cell>
    ),
    user: (
      <Table.Cell key="user">
        <div className="flex flex-col gap-1">
          <UserView user={member.user} />
          {memberFields.map(field => {
            const value = formatAdditionalFieldValue(
              Reflect.get(member, field.name),
              locale.languageTag
            )
            return value ? (
              <span className="text-muted text-xs" key={field.name}>
                {field.label}: {value}
              </span>
            ) : null
          })}
        </div>
      </Table.Cell>
    ),
    role: <Table.Cell key="role">{roleLabel}</Table.Cell>,
    teams: (
      <Table.Cell key="teams">
        {memberTeams.isPending ? (
          <Skeleton className="h-4 w-24 rounded-lg" />
        ) : memberTeams.isError ? null : teamNames ? (
          teamNames
        ) : (
          <span className="text-muted">{organizationLocalization.noTeams}</span>
        )}
      </Table.Cell>
    ),
    actions: (
      <MemberActionsCell
        canManageTarget={canManageTarget}
        canRemove={hasDeletePermission?.success === true}
        canUpdate={hasUpdatePermission?.success === true}
        currentUser={isCurrentUser}
        deletePending={deletePermissionPending}
        member={member}
        onlyOwnerActionDisabled={onlyOwnerActionDisabled}
        organization={organization}
        protectedRole={creatorRole}
        roleLabels={{
          changeMemberRole: organizationLocalization.changeMemberRole,
          leaveOrganization: organizationLocalization.leaveOrganization,
          onlyOwnerActionDisabled:
            organizationLocalization.onlyOwnerActionDisabled,
          removeMember: organizationLocalization.removeMember
        }}
        roles={assignableRoles}
        updatePending={updatePermissionPending}
      />
    )
  }

  return <Table.Row id={member.id}>{columnIds.map(id => cells[id])}</Table.Row>
}
