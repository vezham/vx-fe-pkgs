import type {
  AllClassesColumnOption,
  AllClassesItem,
  ClassFormState,
  ClassStatus,
  SortOption
} from './types'

export { dateOptions, sortOrderOptions, rowCountOptions } from '../options'

const allClassesData: AllClassesItem[] = [
  {
    id: 'C138038',
    className: 'I',
    section: 'A',
    students: 30,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'C138037',
    className: 'I',
    section: 'B',
    students: 25,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30'
  },
  {
    id: 'C138036',
    className: 'II',
    section: 'A',
    students: 40,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'C138035',
    className: 'II',
    section: 'B',
    students: 35,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'C138034',
    className: 'II',
    section: 'C',
    students: 25,
    subjects: 3,
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'C138033',
    className: 'III',
    section: 'A',
    students: 30,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'C138032',
    className: 'III',
    section: 'B',
    students: 25,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'C138031',
    className: 'IV',
    section: 'A',
    students: 20,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'C138030',
    className: 'IV',
    section: 'B',
    students: 30,
    subjects: 5,
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'C138029',
    className: 'V',
    section: 'A',
    students: 35,
    subjects: 5,
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
  },
  {
    id: 'C138028',
    className: 'V',
    section: 'B',
    students: 32,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21'
  },
  {
    id: 'C138027',
    className: 'VI',
    section: 'A',
    students: 38,
    subjects: 6,
    status: 'Inactive',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20'
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

export const allClassesColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'className',
    label: 'Class',
    defaultWidth: 140,
    minWidth: 120,
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
    key: 'students',
    label: 'Students',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'subjects',
    label: 'Subjects',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  }
] as const satisfies readonly AllClassesColumnOption[]

export const classOptions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
export const sectionOptions = ['A', 'B', 'C', 'D']
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  className: '',
  section: '',
  students: '',
  subjects: '',
  status: 'Active'
}

export { allClassesData as initialRows }
