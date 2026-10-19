import type {
  ClassFormState,
  SortOption,
  SubjectItem,
  typeStatus
} from './types'

export const subjectData: SubjectItem[] = [
  {
    id: 'SU128394',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    name: 'English',
    code: '101',
    type: 'Theory'
  },
  {
    id: 'SU128393',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    name: 'Maths',
    code: '102',
    type: 'Theory'
  },
  {
    id: 'SU128392',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    name: 'Physics',
    code: '103',
    type: 'Practical'
  },
  {
    id: 'SU128391',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    name: 'Chemistry',
    code: '104',
    type: 'Practical'
  },
  {
    id: 'SU128390',
    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    name: 'Biology',
    code: '105',
    type: 'Practical'
  },
  {
    id: 'SU128389',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    name: 'Higher Math',
    code: '106',
    type: 'Practical'
  },
  {
    id: 'SU128388',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    name: 'Information Technology',
    code: '107',
    type: 'Practical'
  },
  {
    id: 'SU128387',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    name: 'Moral Education',
    code: '108',
    type: 'Practical'
  },
  {
    id: 'SU128386',
    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    name: 'Finance',
    code: '109',
    type: 'Theory'
  },
  {
    id: 'SU128385',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    name: 'Economics',
    code: '110',
    type: 'Theory'
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

export const nameOptions = [
  'English',
  'Economics',
  'Finance',
  'Maths',
  'Higher Math',
  'Moral Education',
  'Information Technology',
  'Biology',
  'Physics',
  'Chemistry'
]

export const codeOptions = [
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
export const typeOptions: typeStatus[] = ['Theory', 'Practical']
export const subjectColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180,
    isRowHeader: true
  },
  {
    key: 'name',
    label: 'Name',
    defaultWidth: 220,
    minWidth: 180,
    maxWidth: 320
  },
  {
    key: 'code',
    label: 'Code',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 160
  },
  {
    key: 'type',
    label: 'Type',
    defaultWidth: 140,
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
] as const

export const emptyForm: ClassFormState = {
  name: '',
  code: '',
  type: 'Theory',
  status: 'Active'
}
