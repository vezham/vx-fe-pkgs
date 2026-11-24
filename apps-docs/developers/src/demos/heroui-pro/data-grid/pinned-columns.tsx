// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChevronDown,
  CircleFill,
  Funnel,
  Link as LinkIcon,
  Sliders
} from '@gravity-ui/icons'
import type { CSSProperties } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import type { Selection } from '@vezham/react-v3'
import {
  Button,
  Dropdown,
  Label,
  SearchField,
  Separator
} from '@vezham/react-v3'

type ConnectionStrength =
  'Very strong' | 'Strong' | 'Weak' | 'Very weak' | 'No communication'

interface Company {
  id: number
  name: string
  logo: string
  dotColor: string
  categories: string[]
  linkedInCompanySlug: string
  lastInteraction: string | null
  connectionStrength: ConnectionStrength
  twitterFollowers: number
  twitterHandle: string
  country: string
}

const categoryColors: Record<string, string> = {
  Airlines: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400',
  Automation:
    'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400',
  B2B: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
  B2C: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400',
  Broadcasting: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  'Consumer Discretionary':
    'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400',
  'Consumer Electronics':
    'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400',
  'E-commerce':
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Enterprise:
    'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  Finance: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
  'Financial Services':
    'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
  Food: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
  ISP: 'bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400',
  'Information Technology':
    'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400',
  Internet: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
  Marketplace:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Mobile:
    'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-400',
  Performance:
    'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400',
  Publishing:
    'bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-400',
  SaaS: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400',
  Transportation:
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400'
}

const connectionStrengthOrder: Record<ConnectionStrength, number> = {
  'No communication': 0,
  Strong: 3,
  'Very strong': 4,
  'Very weak': 1,
  Weak: 2
}

const connectionStrengthConfig: Record<
  ConnectionStrength,
  { color: string; dotClass: string }
> = {
  'No communication': { color: 'text-muted', dotClass: 'text-muted' },
  Strong: {
    color: 'text-emerald-600 dark:text-emerald-400',
    dotClass: 'text-emerald-500'
  },
  'Very strong': {
    color: 'text-emerald-600 dark:text-emerald-400',
    dotClass: 'text-emerald-500'
  },
  'Very weak': {
    color: 'text-red-600 dark:text-red-400',
    dotClass: 'text-red-500'
  },
  Weak: {
    color: 'text-amber-600 dark:text-amber-400',
    dotClass: 'text-amber-500'
  }
}

