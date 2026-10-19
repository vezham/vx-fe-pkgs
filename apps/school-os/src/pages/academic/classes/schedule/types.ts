import type {
  EntityDetailsProps,
  EntityDrawerProps,
  EntityFilterDropdownProps,
  EntityFormProps
} from '@pages/academic/shared/entity-types'

export type ClassStatus = 'Active' | 'Inactive'
export type ScheduleColumnKey =
  'id' | 'type' | 'starttime' | 'endtime' | 'status'

export type ClassRow = {
  id: string
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  type: string | null
  status: ClassStatus | null
}

export type ClassFormState = {
  type: string
  starttime: string
  endtime: string
  status: ClassStatus
}

export type ClassFormErrors = Partial<
  Record<'type' | 'starttime' | 'endtime' | 'status', string>
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
