import { type SortDescriptor, useOverlayState } from '@vezham/react-v3'

export type { DatePresetKey } from '@src/utils/date-options'

export type AttendanceStatus =
  'Present' | 'Absent' | 'Late' | 'Half Day' | 'Halfday' | 'Holiday'

export type ReportCellType =
  | 'text'
  | 'link'
  | 'person'
  | 'status'
  | 'badge'
  | 'grade'
  | 'percent'
  | 'marker'

export type PersonValue = {
  name: string
  avatar?: string
  description?: string
}

export type ReportColumn = {
  key: string
  label: string
  type?: ReportCellType
  allowsSorting?: boolean
  minWidth?: number
}

export type ReportRow = {
  id: string
  createdAt: string
  viewedAt?: string
  [key: string]: unknown
}

export type FilterOption = {
  key: string
  label: string
  values: string[]
}

export type AttendancePageConfig = {
  key: string
  title: string
  ariaLabel: string
  columns: ReportColumn[]
  rows: ReportRow[]
  filters: FilterOption[]
  sortOptions: {
    key: string
    label: string
    descriptor: SortDescriptor
  }[]
  initialSort: SortDescriptor
  tableMinWidth: number
  showStatusLegend?: boolean
  actionLabel?: string
}

export type FilterDraft = Record<string, string | null>
export type DrawerMode = 'view' | 'edit'

export type SortableHeaderProps = {
  children: string
  sortDirection?: 'ascending' | 'descending'
}

export type DrawerQueryState = {
  id: string
  mode: DrawerMode
}

export const useDisclosure = () => {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}
