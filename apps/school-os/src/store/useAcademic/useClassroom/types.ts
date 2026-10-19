export type RQClassroom = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type ClassroomColumnKey = 'id' | 'roomno' | 'capacity' | 'status'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type ClassroomItem = {
  id: string
  roomno: string
  capacity: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ClassroomResponse = ClassroomItem[]

export type ClassFormState = {
  roomno: string
  capacity: string
  status: ClassStatus
}
export type SortOption = {
  key: string
  label: string
  column: keyof ClassroomItem
}