const companies: Company[] = [
  {
    categories: ['B2C', 'Consumer Discretionary', 'E-commerce'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-amber-500',
    id: 1,
    lastInteraction: null,
    linkedInCompanySlug: 'lvmh',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=lvmh',
    name: 'LVMH',
    twitterFollowers: 198135,
    twitterHandle: 'LVMH'
  },
  {
    categories: ['B2C', 'E-commerce'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-emerald-500',
    id: 2,
    lastInteraction: null,
    linkedInCompanySlug: 'disney-music-group',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=disney',
    name: 'Disney',
    twitterFollowers: 10140332,
    twitterHandle: 'Disney'
  },
  {
    categories: [
      'B2C',
      'Finance',
      'Financial Services',
      'Information Technology'
    ],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-blue-500',
    id: 3,
    lastInteraction: null,
    linkedInCompanySlug: 'paypal',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=paypal',
    name: 'PayPal',
    twitterFollowers: 969425,
    twitterHandle: 'PayPal'
  },
  {
    categories: ['Airlines', 'B2C', 'E-commerce', 'Transportation'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-sky-500',
    id: 4,
    lastInteraction: null,
    linkedInCompanySlug: 'united-airlines',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=united',
    name: 'United Airlines',
    twitterFollowers: 1174209,
    twitterHandle: 'united'
  },
  {
    categories: ['B2C', 'Consumer Electronics', 'E-commerce'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-gray-800 dark:bg-gray-300',
    id: 5,
    lastInteraction: null,
    linkedInCompanySlug: 'apple',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=apple',
    name: 'Apple',
    twitterFollowers: 9119742,
    twitterHandle: 'Apple'
  },
  {
    categories: ['B2B', 'Enterprise', 'Information Technology', 'Publishing'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-red-500',
    id: 6,
    lastInteraction: null,
    linkedInCompanySlug: 'microsoft',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=msft',
    name: 'Microsoft',
    twitterFollowers: 12814907,
    twitterHandle: 'Microsoft'
  },
  {
    categories: ['B2C', 'Internet', 'Marketplace'],
    connectionStrength: 'No communication',
    country: 'US',
    dotColor: 'bg-rose-500',
    id: 7,
    lastInteraction: null,
    linkedInCompanySlug: 'airbnb',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=airbnb',
    name: 'Airbnb',
    twitterFollowers: 883549,
    twitterHandle: 'Airbnb'
  },
  {
    categories: ['B2C', 'E-commerce', 'Food', 'Marketplace'],
    connectionStrength: 'Very strong',
    country: 'US',
    dotColor: 'bg-green-500',
    id: 8,
    lastInteraction: 'about 2 hours ago',
    linkedInCompanySlug: 'sweetgreen',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=sweetgr',
    name: 'sweetgreen',
    twitterFollowers: 3200,
    twitterHandle: 'sweetgreen'
  },
  {
    categories: ['B2B', 'B2C', 'SaaS', 'Internet', 'ISP'],
    connectionStrength: 'Weak',
    country: 'US',
    dotColor: 'bg-indigo-500',
    id: 9,
    lastInteraction: '2 days ago',
    linkedInCompanySlug: 'openphone',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=openph',
    name: 'OpenPhone',
    twitterFollowers: 8400,
    twitterHandle: 'OpenPhone'
  },
  {
    categories: ['B2B', 'B2C', 'E-commerce', 'Information Technology'],
    connectionStrength: 'No communication',
    country: 'UK',
    dotColor: 'bg-blue-600',
    id: 10,
    lastInteraction: null,
    linkedInCompanySlug: 'intercom',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=intercom',
    name: 'Intercom',
    twitterFollowers: 42427,
    twitterHandle: 'intercom'
  },
  {
    categories: ['Automation', 'B2B', 'Enterprise', 'Information Technology'],
    connectionStrength: 'Very weak',
    country: 'UK',
    dotColor: 'bg-purple-500',
    id: 11,
    lastInteraction: 'about 3 hours ago',
    linkedInCompanySlug: 'attio',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=attio',
    name: 'Attio',
    twitterFollowers: 1340,
    twitterHandle: 'attio'
  },
  {
    categories: [
      'B2B',
      'B2C',
      'Information Technology',
      'Mobile',
      'Performance'
    ],
    connectionStrength: 'Very weak',
    country: 'DE',
    dotColor: 'bg-red-600',
    id: 12,
    lastInteraction: '14 days ago',
    linkedInCompanySlug: 'opera-software',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=opera',
    name: 'Opera',
    twitterFollowers: 63000,
    twitterHandle: 'opera'
  },
  {
    categories: ['B2B', 'B2C', 'Broadcasting', 'Information Technology'],
    connectionStrength: 'Weak',
    country: 'US',
    dotColor: 'bg-blue-500',
    id: 13,
    lastInteraction: '9 days ago',
    linkedInCompanySlug: 'google',
    logo: 'https://img.heroui.chat/image/avatar?w=80&h=80&u=google',
    name: 'Google',
    twitterFollowers: 28946065,
    twitterHandle: 'Google'
  }
]

const MAX_VISIBLE_CATEGORIES = 3

function CategoryChips({ categories }: { categories: string[] }) {
  const visible = categories.slice(0, MAX_VISIBLE_CATEGORIES)
  const overflow = categories.length - MAX_VISIBLE_CATEGORIES

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {visible.map(cat => (
        <span
          key={cat}
          className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] leading-none font-medium ${categoryColors[cat] ?? 'bg-default text-foreground'}`}>
          {cat.length > 14 ? `${cat.slice(0, 12)}…` : cat}
        </span>
      ))}
      {overflow > 0 && (
        <span className="text-muted text-[11px]">+{overflow}</span>
      )}
    </span>
  )
}

function ConnectionStrengthCell({
  strength
}: {
  strength: ConnectionStrength
}) {
  const config = connectionStrengthConfig[strength]

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${config.color}`}>
      <CircleFill className={`size-2 ${config.dotClass}`} />
      {strength}
    </span>
  )
}

type ViewId = 'all' | 'us' | 'europe'

export function PinnedColumns() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())
  const [view, setView] = useState<ViewId>('all')
  const [search, setSearch] = useState('')
  const [strengthFilter, setStrengthFilter] = useState('all')

  const filteredCompanies = useMemo(() => {
    let result = companies

    if (view === 'us') {
      result = result.filter(c => c.country === 'US')
    } else if (view === 'europe') {
      result = result.filter(c => ['UK', 'DE', 'FR'].includes(c.country))
    }

    if (strengthFilter !== 'all') {
      result = result.filter(
        c =>
          c.connectionStrength.toLowerCase().replace(/\s+/g, '-') ===
          strengthFilter
      )
    }

    if (search) {
      const q = search.toLowerCase()

      result = result.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.linkedInCompanySlug.toLowerCase().includes(q) ||
          c.categories.some(cat => cat.toLowerCase().includes(q))
      )
    }

    return result
  }, [view, search, strengthFilter])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const columns: DataGridColumn<Company>[] = [
    {
      accessorKey: 'name',
      allowsSorting: true,
      cell: item => (
        <span className="inline-flex items-center gap-2">
          <span className={`size-2.5 shrink-0 rounded-full ${item.dotColor}`} />
          <span className="text-xs font-medium">{item.name}</span>
        </span>
      ),
      header: 'Company',
      id: 'name',
      isRowHeader: true,
      minWidth: 160,
      pinned: 'start'
    },
    {
      cell: item => <CategoryChips categories={item.categories} />,
      header: 'Categories',
      id: 'categories',
      minWidth: 240
    },
    {
      accessorKey: 'linkedInCompanySlug',
      cell: item => (
        <span className="text-muted inline-flex items-center gap-1 text-xs">
          <LinkIcon className="size-3 shrink-0 opacity-50" />
          {item.linkedInCompanySlug}
        </span>
      ),
      header: 'LinkedIn',
      id: 'linkedInCompanySlug',
      minWidth: 140
    },
    {
      accessorKey: 'lastInteraction',
      allowsSorting: true,
      cell: item => (
        <span className="text-muted text-xs">
          {item.lastInteraction ?? 'No contact'}
        </span>
      ),
      header: 'Last interaction',
      id: 'lastInteraction',
      minWidth: 130
    },
    {
      allowsSorting: true,
      cell: item => (
        <ConnectionStrengthCell strength={item.connectionStrength} />
      ),
      header: 'Connection strength',
      id: 'connectionStrength',
      minWidth: 160,
      sortFn: (a, b) =>
        connectionStrengthOrder[a.connectionStrength] -
        connectionStrengthOrder[b.connectionStrength]
    },
    {
      accessorKey: 'twitterFollowers',
      align: 'end',
      allowsSorting: true,
      cell: item => (
        <span className="text-xs tabular-nums">
          {item.twitterFollowers.toLocaleString()}
        </span>
      ),
      header: 'Twitter followers',
      id: 'twitterFollowers',
      minWidth: 120
    },
    {
      cell: item => (
        <span className="text-accent text-xs">{item.twitterHandle}</span>
      ),
      header: 'Twitter',
      id: 'twitter',
      minWidth: 100
    }
  ]

  return (
    <div
      className="flex w-full flex-col gap-3"
      style={
        { '--radius': '0.375rem', '--spacing': '0.2rem' } as CSSProperties
      }>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold">Companies</h2>

          {/* View switcher */}
          <Dropdown>
            <Button size="sm" variant="ghost">
              <span className="bg-success size-2 shrink-0 rounded-full" />
              {view === 'all'
                ? 'All Companies'
                : view === 'us'
                  ? 'US Companies'
                  : 'UK & European Co.'}
              <ChevronDown className="text-muted size-3" />
            </Button>
            <Dropdown.Popover className="min-w-[200px]">
              <Dropdown.Menu
                selectedKeys={new Set([view])}
                selectionMode="single"
                onSelectionChange={keys => {
                  const key = [...keys][0] as ViewId | undefined

                  if (key) setView(key)
                }}>
                <Dropdown.Item id="all" textValue="All Companies">
                  <Label>All Companies</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="us" textValue="US Companies">
                  <Label>US Companies</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="europe" textValue="UK & European Co.">
                  <Label>UK &amp; European Co.</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Sliders className="size-3.5" />
            Sort
          </Button>
          <Dropdown>
            <Button size="sm" variant="ghost">
              <Funnel className="size-3.5" />
              Filter
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                selectedKeys={new Set([strengthFilter])}
                selectionMode="single"
                onSelectionChange={keys => {
                  const key = [...keys][0] as string | undefined

                  setStrengthFilter(key ?? 'all')
                }}>
                <Dropdown.Item id="all" textValue="All">
                  <Label>All</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="very-strong" textValue="Very strong">
                  <Label>Very strong</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="strong" textValue="Strong">
                  <Label>Strong</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="weak" textValue="Weak">
                  <Label>Weak</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item id="very-weak" textValue="Very weak">
                  <Label>Very weak</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item
                  id="no-communication"
                  textValue="No communication">
                  <Label>No communication</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Separator className="!h-4 self-center" orientation="vertical" />

          <SearchField
            aria-label="Search companies"
            value={search}
            onChange={handleSearchChange}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-[140px] text-xs"
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
        aria-label="Companies"
        className="[&_.table__cell]:py-1.5 [&_.table__cell]:text-xs [&_.table__column]:py-1.5 [&_.table__column]:text-[11px]"
        columns={columns}
        contentClassName="min-w-[1100px]"
        data={filteredCompanies}
        footer={
          <span className="text-muted text-xs">
            {filteredCompanies.length} count
          </span>
        }
        getRowId={item => item.id}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        variant="primary"
        onSelectionChange={setSelectedKeys}
      />
    </div>
  )
}
