// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleCheckFill, CircleXmarkFill, Clock } from '@gravity-ui/icons'
import { useCallback, useMemo, useState } from 'react'
import type { Key } from 'react-aria-components/Breadcrumbs'
import type { Selection } from 'react-aria-components/GridList'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid, Rating, Segment } from '@vezham/react-pro-v3'
import { Chip, SearchField } from '@vezham/react-v3'

/* -------------------------------------------------------------------------------------------------
 * Types & Data Generation
 * -----------------------------------------------------------------------------------------------*/
type StockStatus = 'In Stock' | 'Out of Stock' | 'Low Stock'

interface Product {
  id: number
  name: string
  image: string
  sku: string
  status: StockStatus
  stock: number
  price: number
  cost: number
  rating: number
  sold: number
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000

  return x - Math.floor(x)
}

const adjectives = [
  'Wireless',
  'Portable',
  'Premium',
  'Ultra',
  'Pro',
  'Smart',
  'Compact',
  'Elite',
  'Advanced',
  'Slim',
  'Turbo',
  'Eco',
  'Classic',
  'Deluxe',
  'Mini'
]

const nouns = [
  'Headphones',
  'Keyboard',
  'Monitor',
  'Mouse',
  'Speaker',
  'Webcam',
  'Charger',
  'Hub',
  'Stand',
  'Lamp',
  'Microphone',
  'Router',
  'Cable',
  'Tablet',
  'Controller',
  'Drive',
  'Dock',
  'Chair',
  'Projector',
  'Sensor'
]

const brands = [
  'TechFlow',
  'NovaPeak',
  'ZenCore',
  'PixelForge',
  'CloudNine',
  'ArcWave',
  'PrimeByte',
  'EchoLink',
  'SwiftEdge',
  'NeonPulse'
]

const categories = [
  'dashboard',
  'game',
  'furniture',
  'album',
  'movie',
  'sports',
  'fashion',
  'book'
]
const skuPrefixes = [
  'AUD',
  'KEY',
  'MON',
  'MSE',
  'SPK',
  'CAM',
  'ACC',
  'NET',
  'FRN',
  'LGT'
]

function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset: number) => seededRandom(i * 7 + offset)
    const adj = adjectives[Math.floor(r(1) * adjectives.length)]!
    const noun = nouns[Math.floor(r(2) * nouns.length)]!
    const brand = brands[Math.floor(r(3) * brands.length)]!
    const cat = categories[i % categories.length]!
    const prefix = skuPrefixes[Math.floor(r(4) * skuPrefixes.length)]!
    const statusIdx = r(5)
    const status: StockStatus =
      statusIdx > 0.7
        ? 'In Stock'
        : statusIdx > 0.25
          ? 'Low Stock'
          : 'Out of Stock'
    const price = Math.round(20 + r(6) * 2000)
    const costRatio = 0.3 + r(7) * 0.4

    return {
      cost: Math.round(price * costRatio),
      id: i + 1,
      image: `https://img.heroui.chat/image/${cat}?w=80&h=80&u=${i + 1}`,
      name: `${brand} ${adj} ${noun}`,
      price,
      rating: Math.round((2.5 + r(10) * 2.5) * 10) / 10,
      sku: `${prefix}-${String(Math.floor(r(8) * 9000 + 1000))}`,
      sold: Math.floor(r(11) * 800) + 5,
      status,
      stock:
        status === 'Out of Stock'
          ? 0
          : status === 'Low Stock'
            ? Math.floor(r(9) * 5) + 1
            : Math.floor(r(9) * 200) + 5
    }
  })
}

const products = generateProducts(1000)

const statusIcon: Record<StockStatus, React.ReactNode> = {
  'In Stock': <CircleCheckFill className="size-3.5" />,
  'Low Stock': <Clock className="size-3.5" />,
  'Out of Stock': <CircleXmarkFill className="size-3.5" />
}

const statusColor: Record<StockStatus, 'success' | 'danger' | 'warning'> = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger'
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(amount)
}

/* -------------------------------------------------------------------------------------------------
 * Demo
 * -----------------------------------------------------------------------------------------------*/
