// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleFill } from '@gravity-ui/icons'
import { useCallback, useRef, useState } from 'react'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Chip, Spinner } from '@vezham/react-v3'

/* -------------------------------------------------------------------------------------------------
 * Data
 * -----------------------------------------------------------------------------------------------*/
interface Invoice {
  id: string
  client: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  issuedAt: string
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000

  return x - Math.floor(x)
}

const clients = [
  'Acme Corp',
  'Globex Inc',
  'Initech',
  'Umbrella LLC',
  'Stark Industries',
  'Wayne Enterprises',
  'Hooli',
  'Pied Piper',
  'Soylent Corp',
  'Massive Dynamic',
  'Cyberdyne Systems',
  'Tyrell Corp',
  'Oscorp',
  'LexCorp',
  'Wonka Industries'
]

const invoiceStatuses: Invoice['status'][] = ['paid', 'pending', 'overdue']

function generateInvoices(page: number, pageSize: number): Invoice[] {
  const offset = page * pageSize

  return Array.from({ length: pageSize }, (_, i) => {
    const idx = offset + i
    const r = (s: number) => seededRandom(idx * 7 + s)
    const month = (idx % 12) + 1
    const day = Math.floor(r(3) * 28) + 1

    return {
      amount: Math.round(200 + r(2) * 9800),
      client: clients[Math.floor(r(1) * clients.length)]!,
      id: `INV-${String(1000 + idx)}`,
      issuedAt: `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      status: invoiceStatuses[Math.floor(r(4) * invoiceStatuses.length)]!
    }
  })
}

const PAGE_SIZE = 8
const TOTAL_ITEMS = 50

const statusColorMap: Record<
  Invoice['status'],
  'success' | 'warning' | 'danger'
> = {
  overdue: 'danger',
  paid: 'success',
  pending: 'warning'
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const columns: DataGridColumn<Invoice>[] = [
  {
    accessorKey: 'id',
    cellClassName: 'font-medium font-mono text-xs',
    header: 'Invoice',
    id: 'id',
    isRowHeader: true
  },
  { accessorKey: 'client', header: 'Client', id: 'client' },
  {
    accessorKey: 'amount',
    align: 'end',
    cell: item => (
      <span className="font-medium tabular-nums">
        {formatCurrency(item.amount)}
      </span>
    ),
    header: 'Amount',
    id: 'amount'
  },
  {
    accessorKey: 'status',
    cell: item => (
      <Chip color={statusColorMap[item.status]} size="sm" variant="soft">
        <CircleFill width={6} />
        <Chip.Label className="capitalize">{item.status}</Chip.Label>
      </Chip>
    ),
    header: 'Status',
    id: 'status'
  },
  {
    accessorKey: 'issuedAt',
    cell: item => (
      <span className="text-muted tabular-nums">
        {formatDate(item.issuedAt)}
      </span>
    ),
    header: 'Issued',
    id: 'issuedAt'
  }
]

/* -------------------------------------------------------------------------------------------------
 * Demo
 * -----------------------------------------------------------------------------------------------*/
const initialItems = generateInvoices(0, PAGE_SIZE)

export function AsyncLoading() {
  const [items, setItems] = useState<Invoice[]>(initialItems)
  const [isLoading, setIsLoading] = useState(false)
  const pageRef = useRef(0)
  const hasMore = items.length < TOTAL_ITEMS

  const fetchPage = useCallback((page: number) => {
    setIsLoading(true)

    setTimeout(() => {
      const newItems = generateInvoices(page, PAGE_SIZE)

      setItems(prev => [...prev, ...newItems])
      pageRef.current = page
      setIsLoading(false)
    }, 1200)
  }, [])

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchPage(pageRef.current + 1)
    }
  }, [isLoading, hasMore, fetchPage])

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Invoices</h2>
        {items.length > 0 && (
          <Chip size="sm" variant="soft">
            {items.length} / {TOTAL_ITEMS}
          </Chip>
        )}
      </div>

      <DataGrid
        aria-label="Invoices"
        columns={columns}
        data={items}
        getRowId={item => item.id}
        isLoadingMore={isLoading}
        loadMoreContent={<Spinner size="md" />}
        renderEmptyState={() => 'No invoices found.'}
        scrollContainerClassName="max-h-[400px] overflow-y-auto"
        onLoadMore={hasMore ? handleLoadMore : undefined}
      />

      {!hasMore && items.length > 0 && (
        <span className="text-muted text-center text-sm">
          All {TOTAL_ITEMS} invoices loaded
        </span>
      )}
    </div>
  )
}
