import { useLocation, useParams } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { createEntityDeleteAction } from '@pages/academic/shared/entity-delete-action'
import { filterEntityRows } from '@pages/academic/shared/entity-filter'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import { createEntityTableActions } from '@pages/academic/shared/entity-table-actions'
import type { ToastState } from '@pages/academic/shared/entity-types'
import { useEntityBulkActions } from '@pages/academic/shared/use-entity-bulk-actions'
import { useEntityCopyActions } from '@pages/academic/shared/use-entity-copy-actions'
import { useEntityDateControls } from '@pages/academic/shared/use-entity-date-controls'
import { useEntityDrawerActions } from '@pages/academic/shared/use-entity-drawer-actions'
import { useEntityDrawerState } from '@pages/academic/shared/use-entity-drawer-state'
import { getEntityDrawerRouteState } from '@pages/academic/shared/use-entity-drawer-url-sync'
import {
  useEntitySortDescriptor,
  useEntityToast
} from '@pages/academic/shared/use-entity-model-actions'
import { useEntityPageLifecycle } from '@pages/academic/shared/use-entity-page-lifecycle'
import { useEntityRowNavigation } from '@pages/academic/shared/use-entity-row-navigation'
import { useEntityTableRows } from '@pages/academic/shared/use-entity-table-rows'

type EntityRow = { id: string; createdAt: string }

export type AcademicEntityPageConfig<
  Row extends EntityRow,
  Form,
  Errors extends object,
  Filters extends object,
  ColumnKey extends string = string
> = {
  columnKeys: readonly ColumnKey[]
  clearActiveRowOnClose?: boolean
  clearSelectionOnClose?: boolean
  pageKey: string
  dateDropdownOpenChange?: 'direct' | 'close-custom'
  drawerClearSelectionOnClose?: boolean
  emptyFilters: Filters
  emptyForm: Form
  extraSearchValues?: (row: Row) => readonly (string | null | undefined)[]
  filterKeys: readonly (keyof Row & keyof Filters)[]
  getSortLabel: (column: SortDescriptor['column']) => string
  getSortableValue?: (row: Row, column: SortDescriptor['column']) => unknown
  matchesFilter?: (
    key: keyof Row & keyof Filters,
    rowValue: Row[keyof Row & keyof Filters],
    filterValue: Filters[keyof Row & keyof Filters]
  ) => boolean
  makeNewRow: (form: Form, data: Row[]) => Row
  makeUpdatedRow: (form: Form, row: Row) => Row
  navigateAcrossPages?: boolean
  removeFromSelectionOnDelete?: boolean
  rowToForm: (row: Row) => Form
  route: ReturnType<typeof createEntityRoute>
  searchKeys: readonly (keyof Row)[]
  selectAllVisible?: boolean
  sortRows?: (rows: Row[], descriptor: SortDescriptor) => Row[]
  syncSelectionFromUrl?: boolean
  validateForm: (form: Form) => Errors
}

export const useAcademicEntityPage = <
  Row extends EntityRow,
  Form,
  Errors extends object,
  Filters extends object,
  ColumnKey extends string