export function Virtualized() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<Key>('all')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const filtered = useMemo(() => {
    let result = products

    if (tab !== 'all') {
      const statusMap: Record<string, StockStatus> = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out-of-stock': 'Out of Stock'
      }

      result = result.filter(p => p.status === statusMap[tab as string])
    }
    if (search) {
      const q = search.toLowerCase()

      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      )
    }

    return result
  }, [tab, search])

  const totalProfit = useMemo(
    () => filtered.reduce((sum, p) => sum + (p.price - p.cost) * p.sold, 0),
    [filtered]
  )
  const totalSold = useMemo(
    () => filtered.reduce((sum, p) => sum + p.sold, 0),
    [filtered]
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const columns: DataGridColumn<Product>[] = [
    {
      accessorKey: 'name',
      cell: item => (
        <div className="flex items-center gap-3">
          <img
            alt={item.name}
            className="bg-surface-secondary size-10 shrink-0 rounded-lg object-cover"
            loading="lazy"
            src={item.image}
          />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ),
      header: 'Product',
      id: 'name',
      isRowHeader: true,
      minWidth: 280
    },
    {
      accessorKey: 'sku',
      cellClassName: 'text-muted font-mono text-xs',
      header: 'SKU',
      id: 'sku'
    },
    {
      accessorKey: 'status',
      cell: item => (
        <Chip
          className="whitespace-nowrap"
          color={statusColor[item.status]}
          size="sm"
          variant="soft">
          {statusIcon[item.status]}
          <Chip.Label>{item.status}</Chip.Label>
        </Chip>
      ),
      header: 'Status',
      id: 'status',
      minWidth: 140
    },
    {
      accessorKey: 'stock',
      align: 'center',
      header: 'Stock',
      id: 'stock'
    },
    {
      accessorKey: 'price',
      align: 'end',
      cell: item => (
        <span className="tabular-nums">{formatCurrency(item.price)}</span>
      ),
      header: 'Price',
      id: 'price'
    },
    {
      accessorKey: 'cost',
      align: 'end',
      cell: item => (
        <span className="tabular-nums">{formatCurrency(item.cost)}</span>
      ),
      cellClassName: 'text-muted',
      header: 'Cost',
      id: 'cost'
    },
    {
      accessorKey: 'rating',
      cell: item => (
        <Rating
          isReadOnly
          aria-label={`${item.rating} stars`}
          size="sm"
          value={item.rating}>
          <Rating.Item value={1} />
          <Rating.Item value={2} />
          <Rating.Item value={3} />
          <Rating.Item value={4} />
          <Rating.Item value={5} />
        </Rating>
      ),
      header: 'Rating',
      id: 'rating'
    },
    {
      accessorKey: 'sold',
      align: 'end',
      cell: item => (
        <span className="tabular-nums">{item.sold.toLocaleString()}</span>
      ),
      header: 'Sales',
      id: 'sold'
    }
  ]

  const selectionCount =
    selectedKeys === 'all'
      ? filtered.length
      : (selectedKeys as Set<string | number>).size

  const summaryFooter = (
    <>
      <span className="text-muted">
        {filtered.length.toLocaleString()} products
        {selectionCount > 0 && (
          <> &middot; {selectionCount.toLocaleString()} selected</>
        )}
      </span>
      <div className="flex gap-6">
        <span className="text-muted">
          Profit:{' '}
          <span className="text-foreground font-medium tabular-nums">
            {formatCurrency(totalProfit)}
          </span>
        </span>
        <span className="text-muted">
          Sales:{' '}
          <span className="text-foreground font-medium tabular-nums">
            {totalSold.toLocaleString()}
          </span>
        </span>
      </div>
    </>
  )

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Segment selectedKey={tab} onSelectionChange={setTab}>
          <Segment.Item id="all">All</Segment.Item>
          <Segment.Item id="in-stock">In Stock</Segment.Item>
          <Segment.Item id="out-of-stock">Out of Stock</Segment.Item>
          <Segment.Item id="low-stock">Low Stock</Segment.Item>
        </Segment>

        <SearchField
          aria-label="Search products"
          value={search}
          onChange={handleSearchChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[180px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      {/* Table */}
      <DataGrid
        showSelectionCheckboxes
        virtualized
        aria-label="Product inventory"
        columns={columns}
        contentClassName="h-[600px] min-w-[900px] overflow-auto"
        data={filtered}
        footer={summaryFooter}
        footerClassName="justify-between text-sm"
        getRowId={item => item.id}
        headingHeight={37}
        renderEmptyState={() => 'No products match the current filters.'}
        rowHeight={58}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant="primary"
        onSelectionChange={setSelectedKeys}
      />
    </div>
  )
}
