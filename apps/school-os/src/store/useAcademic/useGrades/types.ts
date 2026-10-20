export type RQGrades = Record<string, never>
export type ClassStatus = 'Active' | 'Inactive'

export type GradeColumnKey = 'id' | 'grade' | 'percentage' | 'points' | 'status'

export type ClassRow = {
  id: string
  grade: string
  percentage: string
  points: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type GradeItem = ClassRow
export type GradesResponse = GradeItem[]

export type ClassFormState = {
  grade: string
  marksfrom: string
  marksupto: string
  percentage: string
  description: string
  points: string
  status: ClassStatus
}

export type GradeColumnOption = {
  key: GradeColumnKey
  label: string
  defaultWidth: number
  minWidth: number
  maxWidth: number
}
