// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Calendar,
  CircleFill,
  Copy,
  CopyCheck,
  EllipsisVertical,
  Eye,
  Funnel,
  LayoutColumns3,
  Pencil,
  Plus,
  Sliders,
  TrashBin,
  Xmark
} from '@gravity-ui/icons'
import { useCallback, useMemo, useState } from 'react'
import type { Selection, SortDescriptor } from 'react-aria-components/Table'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid, InlineSelect } from '@vezham/react-pro-v3'
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  Label,
  ListBox,
  Pagination,
  SearchField,
  Separator,
  Tooltip
} from '@vezham/react-v3'

/* -------------------------------------------------------------------------------------------------
 * Types & Data
 * -----------------------------------------------------------------------------------------------*/
type StatusOption = 'Active' | 'Inactive' | 'Vacation'
type WorkerType = 'Employee' | 'Contractor'
type TeamName =
  | 'Product'
  | 'Engineering'
  | 'Design'
  | 'Marketing'
  | 'Sales'
  | 'Support'
  | 'Management'
  | 'Other'

interface Country {
  name: string
  code: string
}

interface Member {
  id: number
  workerId: string
  externalWorkerId: string
  name: string
  email: string
  avatar: string
  role: string
  country: Country
  workerType: WorkerType
  status: StatusOption
  startDate: string
  teams: TeamName[]
}

const names = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'David Wilson',
  'Eve Martinez',
  'Frank Thompson',
  'Grace Garcia',
  'Hannah Lee',
  'Isaac Anderson',
  'Julia Roberts',
  'Liam Williams',
  'Mia White',
  'Noah Harris',
  'Olivia Martin',
  'Peyton Jones',
  'Quinn Taylor',
  'Ryan Moore',
  'Sophia Davis',
  'Marcus Lopez',
  'Uma Thomas',
  'Victoria Jackson',
  'William Green',
  'Xavier Hill',
  'Yara Scott',
  'Zoe Baker',
  'Aaron Carter',
  'Bella Brown',
  'Carter Black',
  'Daisy Clark',
  'Ethan Hunt',
  'Fiona Apple',
  'George King',
  'Harper Knight',
  'Ivy Lane',
  'Jack Frost',
  'Kylie Reed',
  'Lucas Grant',
  'Molly Shaw',
  'Nathan Ford',
  'Oliver Stone',
  'Penelope Cruz',
  'Quentin Cook',
  'Ruby Fox',
  'Sarah Miles',
  'Travis Shaw',
  'Ursula Major',
  'Vera Mindy',
  'Wesley Snipes',
  'Xena Warrior',
  'Yvette Fielding'
]

const roles = [
  'Software Engineer',
  'Marketing Specialist',
  'HR Manager',
  'Data Analyst',
  'Project Manager',
  'Sales Executive',
  'Graphic Designer',
  'Operations Coordinator',
  'Product Manager',
  'Customer Service Representative',
  'Network Administrator',
  'QA Tester',
  'Business Analyst',
  'Content Writer',
  'UX/UI Designer',
  'Accountant',
  'Supply Chain Analyst',
  'Social Media Manager',
  'Web Developer',
  'Technical Support Specialist',
  'Logistics Manager',
  'Environmental Scientist'
]

const countries: Country[] = [
  { code: 'ar', name: 'Argentina' },
  { code: 'au', name: 'Australia' },
  { code: 'br', name: 'Brazil' },
  { code: 'ca', name: 'Canada' },
  { code: 'cn', name: 'China' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'jp', name: 'Japan' },
  { code: 'pt', name: 'Portugal' },
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'in', name: 'India' },
  { code: 'mx', name: 'Mexico' },
  { code: 'kr', name: 'South Korea' },
  { code: 'es', name: 'Spain' }
]

const allTeams: TeamName[] = [
  'Product',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Management',
  'Other'
]
const statuses: StatusOption[] = ['Active', 'Inactive', 'Vacation']
const workerTypes: WorkerType[] = ['Employee', 'Contractor']

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000

  return x - Math.floor(x)
}

function randomDate(seed: number): string {
  const base = new Date(2025, 0, 1).getTime()
  const range = 500 * 24 * 60 * 60 * 1000

  return new Date(base + seededRandom(seed) * range)
    .toISOString()
    .split('T')[0]!
}

