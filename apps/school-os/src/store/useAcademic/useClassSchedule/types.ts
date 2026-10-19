export type ClassStatus = 'Active' | 'Inactive'

export type ClassScheduleColumnKey =
  'id' | 'type' | 'starttime' | 'endtime' | 'status'

export type ClassScheduleItem = {
  id: string
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ClassFormState = {
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
}
export type ClassScheduleColumnOption = {
  key: ClassScheduleColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}

export type SortOption = {
  key: string
  label: string
  column: keyof ClassScheduleItem
}
