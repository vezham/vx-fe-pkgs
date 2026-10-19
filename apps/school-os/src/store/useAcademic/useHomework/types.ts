export type RQHomework = Record<string, never>

export type ClassStatus = 'Active' | 'Inactive'

export type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

export type HomeworkCreator = {
  name: string
  secondaryText?: string
  avatar?: string
}

export type HomeworkItem = {
  id: string
  classes: string
  homeworkdate: string
  submissiondate: string
  status: ClassStatus
  createdBy: HomeworkCreator
  section: string
  subject: string
  createdAt: string
  viewedAt: string
  attachments?: string
  date?: string
}

export type HomeworkResponse = HomeworkItem[]

export type ClassFormState = {
  classes: string
  section: string
  subject: string
  homeworkdate: string
  submissiondate: string
  status: ClassStatus
  date: string
  attachments: string
}
export type SortOption = {
  key: string
  label: string
  column: keyof HomeworkItem
}
