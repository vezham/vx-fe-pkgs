import type { ReactNode } from 'react'

import {
  formatAdditionalFieldValue,
  formatLocaleDate
} from '@vezham/auth-ui-core'
import {
  type OrganizationAuthClient,
  memberRoleLabels,
  organizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useCancelInvitation,
  useHasPermission,
  useInviteMember
} from '@vezham/auth-ui-react/plugins/organization'
import type { Invitation } from '@vezham/auth/client'
import { SendSquare as PaperPlane, Close as Xmark } from '@vezham/icons-react'
import { Button, Chip, Spinner, Table, toast } from '@vezham/react-v3'

import { OrganizationTableRowSkeleton } from './organization-table-row-skeleton'
import {
  type OrganizationSelectableRow,
  OrganizationTableSelectRow
} from './organization-table-selection'

export type OrganizationInvitationTableRowProps = {
  columnIds: readonly string[]
  invitation: Invitation
  selectableRow?: OrganizationSelectableRow<Invitation>
}

export const OrganizationInvitationTableRow = ({
  columnIds,
  invitation,
  selectableRow
}: OrganizationInvitationTableRowProps) => {
  const { authClient, locale } = useAuth<OrganizationAuthClient>()
  const {
    modelFields: { invitation: invitationFields },
    localization: organizationLocalization,
    roles
  } = useAuthPlugin(organizationPlugin)

  const {
    data: cancelInvitationPermission,
    isPending: cancelPermissionPending
  } = useHasPermission(authClient, {
    permissions: { invitation: ['cancel'] }
  })

  const { mutate: cancelInvitation, isPending: cancelPending } =
    useCancelInvitation(authClient)

  const { data: inviteMemberPermission, isPending: invitePermissionPending } =
    useHasPermission(authClient, {
      permissions: { invitation: ['create'] }
    })

  // vx-bot/NOTE: Better Auth treats a re-invite as a resend: it extends the existing
  // vx-bot/NOTE: invitation's expiry and sends the email again rather than creating a
  // vx-bot/NOTE: second row.
  const { mutate: resendInvitation, isPending: resendPending } =
    useInviteMember(authClient, {
      onSuccess: () => toast.success(organizationLocalization.invitationResent)
    })

  const roleLabel = memberRoleLabels(invitation.role, roles).join(', ')

  const statusLabel =
    organizationLocalization[invitation.status] ?? invitation.status

  const statusColor =
    invitation.status === 'pending'
      ? 'warning'
      : invitation.status === 'accepted'
        ? 'success'
        : invitation.status === 'rejected'
          ? 'danger'
          : 'default'

  if (cancelPermissionPending || invitePermissionPending) {
    return <OrganizationTableRowSkeleton columnIds={columnIds} />
  }

  const isPending = invitation.status === 'pending'

  const cells: Record<string, ReactNode> = {
    select: selectableRow && (
      <Table.Cell key="select">
        <OrganizationTableSelectRow
          localization={organizationLocalization}
          row={selectableRow}
        />
      </Table.Cell>
    ),
    email: (
      <Table.Cell key="email">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{invitation.email}</span>
          {invitationFields.map(field => {
            const value = formatAdditionalFieldValue(
              Reflect.get(invitation, field.name),
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
    createdAt: (
      <Table.Cell
        key="createdAt"
        className="text-muted text-xs whitespace-nowrap tabular-nums">
        {formatLocaleDate(invitation.createdAt, locale.languageTag, {
          dateStyle: 'short',
          timeStyle: 'short'
        })}
      </Table.Cell>
    ),
    role: (
      <Table.Cell key="role" className="text-sm">
        {roleLabel}
      </Table.Cell>
    ),
    status: (
      <Table.Cell key="status" className="text-sm">
        <Chip color={statusColor} size="sm" variant="soft">
          {statusLabel}
        </Chip>
      </Table.Cell>
    ),
    actions: (
      <Table.Cell key="actions" className="text-end">
        <div className="flex justify-end gap-2">
          {inviteMemberPermission?.success && isPending && (
            <Button
              isIconOnly
              size="sm"
              variant="tertiary"
              isPending={resendPending}
              onPress={() =>
                resendInvitation({
                  ...Object.fromEntries(
                    invitationFields.flatMap(field => {
                      const value: unknown = Reflect.get(invitation, field.name)
                      return value === undefined ? [] : [[field.name, value]]
                    })
                  ),
                  email: invitation.email,
                  organizationId: invitation.organizationId,
                  // vx-bot/NOTE: the server can define custom organization roles; the client type lists only the configured defaults
                  role: invitation.role as Parameters<
                    typeof resendInvitation
                  >[0]['role'],
                  resend: true
                })
              }
              aria-label={organizationLocalization.resendInvitation}>
              {resendPending ? (
                <Spinner color="current" size="sm" />
              ) : (
                <PaperPlane size={16} />
              )}
            </Button>
          )}

          {cancelInvitationPermission?.success && isPending && (
            <Button
              isIconOnly
              size="sm"
              variant="danger-soft"
              isPending={cancelPending}
              onPress={() => cancelInvitation({ invitationId: invitation.id })}
              aria-label={organizationLocalization.cancelInvitation}>
              {cancelPending ? (
                <Spinner color="current" size="sm" />
              ) : (
                <Xmark size={16} />
              )}
            </Button>
          )}
        </div>
      </Table.Cell>
    )
  }

  return (
    <Table.Row id={invitation.id}>{columnIds.map(id => cells[id])}</Table.Row>
  )
}
