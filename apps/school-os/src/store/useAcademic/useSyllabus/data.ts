import type {
  ClassFormState,
  ClassStatus,
  SortOption,
  SyllabusColumnKey,
  SyllabusItem
} from './types'

export const syllabusData: SyllabusItem[] = [
  {
    id: 'SE167645',
    section: 'A',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    classes: 'I',
    subject: 'I, C English'
  },
  {
    id: 'SE167644',
    section: 'B',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    classes: 'I',
    subject: '\tIII, A Maths'
  },
  {
    id: 'SE167643',
    section: 'C',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    classes: 'II',
    subject: 'II, A English'
  },
  {
    id: 'SE167642',
    section: 'A',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    classes: 'II',
    subject: '\tIV, A Physics'
  },
  {
    id: 'SE167641',
    section: 'B',
    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    classes: 'II',
    subject: 'V, A Chemistry'
  },
  {
    id: 'SE167640',
    section: 'C',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    classes: 'IV',
    subject: '\tIII, B Maths'
  },
  {
    id: 'SE167639',
    section: 'C',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    classes: 'III',
    subject: 'IV, B Chemistry'
  },
  {
    id: 'SE167638',
    section: 'A',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    classes: 'III',
    subject: '\tI, B Maths'
  },
  {
    id: 'SE167637',
    section: 'A',
    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    classes: 'III',
    subject: '\tVI, B Chemistry'
  },
  {
    id: 'SE167636',
    section: 'B',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    classes: 'IV',
    subject: '\tIV, D Maths'
  },
  {
    id: 'SE167636',
    section: 'A',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    classes: 'V',
    subject: '\tI, B Maths'
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

export const classOptions = ['I', 'II', 'III']
export const sectionOptions = ['A', 'B', 'C']
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  section: '',
  status: 'Active',
  classes: '',
  subject: ''
}

export const syllabusColumnOptions = [
  {
    key: 'classes',
    label: 'Class',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 180
  },
  {
    key: 'section',
    label: 'Section',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 160
  },
  {
    key: 'subject',
    label: 'Subject',
    defaultWidth: 180,
    minWidth: 150,
    maxWidth: 260
  },
  {
    key: 'createdAt',
    label: 'Created At',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  }
] as const satisfies readonly {
  key: SyllabusColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}[]
