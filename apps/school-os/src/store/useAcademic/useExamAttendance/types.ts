export type RQExamAttendance = Record<string, never>
export type AttendanceStatus = 'Present' | 'Absent' | 'Late'

export type AttendanceColumnKey =
  | 'id'
  | 'name'
  | 'english'
  | 'spanish'
  | 'physics'
  | 'chemistry'
  | 'maths'
  | 'computer'
  | 'envscience'

export type AttendanceRow = {
  id: string
  name: string
  avatar?: string
  email?: string
  rollNo?: string
  english: AttendanceStatus
  spanish: AttendanceStatus
  physics: AttendanceStatus
  chemistry: AttendanceStatus
  maths: AttendanceStatus
  computer: AttendanceStatus
  envscience: AttendanceStatus
  examtype?: string
  classes?: string
  section?: string
  status: AttendanceStatus
  createdAt: string
  viewedAt: string
}

export type ExamAttendanceItem = AttendanceRow
export type ExamAttendanceResponse = ExamAttendanceItem[]

export type AttendanceFormState = {
  name: string
  english: AttendanceStatus
  spanish: AttendanceStatus
  physics: AttendanceStatus
  chemistry: AttendanceStatus
  maths: AttendanceStatus
  computer: AttendanceStatus
  envscience: AttendanceStatus
  examtype?: string
  classes?: string
  section?: string
  status: AttendanceStatus
}

export type AttendanceColumnOption = {
  key: AttendanceColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}
