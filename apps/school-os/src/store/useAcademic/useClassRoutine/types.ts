export type RQClassRoutine = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type ClassRoutineColumnKey =
  | 'id'
  | 'classes'
  | 'section'
  | 'teacher'
  | 'subject'
  | 'day'
  | 'starttime'
  | 'endtime'
  | 'classroom'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export interface ClassRoutineItem {
  id: string
  classes: string
  section: string
  teacher: string
  subject: string
  day: string
  starttime: string
  endtime: string
  classroom: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ClassRoutineResponse = ClassRoutineItem[]

export type ClassFormState = {
  classes: string
  section: string
  teacher: string
  subject: string
  day: string
  starttime: string
  endtime: string
  classroom: string
  status: ClassStatus
}

export type ClassRoutineColumnOption = {
  key: ClassRoutineColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
  isRowHeader?: boolean
}

export type SortOption = {
  key: string
  label: string
  column: keyof ClassRoutineItem
}
