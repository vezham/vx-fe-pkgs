import { keepPreviousData } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table'
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'

import { getClampedTablePageIndex } from '@vezham/auth-ui-core'
import {
  type OrganizationAuthClient,
  hasMemberRole,
  organizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useActiveMemberRole,
  useActiveOrganization,
  useHasPermission,
  useListOrganizationMembers,
  useRemoveMember
} from '@vezham/auth-ui-react/plugins/organization'
import type { Member, User } from '@vezham/auth/client'
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
import { OrganizationMemberRow } from './organization-member-row'
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

type MemberRow = Member & { user: Partial<User> }

const memberColumnHelper = createOrganizationColumnHelper<MemberRow>()
const memberColumns = memberColumnHelper.columns([
  memberColumnHelper.accessor(
    member => member.user.name || member.user.email || '',
    {
      id: 'user',
      enableHiding: false,
      filterFn: 'includesString'
    }
  ),
  memberColumnHelper.accessor('role', {
    enableGlobalFilter: false,
    filterFn: (row, columnId, value) =>
      hasMemberRole(row.getValue<string>(columnId), String(value))
  }),
  memberColumnHelper.display({
    id: 'teams',
    enableGlobalFilter: false,
    enableSorting: false
  })
])
const memberColumnsWithoutTeams = memberColumns.filter(
  column => column.id !== 'teams'
)
const EMPTY_MEMBERS: MemberRow[] = []
const MEMBER_COLUMN_IDS = ['user', 'role', 'teams'] as const

/** Props for the {@link OrganizationMembers} component. */
export type OrganizationMembersProps = {
  className?: string
  /**
   * Number of rows per page. This value must be a positive integer. Setting it
   * moves paging, role filtering, and role sorting
   * onto the server, which is what large organizations want: without it the
   * endpoint caps the response at 100 members with no indication.
   *
   * Leave it unset to keep the whole list in memory and filter it in the
   * browser.
   */
  pageSize?: number
}

const validatePageSize = (pageSize?: number) => {
  if (
    pageSize !== undefined &&
    (!Number.isInteger(pageSize) || pageSize <= 0)
  ) {
    throw new RangeError('pageSize must be a positive integer')
  }

  return pageSize
}

const getMemberListQuery = ({
  isPaged,
  pageIndex,
  pageSize,
  roleFilter,
  sorting
}: {
  isPaged: boolean
  pageIndex: number
  pageSize: number
  roleFilter: string
  sorting: ReturnType<typeof useOrganizationTableState>['sorting']
}) => {
  if (!isPaged) return undefined

  const roleFilterParams =
    roleFilter === 'all'
      ? {}
      : {
          filterField: 'role' as const,
          filterValue: roleFilter,
          // vx-bot/NOTE: Roles are stored comma-joined, so an exact match would
          // vx-bot/NOTE: drop anyone holding more than one.
          filterOperator: 'contains' as const
        }
  const sortParams =
    sorting[0]?.id === 'role'
      ? {
          sortBy: 'role' as const,
          sortDirection: sorting[0].desc ? ('desc' as const) : ('asc' as const)
        }
      : {}

  return {
    limit: pageSize,
    offset: pageIndex * pageSize,
    ...roleFilterParams,
    ...sortParams
  }
}

const isMemberListPending = ({
  organizationPending,
  membersPending,
  ownersPending,
  deletePermissionPending,
  teamsEnabled,
  teamsPermissionPending
}: {
  organizationPending: boolean
  membersPending: boolean
  ownersPending: boolean
  deletePermissionPending: boolean
  teamsEnabled: boolean
  teamsPermissionPending: boolean
}) =>
  organizationPending ||
  membersPending ||
  ownersPending ||
  deletePermissionPending ||
  (teamsEnabled && teamsPermissionPending)

const hasReachedMembershipLimit = (limit: number | undefined, total: number) =>
  limit !== undefined && total >= limit

const canSelectOrganizationMember = ({
  member,
  ownerCount,
  isOwner,
  currentUserId,
  canDelete,
  creatorRole
}: {
  member: MemberRow
  ownerCount?: number
  isOwner: boolean
  currentUserId?: string
  canDelete: boolean
  creatorRole: string
}) => {
  const targetIsOwner = hasMemberRole(member.role, creatorRole)
  const isLastOwner =
    targetIsOwner && (ownerCount === undefined || ownerCount <= 1)
  return (
    canDelete &&
    member.userId !== currentUserId &&
    (isOwner || !targetIsOwner) &&
    !isLastOwner
  )
}

