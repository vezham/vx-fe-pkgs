import type {
  DrawerMode,
  DrawerState,
  EntityDetailsProps,
  EntityFilterDropdownProps
} from '@pages/academic/shared/entity-types'
import type {
  ClassFormState,
  ClassRow,
  ClassStatus
} from '@store/useAcademic/useExamSchedule/types'

export type {
  ClassStatus,
  ScheduleColumnKey,
  ClassRow,
  ExamScheduleItem,
  ClassFormState
} from '@store/useAcademic/useExamSchedule/types'

export type {
  DrawerMode,
  ToastState,
  DrawerState
} from '@pages/academic/shared/entity-types'

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  classes: string | null
  section: string | null
  examName: string | null
  subject: string | null
  date: string | null
  starttime: string | null
  endtime: string | null
  duration: string | null
  classroom: string | null
  maximum: string | null
  minimum: string | null
  status: ClassStatus | null
}

export type ClassFormErrors = Partial<
  Record<
    | 'subject'
    | 'classes'
    | 'section'
    | 'examName'
    | 'date'
    | 'duration'
    | 'classroom'
    | 'maximum'
    | 'minimum'
    | 'starttime'
    | 'endtime'
    | 'status'
    | 'scheduleRows',
    string
  >
>

export type FilterDropdownProps = EntityFilterDropdownProps<FilterDraft>

export type ClassDrawerProps = {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: DrawerState
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: ClassRow) => void
  onCopyLink: (row: ClassRow) => void
  onEdit: () => void
  onFormChange: <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: ClassRow) => void
  onSave: () => void
}

export type ClassFormProps = {
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onFormChange: <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => void
}

export type ClassDetailsProps = EntityDetailsProps<ClassRow>
