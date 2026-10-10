import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'

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

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  grade: string | null
  percentage: string | null
  points: string | null
  status: ClassStatus | null
}

export type ClassFormState = {
  grade: string
  marksfrom: string
  marksupto: string
  percentage: string
  description: string
  points: string
  status: ClassStatus
}

export type ClassFormErrors = Partial<
  Record<
    | 'grade'
    | 'percentage'
    | 'points'
    | 'status'
    | 'description'
    | 'marksfrom'
    | 'marksupto',
    string
  >
>

export type FilterDropdownProps = EntityFilterDropdownProps<FilterDraft>

export type ClassDrawerProps = EntityDrawerProps<
  ClassRow,
  ClassFormState,
  ClassFormErrors
>

export type ClassFormProps = EntityFormProps<
  ClassRow,
  ClassFormState,
  ClassFormErrors
>

export type ClassDetailsProps = EntityDetailsProps<ClassRow>