const removeSelectedOrganizationMembers = async ({
  organizationId,
  selectedMemberIds,
  removeMember,
  successMessage,
  clearSelection
}: {
  organizationId?: string
  selectedMemberIds: string[]
  removeMember: (input: {
    memberIdOrEmail: string
    organizationId: string
  }) => Promise<unknown>
  successMessage: string
  clearSelection: () => void
}) => {
  if (!organizationId) return
  const results = await Promise.allSettled(
    selectedMemberIds.map(memberIdOrEmail =>
      removeMember({ memberIdOrEmail, organizationId })
    )
  )
  const removedCount = results.filter(
    result => result.status === 'fulfilled'
  ).length
  if (removedCount > 0) {
    toast.success(successMessage.replace('{{count}}', String(removedCount)))
  }
  clearSelection()
}

const useResetMemberPageOnOrganizationChange = (
  organizationId: string | undefined,
  setPagination: (updater: (state: PaginationState) => PaginationState) => void
) => {
  const previousOrganizationId = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (!organizationId) return
    if (
      previousOrganizationId.current &&
      previousOrganizationId.current !== organizationId
    ) {
      setPagination(current => ({ ...current, pageIndex: 0 }))
    }
    previousOrganizationId.current = organizationId
  }, [organizationId, setPagination])
}

const useClampMemberPage = ({
  hasData,
  isReady,
  isPaged,
  pageIndex,
  pageSize,
  setPagination,
  total
}: {
  hasData: boolean
  isReady: boolean
  isPaged: boolean
  pageIndex: number
  pageSize: number
  setPagination: (updater: (state: PaginationState) => PaginationState) => void
  total: number
}) => {
  useEffect(() => {
    if (!isPaged || !isReady || !hasData) return
    const lastPageIndex = getClampedTablePageIndex(pageIndex, pageSize, total)
    if (pageIndex > lastPageIndex) {
      // vx-bot/NOTE: react-doctor-disable-next-line react-doctor/no-pass-data-to-parent -- Clamp URL-backed pagination after the server total arrives so the table does not remain on an empty page.
      setPagination(current => ({ ...current, pageIndex: lastPageIndex }))
    }
  }, [hasData, isPaged, isReady, pageIndex, pageSize, setPagination, total])
}

/**
 * Organization members table with title, invite control, and per-row actions.
 */
