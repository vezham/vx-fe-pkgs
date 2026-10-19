export type RQExamResults = Record<string, never>
export type ClassStatus = 'Pass' | 'Fail'

export type ExamResultsColumnKey =
  | 'id'
  | 'name'
  | 'english'
  | 'spanish'
  | 'physics'
  | 'chemistry'
  | 'maths'
  | 'computer'
  | 'envscience'
  | 'total'
  | 'percent'
  | 'grade'
  | 'result'

export type ExamResultFields = {
  name: string
  english: string
  spanish: string
  physics: string
  chemistry: string
  maths: string
  computer: string
  envscience: string
  total: string
  percent: string
  grade: string
  examtype?: string
  classes?: string
  section?: string
  result: ClassStatus
}

export type ClassRow = ExamResultFields & {
  id: string
  avatar?: string
  email?: string
  rollNo?: string
  createdAt: string
  viewedAt: string
}

export type ExamResultsItem = ClassRow
export type ExamResultsResponse = ExamResultsItem[]

export type ClassFormState = ExamResultFields

export type ExamResultsColumnOption = {
  key: ExamResultsColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}
