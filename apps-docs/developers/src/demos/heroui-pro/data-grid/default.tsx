// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleFill,
  Copy,
  EllipsisVertical,
  Eye,
  Pencil,
  TrashBin
} from '@gravity-ui/icons'
import { useState } from 'react'
import type { Selection } from 'react-aria-components/GridList'

import type { DataGridColumn, DataGridProps } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Button, Chip, Dropdown, Label } from '@vezham/react-v3'

interface Payment {
  id: string
  customer: string
  email: string
  amount: number
  fee: number
  net: number
  status: 'succeeded' | 'processing' | 'failed' | 'refunded'
  method: string
  region: string
  description: string
  date: string
}

const payments: Payment[] = [
  {
    amount: 1999.0,
    customer: 'Olivia Martin',
    date: '2025-12-01',
    description: 'Annual subscription — Pro plan',
    email: 'olivia@example.com',
    fee: 59.97,
    id: 'pay_1N3x7K',
    method: 'Visa •••• 4242',
    net: 1939.03,
    region: 'North America',
    status: 'succeeded'
  },
  {
    amount: 39.0,
    customer: 'Jackson Lee',
    date: '2025-12-02',
    description: 'Monthly add-on — Extra seats',
    email: 'jackson@example.com',
    fee: 1.43,
    id: 'pay_1N3x8L',
    method: 'Mastercard •••• 5555',
    net: 37.57,
    region: 'North America',
    status: 'processing'
  },
  {
    amount: 299.0,
    customer: 'Isabella Nguyen',
    date: '2025-12-03',
    description: 'Quarterly subscription — Team plan',
    email: 'isabella@example.com',
    fee: 8.97,
    id: 'pay_1N3x9M',
    method: 'Visa •••• 1234',
    net: 290.03,
    region: 'Asia Pacific',
    status: 'succeeded'
  },
  {
    amount: 99.0,
    customer: 'William Kim',
    date: '2025-12-04',
    description: 'Monthly subscription — Starter plan',
    email: 'will@example.com',
    fee: 3.17,
    id: 'pay_1N3xAN',
    method: 'Amex •••• 3782',
    net: 95.83,
    region: 'Asia Pacific',
    status: 'failed'
  },
  {
    amount: 450.0,
    customer: 'Sofia Davis',
    date: '2025-12-05',
    description: 'One-time purchase — Enterprise setup',
    email: 'sofia@example.com',
    fee: 13.5,
    id: 'pay_1N3xBP',
    method: 'Visa •••• 9012',
    net: 436.5,
    region: 'Europe',
    status: 'succeeded'
  },
  {
    amount: 150.0,
    customer: 'Liam Johnson',
    date: '2025-12-06',
    description: 'Monthly subscription — Pro plan',
    email: 'liam@example.com',
    fee: 4.5,
    id: 'pay_1N3xCQ',
    method: 'Mastercard •••• 6789',
    net: 145.5,
    region: 'Europe',
    status: 'refunded'
  },
  {
    amount: 2450.0,
    customer: 'Emma Wilson',
    date: '2025-12-07',
    description: 'Annual subscription — Enterprise plan',
    email: 'emma@example.com',
    fee: 73.5,
    id: 'pay_1N3xDR',
    method: 'Visa •••• 4242',
    net: 2376.5,
    region: 'North America',
    status: 'succeeded'
  }
]

const statusColorMap: Record<
  Payment['status'],
  'success' | 'warning' | 'danger' | 'default'