function randomTeams(seed: number): TeamName[] {
  const count = Math.floor(seededRandom(seed) * 5) + 1
  const shuffled = [...allTeams].sort(() => seededRandom(seed + 99) - 0.5)

  return shuffled.slice(0, count)
}

function randomWorkerId(seed: number): string {
  const num = Math.floor(seededRandom(seed) * 9000000) + 1000000

  return `WRK-${num}`
}

function randomExternalId(seed: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id = 'EXT-'

  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(seededRandom(seed + i * 3) * chars.length)]
  }

  return id
}

const members: Member[] = Array.from({ length: 100 }, (_, i) => {
  const r = (offset: number) => seededRandom(i * 7 + offset)
  const name = names[Math.floor(r(1) * names.length)]!
  const statusIndex = (i * 3 + Math.floor(r(5) * 7)) % statuses.length

  return {
    avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${i + 1}`,
    country: countries[Math.floor(r(3) * countries.length)]!,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    externalWorkerId: randomExternalId(i * 17 + 5),
    id: i + 1,
    name,
    role: roles[Math.floor(r(2) * roles.length)]!,
    startDate: randomDate(i * 13 + 7),
    status: statuses[statusIndex]!,
    teams: randomTeams(i * 11 + 3),
    workerId: randomWorkerId(i * 13 + 1),
    workerType: workerTypes[Math.floor(r(4) * workerTypes.length)]!
  }
})

/* -------------------------------------------------------------------------------------------------
 * Constants
 * -----------------------------------------------------------------------------------------------*/
const statusColorMap: Record<StatusOption, 'success' | 'danger' | 'warning'> = {
  Active: 'success',
  Inactive: 'danger',
  Vacation: 'warning'
}

const DEFAULT_ROWS_PER_PAGE = 10
const MAX_VISIBLE_TEAMS = 3

const ALL_COLUMNS = [
  'workerId',
  'externalWorkerId',
  'name',
  'country',
  'role',
  'workerType',
  'status',
  'startDate',
  'teams',
  'actions'
] as const

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/* -------------------------------------------------------------------------------------------------
 * CopyText — inline copyable text with tooltip feedback
 * -----------------------------------------------------------------------------------------------*/
function CopyText({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1">
      <Tooltip>
        <Button
          isIconOnly
          aria-label={copied ? 'Copied' : 'Copy'}
          className="text-muted hover:text-foreground size-5 min-h-5 min-w-5"
          size="sm"
          variant="ghost"
          onPress={handleCopy}>
          {copied ? (
            <CopyCheck className="size-3" />
          ) : (
            <Copy className="size-3" />
          )}
        </Button>
        <Tooltip.Content>{copied ? 'Copied!' : 'Copy'}</Tooltip.Content>
      </Tooltip>
      <span className="text-muted text-xs">{children}</span>
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * CountryCell — flag + country name
 * -----------------------------------------------------------------------------------------------*/
function CountryCell({ country }: { country: Country }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        alt={country.name}
        className="shrink-0 rounded-sm object-cover"
        height={14}
        src={`https://flagcdn.com/h20/${country.code}.png`}
        srcSet={`https://flagcdn.com/h40/${country.code}.png 2x, https://flagcdn.com/h60/${country.code}.png 3x`}
        width={20}
      />
      <span className="text-sm">{country.name}</span>
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * TeamsCell — inline chip list with overflow count
 * -----------------------------------------------------------------------------------------------*/
function TeamsCell({ teams }: { teams: TeamName[] }) {
  const visible = teams.slice(0, MAX_VISIBLE_TEAMS)
  const overflow = teams.length - MAX_VISIBLE_TEAMS

  return (
    <span className="inline-flex items-center gap-1">
      {visible.map(team => (
        <Chip key={team} size="sm" variant="secondary">
          <Chip.Label>{team}</Chip.Label>
        </Chip>
      ))}
      {overflow > 0 && (
        <Chip size="sm" variant="secondary">
          <Chip.Label>+{overflow}</Chip.Label>
        </Chip>
      )}
    </span>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Demo
 * -----------------------------------------------------------------------------------------------*/
export function TeamMembers() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  })
  const [statusFilter, setStatusFilter] = useState('all')
  const [workerTypeFilter, setWorkerTypeFilter] = useState('all')
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(ALL_COLUMNS)
  )

  const filteredMembers = useMemo(() => {
    let result = members

    if (search) {
      const q = search.toLowerCase()

      result = result.filter(
        m =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.workerId.toLowerCase().includes(q) ||
          m.externalWorkerId.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'all') {
      result = result.filter(m => m.status.toLowerCase() === statusFilter)
    }
    if (workerTypeFilter !== 'all') {
      result = result.filter(
        m => m.workerType.toLowerCase() === workerTypeFilter
      )
    }

    return result
  }, [search, statusFilter, workerTypeFilter])

  const sortedMembers = useMemo(() => {
    if (!sortDescriptor.column) return filteredMembers

    return [...filteredMembers].sort((a, b) => {
      const col = sortDescriptor.column as string
      let first: string
      let second: string

      if (col === 'country') {
        first = a.country.name
        second = b.country.name
      } else if (col === 'teams') {
        first = a.teams.join(', ')
        second = b.teams.join(', ')
      } else {
        first = String((a as unknown as Record<string, unknown>)[col] ?? '')
        second = String((b as unknown as Record<string, unknown>)[col] ?? '')
      }

      let cmp = first.localeCompare(second)

      if (sortDescriptor.direction === 'descending') cmp *= -1

      return cmp
    })
  }, [filteredMembers, sortDescriptor])

  const totalPages = Math.ceil(sortedMembers.length / rowsPerPage) || 1
  const safePage = Math.min(page, totalPages)
  const paginatedMembers = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage

    return sortedMembers.slice(start, start + rowsPerPage)
  }, [sortedMembers, safePage, rowsPerPage])

  const visibleColumnSet = useMemo(() => {
    if (visibleColumns === 'all') return new Set(ALL_COLUMNS)

    return visibleColumns as Set<string>
  }, [visibleColumns])

  const columns = useMemo<DataGridColumn<Member>[]>(() => {
    const allCols: DataGridColumn<Member>[] = [
      {
        accessorKey: 'workerId',
        allowsSorting: true,
        cell: item => <CopyText>{item.workerId}</CopyText>,
        header: 'Worker ID',
        id: 'workerId',
        isRowHeader: true,
        minWidth: 100
      },
      {
        accessorKey: 'externalWorkerId',
        allowsSorting: true,
        cell: item => <CopyText>{item.externalWorkerId}</CopyText>,
        header: 'External Worker ID',
        id: 'externalWorkerId',
        minWidth: 160
      },
      {
        accessorKey: 'name',
        allowsSorting: true,
        cell: item => (
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <Avatar.Image alt={item.name} src={item.avatar} />
              <Avatar.Fallback>
                {item.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-muted text-xs">{item.email}</span>
            </div>
          </div>
        ),
        header: 'Member',
        id: 'name',
        minWidth: 220,
        pinned: 'start'
      },
      {
        accessorKey: 'country',
        allowsSorting: true,
        cell: item => <CountryCell country={item.country} />,
        header: 'Country',
        id: 'country',
        minWidth: 140
      },
      {
        accessorKey: 'role',
        allowsSorting: true,
        header: 'Role',
        id: 'role',
        minWidth: 140
      },
      {
        accessorKey: 'workerType',
        allowsSorting: true,
        header: 'Worker Type',
        id: 'workerType',
        minWidth: 110
      },
      {
        accessorKey: 'status',
        allowsSorting: true,
        cell: item => (
          <Chip color={statusColorMap[item.status]} size="sm" variant="soft">
            <CircleFill width={6} />
            <Chip.Label>{item.status}</Chip.Label>
          </Chip>
        ),
        header: 'Status',
        id: 'status',
        minWidth: 100
      },
      {
        accessorKey: 'startDate',
        allowsSorting: true,
        cell: item => (
          <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap">
            <Calendar className="text-muted size-3.5" />
            {formatDate(item.startDate)}
          </span>
        ),
        header: 'Start Date',
        id: 'startDate',
        minWidth: 150
      },
      {
        accessorKey: 'teams',
        cell: item => <TeamsCell teams={item.teams} />,
        header: 'Teams',
        id: 'teams',
        minWidth: 260
      },
      {
        align: 'end',
        cell: item => <RowActions memberId={item.id} />,
        header: '',
        id: 'actions',
        minWidth: 50,
        pinned: 'end',
        width: 50
      }
    ]

    const visibleCols = allCols.filter(c => visibleColumnSet.has(c.id))

    // React Aria's table collection requires at least one visible column with
    // `isRowHeader`. The designated row-header column (Worker ID) can be hidden
    // via the column-visibility menu, which would leave the collection without a
    // row header and throw. Guarantee one remains by promoting the first visible
    // data column when none is marked.
    if (visibleCols.length > 0 && !visibleCols.some(c => c.isRowHeader)) {
      const fallback =
        visibleCols.find(c => c.id !== 'actions') ?? visibleCols[0]!
      const fallbackIndex = visibleCols.indexOf(fallback)

      visibleCols[fallbackIndex] = { ...fallback, isRowHeader: true }
    }

    return visibleCols
  }, [visibleColumnSet])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const selectionCount =
    selectedKeys === 'all'
      ? sortedMembers.length
      : (selectedKeys as Set<string | number>).size

  const paginationPages = useMemo(() => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (safePage > 3) pages.push('ellipsis')
      const start = Math.max(2, safePage - 1)
      const end = Math.min(totalPages - 1, safePage + 1)

      for (let i = start; i <= end; i++) pages.push(i)
      if (safePage < totalPages - 2) pages.push('ellipsis')
      pages.push(totalPages)
    }

    return pages
  }, [totalPages, safePage])

  const paginationFooter = (
    <>
      <Pagination size="sm">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={safePage === 1}
              onPress={() => setPage(p => Math.max(1, p - 1))}>
              <Pagination.PreviousIcon />
            </Pagination.Previous>
          </Pagination.Item>
          {paginationPages.map((p, i) =>
            p === 'ellipsis' ? (
              <Pagination.Item key={`e-${i}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === safePage}
                  onPress={() => setPage(p as number)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            )
          )}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={safePage === totalPages}
              onPress={() => setPage(p => Math.min(totalPages, p + 1))}>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>

      <div className="flex items-center gap-3">
        <InlineSelect
          aria-label="Rows per page"
          value={String(rowsPerPage)}
          onChange={v => {
            if (v) {
              setRowsPerPage(Number(v))
              setPage(1)
            }
          }}>
          <InlineSelect.Trigger>
            <span className="text-muted">Rows per page</span>
            <InlineSelect.Value />
            <InlineSelect.Indicator />
          </InlineSelect.Trigger>
          <InlineSelect.Popover className="w-[80px]">
            <ListBox>
              <ListBox.Item id="10" textValue="10">
                10
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="25" textValue="25">
                25
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="50" textValue="50">
                50
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="100" textValue="100">
                100
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </InlineSelect.Popover>
        </InlineSelect>
        <Separator className="!h-4" orientation="vertical" />
        <span className="text-muted">
          {selectionCount} of {sortedMembers.length} selected
        </span>
        <div className="flex gap-2">
          <Button
            isDisabled={safePage === 1}
            size="sm"
            variant="secondary"
            onPress={() => setPage(p => Math.max(1, p - 1))}>
            Previous
          </Button>
          <Button
            isDisabled={safePage === totalPages}
            size="sm"
            variant="secondary"
            onPress={() => setPage(p => Math.min(totalPages, p + 1))}>
            Next
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Team Members</h2>
          <Chip size="sm" variant="soft">
            {members.length}
          </Chip>
        </div>
        <Button variant="primary">
          Add Member
          <Plus />
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <SearchField
          aria-label="Search members"
          value={search}
          onChange={handleSearchChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[200px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        {/* Filter: Worker Type */}
        <Dropdown>
          <Button size="sm" variant="secondary">
            <Funnel />
            Worker Type
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              selectedKeys={new Set([workerTypeFilter])}
              selectionMode="single"
              onSelectionChange={keys => {
                const key = [...keys][0] as string | undefined

                setWorkerTypeFilter(key ?? 'all')
              }}>
              <Dropdown.Item id="all" textValue="All">
                <Label>All</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="employee" textValue="Employee">
                <Label>Employee</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="contractor" textValue="Contractor">
                <Label>Contractor</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Filter: Status */}
        <Dropdown>
          <Button size="sm" variant="secondary">
            <Funnel />
            Status
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              selectedKeys={new Set([statusFilter])}
              selectionMode="single"
              onSelectionChange={keys => {
                const key = [...keys][0] as string | undefined

                setStatusFilter(key ?? 'all')
              }}>
              <Dropdown.Item id="all" textValue="All">
                <Label>All</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="active" textValue="Active">
                <Label>Active</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="inactive" textValue="Inactive">
                <Label>Inactive</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="vacation" textValue="Vacation">
                <Label>Vacation</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Sort */}
        <Dropdown>
          <Button size="sm" variant="secondary">
            <Sliders />
            Sort
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              selectedKeys={
                sortDescriptor.column
                  ? new Set([sortDescriptor.column])
                  : new Set()
              }
              selectionMode="single"
              onSelectionChange={keys => {
                const key = [...keys][0] as string | undefined

                if (!key) return
                setSortDescriptor({
                  column: key,
                  direction:
                    sortDescriptor.column === key &&
                    sortDescriptor.direction === 'ascending'
                      ? 'descending'
                      : 'ascending'
                })
              }}>
              <Dropdown.Item id="workerId" textValue="Worker ID">
                <Label>Worker ID</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="name" textValue="Member">
                <Label>Member</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="country" textValue="Country">
                <Label>Country</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="role" textValue="Role">
                <Label>Role</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="workerType" textValue="Worker Type">
                <Label>Worker Type</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="status" textValue="Status">
                <Label>Status</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="startDate" textValue="Start Date">
                <Label>Start Date</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Column visibility */}
        <Dropdown>
          <Button size="sm" variant="secondary">
            <LayoutColumns3 />
            Columns
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              disallowEmptySelection
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}>
              <Dropdown.Item id="workerId" textValue="Worker ID">
                <Label>Worker ID</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item
                id="externalWorkerId"
                textValue="External Worker ID">
                <Label>External Worker ID</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="name" textValue="Member">
                <Label>Member</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="country" textValue="Country">
                <Label>Country</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="role" textValue="Role">
                <Label>Role</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="workerType" textValue="Worker Type">
                <Label>Worker Type</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="status" textValue="Status">
                <Label>Status</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="startDate" textValue="Start Date">
                <Label>Start Date</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="teams" textValue="Teams">
                <Label>Teams</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {selectionCount > 0 && (
          <>
            <Separator className="!h-5 self-center" orientation="vertical" />
            <span className="text-muted text-sm whitespace-nowrap">
              {selectionCount} Selected
            </span>
          </>
        )}
      </div>

      {/* Active filters */}
      {!!(search || workerTypeFilter !== 'all' || statusFilter !== 'all') && (
        <div className="flex flex-wrap items-center gap-2">
          {!!search && (
            <Chip size="sm" variant="secondary">
              <Chip.Label>Search: {search}</Chip.Label>
              <button
                aria-label="Clear search"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                onClick={() => {
                  setSearch('')
                  setPage(1)
                }}>
                <Xmark className="size-3" />
              </button>
            </Chip>
          )}
          {workerTypeFilter !== 'all' && (
            <Chip size="sm" variant="secondary">
              <Chip.Label>
                Type: <span className="capitalize">{workerTypeFilter}</span>
              </Chip.Label>
              <button
                aria-label="Clear worker type filter"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                onClick={() => setWorkerTypeFilter('all')}>
                <Xmark className="size-3" />
              </button>
            </Chip>
          )}
          {statusFilter !== 'all' && (
            <Chip size="sm" variant="secondary">
              <Chip.Label>
                Status: <span className="capitalize">{statusFilter}</span>
              </Chip.Label>
              <button
                aria-label="Clear status filter"
                className="text-muted hover:text-foreground ml-0.5 inline-flex cursor-pointer items-center"
                onClick={() => setStatusFilter('all')}>
                <Xmark className="size-3" />
              </button>
            </Chip>
          )}
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              setSearch('')
              setWorkerTypeFilter('all')
              setStatusFilter('all')
              setPage(1)
            }}>
            Clear all
          </Button>
        </div>
      )}

      {/* Table */}
      <DataGrid
        allowsColumnResize
        showSelectionCheckboxes
        aria-label="Team Members"
        columns={columns}
        contentClassName="min-w-[1600px]"
        data={paginatedMembers}
        footer={paginationFooter}
        footerClassName="justify-between whitespace-nowrap text-xs"
        getRowId={item => item.id}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        variant="primary"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Row Actions
 * -----------------------------------------------------------------------------------------------*/
function RowActions(_props: { memberId: number }) {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Row actions" size="sm" variant="tertiary">
        <EllipsisVertical />
      </Button>
      <Dropdown.Popover className="min-w-[160px]">
        <Dropdown.Menu>
          <Dropdown.Item id="view" textValue="View">
            <Eye />
            <Label>View</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit" textValue="Edit">
            <Pencil />
            <Label>Edit</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <TrashBin className="text-danger" />
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
