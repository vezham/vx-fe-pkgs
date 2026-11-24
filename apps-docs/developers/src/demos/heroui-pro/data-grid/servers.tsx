// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleFill,
  Copy,
  Funnel,
  LayoutColumns3,
  Sliders
} from '@gravity-ui/icons'
import { useCallback, useMemo, useState } from 'react'
import type { Selection, SortDescriptor } from 'react-aria-components/Table'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { AreaChart } from '@vezham/react-pro-v3/area-chart'
import {
  Button,
  Chip,
  Dropdown,
  Label,
  ProgressCircle,
  SearchField,
  Tooltip
} from '@vezham/react-v3'

/* -------------------------------------------------------------------------------------------------
 * Types & Data
 * -----------------------------------------------------------------------------------------------*/
type ServerStatus = 'Active' | 'Inactive'

interface Server {
  id: number
  clusterId: string
  instances: number
  status: ServerStatus
  region: string
  capacity: number
  cost: number
  requests: { value: number }[]
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000

  return x - Math.floor(x)
}

function generateSparkline(seed: number): { value: number }[] {
  const base = 30 + seededRandom(seed * 3) * 30
  const points: { value: number }[] = [{ value: base }]

  for (let i = 1; i < 16; i++) {
    const prev = points[i - 1]!.value
    const delta = (seededRandom(seed * 13 + i * 7) - 0.45) * 8

    points.push({ value: Math.max(10, Math.min(90, prev + delta)) })
  }

  return points
}

const regions = [
  'US-West 1',
  'US-East 2',
  'EU-Central 1',
  'AP-South 1',
  'US-West 2',
  'EU-West 1',
  'CA-Central 1',
  'AP-Northeast 1'
]

const servers: Server[] = Array.from({ length: 8 }, (_, i) => {
  const r = (offset: number) => seededRandom(i * 11 + offset)

  return {
    capacity: Math.round(r(3) * 10000) / 100,
    clusterId: `#${4586930 + i}`,
    cost: Math.round(r(4) * 80000 + 5000) / 100,
    id: i,
    instances: Math.round(5 + r(1) * 28),
    region: regions[i % regions.length]!,
    requests: generateSparkline(i),
    status: r(2) > 0.4 ? ('Active' as const) : ('Inactive' as const)
  }
})

const statusColorMap: Record<ServerStatus, 'success' | 'default'> = {
  Active: 'success',
  Inactive: 'default'
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
  }).format(amount)
}

/* -------------------------------------------------------------------------------------------------
 * Demo
 * -----------------------------------------------------------------------------------------------*/
type ColumnId =
  | 'clusterId'
  | 'instances'
  | 'status'
  | 'region'
  | 'capacity'
  | 'cost'
  | 'requests'

const ALL_COLUMNS: ColumnId[] = [
  'clusterId',
  'instances',
  'status',
  'region',
  'capacity',
  'cost',
  'requests'
]

