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
} from '@store/useAcademic/useExam/types'

export type {
  ClassStatus,
  ExamColumnKey,
  ClassRow,
  ClassFormState
} from '@store/useAcademic/useExam/types'

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  name: string | null
  date: string | null
  starttime: string | null
  endtime: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'name' | 'date' | 'starttime' | 'endtime' | 'status', string>
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
