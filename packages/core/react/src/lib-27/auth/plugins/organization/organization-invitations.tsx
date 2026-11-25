import {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState
} from 'react'

import {
  type OrganizationAuthClient,
  type OrganizationLocalization,
  hasMemberRole,
  organizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useCancelInvitation,
  useHasPermission,
  useListOrganizationInvitations
} from '@vezham/auth-ui-react/plugins/organization'
import type { Invitation } from '@vezham/auth/client'
import { Filter as Funnel, Close as Xmark } from '@vezham/icons-react'
import {
  Button,
  Chip,
  Dropdown,
  Label,
  SearchField,
  Table,
  cn,
  toast
} from '@vezham/react-v3'

import { getHeroUISortDescriptor, getTanStackSorting } from '../../table-bridge'
import { InviteMemberDialog } from './invite-member-dialog'
import { OrganizationInvitationTableRow } from './organization-invitation-row'
import { OrganizationInvitationsEmpty } from './organization-invitations-empty'
import { OrganizationSortableTableHeader } from './organization-sortable-table-header'
import {
  ORGANIZATION_TABLE_PAGE_SIZE,
  createOrganizationColumnHelper,
  useOrganizationTable
} from './organization-table'
import { OrganizationTableBulkAction } from './organization-table-bulk-action'
import { OrganizationTablePagination } from './organization-table-pagination'
import { OrganizationTableRowSkeleton } from './organization-table-row-skeleton'
import { OrganizationTableSelectAll } from './organization-table-selection'
import { useOrganizationTableState } from './organization-table-state'
import { OrganizationTableViewOptions } from './organization-table-view-options'

const invitationColumnHelper = createOrganizationColumnHelper<Invitation>()
const invitationColumns = invitationColumnHelper.columns([
  invitationColumnHelper.accessor('email', {
    enableHiding: false,
    filterFn: 'includesString'
  }),
  invitationColumnHelper.accessor(
    invitation => new Date(invitation.createdAt).getTime(),
    {
      id: 'createdAt',
      enableGlobalFilter: false
    }
  ),
  invitationColumnHelper.accessor('role', {
    enableGlobalFilter: false,
    filterFn: (row, columnId, value) =>
      hasMemberRole(row.getValue<string>(columnId), String(value))
  }),
  invitationColumnHelper.accessor('status', {
    enableGlobalFilter: false,
    filterFn: (row, columnId, value) => row.getValue(columnId) === String(value)
  })
])
const INVITATION_COLUMN_IDS = ['email', 'createdAt', 'role', 'status'] as const
const EMPTY_INVITATIONS: Invitation[] = []

/** Props for the {@link OrganizationInvitations} component. */
export type OrganizationInvitationsProps = {
  className?: string
}

/**
 * Organization invitations table with invite control and per-row actions.
 */
const isOrganizationLocalizationKey = (
  localization: OrganizationLocalization,
  key: string
): key is keyof OrganizationLocalization => {
  return Object.hasOwn(localization, key)
}

type OrganizationInvitationsTable = ReturnType<
  typeof useOrganizationTable<Invitation, null>
>
type OrganizationInvitationsState = ReturnType<typeof useOrganizationTableState>

type OrganizationInvitationsViewProps = {
  canInvite: { data?: { success?: boolean } | null; isPending: boolean }
  cancelInvitations: ReturnType<typeof useCancelInvitation>
  cancelSelectedInvitations: () => Promise<void>
  className?: string
  columnIds: string[]
  getStatusLabel: (status: string) => string
  globalFilter: string
  headerCells: Record<string, ReactNode>
  inviteOpen: boolean
  isPending: boolean
  localization: ReturnType<typeof useAuth>['localization']
  onInviteOpenChange: Dispatch<SetStateAction<boolean>>
  organizationLocalization: OrganizationLocalization
  props: ComponentProps<'div'>
  roleCounts: Record<string, number>
  roleFilter: string
  roles: Record<string, string>
  selectedCount: number
  showSelection: boolean
  statusCounts: Map<unknown, number>
  statusFilter: string
  table: OrganizationInvitationsTable
  tableState: OrganizationInvitationsState
}

