import { type SortFieldOption } from '@pages/academic/shared/sort'

import type { ClassFormState, ClassRow, GradeColumnOption } from './types'

export { dateOptions, rowCountOptions } from '../options'

export const initialRows: ClassRow[] = [
  {
    id: 'G180482',

    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    grade: 'O',
    percentage: '90% - 100%',
    points: '10'
  },
  {
    id: 'G180481',

    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    grade: 'A+',
    percentage: '80% - 90%',
    points: '8'
  },
  {
    id: 'G180480',

    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    grade: 'A',
    percentage: '70% - 80%',
    points: '6'
  },
  {
    id: 'G180479',

    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    grade: 'B+',
    percentage: '60% - 70%',
    points: '4'
  },
  {
    id: 'G180478',

    status: 'Active',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    grade: 'B',
    percentage: '60% - 70%',
    points: '3'
  },
  {
    id: 'G180477',

    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    grade: 'C+',
    percentage: '50% - 60%',
    points: '2'
  },
  {
    id: 'G180476',

    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    grade: 'C',
    percentage: '40% - 50%',
    points: '1'
  },
  {
    id: 'G180475',

    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    grade: 'F',
    percentage: '35% - 40%',
    points: '0'
  },
  {
    id: 'G180474',

    status: 'Active',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    grade: 'D',
    percentage: 'Below 35%',
    points: '9'
  }
]

export const gradeColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'grade',
    label: 'Grade',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'percentage',
    label: 'Percentage',
    defaultWidth: 180,
    minWidth: 150,
    maxWidth: 220
  },
  {
    key: 'points',
    label: 'Points',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  }
] as const satisfies readonly GradeColumnOption[]

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
  },
  ...gradeColumnOptions.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
] satisfies readonly SortFieldOption[]

export const gradeOptions = ['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
export const marksfromOptions = ['90', '80', '70', '60', '50', '40', '35', '0']
export const marksuptoOptions = [
  '100',
  '90',
  '80',
  '70',
  '60',
  '50',
  '40',
  '35'
]
export const pointOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const percentageOptions = [
  '90% - 100%',
  '80% - 90%',
  '70% - 80%',
  '60% - 70%',
  '50% - 60%',
  '40% - 50%',
  '35% - 40%',
  'Below 35%'
]
export const emptyForm: ClassFormState = {
  grade: '',
  marksfrom: '',
  marksupto: '',
  percentage: '',
  description: '',
  points: '',
  status: 'Active'
}
