export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type AllClassesColumnKey =
  'id' | 'className' | 'section' | 'students' | 'subjects' | 'status'

export type AllClassesItem = {
  id: string
  className: string
  section: string
  students: number
  subjects: number
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ClassFormState = {
  className: string
  section: string
  students: string
  subjects: string
  status: ClassStatus
}
export type AllClassesColumnOption = {
  key: AllClassesColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}

export type SortOption = {
  key: string
  label: string
  column: keyof AllClassesItem
}