> = {
  failed: 'danger',
  processing: 'warning',
  refunded: 'default',
  succeeded: 'success'
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
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

function RowActionsMenu({ paymentId }: { paymentId: string }) {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Row actions" size="sm" variant="tertiary">
        <EllipsisVertical />
      </Button>
      <Dropdown.Popover className="min-w-[180px]">
        <Dropdown.Menu
          onAction={key => {
            if (key === 'copy') {
              navigator.clipboard.writeText(paymentId)
            }
          }}>
          <Dropdown.Item id="copy" textValue="Copy payment ID">
            <Copy />
            <Label>Copy payment ID</Label>
          </Dropdown.Item>
          <Dropdown.Item id="view" textValue="View details">
            <Eye />
            <Label>View details</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit" textValue="Edit payment">
            <Pencil />
            <Label>Edit payment</Label>
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

export function Default({
  allowsColumnResize = true,
  scrollContainerClassName,
  stickyHeader = false,
  variant = 'primary'
}: Pick<
  DataGridProps<Payment>,
  'allowsColumnResize' | 'scrollContainerClassName' | 'variant'
> & { stickyHeader?: boolean } = {}) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const columns: DataGridColumn<Payment>[] = [
    {
      accessorKey: 'customer',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{item.customer}</span>
          <span className="text-muted text-xs">{item.email}</span>
        </div>
      ),
      header: 'Customer',
      id: 'customer',
      isRowHeader: true,
      minWidth: 200,
      width: 240
    },
    {
      accessorKey: 'id',
      allowsResizing: true,
      cellClassName: 'font-mono text-xs text-muted',
      header: 'Transaction ID',
      id: 'id',
      minWidth: 130
    },
    {
      accessorKey: 'status',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <Chip color={statusColorMap[item.status]} size="sm" variant="soft">
          <CircleFill width={6} />
          <Chip.Label className="capitalize">{item.status}</Chip.Label>
        </Chip>
      ),
      header: 'Status',
      id: 'status',
      minWidth: 120
    },
    {
      accessorKey: 'amount',
      align: 'end',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <span className="font-medium tabular-nums">
          {formatCurrency(item.amount)}
        </span>
      ),
      header: 'Amount',
      id: 'amount',
      minWidth: 110
    },
    {
      accessorKey: 'fee',
      align: 'end',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <span className="text-muted tabular-nums">
          {formatCurrency(item.fee)}
        </span>
      ),
      header: 'Fee',
      id: 'fee',
      minWidth: 90
    },
    {
      accessorKey: 'net',
      align: 'end',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <span className="font-medium tabular-nums">
          {formatCurrency(item.net)}
        </span>
      ),
      header: 'Net',
      id: 'net',
      minWidth: 110
    },
    {
      accessorKey: 'method',
      allowsResizing: true,
      header: 'Payment Method',
      id: 'method',
      minWidth: 170
    },
    {
      accessorKey: 'region',
      allowsResizing: true,
      allowsSorting: true,
      header: 'Region',
      id: 'region',
      minWidth: 130
    },
    {
      accessorKey: 'description',
      allowsResizing: true,
      cellClassName: 'text-muted',
      header: 'Description',
      id: 'description',
      minWidth: 240
    },
    {
      accessorKey: 'date',
      allowsResizing: true,
      allowsSorting: true,
      cell: item => (
        <span className="text-muted tabular-nums">{formatDate(item.date)}</span>
      ),
      header: 'Date',
      id: 'date',
      minWidth: 120
    },
    {
      align: 'end',
      allowsResizing: false,
      cell: item => <RowActionsMenu paymentId={item.id} />,
      header: '',
      id: 'actions',
      pinned: 'end',
      width: 50
    }
  ]

  const selectionCount =
    selectedKeys === 'all'
      ? payments.length
      : (selectedKeys as Set<string>).size

  return (
    <div className="flex w-full max-w-5xl flex-col gap-3">
      <DataGrid
        showSelectionCheckboxes
        allowsColumnResize={allowsColumnResize}
        aria-label="Payments"
        columns={columns}
        contentClassName="min-w-[1400px]"
        data={payments}
        defaultSortDescriptor={{ column: 'customer', direction: 'ascending' }}
        getRowId={item => item.id}
        renderEmptyState={() => 'No payments found.'}
        scrollContainerClassName={[
          scrollContainerClassName,
          stickyHeader
            ? '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-surface'
            : ''
        ]
          .filter(Boolean)
          .join(' ')}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant={variant}
        onSelectionChange={setSelectedKeys}
      />
      {selectionCount > 0 && (
        <div className="text-muted text-sm">
          {selectionCount} of {payments.length} row(s) selected
        </div>
      )}
    </div>
  )
}
