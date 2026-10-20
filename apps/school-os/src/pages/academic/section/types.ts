import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  SectionItem
} from '@store/useAcademic/useSection'

export type {} from '@pages/academic/shared/entity-types'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey,
  SectionColumnKey
} from '@store/useAcademic/useSection'

export type ClassRow = SectionItem

export type FilterDraft = {
  section: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<Record<'section' | 'status', string>>

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