const renderOrganizationInvitations = ({
  canInvite,
  cancelInvitations,
  cancelSelectedInvitations,
  className,
  columnIds,
  getStatusLabel,
  globalFilter,
  headerCells,
  inviteOpen,
  isPending,
  localization,
  onInviteOpenChange,
  organizationLocalization,
  props,
  roleCounts,
  roleFilter,
  roles,
  selectedCount,
  showSelection,
  statusCounts,
  statusFilter,
  table,
  tableState
}: OrganizationInvitationsViewProps) => (
  <div className={cn('flex flex-col gap-3', className)} {...props}>
    <h3 className="truncate text-sm font-semibold">
      {organizationLocalization.invitations}
    </h3>

    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchField
          className="min-w-0"
          aria-label={organizationLocalization.search}
          value={globalFilter}
          onChange={table.setGlobalFilter}
          isDisabled={isPending}>
          <SearchField.Group>
            <SearchField.SearchIcon />

            <SearchField.Input
              placeholder={organizationLocalization.search}
              className="sm:w-[200px]"
            />

            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <Dropdown>
          <Button size="sm" variant="secondary" isDisabled={isPending}>
            <Funnel size={16} />

            {organizationLocalization.role}
          </Button>

          <Dropdown.Popover>
            <Dropdown.Menu
              selectionMode="single"
              selectedKeys={new Set([roleFilter])}
              onSelectionChange={keys => {
                const [selectedKey] = keys
                const key =
                  selectedKey === undefined ? undefined : String(selectedKey)
                table
                  .getColumn('role')
                  ?.setFilterValue(!key || key === 'all' ? undefined : key)
              }}>
              <Dropdown.Item id="all" textValue={organizationLocalization.all}>
                <Label>{organizationLocalization.all}</Label>

                <Dropdown.ItemIndicator />
              </Dropdown.Item>

              {Object.entries(roles).map(([key, label]) => (
                <Dropdown.Item key={key} id={key} textValue={label}>
                  <Label>
                    {label} ({roleCounts[key] ?? 0})
                  </Label>

                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        <Dropdown>
          <Button size="sm" variant="secondary" isDisabled={isPending}>
            <Funnel size={16} />

            {organizationLocalization.status}
          </Button>

          <Dropdown.Popover>
            <Dropdown.Menu
              selectionMode="single"
              selectedKeys={new Set([statusFilter])}
              onSelectionChange={keys => {
                const [selectedKey] = keys
                const key =
                  selectedKey === undefined ? undefined : String(selectedKey)
                table
                  .getColumn('status')
                  ?.setFilterValue(!key || key === 'all' ? undefined : key)
              }}>
              <Dropdown.Item id="all" textValue={organizationLocalization.all}>
                <Label>{organizationLocalization.all}</Label>

                <Dropdown.ItemIndicator />
              </Dropdown.Item>

              {['pending', 'accepted', 'rejected', 'canceled'].map(status => (
                <Dropdown.Item
                  key={status}
                  id={status}
                  textValue={getStatusLabel(status)}>
                  <Label>
                    {getStatusLabel(status)} ({statusCounts.get(status) ?? 0})
                  </Label>

                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        <div className="ms-auto">
          <OrganizationTableViewOptions
            columns={[
              {
                id: 'createdAt',
                label: organizationLocalization.invitedAt,
                visible: table.getColumn('createdAt')?.getIsVisible() ?? true,
                onVisibleChange: visible =>
                  table.getColumn('createdAt')?.toggleVisibility(visible)
              },
              {
                id: 'role',
                label: organizationLocalization.role,
                visible: table.getColumn('role')?.getIsVisible() ?? true,
                onVisibleChange: visible =>
                  table.getColumn('role')?.toggleVisibility(visible)
              },
              {
                id: 'status',
                label: organizationLocalization.status,
                visible: table.getColumn('status')?.getIsVisible() ?? true,
                onVisibleChange: visible =>
                  table.getColumn('status')?.toggleVisibility(visible)
              }
            ]}
            disabled={isPending}
            localization={organizationLocalization}
          />
        </div>
      </div>

      {(roleFilter !== 'all' || statusFilter !== 'all') && (
        <div className="flex flex-wrap gap-2">
          {roleFilter !== 'all' && (
            <Chip size="sm" variant="secondary" className="w-fit">
              <Chip.Label>
                {organizationLocalization.role}:{' '}
                <span className="capitalize">
                  {roles?.[roleFilter] ?? roleFilter}
                </span>
              </Chip.Label>

              <button
                type="button"
                aria-label={organizationLocalization.clear}
                className="text-muted hover:text-foreground inline-flex cursor-pointer items-center"
                onClick={() =>
                  table.getColumn('role')?.setFilterValue(undefined)
                }>
                <Xmark size={16} className="size-3" />
              </button>
            </Chip>
          )}

          {statusFilter !== 'all' && (
            <Chip size="sm" variant="secondary" className="w-fit">
              <Chip.Label>
                {organizationLocalization.status}:{' '}
                {getStatusLabel(statusFilter)}
              </Chip.Label>

              <button
                type="button"
                aria-label={organizationLocalization.clear}
                className="text-muted hover:text-foreground inline-flex cursor-pointer items-center"
                onClick={() =>
                  table.getColumn('status')?.setFilterValue(undefined)
                }>
                <Xmark size={16} className="size-3" />
              </button>
            </Chip>
          )}
        </div>
      )}

      <OrganizationTableBulkAction
        cancelLabel={localization.settings.cancel}
        confirmLabel={organizationLocalization.cancelSelectedInvitations}
        description={
          organizationLocalization.cancelSelectedInvitationsDescription
        }
        onConfirm={cancelSelectedInvitations}
        pending={cancelInvitations.isPending}
        selectedCount={selectedCount}
        title={organizationLocalization.cancelSelectedInvitations}
        localization={organizationLocalization}
      />

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label={organizationLocalization.invitations}
            onSortChange={descriptor =>
              table.setSorting(
                getTanStackSorting(descriptor, tableState.sorting)
              )
            }
            sortDescriptor={getHeroUISortDescriptor(tableState.sorting)}>
            <Table.Header>{columnIds.map(id => headerCells[id])}</Table.Header>

            <Table.Body
              renderEmptyState={() => (
                <OrganizationInvitationsEmpty
                  isInvitePending={canInvite.isPending}
                  onInvitePress={
                    canInvite.data?.success
                      ? () => onInviteOpenChange(true)
                      : undefined
                  }
                />
              )}>
              {isPending ? (
                <OrganizationTableRowSkeleton columnIds={columnIds} />
              ) : (
                table
                  .getRowModel()
                  .rows.map(row => (
                    <OrganizationInvitationTableRow
                      columnIds={columnIds}
                      key={row.original.id}
                      invitation={row.original}
                      selectableRow={showSelection ? row : undefined}
                    />
                  ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <OrganizationTablePagination
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        disabled={isPending}
        localization={organizationLocalization}
        onFirstPage={() => table.firstPage()}
        onLastPage={() => table.lastPage()}
        onNextPage={() => table.nextPage()}
        onPageSizeChange={size => table.setPageSize(size)}
        onPreviousPage={() => table.previousPage()}
        pageCount={table.getPageCount()}
        pageIndex={tableState.pagination.pageIndex}
        pageSize={tableState.pagination.pageSize}
        rowCount={table.getRowCount()}
        visibleRowCount={table.getRowModel().rows.length}
      />
    </div>

    {canInvite.data?.success && (
      <InviteMemberDialog
        isOpen={inviteOpen}
        onOpenChange={onInviteOpenChange}
      />
    )}
  </div>
)

export const OrganizationInvitations = ({
  className,
  ...props
}: OrganizationInvitationsProps & ComponentProps<'div'>) => {
  const { authClient, localization } = useAuth<OrganizationAuthClient>()
  const { localization: organizationLocalization, roles } =
    useAuthPlugin(organizationPlugin)
  const { data: invitations, isPending: invitationsPending } =
    useListOrganizationInvitations(authClient)

  const canInvite = useHasPermission(authClient, {
    permissions: { invitation: ['create'] }
  })
  const canCancel = useHasPermission(authClient, {
    permissions: { invitation: ['cancel'] }
  })

  const isPending = invitationsPending || canCancel.isPending
  const tableState = useOrganizationTableState(
    'organizationInvitations',
    ORGANIZATION_TABLE_PAGE_SIZE,
    INVITATION_COLUMN_IDS
  )
  const { globalFilter } = tableState

  const table = useOrganizationTable<Invitation, null>(
    {
      atoms: tableState.atoms,
      columns: invitationColumns,
      data: invitations ?? EMPTY_INVITATIONS,
      enableRowSelection: row =>
        canCancel.data?.success === true && row.original.status === 'pending',
      globalFilterFn: 'includesString',
      getRowId: invitation => invitation.id
    },
    () => null
  )

  const cancelInvitations = useCancelInvitation(authClient)
  const roleFilter = toStringValue(
    table.getColumn('role')?.getFilterValue(),
    'all'
  )
  const statusFilter = toStringValue(
    table.getColumn('status')?.getFilterValue(),
    'all'
  )
  const getStatusLabel = (status: string) =>
    isOrganizationLocalizationKey(organizationLocalization, status)
      ? organizationLocalization[status]
      : status
  const roleFacetRows = table.getColumn('role')?.getFacetedRowModel().flatRows
  const statusCounts = table.getColumn('status')?.getFacetedUniqueValues()
  const selectedInvitations = table.getSelectedRowModel().rows
  const showSelection = canCancel.data?.success === true

  const cancelSelectedInvitations = async () => {
    const results = await Promise.allSettled(
      selectedInvitations.map(row =>
        cancelInvitations.mutateAsync({ invitationId: row.original.id })
      )
    )
    const canceledCount = results.filter(
      result => result.status === 'fulfilled'
    ).length
    if (canceledCount > 0)
      toast.success(
        organizationLocalization.invitationsCanceled.replace(
          '{{count}}',
          String(canceledCount)
        )
      )
    table.resetRowSelection(true)
  }

  const [inviteOpen, setInviteOpen] = useState(false)

  const columnIds = [
    ...(showSelection ? ['select'] : []),
    ...table.getVisibleLeafColumns().map(column => column.id),
    'actions'
  ]

  const headerCells: Record<string, ReactNode> = {
    select: (
      <Table.Column key="select">
        <OrganizationTableSelectAll
          allSelected={table.getIsAllPageRowsSelected()}
          disabled={isPending}
          localization={organizationLocalization}
          onCheckedChange={checked => table.toggleAllPageRowsSelected(checked)}
          someSelected={table.getIsSomePageRowsSelected()}
        />
      </Table.Column>
    ),
    email: (
      <Table.Column key="email" allowsSorting id="email" isRowHeader>
        {({ sortDirection }) => (
          <OrganizationSortableTableHeader
            column={table.getColumn('email')}
            interactive={false}
            nativeSortDirection={sortDirection}>
            {localization.auth.email}
          </OrganizationSortableTableHeader>
        )}
      </Table.Column>
    ),
    createdAt: (
      <Table.Column key="createdAt" allowsSorting id="createdAt">
        {({ sortDirection }) => (
          <OrganizationSortableTableHeader
            column={table.getColumn('createdAt')}
            interactive={false}
            nativeSortDirection={sortDirection}>
            {organizationLocalization.invitedAt}
          </OrganizationSortableTableHeader>
        )}
      </Table.Column>
    ),
    role: (
      <Table.Column key="role" allowsSorting id="role">
        {({ sortDirection }) => (
          <OrganizationSortableTableHeader
            column={table.getColumn('role')}
            interactive={false}
            nativeSortDirection={sortDirection}>
            {organizationLocalization.role}
          </OrganizationSortableTableHeader>
        )}
      </Table.Column>
    ),
    status: (
      <Table.Column key="status" allowsSorting id="status">
        {({ sortDirection }) => (
          <OrganizationSortableTableHeader
            column={table.getColumn('status')}
            interactive={false}
            nativeSortDirection={sortDirection}>
            {organizationLocalization.status}
          </OrganizationSortableTableHeader>
        )}
      </Table.Column>
    ),
    actions: (
      <Table.Column key="actions" className="text-end">
        {organizationLocalization.actions}
      </Table.Column>
    )
  }

  const roleCounts = Object.fromEntries(
    Object.keys(roles).map(key => [
      key,
      roleFacetRows?.filter(row => hasMemberRole(row.original.role, key))
        .length ?? 0
    ])
  )

  return renderOrganizationInvitations({
    canInvite: {
      data: canInvite.data,
      isPending: canInvite.isPending
    },
    cancelInvitations,
    cancelSelectedInvitations,
    className,
    columnIds,
    getStatusLabel,
    globalFilter,
    headerCells,
    inviteOpen,
    isPending,
    localization,
    onInviteOpenChange: setInviteOpen,
    organizationLocalization,
    props,
    roleCounts,
    roleFilter,
    roles,
    selectedCount: selectedInvitations.length,
    showSelection,
    statusCounts: statusCounts ?? new Map(),
    statusFilter,
    table,
    tableState
  })
}

/** Reads a primitive filter or payload value as a string, or returns the fallback. */
function toStringValue(value: unknown, fallback: string) {
  return typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
    ? String(value)
    : fallback
}
