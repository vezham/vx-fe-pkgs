import { useOverlayState } from '@vezham/react-v3'

export type DrawerMode = 'view' | 'edit' | 'create'

export type ToastState = {
  message: string
  status: 'success' | 'danger'
}

export type PickerDateValue = {
  toString(): string
}

export type CustomDateRangeValue = {
  start: PickerDateValue
  end: PickerDateValue
}

export type OpenDrawerOptions = {
  syncUrl?: boolean
  replaceUrl?: boolean
}

export const useDisclosure = (onClose?: () => void, defaultOpen = false) => {
  const state = useOverlayState({
    defaultOpen,
    onOpenChange: isOpen => {
      if (!isOpen) onClose?.()
    }
  })

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}

export type DrawerState = ReturnType<typeof useDisclosure>

export type EntityFilterDropdownProps<Filters> = {
  draftFilters: Filters
  setDraftFilters: (filters: Filters) => void
  onApply: () => void
  onReset: () => void
}

export type EntityFormProps<Row, Form, Errors> = {
  form: Form
  formErrors: Errors
  mode: DrawerMode
  row: Row | null
  onFormChange: (field: keyof Form, value: string) => void
}

export type EntityDrawerProps<Row, Form, Errors> = EntityFormProps<
  Row,
  Form,
  Errors
> & {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: DrawerState
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: Row) => void
  onCopyLink: (row: Row) => void
  onEdit: () => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: Row) => void
  onSave: () => void
}

export type EntityDetailsProps<Row> = { row: Row | null }