>(
  config: AcademicEntityPageConfig<Row, Form, Errors, Filters, ColumnKey>,
  initialData: Row[]
) => {
  const routeParams = useParams({ strict: false }) as { id?: string }
  const routeLocation = useLocation()
  const [initialDrawer] = useState(() =>
    getEntityDrawerRouteState({
      data: initialData,
      emptyForm: config.emptyForm,
      getRowIdFromPath: config.route.getRowIdFromPath,
      pathname: routeLocation.pathname,
      routeId: routeParams.id,
      rowToForm: config.rowToForm,
      urlMode: (routeLocation.search as Record<string, unknown>).mode
    })
  )
  const [data, setData] = useState<Row[]>(initialData)
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('5')
  const [page, setPage] = useState(1)
  const {
    activeDateLabel,
    activeDateRange,
    datePreset,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    updateCustomDateRange,
    updateDatePreset,
    updateDateDropdownOpen
  } = useEntityDateControls(setPage)
  const [sortField, setSortField] =
    useState<SortDescriptor['column']>('viewedAt')
  const [sortDirection, setSortDirection] =
    useState<SortDescriptor['direction']>('descending')
  const [activeSortLabel, setActiveSortLabel] = useState('Sort')
  const [filters, setFilters] = useState<Filters>(config.emptyFilters)
  const [draftFilters, setDraftFilters] = useState<Filters>(filters)
  const [visibleColumns, setVisibleColumns] = useState<Set<ColumnKey>>(
    () => new Set(config.columnKeys)
  )
  const {
    activeRowId,
    drawer,
    form,
    formErrors,
    mode,
    selectedRowKeys,
    setActiveRowId,
    setForm,
    setFormErrors,
    setMode,
    setSelectedRowKeys
  } = useEntityDrawerState<Form, Errors>({
    clearActiveRowOnClose: config.clearActiveRowOnClose ?? true,
    clearSelectionOnClose: config.clearSelectionOnClose ?? true,
    initial: initialDrawer
  })
  const [toast, setToast] = useState<ToastState | null>(null)

  const sortDescriptor = useEntitySortDescriptor(sortField, sortDirection)
  const filteredRows = useMemo(
    () =>
      filterEntityRows({
        data,
        dateRange: activeDateRange,
        filters,
        filterKeys: config.filterKeys,
        searchKeys: config.searchKeys,
        searchQuery,
        extraSearchValues: config.extraSearchValues,
        matchesFilter: config.matchesFilter
      }),
    [activeDateRange, config, data, filters, searchQuery]
  )
  const {
    currentPage,
    pageSize,
    paginatedRows,
    selectedRow,
    selectedRows,
    selectedRowIndex,
    sortedRows,
    tableSelectedKeys,
    totalPages
  } = useEntityTableRows({
    activeRowId,
    data,
    filteredRows,
    page,
    rowsPerPage,
    selectedRowKeys,
    sortDescriptor,
    getSortableValue: config.getSortableValue,
    sortRows: config.sortRows
  })

  const showToast = useEntityToast(setToast)
  const updateTableSelection = useCallback(
    (keys: Selection) => {
      setSelectedRowKeys(
        config.selectAllVisible && keys === 'all'
          ? new Set(paginatedRows.map(row => row.id))
          : keys
      )
    },
    [config.selectAllVisible, paginatedRows, setSelectedRowKeys]
  )
  const { closeDrawer, openDrawer, setDrawerMode, toggleDrawer } =
    useEntityDrawerActions({
      clearSelectionOnClose: config.drawerClearSelectionOnClose ?? true,
      drawer,
      emptyForm: config.emptyForm,
      rowToForm: config.rowToForm,
      selectedRow,
      selectedRowKeys,
      sortedRows,
      setActiveRowId,
      setForm,
      setFormErrors,
      setMode,
      setSelectedRowKeys,
      updateDrawerQuery: config.route.updateDrawerQuery
    })
  const { goToNextRow, goToPreviousRow } = useEntityRowNavigation({
    ...(config.navigateAcrossPages ? { currentPage, pageSize, setPage } : {}),
    mode,
    rowToForm: config.rowToForm,
    selectedRowIndex,
    sortedRows,
    setActiveRowId,
    setForm,
    setMode,
    updateDrawerQuery: config.route.updateDrawerQuery
  })

  useEntityPageLifecycle({
    activeRowId,
    pageKey: config.pageKey,
    currentPage,
    data,
    drawer,
    emptyForm: config.emptyForm,
    getRowIdFromPath: config.route.getRowIdFromPath,
    goToNextRow,
    goToPreviousRow,
    mode,
    openDrawer,
    pageSize,
    routeId: routeParams.id,
    rowToForm: config.rowToForm,
    setActiveRowId,
    setForm,
    setFormErrors,
    setMode,
    setPage,
    setSelectedRowKeys,
    setToast,
    sortedRows,
    syncSelectionFromUrl: config.syncSelectionFromUrl ?? false,
    toast,
    toggleDrawer
  })

  const {
    applyFilters,
    resetFilters,
    updateRowsPerPage,
    updateSearch,
    updateSortChange,
    updateSortDirection,
    updateSortField
  } = createEntityTableActions({
    draftFilters,
    emptyFilters: config.emptyFilters,
    getSortLabel: config.getSortLabel,
    setActiveSortLabel,
    setDraftFilters,
    setFilters,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    setSortDirection,
    setSortField
  })
  const updateVisibleColumns = useCallback((columns: Set<ColumnKey>) => {
    setVisibleColumns(new Set(columns))
  }, [])
  const clearSelection = useCallback(() => {
    setSelectedRowKeys(new Set())
  }, [setSelectedRowKeys])
  const updateForm = (field: keyof Form, value: string) => {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => ({ ...current, [field]: undefined }) as Errors)
  }

  const saveClass = () => {
    const errors = config.validateForm(form)
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }
    if (mode === 'create') {
      const newRow = config.makeNewRow(form, data)
      setData(current => [newRow, ...current])
      setForm(config.emptyForm)
      setActiveRowId(null)
      setMode('view')
      setPage(1)
      closeDrawer()
      return
    }
    if (!selectedRow) return

    const updatedRow = config.makeUpdatedRow(form, selectedRow)
    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setForm(config.rowToForm(updatedRow))
    setMode('view')
    config.route.updateDrawerQuery({ id: updatedRow.id, mode: 'view' })
  }

  const deleteClass = createEntityDeleteAction({
    activeRowId,
    drawer,
    removeFromSelection: config.removeFromSelectionOnDelete ?? false,
    setActiveRowId,
    setData,
    setSelectedRowKeys,
    showToast,
    updateDrawerQuery: config.route.updateDrawerQuery
  })
  const {
    copyClassId,
    copyClassLink,
    copySelectedIds,
    copySelectedLinks,
    openClassPage
  } = useEntityCopyActions({
    getRowUrl: config.route.getRowUrl,
    mode,
    selectedRows,
    showToast
  })
  const { editSelected, deleteSelected } = useEntityBulkActions({
    activeRowId,
    closeDrawer,
    openDrawer,
    selectedRows,
    setData,
    setSelectedRowKeys,
    showToast
  })

  return {
    drawer,
    toast,
    toolbar: {
      activeDateLabel,
      activeSortLabel,
      datePreset,
      draftFilters,
      isCustomDateRangeOpen,
      isDateDropdownOpen,
      rowsPerPage,
      searchQuery,
      visibleColumns,
      setDraftFilters,
      sortDescriptor,
      onApplyFilters: applyFilters,
      onCustomDateRangeChange: updateCustomDateRange,
      onCustomDateRangeOpenChange: setIsCustomDateRangeOpen,
      onDateDropdownOpenChange:
        config.dateDropdownOpenChange === 'direct'
          ? setIsDateDropdownOpen
          : updateDateDropdownOpen,
      onDatePresetChange: updateDatePreset,
      onResetFilters: resetFilters,
      onRowsPerPageChange: updateRowsPerPage,
      onSearchChange: updateSearch,
      onVisibleColumnsChange: updateVisibleColumns,
      sortDirection,
      sortField,
      onSortDirectionChange: updateSortDirection,
      onSortFieldChange: updateSortField
    },
    table: {
      activeRowId,
      currentPage,
      pageSize,
      rows: paginatedRows,
      selectedCount: selectedRows.length,
      selectedKeys: tableSelectedKeys,
      rowsPerPage,
      visibleColumns,
      sortDescriptor,
      totalPages,
      totalRows: sortedRows.length,
      onBulkEdit: editSelected,
      onBulkCopyIds: copySelectedIds,
      onBulkCopyLinks: copySelectedLinks,
      onBulkDelete: deleteSelected,
      onDelete: deleteClass,
      onOpenDrawer: openDrawer,
      onPageChange: setPage,
      onClearSelection: clearSelection,
      onSelectionChange: updateTableSelection,
      onRowsPerPageChange: updateRowsPerPage,
      onSortChange: updateSortChange
    },
    drawerProps: {
      canGoNext:
        selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1,
      canGoPrevious: selectedRowIndex > 0,
      drawerState: drawer,
      form,
      formErrors,
      mode,
      row: selectedRow,
      onCancel: closeDrawer,
      onClose: closeDrawer,
      onCopyId: copyClassId,
      onCopyLink: copyClassLink,
      onEdit: () => setDrawerMode('edit'),
      onFormChange: updateForm,
      onGoNext: goToNextRow,
      onGoPrevious: goToPreviousRow,
      onOpenPage: openClassPage,
      onSave: saveClass
    },
    onToastClose: () => setToast(null)
  }
}
