'use client'

import { useDebouncedValue } from '@tanstack/react-pacer'
import { keepPreviousData } from '@tanstack/react-query'
import {
  columnFilteringFeature,
  createTableHook,
  globalFilteringFeature,
  rowPaginationFeature,
  tableFeatures
} from '@tanstack/react-table'
import { createElement, useEffect, useMemo } from 'react'

import {
  DEFAULT_TABLE_SEARCH_DEBOUNCE_MS,
  formatLocaleDate,
  getClampedTablePageIndex
} from '@vezham/auth-ui-core'
import type {
  DashAuditLog,
  DashAuthClient,
  DashLocalization
} from '@vezham/auth-ui-core/plugins/dash'
import {
  dashPlugin,
  formatDashEventName,
  getDashEventDetail,
  getDashEventKey,
  getDashEventLocation
} from '@vezham/auth-ui-core/plugins/dash'
import {
  type OrganizationAuthClient,
  hasMemberRole,
  organizationPlugin
} from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useDashAllAuditLogs,
  useDashAuditLogs,
  useDashUserAuditLogs
} from '@vezham/auth-ui-react/plugins/dash'
import { useActiveMemberRole } from '@vezham/auth-ui-react/plugins/organization'
import {
  AltArrowLeft as ChevronLeft,
  AltArrowRight as ChevronRight,
  Monitor as DisplayPulse,
  Settings as Gear,
  User as Person,
  UsersGroupRounded as Persons,
  Pulse,
  Shield
} from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Chip,
  Label,
  ListBox,
  SearchField,
  Select,
  Skeleton,
  Spinner,
  cn
} from '@vezham/react-v3'

import { useServerTableState } from '../../server-table-state'

type ActivityAccess = 'admin' | 'admin-user' | 'organization' | 'user'

const { createAppColumnHelper, useAppTable: useActivityTable } =
  createTableHook({
    features: tableFeatures({
      columnFilteringFeature,
      globalFilteringFeature,
      rowPaginationFeature
    })
  })

const activityColumnHelper = createAppColumnHelper<DashAuditLog>()
const activityColumns = activityColumnHelper.columns([
  activityColumnHelper.accessor('eventType', { id: 'eventType' })
])
const EMPTY_EVENTS: DashAuditLog[] = []

type ActivityFeedProps = {
  access: ActivityAccess
  organizationId?: string
  ready?: boolean
  className?: string
  userId?: string
  variant?: CardProps['variant']
}

export type AdminUserActivityProps = {
  className?: string
  userId: string
  variant?: CardProps['variant']
}

export type AdminActivityProps = {
  className?: string
  variant?: CardProps['variant']
}

export type UserActivityProps = {
  className?: string
  variant?: CardProps['variant']
}

export type OrganizationActivityProps = {
  className?: string
  organizationId: string
  organizationSlug: string
  variant?: CardProps['variant']
}

const generateN = (count: number) =>
  Array.from(
    { length: Math.max(0, Math.floor(count)) },
    (_, index) => index + 1
  )

const formatRelativeTime = (value: string, languageTag: string) => {
  const date = new Date(value)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (!Number.isFinite(seconds)) return value

  const formatter = new Intl.RelativeTimeFormat(languageTag, {
    numeric: 'auto'
  })
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000],
    ['month', 2_592_000],
    ['week', 604_800],
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
    ['second', 1]
  ]

  for (const [unit, threshold] of units) {
    if (Math.abs(seconds) >= threshold) {
      return formatter.format(-Math.trunc(seconds / threshold), unit)
    }
  }

  return formatter.format(0, 'second')
}

const getEventIcon = (eventType: string) => {
  if (
    eventType.includes('password') ||
    eventType.includes('two_factor') ||
    eventType.includes('banned') ||
    eventType === 'user_sign_in_failed'
  ) {
    return Shield
  }
  if (eventType.startsWith('organization_member')) return Persons
  if (eventType.startsWith('organization_')) return Gear
  if (eventType.includes('session') || eventType.includes('signed_')) {
    return DisplayPulse
  }
  if (
    eventType.startsWith('user_') ||
    eventType.startsWith('profile_') ||
    eventType.startsWith('email_') ||
    eventType.startsWith('account_')
  ) {
    return Person
  }
  return Pulse
}

