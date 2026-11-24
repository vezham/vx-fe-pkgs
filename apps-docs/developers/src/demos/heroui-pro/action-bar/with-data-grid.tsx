// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Archive,
  ArrowDownToLine,
  CircleFill,
  Pencil,
  TrashBin,
  Xmark
} from '@gravity-ui/icons'
import { useCallback, useState } from 'react'
import type { Selection } from 'react-aria-components/GridList'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { ActionBar, DataGrid } from '@vezham/react-pro-v3'
import { Avatar, Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

type Status = 'Active' | 'Inactive' | 'Pending'

interface Employee {
  id: number
  name: string
  email: string
  avatar: string
  department: string
  status: Status
  joinDate: string
}

const statusColorMap: Record<Status, 'success' | 'danger' | 'warning'> = {
  Active: 'success',
  Inactive: 'danger',
  Pending: 'warning'
}

const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Product'
]

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000

  return x - Math.floor(x)
}

const names = [
  'Elena Rodriguez',
  'Marcus Chen',
  'Priya Patel',
  "James O'Brien",
  'Yuki Tanaka',
  'Amara Okafor',
  'Luca Bianchi',
  'Sofia Andersson'
]

const statuses: Status[] = ['Active', 'Inactive', 'Pending']

const initialEmployees: Employee[] = Array.from({ length: 8 }, (_, i) => {
  const r = (s: number) => seededRandom(i * 7 + s)
  const name = names[i]!
  const month = (i % 12) + 1
  const day = Math.floor(r(4) * 28) + 1

  return {
    avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${i + 20}`,
    department: departments[Math.floor(r(2) * departments.length)]!,
    email: `${name.toLowerCase().replace(/['\s]+/g, '.')}@company.com`,
    id: i + 1,
    joinDate: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    name,
    status: statuses[Math.floor(r(3) * statuses.length)]!
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function WithDataGrid() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const selectionCount =
    selectedKeys === 'all'
      ? employees.length
      : (selectedKeys as Set<string | number>).size

  const selectedIds =
    selectedKeys === 'all'
      ? new Set(employees.map(e => e.id))
      : (selectedKeys as Set<number>)

  const handleDelete = useCallback(() => {
    setEmployees(prev => prev.filter(e => !selectedIds.has(e.id)))
    setSelectedKeys(new Set())
  }, [selectedIds])

  const handleExport = useCallback(() => {
    const selected = employees.filter(e => selectedIds.has(e.id))
    const csv = [
      'Name,Email,Department,Status,Join Date',
      ...selected.map(
        e => `${e.name},${e.email},${e.department},${e.status},${e.joinDate}`
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = 'employees.csv'
    a.click()
    URL.revokeObjectURL(url)
  }, [employees, selectedIds])

  const columns: DataGridColumn<Employee>[] = [
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
      header: 'Employee',
      id: 'name',
      isRowHeader: true,
      minWidth: 240
    },
    {
      accessorKey: 'department',
      allowsSorting: true,
      header: 'Department',
      id: 'department'
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
      accessorKey: 'joinDate',
      allowsSorting: true,
      cell: item => (
        <span className="text-muted text-sm tabular-nums">
          {formatDate(item.joinDate)}
        </span>
      ),
      header: 'Joined',
      id: 'joinDate'
    }
  ]

  return (
    <div className="w-full max-w-4xl">
      <DataGrid
        showSelectionCheckboxes
        aria-label="Employees"
        columns={columns}
        data={employees}
        defaultSortDescriptor={{ column: 'name', direction: 'ascending' }}
        getRowId={item => item.id}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      />

      <ActionBar aria-label="Bulk actions" isOpen={selectionCount > 0}>
        <ActionBar.Prefix>
          <Chip className="shrink-0 tabular-nums" size="sm">
            {selectionCount}
          </Chip>
        </ActionBar.Prefix>
        <Separator />
        <ActionBar.Content>
          <Button aria-label="Edit" size="sm" variant="ghost">
            <Pencil />
            <span className="action-bar__label">Edit</span>
          </Button>
          <Button
            aria-label="Export"
            size="sm"
            variant="ghost"
            onPress={handleExport}>
            <ArrowDownToLine />
            <span className="action-bar__label">Export</span>
          </Button>
          <Button aria-label="Archive" size="sm" variant="ghost">
            <Archive />
            <span className="action-bar__label">Archive</span>
          </Button>
          <Button
            aria-label="Delete"
            className="text-danger bg-danger/10"
            size="sm"
            variant="ghost"
            onPress={handleDelete}>
            <TrashBin />
            <span className="action-bar__label">Delete</span>
          </Button>
        </ActionBar.Content>
        <Separator />
        <ActionBar.Suffix>
          <Tooltip>
            <Button
              isIconOnly
              aria-label="Clear selection"
              size="sm"
              variant="ghost"
              onPress={() => setSelectedKeys(new Set())}>
              <Xmark />
            </Button>
            <Tooltip.Content>Clear selection</Tooltip.Content>
          </Tooltip>
        </ActionBar.Suffix>
      </ActionBar>
    </div>
  )
}