const useOrganizationMembersState = (pageSize?: number) => {
  const validatedPageSize = validatePageSize(pageSize)
  const { authClient, localization } = useAuth<OrganizationAuthClient>()
  const {
    localization: organizationLocalization,
    membershipLimit,
    roles,
    creatorRole,
    teams
  } = useAuthPlugin(organizationPlugin)

  const { data: activeOrganization, isPending: activeOrganizationPending } =
    useActiveOrganization(authClient)

  const paged = validatedPageSize !== undefined
  const tableState = useOrganizationTableState(
    'organizationMembers',
    validatedPageSize ?? ORGANIZATION_TABLE_PAGE_SIZE,
    MEMBER_COLUMN_IDS
  )
  const { columnFilters, globalFilter, pagination, sorting, setPagination } =
    tableState
  const roleFilter = toStringValue(
    columnFilters.find(filter => filter.id === 'role')?.value,
    'all'
  )
  useResetMemberPageOnOrganizationChange(activeOrganization?.id, setPagination)

  const { data: membersData, isPending: membersPending } =
    useListOrganizationMembers(authClient, {
      enabled: !paged || tableState.ready,
      placeholderData: paged ? keepPreviousData : undefined,
      query: getMemberListQuery({
        isPaged: paged,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        roleFilter,
        sorting
      })
    })

  // vx-bot/NOTE: The signed-in user need not be on the loaded page, so their own role comes
  // vx-bot/NOTE: from a dedicated endpoint rather than from the member list.
  const { data: activeMemberRole } = useActiveMemberRole(authClient)
  const { data: session } = useSession(authClient)
  const owners = useListOrganizationMembers(authClient, {
    query: {
      organizationId: activeOrganization?.id,
      filterField: 'role',
      filterValue: creatorRole,
      filterOperator: 'contains',
      limit: 1
    },
    enabled: Boolean(activeOrganization?.id)
  })

  const canInvite = useHasPermission(authClient, {
    permissions: { invitation: ['create'] }
  })
  const canListMemberTeams = useHasPermission(authClient, {
    organizationId: activeOrganization?.id,
    permissions: { member: ['update'] },
    enabled: teams && Boolean(activeOrganization?.id)
  })
  const canDeleteMembers = useHasPermission(authClient, {
    organizationId: activeOrganization?.id,
    permissions: { member: ['delete'] },
    enabled: Boolean(activeOrganization?.id)
  })

  const isPending = isMemberListPending({
    organizationPending: activeOrganizationPending,
    membersPending,
    ownersPending: owners.isPending,
    deletePermissionPending: canDeleteMembers.isPending,
    teamsEnabled: teams,
    teamsPermissionPending: canListMemberTeams.isPending
  })

  const [inviteOpen, setInviteOpen] = useState(false)

  const total = membersData?.total ?? membersData?.members.length ?? 0

  useClampMemberPage({
    hasData: Boolean(membersData),
    isReady: tableState.ready,
    isPaged: paged,
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    setPagination,
    total
  })
  const isOwner = hasMemberRole(activeMemberRole?.role, creatorRole)
  const ownerCount = owners.data?.total ?? owners.data?.members.length
  const showTeams = teams && canListMemberTeams.data?.success === true

  const table = useOrganizationTable<MemberRow, null>(
    {
      atoms: tableState.atoms,
      columns: showTeams ? memberColumns : memberColumnsWithoutTeams,
      data: membersData?.members ?? EMPTY_MEMBERS,
      enableRowSelection: row => {
        return canSelectOrganizationMember({
          member: row.original,
          ownerCount,
          isOwner,
          currentUserId: session?.user.id,
          canDelete: canDeleteMembers.data?.success === true,
          creatorRole
        })
      },
      globalFilterFn: 'includesString',
      getRowId: member => member.id,
      manualFiltering: paged,
      manualPagination: paged,
      manualSorting: paged,
      rowCount: paged ? total : undefined
    },
    () => null
  )

  const removeMembers = useRemoveMember(authClient)
  const roleFacetRows = table.getColumn('role')?.getFacetedRowModel().flatRows
  const selectedMembers = table.getSelectedRowModel().rows
  const showSelection = canDeleteMembers.data?.success === true

  const removeSelectedMembers = async () => {
    await removeSelectedOrganizationMembers({
      organizationId: activeOrganization?.id,
      selectedMemberIds: selectedMembers.map(row => row.original.id),
      removeMember: removeMembers.mutateAsync,
      successMessage: organizationLocalization.membersRemoved,
      clearSelection: () => table.resetRowSelection(true)
    })
  }

  const membershipLimitReached = hasReachedMembershipLimit(
    membershipLimit,
    total
  )

  const columnIds = [
    ...(showSelection ? ['select'] : []),
    ...table.getVisibleLeafColumns().map(column => column.id),
    'actions'
  ]

  return {
    activeOrganization,
    cancelLabel: localization.settings.cancel,
    canInvite,
    columnIds,
    globalFilter,
    inviteOpen,
    isOwner,
    isPending,
    membershipLimitReached,
    organizationLocalization,
    ownerCount,
    paged,
    pagination,
    removeMembers,
    removeSelectedMembers,
    roleFacetRows,
    roleFilter,
    roles,
    selectedMembers,
    setInviteOpen,
    showSelection,
    showTeams,
    sorting,
    table
  }
}

