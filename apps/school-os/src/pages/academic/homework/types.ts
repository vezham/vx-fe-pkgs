import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassStatus,
  HomeworkItem
} from '@store/useAcademic/useHomework'

export type {
  ClassFormState,
  ClassStatus,
  DatePresetKey
} from '@store/useAcademic/useHomework'

export type ClassRow = HomeworkItem

export type FilterDraft = {
  classes: string | null
  section: string | null
  subject: string | null
  homeworkdate: string | null
  submissiondate: string | null
  status: ClassStatus | null
  date: string | null
  attachments: string | null
}

export type ClassFormErrors = Partial<
  Record<
    | 'classes'
    | 'subject'
    | 'section'
    | 'classroom'
    | 'homeworkdate'
    | 'submissiondate'
    | 'status'
    | 'attachments',
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
