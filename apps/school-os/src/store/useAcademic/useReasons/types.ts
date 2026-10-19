export type RQReasons = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type ReasonsItem = {
  id: string
  role: string
  reasons: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ReasonsResponse = ReasonsItem[]

export type ClassFormState = {
  name: string
  role: string
  reasons: string
  status: ClassStatus
}
export type SortOption = {
  key: string
  label: string
  column: keyof ReasonsItem
}
