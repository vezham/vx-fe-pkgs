import { useMemo, useReducer, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { useDateControls } from '@pages/_shared/use-date-controls'

type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

type FilterDraft = Record<string, string | null>
type Toast = { message: string; status: 'success' | 'danger' }

export const useRecordTableState = <
  Row extends { id: string },
  Mode extends string,
  Drawer
>(
  config: {
    rows: Row[]
    filters: readonly { key: string }[]
    initialSort: SortDescriptor
  },
  useDrawer: () => Drawer,
  initialMode: Mode
) => {
  const [data, setData] = useReducer(
    (rows: Row[], nextRows: Row[] | ((currentRows: Row[]) => Row[])) =>
      typeof nextRows === 'function' ? nextRows(rows) : nextRows,
    config.rows
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const dateControls = useDateControls<DatePresetKey>('last30', setPage)
  const {
    customDateRange,
    datePreset,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    setCustomDateRange,
    setDatePreset,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    updateCustomDateRange,
    updateDatePreset
  } = dateControls
  const [sortDescriptor, setSortDescriptor] = useState(config.initialSort)
  const emptyFilters = useMemo(
    () =>
      config.filters.reduce<FilterDraft>((draft, filter) => {
        draft[filter.key] = null
        return draft
      }, {}),
    [config.filters]
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(emptyFilters)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<Mode>(initialMode)
  const [form, setForm] = useState<FilterDraft>({})
  const [toast, setToast] = useState<Toast | null>(null)
  const drawer = useDrawer()

  return {
    activeRowId,
    customDateRange,
    data,
    datePreset,
    draftFilters,
    drawer,
    emptyFilters,
    filters,
    form,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    mode,
    page,
    rowsPerPage,
    searchQuery,
    selectedRowKeys,
    sortDescriptor,
    toast,
    updateCustomDateRange,
    updateDatePreset,
    setActiveRowId,
    setCustomDateRange,
    setData,
    setDatePreset,
    setDraftFilters,
    setFilters,
    setForm,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    setMode,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    setSelectedRowKeys,
    setSortDescriptor,
    setToast
  }
}