export const OrganizationMembers = ({
  className,
  pageSize,
  ...props
}: OrganizationMembersProps & ComponentProps<'div'>) => {
  const {
    activeOrganization,
    cancelLabel,
    canInvite,
    columnIds,
    globalFilter,
    inviteOpen,
    isOwner,
    isPending,
    membershipLimitReached,
    organizationLocalization,
    ownerCount,
    paged,
    pagination,
    removeMembers,
    removeSelectedMembers,
    roleFacetRows,
    roleFilter,
    roles,
    selectedMembers,
    setInviteOpen,
    showSelection,
    showTeams,
    sorting,
    table
  } = useOrganizationMembersState(pageSize)

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
    // vx-bot/NOTE: list-members cannot sort by fields on the joined user.
    user: paged ? (
      <Table.Column key="user" isRowHeader>
        {organizationLocalization.member}
      </Table.Column>
    ) : (
      <Table.Column key="user" allowsSorting id="user" isRowHeader>
        {({ sortDirection }) => (
          <OrganizationSortableTableHeader
            column={table.getColumn('user')}
            interactive={false}
            nativeSortDirection={sortDirection}>
            {organizationLocalization.member}
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
    teams: (
      <Table.Column key="teams">{organizationLocalization.teams}</Table.Column>
    ),
    actions: (
      <Table.Column key="actions" className="text-end">
        {organizationLocalization.actions}
      </Table.Column>
    )
  }
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      <div className="flex items-end justify-between gap-3">
        <h3 className="truncate text-sm font-semibold">
          {organizationLocalization.members}
        </h3>

        {(canInvite.isPending || canInvite.data?.success) && (
          <Button
            className="shrink-0"
            size="sm"
            isDisabled={canInvite.isPending || membershipLimitReached}
            onPress={() => setInviteOpen(true)}>
            {organizationLocalization.inviteMember}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* vx-bot/NOTE: list-members has no search parameter, so a search box would
              only ever filter the page in front of you. */}
          {!paged && (
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
          )}

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
                <Dropdown.Item
                  id="all"
                  textValue={organizationLocalization.all}>
                  <Label>{organizationLocalization.all}</Label>

                  <Dropdown.ItemIndicator />
                </Dropdown.Item>

                {Object.entries(roles).map(([role, label]) => (
                  <Dropdown.Item key={role} id={role} textValue={label}>
                    <Label>
                      {label}
                      {!paged
                        ? ` (${roleFacetRows?.filter(row => hasMemberRole(row.original.role, role)).length ?? 0})`
                        : ''}
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
                  id: 'role',
                  label: organizationLocalization.role,
                  visible: table.getColumn('role')?.getIsVisible() ?? true,
                  onVisibleChange: visible =>
                    table.getColumn('role')?.toggleVisibility(visible)
                },
                ...(showTeams
                  ? [
                      {
                        id: 'teams',
                        label: organizationLocalization.teams,
                        visible:
                          table.getColumn('teams')?.getIsVisible() ?? true,
                        onVisibleChange: (visible: boolean) =>
                          table.getColumn('teams')?.toggleVisibility(visible)
                      }
                    ]
                  : [])
              ]}
              disabled={isPending}
              localization={organizationLocalization}
            />
          </div>
        </div>

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

        <OrganizationTableBulkAction
          cancelLabel={cancelLabel}
          confirmLabel={organizationLocalization.removeSelectedMembers}
          description={
            organizationLocalization.removeSelectedMembersDescription
          }
          onConfirm={removeSelectedMembers}
          pending={removeMembers.isPending}
          selectedCount={selectedMembers.length}
          title={organizationLocalization.removeSelectedMembers}
          localization={organizationLocalization}
        />

        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label={organizationLocalization.members}
              onSortChange={descriptor =>
                table.setSorting(getTanStackSorting(descriptor, sorting))
              }
              sortDescriptor={getHeroUISortDescriptor(sorting)}>
              <Table.Header>
                {columnIds.map(id => headerCells[id])}
              </Table.Header>

              <Table.Body>
                {isPending ? (
                  <OrganizationTableRowSkeleton columnIds={columnIds} />
                ) : (
                  !!activeOrganization &&
                  table
                    .getRowModel()
                    .rows.map(row => (
                      <OrganizationMemberRow
                        columnIds={columnIds}
                        key={row.original.id}
                        member={row.original}
                        isOwner={isOwner}
                        ownerCount={ownerCount}
                        organization={activeOrganization}
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
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={table.getRowCount()}
          visibleRowCount={table.getRowModel().rows.length}
        />
      </div>

      {canInvite.data?.success && (
        <InviteMemberDialog isOpen={inviteOpen} onOpenChange={setInviteOpen} />
      )}
    </div>
  )
}

/** Reads a primitive filter or payload value as a string, or returns the fallback. */
function toStringValue(value: unknown, fallback: string) {
  return typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
    ? String(value)
    : fallback
}
