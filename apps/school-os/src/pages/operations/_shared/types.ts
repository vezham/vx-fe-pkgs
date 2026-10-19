import { type SortDescriptor, useOverlayState } from '@vezham/react-v3'

export type OperationStatus = 'Active' | 'Inactive' | 'Paid' | 'Unpaid'
export type OperationCellType =
  'text' | 'link' | 'person' | 'status' | 'badge' | 'button' | 'code'

export type PersonValue = {
  name: string
  subtitle?: string
  avatar?: string
}

export type OperationColumn = {
  key: string
  label: string
  type?: OperationCellType
  allowsSorting?: boolean
  minWidth?: number
}

export type OperationRow = {
  id: string
  createdAt: string
  [key: string]: unknown
}

export type FilterOption = {
  key: string
  label: string
  values: string[]
}

export type OperationPageConfig = {
  key: string
  title: string
  pageTitle: string
  listTitle: string
  addLabel: string
  ariaLabel: string
  breadcrumb: string[]
  columns: OperationColumn[]
  rows: OperationRow[]
  filters: FilterOption[]
  sortOptions: {
    key: string
    label: string
    descriptor: SortDescriptor
  }[]
  initialSort: SortDescriptor
  tableMinWidth: number
}

export type FilterDraft = Record<string, string | null>
export type DrawerMode = 'view' | 'edit' | 'create'

export const useDisclosure = () => {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}
