export type RQExamSchedule = Record<string, never>
export type ClassStatus = 'Active' | 'Inactive'

export type ScheduleColumnKey =
  | 'id'
  | 'classes'
  | 'section'
  | 'examName'
  | 'date'
  | 'subject'
  | 'starttime'
  | 'endtime'
  | 'duration'
  | 'classroom'
  | 'maximum'
  | 'minimum'
  | 'status'

export type ClassRow = {
  id: string
  classes: string
  section: string
  examName: string
  subject: string
  date: string
  starttime: string
  endtime: string
  duration: string
  classroom: string
  maximum: string
  minimum: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ExamScheduleItem = {
  id: string
  date: string
  subject: string
  classroom: string
  maximum: string
  minimum: string
}

export type ExamScheduleResponse = ClassRow[]

export type ClassFormState = {
  classes: string
  section: string
  examName: string
  subject: string
  date: string
  starttime: string
  endtime: string
  duration: string
  classroom: string
  maximum: string
  minimum: string
  status: ClassStatus
  scheduleRows: ExamScheduleItem[]
}

export type ScheduleColumnOption = {
  key: ScheduleColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}
