import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  SyllabusItem
} from '@store/useAcademic/useSyllabus'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey
} from '@store/useAcademic/useSyllabus'

export type ClassRow = SyllabusItem

export type FilterDraft = {
  classes: string | null
  subject: string | null
  section: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<'section' | 'classes' | 'subject' | 'status', string>
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