const ActivityRow = ({ event }: { event: DashAuditLog }) => {
  const { locale } = useAuth()
  const { localization, showIpAddress } = useAuthPlugin(dashPlugin)
  const title =
    (localization.eventLabels as Record<string, string>)[event.eventType] ??
    formatDashEventName(event.eventType) ??
    localization.unknownEvent
  const detail = getDashEventDetail(event)
  const location = getDashEventLocation(event, showIpAddress)
  const absoluteTime = formatLocaleDate(event.createdAt, locale.languageTag)

  return (
    <li className="flex items-start gap-3 border-b border-dashed py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="bg-surface-secondary flex size-9 shrink-0 items-center justify-center rounded-xl">
        {createElement(getEventIcon(event.eventType), {
          size: 16,
          className: 'size-4 text-muted'
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <p className="truncate text-sm font-medium">{title}</p>
          <time
            className="text-muted shrink-0 text-xs"
            dateTime={event.createdAt}
            title={absoluteTime}>
            {formatRelativeTime(event.createdAt, locale.languageTag)}
          </time>
        </div>

        {(detail || location) && (
          <p className="text-muted truncate text-xs">
            {[detail, location].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </li>
  )
}

const ActivityRowSkeleton = () => {
  return (
    <li className="flex items-start gap-3 border-b border-dashed py-4 first:pt-0 last:border-b-0 last:pb-0">
      <Skeleton className="size-9 shrink-0 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5">
        <Skeleton className="h-4 w-36 rounded-lg" />
        <Skeleton className="h-3 w-52 max-w-full rounded-lg" />
      </div>
    </li>
  )
}

const ActivityHeader = ({
  access,
  localization,
  organizationId
}: {
  access: ActivityAccess
  localization: DashLocalization
  organizationId?: string
}) => {
  const description =
    access === 'admin'
      ? localization.adminActivityDescription
      : access === 'admin-user'
        ? localization.adminUserActivityDescription
        : organizationId
          ? localization.organizationActivityDescription
          : localization.activityDescription

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-sm font-semibold">{localization.activity}</h2>
        <p className="text-muted text-sm">{description}</p>
      </div>
      {organizationId ? (
        <Chip className="shrink-0" size="sm" variant="secondary">
          {access === 'organization'
            ? localization.organizationWide
            : localization.personalOnly}
        </Chip>
      ) : null}
    </div>
  )
}

const ActivityFilters = ({
  eventOptions,
  eventType,
  globalFilter,
  localization,
  onEventTypeChange,
  onIdentifierChange
}: {
  eventOptions: Array<[string, string]>
  eventType: string
  globalFilter: string
  localization: DashLocalization
  onEventTypeChange: (value: string | number | null) => void
  onIdentifierChange: (value: string) => void
}) => (
  <div className="grid gap-2 sm:grid-cols-[12rem_minmax(14rem,1fr)]">
    <Select value={eventType} onChange={onEventTypeChange}>
      <Label>{localization.eventType}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all">{localization.allEvents}</ListBox.Item>
          {eventOptions.map(([key, label]) => (
            <ListBox.Item id={key} key={key} textValue={label}>
              {label}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
    <SearchField
      aria-label={localization.identifier}
      value={globalFilter}
      onChange={onIdentifierChange}>
      <Label>{localization.identifier}</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={localization.identifierPlaceholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  </div>
)

const ActivityResult = ({
  data,
  error,
  isPending,
  localization,
  onRetry,
  rows
}: {
  data?: { events: DashAuditLog[] }
  error: unknown
  isPending: boolean
  localization: DashLocalization
  onRetry: () => void
  rows: Array<{ id: string; original: DashAuditLog }>
}) => {
  if (isPending) {
    return (
      <ul>
        {generateN(3).map(skeletonId => (
          <ActivityRowSkeleton key={skeletonId} />
        ))}
      </ul>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
        <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
          <Pulse size={16} className="text-muted size-4" />
        </div>
        <div className="flex max-w-sm flex-col gap-1">
          <p className="text-sm font-medium">
            {localization.activityLoadError}
          </p>
          <p className="text-muted text-xs">
            {localization.activityLoadErrorDescription}
          </p>
        </div>
        <Button size="sm" variant="secondary" onPress={onRetry}>
          {localization.retry}
        </Button>
      </div>
    )
  }

  if (data?.events.length) {
    return (
      <ul>
        {rows.map(row => (
          <ActivityRow key={row.id} event={row.original} />
        ))}
      </ul>
    )
  }

  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
      <div className="bg-surface-secondary flex size-10 items-center justify-center rounded-xl">
        <Pulse size={16} className="text-muted size-4" />
      </div>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-sm font-medium">{localization.noActivity}</p>
        <p className="text-muted text-xs">
          {localization.noActivityDescription}
        </p>
      </div>
    </div>
  )
}

const ActivityPagination = ({
  isFetching,
  localization,
  numberFormatter,
  canNextPage,
  canPreviousPage,
  onNextPage,
  onPreviousPage,
  offset,
  pageEnd,
  total
}: {
  canNextPage: boolean
  canPreviousPage: boolean
  isFetching: boolean
  localization: DashLocalization
  numberFormatter: Intl.NumberFormat
  onNextPage: () => void
  onPreviousPage: () => void
  offset: number
  pageEnd: number
  total: number
}) => (
  <Card.Footer className="flex-row items-center justify-between gap-3 border-t border-dashed">
    <div className="flex items-center gap-2">
      <p className="text-muted text-xs tabular-nums">
        {localization.paginationRange
          .replace('{{from}}', numberFormatter.format(offset + 1))
          .replace('{{to}}', numberFormatter.format(pageEnd))
          .replace('{{total}}', numberFormatter.format(total))}
      </p>
      {isFetching ? <Spinner size="sm" color="current" /> : null}
    </div>
    <div className="flex gap-1">
      <Button
        isIconOnly
        aria-label={localization.previousPage}
        size="sm"
        variant="ghost"
        isDisabled={isFetching || !canPreviousPage}
        onPress={onPreviousPage}>
        <ChevronLeft size={16} />
      </Button>
      <Button
        isIconOnly
        aria-label={localization.nextPage}
        size="sm"
        variant="ghost"
        isDisabled={isFetching || !canNextPage}
        onPress={onNextPage}>
        <ChevronRight size={16} />
      </Button>
    </div>
  </Card.Footer>
)

const useActivityFeedState = ({
  access,
  organizationId,
  ready = true,
  userId
}: Pick<
  ActivityFeedProps,
  'access' | 'organizationId' | 'ready' | 'userId'
>) => {
  const { authClient, locale } = useAuth<DashAuthClient>()
  const { localization, pageSize } = useAuthPlugin(dashPlugin)
  const tableState = useServerTableState({ pageSize })
  const { columnFilters, globalFilter, pagination, setPagination } = tableState
  const eventType = toStringValue(
    columnFilters.find(filter => filter.id === 'eventType')?.value,
    'all'
  )
  const [debouncedIdentifier] = useDebouncedValue(globalFilter.trim(), {
    wait: DEFAULT_TABLE_SEARCH_DEBOUNCE_MS
  })
  const eventOptions = useMemo(
    () => Object.entries(localization.eventLabels),
    [localization.eventLabels]
  )
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale.languageTag),
    [locale.languageTag]
  )
  const offset = pagination.pageIndex * pagination.pageSize
  const params = {
    eventType: eventType === 'all' ? undefined : eventType,
    identifier: debouncedIdentifier || undefined,
    limit: pagination.pageSize,
    offset,
    organizationId
  }
  const userQuery = useDashAuditLogs(authClient, {
    enabled: ready && access === 'user',
    params,
    placeholderData: keepPreviousData
  })
  const organizationQuery = useDashAllAuditLogs(authClient, {
    enabled: ready && (access === 'admin' || access === 'organization'),
    params,
    placeholderData: keepPreviousData
  })
  const adminUserQuery = useDashUserAuditLogs(authClient, userId, {
    enabled: ready && access === 'admin-user',
    params: {
      eventType: params.eventType,
      identifier: params.identifier,
      limit: pagination.pageSize,
      offset
    }
  })
  const query =
    access === 'admin' || access === 'organization'
      ? organizationQuery
      : access === 'admin-user'
        ? adminUserQuery
        : userQuery
  const { data, error, isFetching, isPending } = query
  const showPending = !ready || isPending
  const pageEnd = offset + (data?.events.length ?? 0)

  useEffect(() => {
    if (!ready || !query.isSuccess) return
    const pageIndex = getClampedTablePageIndex(
      pagination.pageIndex,
      pagination.pageSize,
      data?.total ?? 0
    )
    if (pageIndex !== pagination.pageIndex) {
      setPagination(current => ({ ...current, pageIndex }))
    }
  }, [
    data?.total,
    pagination.pageIndex,
    pagination.pageSize,
    query.isSuccess,
    ready,
    setPagination
  ])
  const table = useActivityTable(
    {
      atoms: tableState.atoms,
      columns: activityColumns,
      data: data?.events ?? EMPTY_EVENTS,
      getRowId: getDashEventKey,
      manualFiltering: true,
      manualPagination: true,
      rowCount: data?.total ?? 0
    },
    () => null
  )
  return {
    data,
    error,
    eventOptions,
    eventType,
    globalFilter,
    isFetching,
    localization,
    numberFormatter,
    offset,
    pageEnd,
    query,
    showPending,
    table
  }
}

const ActivityFeed = ({
  access,
  organizationId,
  ready = true,
  className,
  userId,
  variant
}: ActivityFeedProps) => {
  const {
    data,
    error,
    eventOptions,
    eventType,
    globalFilter,
    isFetching,
    localization,
    numberFormatter,
    offset,
    pageEnd,
    query,
    showPending,
    table
  } = useActivityFeedState({ access, organizationId, ready, userId })

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <ActivityHeader
        access={access}
        localization={localization}
        organizationId={organizationId}
      />

      <ActivityFilters
        eventOptions={eventOptions}
        eventType={eventType}
        globalFilter={globalFilter}
        localization={localization}
        onEventTypeChange={value => {
          const nextEventType = String(value)
          table
            .getColumn('eventType')
            ?.setFilterValue(
              nextEventType === 'all' ? undefined : nextEventType
            )
        }}
        onIdentifierChange={value => table.setGlobalFilter(value)}
      />

      <Card variant={variant} aria-busy={showPending || isFetching}>
        <Card.Content>
          <ActivityResult
            data={data}
            error={error}
            isPending={showPending}
            localization={localization}
            onRetry={() => void query.refetch()}
            rows={table.getRowModel().rows}
          />
        </Card.Content>

        {!error && data?.total ? (
          <ActivityPagination
            isFetching={isFetching}
            localization={localization}
            numberFormatter={numberFormatter}
            canNextPage={table.getCanNextPage()}
            canPreviousPage={table.getCanPreviousPage()}
            onNextPage={() => table.nextPage()}
            onPreviousPage={() => table.previousPage()}
            offset={offset}
            pageEnd={pageEnd}
            total={data.total}
          />
        ) : null}
      </Card>
    </div>
  )
}

/** Authentication and account activity for a user selected by an administrator. */
export const AdminUserActivity = (props: AdminUserActivityProps) => {
  return <ActivityFeed key={props.userId} access="admin-user" {...props} />
}

/** Activity across every organization the current owner or administrator can manage. */
export const AdminActivity = (props: AdminActivityProps) => {
  return <ActivityFeed access="admin" {...props} />
}

/** Personal authentication and account activity. */
export const UserActivity = (props: UserActivityProps) => {
  return <ActivityFeed access="user" {...props} />
}

/** Activity for an explicit organization. */
export const OrganizationActivity = ({
  organizationId,
  organizationSlug,
  ...props
}: OrganizationActivityProps) => {
  const { authClient } = useAuth<OrganizationAuthClient>()
  const { creatorRole } = useAuthPlugin(organizationPlugin)
  const { data: memberRole, isPending } = useActiveMemberRole(authClient, {
    query: { organizationId }
  })
  const canViewOrganization =
    hasMemberRole(memberRole?.role, creatorRole) ||
    hasMemberRole(memberRole?.role, 'admin')

  if (isPending) {
    return (
      <ActivityFeed
        data-organization-slug={organizationSlug}
        key={organizationId}
        access="user"
        organizationId={organizationId}
        ready={false}
        {...props}
      />
    )
  }

  return (
    <ActivityFeed
      key={organizationId}
      access={canViewOrganization ? 'organization' : 'user'}
      organizationId={organizationId}
      {...props}
    />
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
