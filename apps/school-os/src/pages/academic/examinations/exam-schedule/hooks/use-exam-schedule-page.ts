import { useLocation, useParams } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { commitRecordRowUpdate } from '@pages/_shared/record-row-update'
import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  DrawerMode,
  FilterDraft,
  ScheduleColumnKey,
  ToastState
} from '@pages/academic/examinations/exam-schedule/types'
import {
  rowToForm,
  validateScheduleForm
} from '@pages/academic/examinations/exam-schedule/utils/exam-schedule'
import { toISODate } from '@pages/academic/shared/date'
import { createEntityDeleteAction } from '@pages/academic/shared/entity-delete-action'
import { filterEntityRows } from '@pages/academic/shared/entity-filter'
import { createEntityRoute } from '@pages/academic/shared/entity-route'
import { createEntityTableActions } from '@pages/academic/shared/entity-table-actions'
import { sortRows } from '@pages/academic/shared/sort'
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
import {
  emptyForm,
  examScheduleColumnOptions,
  sortOptions,
  useExamSchedule
} from '@store/useAcademic/useExamSchedule'

const {
  getBasePath: getModuleBasePath,
  getRowIdFromPath,
  updateDrawerQuery
} = createEntityRoute('/academic/examinations/exam-schedule')

const emptyFilters: FilterDraft = {
  classes: null,
  section: null,
  examName: null,
  date: null,
  subject: null,
  starttime: null,
  endtime: null,
  duration: null,
  maximum: null,
  minimum: null,
  classroom: null,
  status: null
}

const getSortLabel = (column: SortDescriptor['column']) => {
  return (
    sortOptions.find(option => option.column === column)?.label ??
    examScheduleColumnOptions.find(option => option.key === column)?.label ??
    'Sort'
  )
}

