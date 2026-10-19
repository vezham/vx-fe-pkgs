import type {
  ClassFormState,
  ClassroomColumnKey,
  ClassroomItem,
  SortOption
} from './types'

export const classroomData: ClassroomItem[] = [
  {
    id: 'R167648',
    roomno: '101',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'R167647',
    roomno: '102',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30'
  },
  {
    id: 'R167646',
    roomno: '103',
    capacity: '60',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'R167645',
    roomno: '104',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'R167644',
    roomno: '105',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'R167643',
    roomno: '106',
    capacity: '50',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'R167642',
    roomno: '107',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'R167641',
    roomno: '108',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'R167640',
    roomno: '109',
    capacity: '40',
    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'R167639',
    roomno: '110',
    capacity: '50',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
  }
]

export const sortOptions = [
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    column: 'viewedAt'
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    column: 'createdAt'
  }
] as const satisfies readonly SortOption[]

export const classroomColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180,
    isRowHeader: true
  },
  {
    key: 'roomno',
    label: 'Room No',
    defaultWidth: 150,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'capacity',
    label: 'Capacity',
    defaultWidth: 150,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  }
] as const satisfies readonly {
  key: ClassroomColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
  isRowHeader?: boolean
}[]

export const roomnoOptions = [
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110'
]

export const capacityOptions = ['10', '20', '30', '40', '50', '60', '70', '80']

export const emptyForm: ClassFormState = {
  roomno: '',
  capacity: '',
  status: 'Active'
}