export function Servers() {
  const [search, setSearch] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'clusterId',
    direction: 'ascending'
  })
  const [statusFilter, setStatusFilter] = useState('all')
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(ALL_COLUMNS)
  )

  const filteredServers = useMemo(() => {
    let result = servers

    if (search) {
      const q = search.toLowerCase()

      result = result.filter(
        s =>
          s.clusterId.toLowerCase().includes(q) ||
          s.region.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'all') {
      result = result.filter(s => s.status.toLowerCase() === statusFilter)
    }

    return result
  }, [search, statusFilter])

  const sortedServers = useMemo(() => {
    if (!sortDescriptor.column) return filteredServers

    return [...filteredServers].sort((a, b) => {
      const col = sortDescriptor.column as keyof Server
      const av = a[col]
      const bv = b[col]
      let cmp: number

      if (typeof av === 'number' && typeof bv === 'number') {
        cmp = av - bv
      } else {
        cmp = String(av).localeCompare(String(bv))
      }
      if (sortDescriptor.direction === 'descending') cmp *= -1

      return cmp
    })
  }, [filteredServers, sortDescriptor])

  const visibleColumnSet = useMemo(() => {
    if (visibleColumns === 'all') return new Set(ALL_COLUMNS)

    return visibleColumns as Set<string>
  }, [visibleColumns])

  const columns = useMemo<DataGridColumn<Server>[]>(() => {
    const allCols: DataGridColumn<Server>[] = [
      {
        accessorKey: 'clusterId',
        allowsSorting: true,
        cell: item => <CopyableId value={item.clusterId} />,
        header: 'Cluster ID',
        id: 'clusterId',
        isRowHeader: true
      },
      {
        accessorKey: 'instances',
        align: 'center',
        allowsSorting: true,
        header: 'Instances',
        id: 'instances'
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
        id: 'status'
      },
      {
        accessorKey: 'region',
        allowsSorting: true,
        header: 'Region',
        id: 'region'
      },
      {
        accessorKey: 'capacity',
        allowsSorting: true,
        cell: item => <CapacityCell value={item.capacity} />,
        header: 'Capacity',
        id: 'capacity'
      },
      {
        accessorKey: 'cost',
        align: 'end',
        allowsSorting: true,
        cell: item => (
          <span className="font-medium tabular-nums">
            {formatCurrency(item.cost)}
          </span>
        ),
        header: 'Cost',
        id: 'cost'
      },
      {
        cell: item => <SparklineCell data={item.requests} />,
        header: 'Requests',
        id: 'requests'
      }
    ]

    return allCols.filter(c => visibleColumnSet.has(c.id))
  }, [visibleColumnSet])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Servers</h2>
          <Chip size="sm" variant="soft">
            {servers.length}
          </Chip>
        </div>

        {/* Toolbar — right-aligned */}
        <div className="ml-auto flex items-center gap-3">
          {/* Filter */}
          <Dropdown>
            <Button size="sm" variant="secondary">
              <Funnel />
              Filter
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
                <Dropdown.Item id="clusterId" textValue="Cluster ID">
                  <Label>Cluster ID</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="instances" textValue="Instances">
                  <Label>Instances</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="status" textValue="Status">
                  <Label>Status</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="region" textValue="Region">
                  <Label>Region</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="capacity" textValue="Capacity">
                  <Label>Capacity</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="cost" textValue="Cost">
                  <Label>Cost</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Columns */}
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
                <Dropdown.Item id="clusterId" textValue="Cluster ID">
                  <Label>Cluster ID</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="instances" textValue="Instances">
                  <Label>Instances</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="status" textValue="Status">
                  <Label>Status</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="region" textValue="Region">
                  <Label>Region</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="capacity" textValue="Capacity">
                  <Label>Capacity</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="cost" textValue="Cost">
                  <Label>Cost</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="requests" textValue="Requests">
                  <Label>Requests</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {/* Search */}
          <SearchField
            aria-label="Search servers"
            value={search}
            onChange={handleSearchChange}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[160px]"
                placeholder="Search..."
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>
      </div>

      {/* Table */}
      <DataGrid
        showSelectionCheckboxes
        aria-label="Servers"
        columns={columns}
        data={sortedServers}
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
 * Cell Components
 * -----------------------------------------------------------------------------------------------*/
function CopyableId({ value }: { value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-medium tabular-nums">{value}</span>
      <Tooltip>
        <Button
          isIconOnly
          aria-label="Copy cluster ID"
          size="sm"
          variant="ghost"
          onPress={() => navigator.clipboard.writeText(value)}>
          <Copy className="text-muted" />
        </Button>
        <Tooltip.Content>Copy</Tooltip.Content>
      </Tooltip>
    </div>
  )
}

function getCapacityColor(
  value: number
): 'accent' | 'warning' | 'danger' | 'default' {
  if (value >= 90) return 'danger'
  if (value >= 60) return 'warning'
  if (value >= 20) return 'accent'

  return 'default'
}

function getCapacityTextColor(value: number): string {
  if (value >= 90) return 'text-danger'
  if (value >= 60) return 'text-warning'

  return ''
}

function CapacityCell({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <ProgressCircle
        aria-label={`${value}% capacity`}
        color={getCapacityColor(value)}
        size="sm"
        value={value}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <span className={`tabular-nums ${getCapacityTextColor(value)}`}>
        {value.toFixed(2)}%
      </span>
    </div>
  )
}

let sparkGradientId = 0

function SparklineCell({ data }: { data: { value: number }[] }) {
  const id = useMemo(() => `spark-grad-${++sparkGradientId}`, [])

  return (
    <div
      className="w-[90px] overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
      }}>
      <AreaChart
        data={data}
        height={36}
        margin={{ bottom: 0, left: 0, right: 0, top: 2 }}>
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity={0.2}
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <AreaChart.Area
          dataKey="value"
          dot={false}
          fill={`url(#${id})`}
          isAnimationActive={false}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          type="monotone"
        />
      </AreaChart>
    </div>
  )
}
