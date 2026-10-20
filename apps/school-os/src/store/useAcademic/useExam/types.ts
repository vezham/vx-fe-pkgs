export type RQExam = Record<string, never>
export type ClassStatus = 'Active' | 'Inactive'

export type ExamColumnKey = 'id' | 'name' | 'date' | 'starttime' | 'endtime'

export type ClassRow = {
  id: string
  name: string
  date: string
  starttime: string
  endtime: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type ExamItem = ClassRow
export type ExamResponse = ExamItem[]

export type ClassFormState = {
  name: string
  date: string | null
  starttime: string
  endtime: string
  status: ClassStatus
}

export type ExamColumnOption = {
  key: ExamColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}
