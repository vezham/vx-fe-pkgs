import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  SubjectItem,
  typeStatus
} from '@store/useAcademic/useSubject'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey,
  typeStatus
} from '@store/useAcademic/useSubject'

export type ClassRow = SubjectItem

export type FilterDraft = {
  name: string | null
  code: string | null
  type: typeStatus | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'name' | 'code' | 'type' | 'status', string>
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
