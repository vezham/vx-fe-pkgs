import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  AllClassesItem,
  ClassFormState,
  ClassStatus
} from '@store/useAcademic/useAllClasses'

export type {
  AllClassesColumnKey,
  DatePresetKey
} from '@store/useAcademic/useAllClasses'

export type ClassRow = AllClassesItem

export type FilterDraft = {
  className: string | null
  section: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'className' | 'section' | 'students' | 'subjects', string>
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
