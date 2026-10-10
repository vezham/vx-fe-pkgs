export type RQSyllabus = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type SyllabusColumnKey =
  'classes' | 'section' | 'subject' | 'createdAt' | 'status'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type SyllabusItem = {
  id: string
  section: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
  classes: string
  subject: string
}

export type SyllabusResponse = SyllabusItem[]

export type ClassFormState = {
  section: string
  status: ClassStatus
  classes: string
  subject: string
}
export type SortOption = {
  key: string
  label: string
  column: keyof SyllabusItem
}
