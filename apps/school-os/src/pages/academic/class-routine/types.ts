import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassRoutineItem as ClassRow,
  ClassStatus
} from '@store/useAcademic/useClassRoutine'

export type {} from '@pages/academic/shared/entity-types'

export type {
  ClassFormState,
  ClassRoutineColumnKey,
  ClassRoutineItem as ClassRow,
  ClassStatus,
  DatePresetKey
} from '@store/useAcademic/useClassRoutine'

export type FilterDraft = {
  classes: string | null
  section: string | null
  teacher: string | null
  subject: string | null
  day: string | null
  starttime: string | null
  endtime: string | null
  classroom: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<
    | 'classes'
    | 'teacher'
    | 'subject'
    | 'section'
    | 'day'
    | 'classroom'
    | 'starttime'
    | 'endtime'
    | 'status',
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
