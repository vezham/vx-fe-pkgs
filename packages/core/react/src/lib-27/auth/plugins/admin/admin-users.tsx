'use client'

import { useDebouncedValue } from '@tanstack/react-pacer'
import { keepPreviousData } from '@tanstack/react-query'
import type { SortingState } from '@tanstack/react-table'
import { type ComponentProps, useEffect, useMemo, useState } from 'react'

import {
  DEFAULT_TABLE_SEARCH_DEBOUNCE_MS,
  fieldsWithModelValues,
  formatLocaleDate,
  getAdditionalFieldDefaultValues,
  getAdditionalFieldSubmitValues,
  getClampedTablePageIndex
} from '@vezham/auth-ui-core'
import {
  type AdminAuthClient,
  type AdminListUsersParams,
  type AdminLocalization,
  type AdminUser,
  adminPlugin,
  isAdminTarget
} from '@vezham/auth-ui-core/plugins/admin'
import {
  useAuth,
  useAuthPlugin,
  useCopyToClipboard,
  useSession
} from '@vezham/auth-ui-react'
import {
  useAdminPermission,
  useAdminUser,
  useAdminUserSessions,
  useAdminUsers,
  useBanAdminUser,
  useCreateAdminUser,
  useImpersonateAdminUser,
  useRemoveAdminUser,
  useRevokeAdminUserSession,
  useRevokeAdminUserSessions,
  useSetAdminUserPassword,
  useSetAdminUserRole,
  useUnbanAdminUser,
  useUpdateAdminUser
} from '@vezham/auth-ui-react/plugins/admin'
import {
  Login as ArrowRightToSquare,
  Forbidden as Ban,
  CheckRead as Check,
  Copy,
  Monitor as Display,
  MenuDots as Ellipsis,
  Key,
  User as Person,
  UserPlus as PersonPlus,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Chip,
  Dropdown,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  SearchField,
  Select,
  Separator,
  Skeleton,
  Switch,
  Table,
  Tabs,
  TextField,
  cn
} from '@vezham/react-v3'

import { getAuthAdditionalFieldValidators, useAuthForm } from '../../auth-form'
import { useServerTableState } from '../../server-table-state'
import { getHeroUISortDescriptor, getTanStackSorting } from '../../table-bridge'
import { UserAvatar } from '../../user/user-avatar'
import { createAdminColumnHelper, useAdminTable } from './admin-table'

const SEARCH_FIELDS = ['email', 'name'] as const
type SearchFieldName = (typeof SEARCH_FIELDS)[number]
const SEARCH_OPERATORS = ['contains', 'ends_with', 'starts_with'] as const
type SearchOperator = (typeof SEARCH_OPERATORS)[number]
type SortOption = 'createdAt-asc' | 'createdAt-desc' | 'name-asc' | 'name-desc'
const STATUS_FILTERS = ['all', 'active', 'banned'] as const
type DangerousAction = 'ban' | 'delete' | 'impersonate' | 'revokeAll'

export type AdminUsersProps = {
  className?: string
  onSelectedUserIdChange?: (userId: string | undefined) => void
  selectedUserId?: string
}

const rowSkeletonIds = ['hero-admin-1', 'hero-admin-2', 'hero-admin-3']

const formatDate = (value: Date | string | undefined | null, locale: string) =>
  value ? formatLocaleDate(value, locale, { dateStyle: 'medium' }) : '–'

const getAdminErrorMessage = (error: Error | null) => {
  const details: unknown = error && 'error' in error ? error.error : undefined
  const message =
    details && typeof details === 'object' && 'message' in details
      ? details.message
      : undefined
  return typeof message === 'string' ? message : error?.message
}

const asAdminRoles = (roles: string[]) =>
  // vx-bot/NOTE: the server can define custom admin roles; the client type lists only the defaults
  roles as ('user' | 'admin')[]

const parseAdminRoles = (
  role: string | undefined,
  fallback: string,
  allowMultipleRoles: boolean
) => {
  const roles = role
    ?.split(',')
    .map(value => value.trim())
    .filter(Boolean)
  const resolved = roles?.length ? roles : [fallback]
  return allowMultipleRoles ? resolved : resolved.slice(0, 1)
}

const getBanDurationSeconds = (value: string) => {
  if (!value) return undefined
  const days = Number(value)
  if (!Number.isSafeInteger(days) || days <= 0) return null
  const seconds = days * 86_400
  return Number.isSafeInteger(seconds) ? seconds : null
}

const adminColumnHelper = createAdminColumnHelper<AdminUser>()
const adminColumns = adminColumnHelper.columns([
  adminColumnHelper.accessor('name', { id: 'name' }),
  adminColumnHelper.accessor('role', {
    id: 'role',
    enableSorting: false
  }),
  adminColumnHelper.accessor('banned', {
    id: 'status',
    enableSorting: false
  }),
  adminColumnHelper.accessor(user => new Date(user.createdAt).getTime(), {
    id: 'createdAt'
  })
])
const EMPTY_USERS: AdminUser[] = []
const INITIAL_ADMIN_SORTING: SortingState = [{ id: 'createdAt', desc: true }]

