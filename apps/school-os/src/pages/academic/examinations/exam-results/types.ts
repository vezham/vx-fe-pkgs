import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassRow,
  ClassStatus
} from '@store/useAcademic/useExamResults/types'

export type {
  ClassStatus,
  ExamResultsColumnKey,
  ClassRow,
  ClassFormState
} from '@store/useAcademic/useExamResults/types'

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  name: string | null
  english: string | null
  spanish: string | null
  physics: string | null
  chemistry: string | null
  maths: string | null
  computer: string | null
  envscience: string | null
  total: string | null
  percent: string | null
  grade: string | null
  examtype?: string | null
  result: ClassStatus | null
  classes?: string | null
  section?: string | null
}

export type ClassFormErrors = Partial<
  Record<
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
    | 'examtype'
    | 'classes'
    | 'section'
    | 'result',
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
