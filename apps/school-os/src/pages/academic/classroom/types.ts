import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  ClassroomItem
} from '@store/useAcademic/useClassroom'

export type {} from '@pages/academic/shared/entity-types'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey,
  ClassroomColumnKey
} from '@store/useAcademic/useClassroom'

export type ClassRow = ClassroomItem

export type FilterDraft = {
  roomno: string | null
  capacity: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'roomno' | 'capacity' | 'status', string>
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
