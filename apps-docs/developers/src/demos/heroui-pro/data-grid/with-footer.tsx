// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useMemo, useState } from 'react'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Chip, Pagination } from '@vezham/react-v3'

interface Invoice {
  id: string
  customer: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  date: string
}

const invoices: Invoice[] = [
  {
    amount: 1250,
    customer: 'Acme Corp',
    date: '2024-03-01',
    id: 'INV-001',
    status: 'paid'
  },
  {
    amount: 890,
    customer: 'Globex',
    date: '2024-03-04',
    id: 'INV-002',
    status: 'paid'
  },
  {
    amount: 2340,
    customer: 'Initech',
    date: '2024-03-07',
    id: 'INV-003',
    status: 'pending'
  },
  {
    amount: 560,
    customer: 'Umbrella Co',
    date: '2024-03-09',
    id: 'INV-004',
    status: 'overdue'
  },
  {
    amount: 1780,
    customer: 'Stark Industries',
    date: '2024-03-12',
    id: 'INV-005',
    status: 'paid'
  },
  {
    amount: 430,
    customer: 'Wayne Enterprises',
    date: '2024-03-15',
    id: 'INV-006',
    status: 'pending'
  },
  {
    amount: 3120,
    customer: 'Cyberdyne',
    date: '2024-03-18',
    id: 'INV-007',
    status: 'paid'
  },
  {
    amount: 975,
    customer: 'Soylent Corp',
    date: '2024-03-21',
    id: 'INV-008',
    status: 'overdue'
  },
  {
    amount: 1640,
    customer: 'Massive Dynamic',
    date: '2024-03-24',
    id: 'INV-009',
    status: 'paid'
  },
  {
    amount: 720,
    customer: 'Hooli',
    date: '2024-03-27',
    id: 'INV-010',
    status: 'pending'
  },
  {
    amount: 2050,
    customer: 'Vehement Capital',
    date: '2024-03-29',
    id: 'INV-011',
    status: 'paid'
  },
  {
    amount: 385,
    customer: 'Bluth Company',
    date: '2024-03-31',
    id: 'INV-012',
    status: 'overdue'
  }
]

const statusColor = {
  overdue: 'danger',
  paid: 'success',
  pending: 'warning'
} as const

const columns: DataGridColumn<Invoice>[] = [
  {
    accessorKey: 'id',
    cellClassName: 'font-medium',
    header: 'Invoice',
    id: 'id',
    isRowHeader: true
  },
  {
    accessorKey: 'customer',
    allowsSorting: true,
    header: 'Customer',
    id: 'customer'
  },
  {
    accessorKey: 'date',
    header: 'Date',
    id: 'date'
  },
  {
    accessorKey: 'status',
    cell: item => (
      <Chip color={statusColor[item.status]} size="sm" variant="soft">
        {item.status}
      </Chip>
    ),
    header: 'Status',
    id: 'status'
  },
  {
    accessorKey: 'amount',
    align: 'end',
    cell: item => (
      <span className="tabular-nums">${item.amount.toLocaleString()}</span>
    ),
    header: 'Amount',
    id: 'amount'
  }
]

const ROWS_PER_PAGE = 4

export function WithFooter() {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(invoices.length / ROWS_PER_PAGE)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE

    return invoices.slice(start, start + ROWS_PER_PAGE)
  }, [page])

  const start = (page - 1) * ROWS_PER_PAGE + 1
  const end = Math.min(page * ROWS_PER_PAGE, invoices.length)

  const footer = (
    <Pagination size="sm">
      <Pagination.Summary>
        {start} to {end} of {invoices.length} invoices
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage(p => Math.max(1, p - 1))}>
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>
        {pages.map(p => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => setPage(p => Math.min(totalPages, p + 1))}>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )

  return (
    <div className="w-full max-w-4xl">
      <DataGrid
        aria-label="Invoices"
        columns={columns}
        data={paginatedInvoices}
        footer={footer}
        getRowId={item => item.id}
        variant="primary"
      />
    </div>
  )
}
