export type RQSubject = Record<string, never>

export type typeStatus = 'Theory' | 'Practical'
export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type SubjectItem = {
  id: string
  name: string
  code: string
  type: typeStatus
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type SubjectResponse = SubjectItem[]

export type ClassFormState = {
  name: string
  code: string
  type: typeStatus
  status: ClassStatus
}
export type SortOption = {
  key: string
  label: string
  column: keyof SubjectItem
}
