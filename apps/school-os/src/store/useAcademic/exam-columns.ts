import type { SortFieldOption } from '@pages/academic/shared/sort'

export const studentSubjectColumns = [
  {
    key: 'id',
    label: 'Admission No',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'name',
    label: 'Student Name',
    defaultWidth: 220,
    minWidth: 180,
    maxWidth: 280
  },
  {
    key: 'english',
    label: 'English',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'spanish',
    label: 'Spanish',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'physics',
    label: 'Physics',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'chemistry',
    label: 'Chemistry',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'maths',
    label: 'Maths',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'computer',
    label: 'Computer',
    defaultWidth: 130,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'envscience',
    label: 'Env Science',
    defaultWidth: 150,
    minWidth: 130,
    maxWidth: 180
  }
] as const

export const createExamSortOptions = (
  columns: readonly { key: string; label: string }[]
): readonly SortFieldOption[] => [
  { key: 'recentlyViewed', label: 'Recently Viewed', column: 'viewedAt' },
  { key: 'recentlyAdded', label: 'Recently Added', column: 'createdAt' },
  ...columns.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
]