export const useExamSchedulePage = () => {
  const routeParams = useParams({ strict: false }) as { id?: string }
  const routeLocation = useLocation()
  const examScheduleQuery = useExamSchedule.list({})
  const [initialDrawer] = useState(() =>
    getEntityDrawerRouteState({
      data: examScheduleQuery.data,
      emptyForm,
      getRowIdFromPath,
      pathname: routeLocation.pathname,
      routeId: routeParams.id,
      rowToForm,
      urlMode: (routeLocation.search as Record<string, unknown>).mode
    })
  )
  const [data, setData] = useState<ClassRow[]>(examScheduleQuery.data)
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
    updateCustomDateRange,
    updateDatePreset,
    updateDateDropdownOpen
  } = useEntityDateControls(setPage)
  const [sortField, setSortField] = useState<SortDescriptor['column']>('id')
  const [sortDirection, setSortDirection] =
    useState<SortDescriptor['direction']>('descending')
  const [activeSortLabel, setActiveSortLabel] = useState(() =>
    getSortLabel('id')
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(filters)
  const [visibleColumns, setVisibleColumns] = useState<Set<ScheduleColumnKey>>(
    () => new Set(examScheduleColumnOptions.map(column => column.key))
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
  } = useEntityDrawerState<ClassFormState, ClassFormErrors>({
    clearActiveRowOnClose: false,
    clearSelectionOnClose: true,
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
        filterKeys: [
          'classes',
          'section',
          'examName',
          'date',
          'duration',
          'subject',
          'starttime',
          'endtime',
          'classroom',
          'status'
        ],
        searchKeys: [
          'id',
          'classes',
          'section',
          'examName',
          'date',
          'subject',
          'duration',
          'starttime',
          'endtime',
          'classroom',
          'status'
        ],
        searchQuery,
        matchesFilter: (key, rowValue, filterValue) =>
          key === 'date'
            ? String(rowValue).trim() === String(filterValue).trim()
            : Object.is(rowValue, filterValue)
      }),
    [activeDateRange, data, filters, searchQuery]
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
    sortRows
  })

  const selectedCount = selectedRows.length

  const showToast = useEntityToast(setToast)

  const updateTableSelection = useCallback(
    (keys: Selection) => {
      setSelectedRowKeys(keys)
    },
    [setSelectedRowKeys]
  )

  const {
    applyFilters,
    resetFilters,
    updateRowsPerPage,
    updateSearch,
    updateSortChange: updateSortDescriptor,
    updateSortDirection,
    updateSortField
  } = createEntityTableActions({
    draftFilters,
    emptyFilters,
    getSortLabel,
    setActiveSortLabel,
    setDraftFilters,
    setFilters,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    setSortDirection,
    setSortField
  })

  const updateVisibleColumns = useCallback(
    (columns: Set<ScheduleColumnKey>) => {
      setVisibleColumns(new Set(columns))
    },
    []
  )

  const clearSelection = useCallback(() => {
    setSelectedRowKeys(new Set())
  }, [setSelectedRowKeys])

  const { closeDrawer, openDrawer, setDrawerMode, toggleDrawer } =
    useEntityDrawerActions({
      clearSelectionOnClose: false,
      drawer,
      emptyForm,
      rowToForm,
      selectedRow,
      selectedRowKeys,
      sortedRows,
      setActiveRowId,
      setForm,
      setFormErrors,
      setMode,
      setSelectedRowKeys,
      updateDrawerQuery
    })

  const { goToNextRow, goToPreviousRow } = useEntityRowNavigation({
    mode,
    rowToForm,
    selectedRowIndex,
    sortedRows,
    setActiveRowId,
    setForm,
    setMode,
    updateDrawerQuery
  })

  const getScheduleUrl = useCallback(
    (row: ClassRow, nextMode: Exclude<DrawerMode, 'create'> = 'view') => {
      const url = new URL(window.location.href)
      const basePath = getModuleBasePath(url.pathname)

      url.searchParams.set('mode', nextMode)
      url.searchParams.delete('id')
      url.pathname = `${basePath}/${encodeURIComponent(row.id)}`
      url.hash = ''

      return url.toString()
    },
    []
  )

  const {
    copyClassId: copyScheduleId,
    copyClassLink: copyScheduleLink,
    copySelectedIds,
    copySelectedLinks,
    openClassPage: openSchedulePage
  } = useEntityCopyActions({
    getRowUrl: getScheduleUrl,
    mode,
    selectedRows,
    showToast
  })

  const { editSelected: editSelectedRows, deleteSelected: deleteSelectedRows } =
    useEntityBulkActions({
      activeRowId,
      closeDrawer,
      openDrawer,
      selectedRows,
      setData,
      setSelectedRowKeys,
      showToast
    })

  useEntityPageLifecycle({
    activeRowId,
    pageKey: 'exam-schedule',
    currentPage,
    data,
    drawer,
    emptyForm,
    getRowIdFromPath,
    goToNextRow,
    goToPreviousRow,
    mode,
    openDrawer,
    pageSize,
    routeId: routeParams.id,
    rowToForm,
    setActiveRowId,
    setForm,
    setFormErrors,
    setMode,
    setPage,
    setSelectedRowKeys,
    setToast,
    sortedRows,
    syncSelectionFromUrl: false,
    toast,
    toggleDrawer
  })

  const updateForm = <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => ({ ...current, [field]: undefined }))
  }

  const saveSchedule = () => {
    const date = form.date.trim()
    const maximum = form.maximum.trim()
    const minimum = form.minimum.trim()
    const subject = form.subject.trim()
    const duration = form.duration.trim()
    const classroom = form.classroom.trim()
    const classes = form.classes.trim()
    const section = form.section.trim()
    const examName = form.examName.trim()
    const starttime = form.starttime
    const endtime = form.endtime

    const errors = validateScheduleForm(form)

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (mode === 'create') {
      const now = toISODate(new Date())
      const nextNumber =
        Math.max(
          0,
          ...data.map(row => Number(row.id.replace(/\D/g, '')) || 0)
        ) + 1
      const newRows = form.scheduleRows.map((scheduleRow, index) => ({
        id: `C${String(nextNumber + index).padStart(6, '0')}`,
        classes,
        section,
        examName,
        date: scheduleRow.date.trim(),
        duration,
        subject: scheduleRow.subject.trim(),
        maximum: scheduleRow.maximum.trim(),
        minimum: scheduleRow.minimum.trim(),
        classroom: scheduleRow.classroom.trim(),
        starttime,
        endtime,
        status: form.status,
        createdAt: now,
        viewedAt: now
      }))

      setData(current => [...newRows, ...current])
      setForm(emptyForm)
      setActiveRowId(null)
      setMode('view')
      setPage(1)
      closeDrawer()
      return
    }

    if (!selectedRow) {
      return
    }

    const updatedRow: ClassRow = {
      ...selectedRow,
      classes,
      section,
      examName,
      date,
      maximum,
      subject,
      minimum,
      duration,
      classroom,
      starttime,
      endtime,
      status: form.status
    }

    commitRecordRowUpdate({
      updatedRow,
      setData,
      setActiveRowId,
      setForm,
      formFromRow: rowToForm,
      setMode
    })
    updateDrawerQuery({ id: updatedRow.id, mode: 'view' })
  }

  const deleteSchedule = createEntityDeleteAction({
    activeRowId,
    drawer,
    removeFromSelection: true,
    setActiveRowId,
    setData,
    setSelectedRowKeys,
    showToast,
    updateDrawerQuery
  })

  return {
    toast,
    toolbar: {
      activeDateLabel,
      activeSortLabel,
      datePreset,
      draftFilters,
      isCustomDateRangeOpen,
      isDateDropdownOpen,
      searchQuery,
      visibleColumns,
      setDraftFilters,
      onApplyFilters: applyFilters,
      onCustomDateRangeChange: updateCustomDateRange,
      onCustomDateRangeOpenChange: setIsCustomDateRangeOpen,
      onDateDropdownOpenChange: updateDateDropdownOpen,
      onDatePresetChange: updateDatePreset,
      onResetFilters: resetFilters,
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
      selectedCount,
      selectedKeys: tableSelectedKeys,
      rowsPerPage,
      visibleColumns,
      sortDescriptor,
      totalPages,
      totalRows: sortedRows.length,
      onBulkEdit: editSelectedRows,
      onBulkCopyIds: copySelectedIds,
      onBulkCopyLinks: copySelectedLinks,
      onBulkDelete: deleteSelectedRows,
      onClearSelection: clearSelection,
      onDelete: deleteSchedule,
      onOpenDrawer: openDrawer,
      onPageChange: setPage,
      onRowsPerPageChange: updateRowsPerPage,
      onSelectionChange: updateTableSelection,
      onSortChange: updateSortDescriptor
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
      onCopyId: copyScheduleId,
      onCopyLink: copyScheduleLink,
      onEdit: () => setDrawerMode('edit'),
      onFormChange: updateForm,
      onGoNext: goToNextRow,
      onGoPrevious: goToPreviousRow,
      onOpenPage: openSchedulePage,
      onSave: saveSchedule
    },
    onToastClose: () => setToast(null)
  }
}