const AdminUsersFilters = ({
  localization,
  onSearchFieldChange,
  onSearchOperatorChange,
  onSearchValueChange,
  onSortChange,
  onStatusChange,
  searchField,
  searchOperator,
  searchValue,
  sort,
  status
}: {
  localization: AdminLocalization
  onSearchFieldChange: (value: unknown) => void
  onSearchOperatorChange: (value: unknown) => void
  onSearchValueChange: (value: string) => void
  onSortChange: (value: unknown) => void
  onStatusChange: (value: unknown) => void
  searchField: SearchFieldName
  searchOperator: SearchOperator
  searchValue: string
  sort: SortOption
  status: (typeof STATUS_FILTERS)[number]
}) => (
  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[9rem_10rem_minmax(14rem,1fr)_10rem_10rem] lg:items-end">
    <Select
      className="sm:w-36"
      value={searchField}
      onChange={onSearchFieldChange}>
      <Label>{localization.search}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="email">{localization.email}</ListBox.Item>
          <ListBox.Item id="name">{localization.name}</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <Select value={searchOperator} onChange={onSearchOperatorChange}>
      <Label>{localization.searchOperator}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="contains">
            {localization.searchContains}
          </ListBox.Item>
          <ListBox.Item id="starts_with">
            {localization.startsWith}
          </ListBox.Item>
          <ListBox.Item id="ends_with">{localization.endsWith}</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <SearchField
      aria-label={
        searchField === 'email'
          ? localization.searchByEmail
          : localization.searchByName
      }
      className="w-full"
      value={searchValue}
      onChange={onSearchValueChange}>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input
          placeholder={
            searchField === 'email'
              ? localization.searchByEmail
              : localization.searchByName
          }
        />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
    <Select value={status} onChange={onStatusChange}>
      <Label>{localization.status}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all">{localization.filterAllStatuses}</ListBox.Item>
          <ListBox.Item id="active">{localization.active}</ListBox.Item>
          <ListBox.Item id="banned">{localization.banned}</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
    <Select value={sort} onChange={onSortChange}>
      <Label>{localization.sort}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="createdAt-desc">
            {localization.sortNewest}
          </ListBox.Item>
          <ListBox.Item id="createdAt-asc">
            {localization.sortOldest}
          </ListBox.Item>
          <ListBox.Item id="name-asc">
            {localization.sortNameAscending}
          </ListBox.Item>
          <ListBox.Item id="name-desc">
            {localization.sortNameDescending}
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  </div>
)

const AdminUsersTableBody = ({
  canSelectUser,
  defaultRole,
  isPending,
  localization,
  locale,
  onSelectUser,
  users
}: {
  canSelectUser: boolean
  defaultRole: string
  isPending: boolean
  localization: AdminLocalization
  locale: string
  onSelectUser: (userId: string) => void
  users: AdminUser[]
}) => (
  <Table.Body>
    {isPending
      ? rowSkeletonIds.map(id => (
          <Table.Row id={id} key={id}>
            <Table.Cell>
              <Skeleton className="h-8 w-52" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-5 w-16" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-5 w-16" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-4 w-24" />
            </Table.Cell>
          </Table.Row>
        ))
      : users.map(user => (
          <Table.Row id={user.id} key={user.id}>
            <Table.Cell>
              {canSelectUser ? (
                <Button
                  className="h-auto justify-start px-0"
                  variant="tertiary"
                  onPress={() => onSelectUser(user.id)}>
                  <UserAvatar user={user} />
                  <span className="min-w-0 text-start">
                    <span className="block truncate font-medium">
                      {user.name}
                    </span>
                    <span className="text-muted block truncate text-xs">
                      {user.email}
                    </span>
                  </span>
                </Button>
              ) : (
                <div className="flex items-center gap-3">
                  <UserAvatar user={user} />
                  <span className="min-w-0 text-start">
                    <span className="block truncate font-medium">
                      {user.name}
                    </span>
                    <span className="text-muted block truncate text-xs">
                      {user.email}
                    </span>
                  </span>
                </div>
              )}
            </Table.Cell>
            <Table.Cell>
              <Chip size="sm">{user.role ?? defaultRole}</Chip>
            </Table.Cell>
            <Table.Cell>
              <Chip color={user.banned ? 'danger' : 'default'} size="sm">
                {user.banned ? localization.banned : localization.active}
              </Chip>
            </Table.Cell>
            <Table.Cell>{formatDate(user.createdAt, locale)}</Table.Cell>
          </Table.Row>
        ))}
  </Table.Body>
)

