import type {
  DrawerMode,
  DrawerState,
  EntityFilterDropdownProps
} from '@pages/academic/shared/entity-types'
import type {
  AttendanceFormState,
  AttendanceRow,
  AttendanceStatus
} from '@store/useAcademic/useExamAttendance/types'

export type {
  AttendanceStatus,
  AttendanceColumnKey,
  AttendanceRow,
  AttendanceFormState
} from '@store/useAcademic/useExamAttendance/types'

export type {
  DrawerMode,
  DrawerState
} from '@pages/academic/shared/entity-types'

export type { DatePresetKey } from '@src/utils/date-options'

export type FilterDraft = {
  name: string | null
  english: string | null
  spanish: string | null
  physics: string | null
  chemistry: string | null
  maths: string | null
  computer: string | null
  envscience: string | null
  examtype?: string | null
  status: AttendanceStatus | null
  classes?: string | null
  section?: string | null
}

export type AttendanceFormErrors = Partial<
  Record<
    | 'name'
    | 'english'
    | 'spanish'
    | 'physics'
    | 'chemistry'
    | 'maths'
    | 'computer'
    | 'envscience'
    | 'examtype'
    | 'classes'
    | 'section'
    | 'status',
    string
  >
>

export type FilterDropdownProps = EntityFilterDropdownProps<FilterDraft>

export type AttendanceDrawerProps = {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: DrawerState
  form: AttendanceFormState
  formErrors: AttendanceFormErrors
  mode: DrawerMode
  row: AttendanceRow | null
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: AttendanceRow) => void
  onCopyLink: (row: AttendanceRow) => void
  onEdit: () => void
  onFormChange: (field: keyof AttendanceFormState, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: AttendanceRow) => void
  onSave: () => void
}

export type AttendanceFormProps = {
  form: AttendanceFormState
  formErrors: AttendanceFormErrors
  mode: DrawerMode
  row: AttendanceRow | null
  onFormChange: (field: keyof AttendanceFormState, value: string) => void
}

export type AttendanceDetailsProps = {
  row: AttendanceRow | null
}
