export type RQSection = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type SectionColumnKey = 'id' | 'section' | 'status'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type SectionItem = {
  id: string
  section: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type SectionResponse = SectionItem[]

export type ClassFormState = {
  section: string
  status: ClassStatus
}
export type SortOption = {
  key: string
  label: string
  column: keyof SectionItem
}