const AdminUsersResults = ({
  canGetUser,
  canListUsers,
  defaultRole,
  isPermissionPending,
  isUsersPending,
  isUsersError,
  localization,
  locale,
  onSelectUser,
  onSelectionChange,
  onSortChange,
  selectedUserId,
  sorting,
  users
}: {
  canGetUser: boolean
  canListUsers: boolean
  defaultRole: string
  isPermissionPending: boolean
  isUsersPending: boolean
  isUsersError: boolean
  localization: AdminLocalization
  locale: string
  onSelectUser: (userId: string) => void
  onSelectionChange: NonNullable<
    ComponentProps<typeof Table.Content>['onSelectionChange']
  >
  onSortChange: NonNullable<
    ComponentProps<typeof Table.Content>['onSortChange']
  >
  selectedUserId?: string
  sorting: SortingState
  users: AdminUser[]
}) => {
  if (isPermissionPending) return <AdminTableSkeleton />
  if (!canListUsers) {
    return (
      <AdminMessage
        description={localization.accessDeniedDescription}
        title={localization.accessDenied}
      />
    )
  }
  if (isUsersError) {
    return (
      <AdminMessage
        description={localization.loadUsersErrorDescription}
        title={localization.loadUsersError}
      />
    )
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label={localization.users}
          selectedKeys={selectedUserId ? new Set([selectedUserId]) : new Set()}
          selectionBehavior="replace"
          selectionMode={canGetUser ? 'single' : undefined}
          sortDescriptor={getHeroUISortDescriptor(sorting)}
          onSelectionChange={onSelectionChange}
          onSortChange={onSortChange}>
          <Table.Header>
            <Table.Column id="name" isRowHeader allowsSorting>
              {({ sortDirection }) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  {localization.name}
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column id="role">{localization.role}</Table.Column>
            <Table.Column id="status">{localization.status}</Table.Column>
            <Table.Column id="createdAt" allowsSorting>
              {({ sortDirection }) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  {localization.created}
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
          </Table.Header>
          <AdminUsersTableBody
            canSelectUser={canGetUser}
            defaultRole={defaultRole}
            isPending={isUsersPending}
            localization={localization}
            locale={locale}
            onSelectUser={onSelectUser}
            users={users}
          />
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}

/** HeroUI presentation for the static Admin users view. */
const parseOption = <T extends string>(
  options: readonly T[],
  value: unknown,
  fallback: T
): T => {
  return options.find(option => option === value) ?? fallback
}

const parseSortOption = (value: string) => {
  const [id, direction] = value.split('-')
  return [
    id === 'name' ? 'name' : 'createdAt',
    direction === 'desc' ? 'desc' : 'asc'
  ] as const
}

export const AdminUsers = ({
  className,
  onSelectedUserIdChange,
  selectedUserId: controlledSelectedUserId
}: AdminUsersProps) => {
  const { authClient, locale } = useAuth<AdminAuthClient>()
  const config = useAuthPlugin(adminPlugin)
  const [localSelectedUserId, setLocalSelectedUserId] = useState<string>()
  const tableState = useServerTableState({
    initialSorting: INITIAL_ADMIN_SORTING,
    pageSize: config.pageSize
  })
  const { columnFilters, globalFilter, pagination, setPagination, sorting } =
    tableState
  const [searchField, setSearchField] = useState<SearchFieldName>('email')
  const [searchOperator, setSearchOperator] =
    useState<SearchOperator>('contains')
  const [createOpen, setCreateOpen] = useState(false)
  const [debouncedSearch] = useDebouncedValue(globalFilter.trim(), {
    wait: DEFAULT_TABLE_SEARCH_DEBOUNCE_MS
  })
  const status = parseOption(
    STATUS_FILTERS,
    columnFilters.find(filter => filter.id === 'status')?.value ?? 'all',
    'all'
  )
  const primarySort = sorting[0]
  const sort =
    `${primarySort?.id === 'name' ? 'name' : 'createdAt'}-${primarySort?.desc ? 'desc' : 'asc'}` as SortOption
  const isSelectionControlled = onSelectedUserIdChange !== undefined
  const selectedUserId = isSelectionControlled
    ? controlledSelectedUserId
    : localSelectedUserId
  const permission = useAdminPermission(authClient, { user: ['list'] })
  const createPermission = useAdminPermission(authClient, { user: ['create'] })
  const getPermission = useAdminPermission(authClient, { user: ['get'] })
  const params = useMemo<AdminListUsersParams>(() => {
    const sortBy = primarySort?.id === 'name' ? 'name' : 'createdAt'
    const sortDirection = primarySort?.desc ? 'desc' : 'asc'

    return {
      filterField: status === 'all' ? undefined : 'banned',
      filterOperator: status === 'all' ? undefined : 'eq',
      filterValue: status === 'all' ? undefined : status === 'banned',
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      searchField,
      searchOperator,
      searchValue: debouncedSearch || undefined,
      sortBy,
      sortDirection
    }
  }, [
    debouncedSearch,
    pagination.pageIndex,
    pagination.pageSize,
    searchField,
    searchOperator,
    primarySort?.desc,
    primarySort?.id,
    status
  ])
  const users = useAdminUsers(authClient, {
    enabled: permission.data?.success === true,
    params,
    placeholderData: keepPreviousData
  })

  const selectUser = (userId: string | undefined) => {
    if (!isSelectionControlled) setLocalSelectedUserId(userId)
    onSelectedUserIdChange?.(userId)
  }
  const total = users.data?.total ?? 0

  useEffect(() => {
    if (!users.isSuccess) return
    const pageIndex = getClampedTablePageIndex(
      pagination.pageIndex,
      pagination.pageSize,
      total
    )
    if (pageIndex !== pagination.pageIndex) {
      setPagination(current => ({ ...current, pageIndex }))
    }
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    setPagination,
    total,
    users.isSuccess
  ])
  const table = useAdminTable(
    {
      atoms: tableState.atoms,
      columns: adminColumns,
      data: users.data?.users ?? EMPTY_USERS,
      getRowId: user => user.id,
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      rowCount: total
    },
    () => null
  )

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <header className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">{config.localization.users}</h1>
          <p className="text-muted text-sm">
            {config.localization.usersDescription}
          </p>
        </div>
        {createPermission.data?.success ? (
          <Button size="sm" onPress={() => setCreateOpen(true)}>
            <PersonPlus size={16} />
            {config.localization.createUser}
          </Button>
        ) : null}
      </header>

      <AdminUsersFilters
        localization={config.localization}
        onSearchFieldChange={value => {
          setSearchField(parseOption(SEARCH_FIELDS, value, 'email'))
          table.setPageIndex(0)
        }}
        onSearchOperatorChange={value => {
          setSearchOperator(parseOption(SEARCH_OPERATORS, value, 'contains'))
          table.setPageIndex(0)
        }}
        onSearchValueChange={value => table.setGlobalFilter(value)}
        onStatusChange={value => {
          const nextStatus = parseOption(STATUS_FILTERS, value, 'all')
          table
            .getColumn('status')
            ?.setFilterValue(nextStatus === 'all' ? undefined : nextStatus)
        }}
        onSortChange={value => {
          const [id, direction] = parseSortOption(String(value))
          table.setSorting([{ id, desc: direction === 'desc' }])
        }}
        searchField={searchField}
        searchOperator={searchOperator}
        searchValue={globalFilter}
        sort={sort}
        status={status}
      />

      <AdminUsersResults
        canGetUser={getPermission.data?.success === true}
        canListUsers={permission.data?.success === true}
        defaultRole={config.defaultRole}
        isPermissionPending={permission.isPending}
        isUsersPending={users.isPending}
        isUsersError={users.isError}
        localization={config.localization}
        locale={locale.languageTag}
        onSelectUser={userId => selectUser(userId)}
        onSelectionChange={selection => {
          if (selection === 'all') return
          const [userId] = selection
          selectUser(userId == null ? undefined : String(userId))
        }}
        onSortChange={descriptor =>
          table.setSorting(getTanStackSorting(descriptor))
        }
        selectedUserId={selectedUserId}
        sorting={sorting}
        users={users.data?.users ?? EMPTY_USERS}
      />

      <footer className="text-muted flex items-center justify-between gap-2 text-sm">
        <span>
          {config.localization.usersPaginationRange
            .replace(
              '{{from}}',
              String(total ? pagination.pageIndex * pagination.pageSize + 1 : 0)
            )
            .replace(
              '{{to}}',
              String(
                Math.min(
                  total,
                  (pagination.pageIndex + 1) * pagination.pageSize
                )
              )
            )
            .replace('{{total}}', String(total))}
        </span>
        <div className="flex gap-2">
          <Button
            isDisabled={!table.getCanPreviousPage() || users.isFetching}
            size="sm"
            variant="outline"
            onPress={() => table.previousPage()}>
            {config.localization.previousPage}
          </Button>
          <Button
            isDisabled={!table.getCanNextPage() || users.isFetching}
            size="sm"
            variant="outline"
            onPress={() => table.nextPage()}>
            {config.localization.nextPage}
          </Button>
        </div>
      </footer>

      <UserDrawer
        canGetUser={getPermission.data?.success === true}
        isOpen={Boolean(selectedUserId) && getPermission.data?.success === true}
        onOpenChange={open => !open && selectUser(undefined)}
        userId={selectedUserId}
      />
      <CreateUserDialog isOpen={createOpen} onOpenChange={setCreateOpen} />
    </section>
  )
}

function AdminMessage({
  description,
  title
}: {
  description: string
  title: string
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-8 text-center">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-muted text-sm">{description}</p>
    </div>
  )
}

function AdminTableSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-xl border p-4">
      {rowSkeletonIds.map(id => (
        <Skeleton className="h-12 w-full" key={id} />
      ))}
    </div>
  )
}

