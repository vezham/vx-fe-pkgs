import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  ReasonsItem
} from '@store/useAcademic/useReasons'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey
} from '@store/useAcademic/useReasons'

export type ClassRow = ReasonsItem

export type FilterDraft = {
  role: string | null
  reasons: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'role' | 'reasons' | 'status' | 'name', string>
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