function CreateUserDialog({
  isOpen,
  onOpenChange
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { additionalFields, authClient, localization } =
    useAuth<AdminAuthClient>()
  const config = useAuthPlugin(adminPlugin)
  const createUser = useCreateAdminUser(authClient)
  const canSetRole = useAdminPermission(authClient, { user: ['set-role'] })
  const configuredAdditionalFields = additionalFields ?? []
  const form = useAuthForm({
    defaultValues: {
      additionalFields: getAdditionalFieldDefaultValues(
        configuredAdditionalFields
      ),
      email: '',
      emailVerified: false,
      name: '',
      password: '',
      roles: [config.defaultRole]
    },
    onSubmit: async ({ value }) => {
      try {
        await createUser.mutateAsync(
          {
            data: {
              ...getAdditionalFieldSubmitValues(
                configuredAdditionalFields,
                value.additionalFields
              ),
              emailVerified: value.emailVerified
            },
            email: value.email,
            name: value.name,
            password: value.password,
            ...(canSetRole.data?.success
              ? { role: asAdminRoles(value.roles) }
              : {})
          },
          { onSuccess: close }
        )
      } catch {
        // vx-bot/NOTE: The mutation reports the error through its configured handler.
      }
    }
  })

  useEffect(() => {
    if (!config.allowMultipleRoles)
      form.setFieldValue('roles', current => current.slice(0, 1))
  }, [config.allowMultipleRoles, form])

  const close = () => {
    createUser.reset()
    form.reset()
    onOpenChange(false)
  }

  return (
    <AlertDialog.Backdrop
      isOpen={isOpen}
      onOpenChange={open => (open ? onOpenChange(true) : close())}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="default">
                  <PersonPlus size={16} />
                </AlertDialog.Icon>
                <AlertDialog.Heading>
                  {config.localization.createUser}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="overflow-visible">
                <p className="text-muted text-sm">
                  {config.localization.usersDescription}
                </p>
                <div className="mt-4 flex flex-col gap-4">
                  <form.Field name="name">
                    {field => (
                      <TextField
                        isRequired
                        name={field.name}
                        value={field.state.value}
                        onChange={field.handleChange}>
                        <Label>{config.localization.name}</Label>
                        <Input variant="secondary" />
                        <FieldError />
                      </TextField>
                    )}
                  </form.Field>
                  <form.Field name="email">
                    {field => (
                      <TextField
                        isRequired
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onChange={field.handleChange}>
                        <Label>{config.localization.email}</Label>
                        <Input autoComplete="off" variant="secondary" />
                        <FieldError />
                      </TextField>
                    )}
                  </form.Field>
                  <form.Field name="password">
                    {field => (
                      <TextField
                        isRequired
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={field.handleChange}>
                        <Label>{config.localization.password}</Label>
                        <Input
                          autoComplete="new-password"
                          variant="secondary"
                        />
                        <FieldError />
                      </TextField>
                    )}
                  </form.Field>
                  {canSetRole.isPending ? (
                    <Skeleton className="h-10 w-full" />
                  ) : canSetRole.data?.success ? (
                    <form.Field name="roles">
                      {field => (
                        <Select
                          fullWidth
                          selectionMode={
                            config.allowMultipleRoles ? 'multiple' : 'single'
                          }
                          value={field.state.value}
                          variant="secondary"
                          onChange={keys => {
                            const next = (
                              Array.isArray(keys)
                                ? keys
                                : keys === null
                                  ? []
                                  : [keys]
                            ).map(String)
                            if (next.length)
                              field.handleChange(
                                config.allowMultipleRoles
                                  ? next
                                  : next.slice(0, 1)
                              )
                          }}>
                          <Label>{config.localization.role}</Label>
                          <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox
                              selectionMode={
                                config.allowMultipleRoles
                                  ? 'multiple'
                                  : 'single'
                              }>
                              {config.roles.map(role => (
                                <ListBox.Item
                                  id={role}
                                  key={role}
                                  textValue={role}>
                                  {role}
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      )}
                    </form.Field>
                  ) : null}
                  <form.Field name="emailVerified">
                    {field => (
                      <Switch
                        isSelected={field.state.value}
                        onChange={field.handleChange}>
                        {config.localization.emailVerified}
                      </Switch>
                    )}
                  </form.Field>
                  {configuredAdditionalFields.map(configuredField => (
                    <form.AppField
                      key={configuredField.name}
                      name={`additionalFields.${configuredField.name}`}
                      validators={getAuthAdditionalFieldValidators(
                        configuredField,
                        localization.auth.fieldRequired
                      )}>
                      {field => (
                        <field.AuthFormAdditionalField
                          field={configuredField}
                          isPending={createUser.isPending}
                        />
                      )}
                    </form.AppField>
                  ))}
                  {createUser.error ? (
                    <FieldError>
                      {getAdminErrorMessage(createUser.error)}
                    </FieldError>
                  ) : null}
                </div>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  isDisabled={createUser.isPending}
                  slot="close"
                  variant="tertiary">
                  {config.localization.cancel}
                </Button>
                <form.AuthFormSubmitButton isDisabled={createUser.isPending}>
                  {config.localization.createUser}
                </form.AuthFormSubmitButton>
              </AlertDialog.Footer>
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}

function UserDrawer({
  canGetUser,
  isOpen,
  onOpenChange,
  userId
}: {
  canGetUser: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  userId?: string
}) {
  const {
    additionalFields,
    authClient,
    localization,
    locale,
    navigate,
    plugins
  } = useAuth<AdminAuthClient>()
  const config = useAuthPlugin(adminPlugin)
  const contributedTabs = useMemo(
    () =>
      plugins.flatMap(plugin =>
        // oxlint-disable-next-line oxc/no-map-spread -- Copies keep plugin-owned objects unmutated.
        (plugin.adminUserTabs ?? []).map(tab => ({
          ...tab,
          id: `${plugin.id}:${tab.id}`
        }))
      ),
    [plugins]
  )
  const user = useAdminUser(authClient, userId, { enabled: canGetUser })
  const { data: actor } = useSession(authClient)
  const sessionsPermission = useAdminPermission(
    authClient,
    {
      session: ['list']
    },
    { enabled: Boolean(userId) }
  )
  const sessions = useAdminUserSessions(authClient, userId, {
    enabled: sessionsPermission.data?.success === true
  })
  const canUpdate = useAdminPermission(
    authClient,
    { user: ['update'] },
    { enabled: Boolean(userId) }
  )
  const canSetRole = useAdminPermission(
    authClient,
    { user: ['set-role'] },
    { enabled: Boolean(userId) }
  )
  const canSetEmail = useAdminPermission(
    authClient,
    { user: ['set-email'] },
    { enabled: Boolean(userId) }
  )
  const canSetPassword = useAdminPermission(
    authClient,
    { user: ['set-password'] },
    { enabled: Boolean(userId) }
  )
  const canBan = useAdminPermission(
    authClient,
    { user: ['ban'] },
    { enabled: Boolean(userId) }
  )
  const canImpersonate = useAdminPermission(
    authClient,
    { user: ['impersonate'] },
    { enabled: Boolean(userId) }
  )
  const canDelete = useAdminPermission(
    authClient,
    { user: ['delete'] },
    { enabled: Boolean(userId) }
  )
  const canRevoke = useAdminPermission(
    authClient,
    { session: ['revoke'] },
    { enabled: Boolean(userId) }
  )
  const {
    copied: userIdCopied,
    copy: copyUserId,
    reset: resetUserIdCopy
  } = useCopyToClipboard()

  useEffect(() => {
    if (isOpen && userId) resetUserIdCopy()
  }, [isOpen, userId, resetUserIdCopy])

  const [banReason, setBanReason] = useState('')
  const [banDuration, setBanDuration] = useState('')
  const banDurationSeconds = getBanDurationSeconds(banDuration)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [dangerousAction, setDangerousAction] = useState<DangerousAction>()
  const detail = user.data
  const targetIsAdmin = detail
    ? isAdminTarget(detail, config.adminRoles, config.adminUserIds)
    : false
  const canImpersonateAdmins = useAdminPermission(
    authClient,
    { user: ['impersonate-admins'] },
    { enabled: Boolean(userId && targetIsAdmin) }
  )
  const isSelf = detail?.id === actor?.user.id
  const updateUser = useUpdateAdminUser(authClient)
  const setRoleMutation = useSetAdminUserRole(authClient)
  const setPassword = useSetAdminUserPassword(authClient)
  const ban = useBanAdminUser(authClient)
  const unban = useUnbanAdminUser(authClient)
  const impersonate = useImpersonateAdminUser(authClient)
  const remove = useRemoveAdminUser(authClient)
  const revokeSession = useRevokeAdminUserSession(authClient, userId)
  const revokeSessions = useRevokeAdminUserSessions(authClient, userId)

  const configuredUserFields = useMemo(
    () => fieldsWithModelValues(additionalFields ?? [], { ...detail }),
    [additionalFields, detail]
  )
  const profileForm = useAuthForm({
    defaultValues: {
      additionalFields: getAdditionalFieldDefaultValues(configuredUserFields),
      email: '',
      emailVerified: false,
      name: '',
      roles: [config.defaultRole]
    },
    onSubmit: async ({ value }) => {
      if (!detail) return

      const mutations: Promise<unknown>[] = []
      if (canUpdate.data?.success) {
        mutations.push(
          updateUser.mutateAsync({
            userId: detail.id,
            data: {
              ...getAdditionalFieldSubmitValues(
                configuredUserFields,
                value.additionalFields
              ),
              name: value.name.trim(),
              ...(canSetEmail.data?.success
                ? {
                    email: value.email.trim(),
                    emailVerified: value.emailVerified
                  }
                : {})
            }
          })
        )
      }
      if (canSetRole.data?.success && !isSelf) {
        mutations.push(
          setRoleMutation.mutateAsync({
            userId: detail.id,
            role: asAdminRoles(value.roles)
          })
        )
      }

      try {
        await Promise.all(mutations)
        onOpenChange(false)
      } catch {
        // vx-bot/NOTE: Mutation errors are rendered next to the form.
      }
    }
  })

  useEffect(() => {
    // vx-bot/NOTE: keepDefaultValues is required: useAppForm calls update(opts) on
    // vx-bot/NOTE: every render, and update() resets untouched values back to
    // vx-bot/NOTE: defaultValues whenever they differ. Without this flag the reset
    // vx-bot/NOTE: below would swap defaultValues to the loaded user, letting the
    // vx-bot/NOTE: next re-render clobber the fields back to the empty defaults
    // vx-bot/NOTE: (blank name/email and the default role) before this effect re-ran.
    profileForm.reset(
      {
        additionalFields: getAdditionalFieldDefaultValues(configuredUserFields),
        email: detail?.email ?? '',
        emailVerified: detail?.emailVerified ?? false,
        name: detail?.name ?? '',
        roles: parseAdminRoles(
          detail?.role,
          config.defaultRole,
          config.allowMultipleRoles
        )
      },
      { keepDefaultValues: true }
    )
  }, [
    config.allowMultipleRoles,
    config.defaultRole,
    configuredUserFields,
    detail?.email,
    detail?.emailVerified,
    detail?.name,
    detail?.role,
    profileForm
  ])

  const confirmDangerousAction = () => {
    if (!detail) return
    if (dangerousAction === 'ban') {
      if (banDurationSeconds === null) return
      ban.mutate(
        {
          banExpiresIn: banDurationSeconds,
          banReason: banReason.trim() || undefined,
          userId: detail.id
        },
        {
          onSuccess: () => {
            setBanDuration('')
            setBanReason('')
            setDangerousAction(undefined)
          }
        }
      )
    }
    if (dangerousAction === 'delete')
      remove.mutate(
        { userId: detail.id },
        {
          onSuccess: () => {
            setDangerousAction(undefined)
            onOpenChange(false)
          }
        }
      )
    if (dangerousAction === 'revokeAll')
      revokeSessions.mutate(
        { userId: detail.id },
        { onSuccess: () => setDangerousAction(undefined) }
      )
    if (dangerousAction === 'impersonate')
      impersonate.mutate(
        { userId: detail.id },
        {
          onSuccess: () => {
            setDangerousAction(undefined)
            if (config.impersonationRedirectTo)
              navigate({ to: config.impersonationRedirectTo })
          }
        }
      )
  }
  const closeDangerousAction = () => {
    ban.reset()
    remove.reset()
    revokeSessions.reset()
    impersonate.reset()
    setBanDuration('')
    setBanReason('')
    setDangerousAction(undefined)
  }
  const dangerousMutation =
    dangerousAction === 'ban'
      ? ban
      : dangerousAction === 'delete'
        ? remove
        : dangerousAction === 'revokeAll'
          ? revokeSessions
          : impersonate
  const dangerousLabel =
    dangerousAction === 'ban'
      ? config.localization.banUser
      : dangerousAction === 'delete'
        ? config.localization.deleteUser
        : dangerousAction === 'revokeAll'
          ? config.localization.revokeAllSessions
          : config.localization.impersonateUser

  return (
    <>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container>
          <Modal.Dialog className="h-[min(52rem,calc(100vh-2rem))] sm:max-w-4xl">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b">
              {detail ? (
                <div className="flex w-full items-center justify-between gap-4 pr-8">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar size="lg" user={detail} />
                    <div className="min-w-0">
                      <Modal.Heading className="truncate">
                        {detail.name}
                      </Modal.Heading>
                      <p className="text-muted truncate text-sm">
                        {detail.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Chip
                      color={detail.banned ? 'danger' : 'default'}
                      size="sm">
                      {detail.banned
                        ? config.localization.banned
                        : config.localization.active}
                    </Chip>
                    <Dropdown>
                      <Button
                        aria-label={config.localization.moreActions}
                        isIconOnly
                        size="sm"
                        variant="ghost">
                        <Ellipsis size={16} />
                      </Button>
                      <Dropdown.Popover>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            isDisabled={
                              canImpersonate.isPending ||
                              !canImpersonate.data?.success ||
                              (targetIsAdmin &&
                                (canImpersonateAdmins.isPending ||
                                  !canImpersonateAdmins.data?.success)) ||
                              isSelf
                            }
                            textValue={config.localization.impersonateUser}
                            onAction={() => setDangerousAction('impersonate')}>
                            <ArrowRightToSquare size={16} />
                            {config.localization.impersonateUser}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                <Modal.Heading>{config.localization.userDetails}</Modal.Heading>
              )}
            </Modal.Header>
            <Modal.Body className="min-h-0 overflow-hidden p-0">
              {user.isPending ? (
                <div className="flex flex-col gap-3 p-6">
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
              ) : detail ? (
                <Tabs className="h-full min-h-0 gap-0 overflow-hidden">
                  <Tabs.ListContainer className="shrink-0 border-b px-6">
                    <Tabs.List aria-label={config.localization.userDetails}>
                      <Tabs.Tab id="overview">
                        <Person
                          size={16}
                          aria-hidden="true"
                          className="text-muted"
                        />
                        {config.localization.overview}
                        <Tabs.Indicator />
                      </Tabs.Tab>
                      <Tabs.Tab
                        id="sessions"
                        isDisabled={
                          sessionsPermission.isPending ||
                          !sessionsPermission.data?.success
                        }>
                        <Display
                          size={16}
                          aria-hidden="true"
                          className="text-muted"
                        />
                        {config.localization.sessions}
                        <Tabs.Indicator />
                      </Tabs.Tab>
                      {contributedTabs.map(tab => (
                        <Tabs.Tab id={tab.id} key={tab.id}>
                          {tab.label}
                          <Tabs.Indicator />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                  <Tabs.Panel className="min-h-0 overflow-hidden" id="overview">
                    <profileForm.AppForm>
                      <profileForm.AuthFormRoot className="grid h-full grid-rows-[minmax(0,1fr)_auto]">
                        <div className="overflow-y-auto">
                          <section className="flex flex-col gap-5 p-6">
                            <h3 className="font-medium">
                              {config.localization.profileAndAccess}
                            </h3>
                            <div className="grid gap-5 md:grid-cols-2">
                              <profileForm.Field name="name">
                                {field => (
                                  <TextField
                                    isDisabled={!canUpdate.data?.success}
                                    isRequired
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={field.handleChange}>
                                    <Label>{config.localization.name}</Label>
                                    <Input variant="secondary" />
                                  </TextField>
                                )}
                              </profileForm.Field>
                              <profileForm.Field name="email">
                                {field => (
                                  <TextField
                                    isDisabled={
                                      !canUpdate.data?.success ||
                                      !canSetEmail.data?.success
                                    }
                                    isRequired
                                    name={field.name}
                                    type="email"
                                    value={field.state.value}
                                    onChange={field.handleChange}>
                                    <Label>{config.localization.email}</Label>
                                    <Input variant="secondary" />
                                    <FieldError />
                                  </TextField>
                                )}
                              </profileForm.Field>
                              <profileForm.Field name="emailVerified">
                                {field => (
                                  <Switch
                                    isDisabled={
                                      !canUpdate.data?.success ||
                                      !canSetEmail.data?.success
                                    }
                                    isSelected={field.state.value}
                                    onChange={field.handleChange}>
                                    {config.localization.emailVerified}
                                  </Switch>
                                )}
                              </profileForm.Field>
                              <profileForm.Field name="roles">
                                {field => (
                                  <Select
                                    fullWidth
                                    isDisabled={
                                      isSelf || !canSetRole.data?.success
                                    }
                                    selectionMode={
                                      config.allowMultipleRoles
                                        ? 'multiple'
                                        : 'single'
                                    }
                                    value={field.state.value}
                                    variant="secondary"
                                    onChange={keys => {
                                      const next = (
                                        Array.isArray(keys)
                                          ? keys
                                          : keys === null
                                            ? []
                                            : [keys]
                                      ).map(String)
                                      if (next.length)
                                        field.handleChange(
                                          config.allowMultipleRoles
                                            ? next
                                            : next.slice(0, 1)
                                        )
                                    }}>
                                    <Label>{config.localization.role}</Label>
                                    <Select.Trigger>
                                      <Select.Value />
                                      <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover>
                                      <ListBox
                                        selectionMode={
                                          config.allowMultipleRoles
                                            ? 'multiple'
                                            : 'single'
                                        }>
                                        {config.roles.map(item => (
                                          <ListBox.Item
                                            id={item}
                                            key={item}
                                            textValue={item}>
                                            {item}
                                            <ListBox.ItemIndicator />
                                          </ListBox.Item>
                                        ))}
                                      </ListBox>
                                    </Select.Popover>
                                  </Select>
                                )}
                              </profileForm.Field>
                              {configuredUserFields.map(configuredField => (
                                <profileForm.AppField
                                  key={configuredField.name}
                                  name={`additionalFields.${configuredField.name}`}
                                  validators={getAuthAdditionalFieldValidators(
                                    configuredField,
                                    localization.auth.fieldRequired
                                  )}>
                                  {field => (
                                    <field.AuthFormAdditionalField
                                      field={configuredField}
                                      isPending={
                                        updateUser.isPending ||
                                        !canUpdate.data?.success
                                      }
                                    />
                                  )}
                                </profileForm.AppField>
                              ))}
                            </div>
                            <FieldError>
                              {getAdminErrorMessage(updateUser.error) ??
                                getAdminErrorMessage(setRoleMutation.error)}
                            </FieldError>
                          </section>
                          <Separator />
                          <section className="flex flex-col gap-4 p-6">
                            <h3 className="font-medium">
                              {config.localization.accountInformation}
                            </h3>
                            <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                              <div className="flex flex-col gap-1">
                                <dt className="text-muted">
                                  {config.localization.userId}
                                </dt>
                                <dd className="flex min-w-0 items-center gap-1">
                                  <code className="truncate text-xs">
                                    {detail.id}
                                  </code>
                                  <Button
                                    aria-label={
                                      userIdCopied
                                        ? localization.settings
                                            .copiedToClipboard
                                        : config.localization.copyUserId
                                    }
                                    isIconOnly
                                    size="sm"
                                    type="button"
                                    variant="ghost"
                                    onPress={() => void copyUserId(detail.id)}>
                                    {userIdCopied ? (
                                      <Check size={16} />
                                    ) : (
                                      <Copy size={16} />
                                    )}
                                  </Button>
                                </dd>
                              </div>
                              <div className="flex flex-col gap-1">
                                <dt className="text-muted">
                                  {config.localization.created}
                                </dt>
                                <dd>
                                  {formatDate(
                                    detail.createdAt,
                                    locale.languageTag
                                  )}
                                </dd>
                              </div>
                              <div className="flex flex-col gap-1">
                                <dt className="text-muted">
                                  {config.localization.status}
                                </dt>
                                <dd>
                                  <Chip
                                    color={detail.banned ? 'danger' : 'default'}
                                    size="sm">
                                    {detail.banned
                                      ? config.localization.banned
                                      : config.localization.active}
                                  </Chip>
                                </dd>
                              </div>
                              {detail.banned && detail.banReason ? (
                                <div className="flex flex-col gap-1">
                                  <dt className="text-muted">
                                    {config.localization.banReason}
                                  </dt>
                                  <dd>{detail.banReason}</dd>
                                </div>
                              ) : null}
                              {detail.banned && detail.banExpires ? (
                                <div className="flex flex-col gap-1">
                                  <dt className="text-muted">
                                    {config.localization.banExpires}
                                  </dt>
                                  <dd>
                                    {formatDate(
                                      detail.banExpires,
                                      locale.languageTag
                                    )}
                                  </dd>
                                </div>
                              ) : null}
                            </dl>
                          </section>
                          <Separator />
                          <section className="flex flex-col gap-4 p-6">
                            <h3 className="font-medium">
                              {config.localization.security}
                            </h3>
                            <div>
                              <Button
                                isDisabled={
                                  canSetPassword.isPending ||
                                  !canSetPassword.data?.success
                                }
                                type="button"
                                variant="outline"
                                onPress={() => setPasswordOpen(true)}>
                                <Key size={16} />
                                {config.localization.setPassword}
                              </Button>
                            </div>
                          </section>
                          <Separator />
                          <section className="flex flex-col gap-4 p-6">
                            <h3 className="font-medium">
                              {config.localization.dangerZone}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <Button
                                isDisabled={
                                  canBan.isPending ||
                                  !canBan.data?.success ||
                                  isSelf
                                }
                                type="button"
                                variant="outline"
                                onPress={() =>
                                  detail.banned
                                    ? unban.mutate({ userId: detail.id })
                                    : setDangerousAction('ban')
                                }>
                                <Ban size={16} />
                                {detail.banned
                                  ? config.localization.unbanUser
                                  : config.localization.banUser}
                              </Button>
                              <Button
                                isDisabled={
                                  canDelete.isPending ||
                                  !canDelete.data?.success ||
                                  isSelf
                                }
                                type="button"
                                variant="danger"
                                onPress={() => setDangerousAction('delete')}>
                                <TrashBin size={16} />
                                {config.localization.deleteUser}
                              </Button>
                            </div>
                            {unban.error ? (
                              <FieldError>
                                {getAdminErrorMessage(unban.error)}
                              </FieldError>
                            ) : null}
                          </section>
                        </div>
                        <div className="bg-surface-secondary flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onPress={() => onOpenChange(false)}>
                            {config.localization.cancel}
                          </Button>
                          <profileForm.Subscribe
                            selector={state =>
                              [state.values.name, state.values.email] as const
                            }>
                            {([name, email]) => (
                              <profileForm.AuthFormSubmitButton
                                isDisabled={
                                  !name.trim() ||
                                  !email.trim() ||
                                  canUpdate.isPending ||
                                  canSetRole.isPending ||
                                  (!canUpdate.data?.success &&
                                    (!canSetRole.data?.success || isSelf))
                                }>
                                {config.localization.saveChanges}
                              </profileForm.AuthFormSubmitButton>
                            )}
                          </profileForm.Subscribe>
                        </div>
                      </profileForm.AuthFormRoot>
                    </profileForm.AppForm>
                  </Tabs.Panel>
                  <Tabs.Panel
                    className="flex min-h-0 flex-col gap-3 overflow-y-auto p-6"
                    id="sessions">
                    {sessions.isPending ? (
                      rowSkeletonIds.map(id => (
                        <Skeleton
                          className="h-16 w-full"
                          key={`dialog-${id}`}
                        />
                      ))
                    ) : sessions.data?.sessions.length ? (
                      <>
                        <Button
                          className="self-end"
                          isDisabled={
                            canRevoke.isPending ||
                            !canRevoke.data?.success ||
                            isSelf
                          }
                          variant="outline"
                          onPress={() => setDangerousAction('revokeAll')}>
                          {config.localization.revokeAllSessions}
                        </Button>
                        {sessions.data.sessions.map(session => (
                          <div
                            className="flex items-start justify-between gap-3 rounded-xl border p-3"
                            key={session.id}>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium">
                                {session.userAgent ||
                                  config.localization.sessions}
                              </div>
                              <div className="text-muted text-xs">
                                {formatDate(
                                  session.createdAt,
                                  locale.languageTag
                                )}
                                {' · '}
                                {formatDate(
                                  session.expiresAt,
                                  locale.languageTag
                                )}
                              </div>
                              {config.showIpAddress && session.ipAddress ? (
                                <div className="text-muted mt-1 font-mono text-xs">
                                  {session.ipAddress}
                                </div>
                              ) : null}
                            </div>
                            <Button
                              aria-label={config.localization.revoke}
                              isDisabled={
                                revokeSession.isPending ||
                                canRevoke.isPending ||
                                !canRevoke.data?.success ||
                                isSelf
                              }
                              isIconOnly
                              size="sm"
                              variant="tertiary"
                              onPress={() =>
                                revokeSession.mutate({
                                  sessionToken: session.token
                                })
                              }>
                              <TrashBin size={16} />
                            </Button>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-muted py-8 text-center text-sm">
                        {config.localization.noSessions}
                      </p>
                    )}
                  </Tabs.Panel>
                  {contributedTabs.map(tab => {
                    const ContributedTab = tab.component
                    return (
                      <Tabs.Panel
                        className="min-h-0 overflow-y-auto p-6"
                        id={tab.id}
                        key={tab.id}>
                        <ContributedTab userId={detail.id} />
                      </Tabs.Panel>
                    )
                  })}
                </Tabs>
              ) : (
                <AdminMessage
                  title={config.localization.loadUsersError}
                  description={config.localization.loadUsersErrorDescription}
                />
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
      <PasswordDialog
        isOpen={passwordOpen}
        mutation={setPassword}
        userId={detail?.id}
        onOpenChange={setPasswordOpen}
      />
      <AlertDialog.Backdrop
        isOpen={Boolean(dangerousAction)}
        onOpenChange={open => !open && closeDangerousAction()}>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <Ban size={16} />
              </AlertDialog.Icon>
              <AlertDialog.Heading>{dangerousLabel}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="flex flex-col gap-2">
              <p className="text-muted text-sm">{detail?.email}</p>
              {dangerousAction === 'ban' ? (
                <div className="flex flex-col gap-4 pt-2">
                  <TextField value={banReason} onChange={setBanReason}>
                    <Label>{config.localization.banReason}</Label>
                    <Input variant="secondary" />
                  </TextField>
                  <TextField
                    type="number"
                    value={banDuration}
                    onChange={setBanDuration}>
                    <Label>{config.localization.banDuration}</Label>
                    <Input min="1" step="1" variant="secondary" />
                  </TextField>
                  <p className="text-muted text-xs">
                    {config.localization.banDurationDescription}
                  </p>
                </div>
              ) : null}
              {dangerousMutation.error ? (
                <FieldError>
                  {getAdminErrorMessage(dangerousMutation.error)}
                </FieldError>
              ) : null}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                {config.localization.cancel}
              </Button>
              <Button
                isDisabled={
                  isSelf ||
                  (dangerousAction === 'ban' && banDurationSeconds === null)
                }
                isPending={dangerousMutation.isPending}
                variant={dangerousAction === 'delete' ? 'danger' : 'primary'}
                onPress={confirmDangerousAction}>
                {dangerousLabel}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </>
  )
}

function PasswordDialog({
  isOpen,
  mutation,
  onOpenChange,
  userId
}: {
  isOpen: boolean
  mutation: ReturnType<typeof useSetAdminUserPassword>
  onOpenChange: (open: boolean) => void
  userId?: string
}) {
  const config = useAuthPlugin(adminPlugin)
  const form = useAuthForm({
    defaultValues: { password: '' },
    onSubmit: async ({ value }) => {
      if (!userId) return
      await mutation.mutateAsync({ userId, newPassword: value.password })
      close()
    }
  })
  const close = () => {
    form.reset()
    mutation.reset()
    onOpenChange(false)
  }

  return (
    <AlertDialog.Backdrop
      isOpen={isOpen}
      onOpenChange={open => (open ? onOpenChange(true) : close())}>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <form.AppForm>
            <form.AuthFormRoot>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="default">
                  <Key size={16} />
                </AlertDialog.Icon>
                <AlertDialog.Heading>
                  {config.localization.setPassword}
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="overflow-visible">
                <form.AppField
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      value ? undefined : config.localization.password
                  }}>
                  {field => (
                    <field.AuthFormTextField
                      inputProps={{
                        autoComplete: 'new-password',
                        variant: 'secondary'
                      }}
                      label={config.localization.password}
                      type="password"
                    />
                  )}
                </form.AppField>
                <form.AuthFormServerError />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  isDisabled={mutation.isPending}
                  slot="close"
                  variant="tertiary">
                  {config.localization.cancel}
                </Button>
                <form.AuthFormSubmitButton
                  isDisabled={mutation.isPending || !userId}>
                  {config.localization.setPassword}
                </form.AuthFormSubmitButton>
              </AlertDialog.Footer>
            </form.AuthFormRoot>
          </form.AppForm>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}
