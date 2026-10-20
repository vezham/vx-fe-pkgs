import { useCallback, useEffect, useMemo } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  ArrowRightUp as ArrowRightUpIcon,
  Copy as CopyIcon,
  Link as LinkIcon,
  SortVertical as SortVerticalIcon
} from '@vezham/icons-react'
import {
  Button,
  Chip,
  Drawer,
  Dropdown,
  type Selection,
  type SortDescriptor,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { copyRecordValue } from '@pages/_shared/clipboard'
import { PageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { DrawerEditAction } from '@pages/_shared/drawer-edit-action'
import { DrawerToggle } from '@pages/_shared/drawer-toggle'
import { createFilterActions } from '@pages/_shared/filter-actions'
import { RecordDrawerBody } from '@pages/_shared/record-drawer-body'
import { RecordDrawerFooter } from '@pages/_shared/record-drawer-footer'
import { RecordDrawerFrame } from '@pages/_shared/record-drawer-frame'
import { RecordDrawerNavigation } from '@pages/_shared/record-drawer-navigation'
import { RecordFilterDropdown as FilterDropdown } from '@pages/_shared/record-filter-dropdown'
import { createRecordRowActions } from '@pages/_shared/record-row-actions'
import { saveExistingRecordRow } from '@pages/_shared/record-row-update'
import { RecordSearchField } from '@pages/_shared/record-search-field'
import {
  RecordPersonCell,
  RecordTableEmptyState
} from '@pages/_shared/record-table-cells'
import { RecordTableHeader } from '@pages/_shared/record-table-header'
import { RecordTableShell } from '@pages/_shared/record-table-shell'
import { RecordToastLayer } from '@pages/_shared/record-toast-layer'
import { RowCountControl } from '@pages/_shared/row-count-control'
import {
  filterRecordRows,
  getRecordDrawerTitle as getDrawerTitle,
  getPresetDateRange,
  getRecordSearchText,
  getRecordSortValue,
  isPersonValue,
  recordRowToForm,
  sortRecordRows,
  toISODate
} from '@pages/_shared/table-utils'
import {
  useRecordDrawerToggle,
  useRecordRowNavigation,
  useRecordTableInteractions
} from '@pages/_shared/use-record-interactions'
import { useRecordTableState } from '@pages/_shared/use-record-table-state'
import { useRecordTableViewState } from '@pages/_shared/use-record-table-view-state'

import type {
  AttendancePageConfig,
  AttendanceStatus,
  DatePresetKey,
  DrawerMode,
  DrawerQueryState,
  FilterDraft,
  ReportColumn,
  ReportRow,
  SortableHeaderProps
} from './types'
import { useDisclosure } from './types'
import { classNames, getTableRowClassName } from './variant'

const getSearchText = getRecordSearchText
const getSortValue = (value: unknown) => getRecordSortValue(value, true)
const rowToForm = (row: ReportRow, columns: ReportColumn[]): FilterDraft =>
  recordRowToForm(row, columns, true)

type Props = {
  config: AttendancePageConfig
  dateOptions: { key: DatePresetKey; label: string }[]
  rowCountOptions: string[]
  statusLegend: {
    status: AttendanceStatus
    label: string
    icon: string
  }[]
}

const ReportTablePage = (props: Props) => {
  const model = useReportTableModel(props)

  return <ReportTableView {...props} {...model} />
}

const useReportTableModel = ({ config }: Props) => {
  const {
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
    setData,
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
  } = useRecordTableState(config, useDisclosure, 'view' as DrawerMode)

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const editableColumns = useMemo(
    () =>
      config.columns.filter(
        column => column.type !== 'marker' && column.type !== 'percent'
      ),
    [config.columns]
  )

  const filteredRows = useMemo(
    () =>
      filterRecordRows(
        data,
        config.columns,
        config.filters,
        filters,
        activeDateRange,
        searchQuery,
        getSearchText,
        getSortValue,
        'attendance'
      ),
    [
      activeDateRange,
      config.columns,
      config.filters,
      data,
      filters,
      searchQuery
    ]
  )

  const sortedRows = useMemo(
    () => sortRecordRows(filteredRows, sortDescriptor, getSortValue, false),
    [filteredRows, sortDescriptor]
  )

  const {
    activeDateLabel,
    activeSortLabel,
    currentPage,
    pageSize,
    paginatedRows,
    selectedRow,
    selectedRowIndex,
    tableSelectedKeys,
    totalPages
  } = useRecordTableViewState({
    activeRowId,
    customDateRange,
    data,
    datePreset,
    page,
    rowsPerPage,
    selectedRowKeys,
    sortDescriptor,
    sortOptions: config.sortOptions,
    sortedRows
  })

  const updateDrawerQuery = useCallback(
    (nextState: DrawerQueryState | null, replace = false) => {
      const url = new URL(window.location.href)

      if (nextState) {
        url.searchParams.set('id', nextState.id)
        url.searchParams.set('mode', nextState.mode)
      } else {
        url.searchParams.delete('id')
        url.searchParams.delete('mode')
      }

      window.history[replace ? 'replaceState' : 'pushState'](
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      )
    },
    []
  )

  const openDrawer = useCallback(
    (nextMode: DrawerMode, row: ReportRow, replaceUrl = false) => {
      setMode(nextMode)
      setActiveRowId(row.id)
      setForm(rowToForm(row, editableColumns))
      drawer.onOpen()
      updateDrawerQuery({ id: row.id, mode: nextMode }, replaceUrl)
    },
    [
      drawer,
      editableColumns,
      setActiveRowId,
      setForm,
      setMode,
      updateDrawerQuery
    ]
  )

  const closeDrawer = useCallback(() => {
    drawer.onClose()
    setActiveRowId(null)
    updateDrawerQuery(null)
  }, [drawer, setActiveRowId, updateDrawerQuery])

  const toggleDrawer = useRecordDrawerToggle({
    isOpen: drawer.isOpen,
    closeDrawer,
    selectedRowKeys,
    sortedRows,
    onSelected: row => openDrawer('view', row, true)
  })

  const updateTableSelection = useCallback(
    (keys: Selection) => {
      setSelectedRowKeys(keys)
    },
    [setSelectedRowKeys]
  )

  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (nextRow) {
        openDrawer(mode, nextRow, true)
      }
    },
    [mode, openDrawer, sortedRows]
  )

  const { goToNextRow, goToPreviousRow } = useRecordRowNavigation(
    selectedRowIndex,
    sortedRows.length,
    goToRowAt
  )

  useEffect(() => {
    const syncDrawerFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('id')
      const urlMode = params.get('mode')

      if (!id || (urlMode !== 'view' && urlMode !== 'edit')) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      const row = data.find(item => item.id === id)

      if (row) {
        openDrawer(urlMode, row, true)
      }
    }

    syncDrawerFromUrl()
    window.addEventListener('popstate', syncDrawerFromUrl)

    return () => window.removeEventListener('popstate', syncDrawerFromUrl)
  }, [data, drawer, openDrawer, setActiveRowId])

  useRecordTableInteractions({
    activeRowId,
    currentPage,
    drawerOpen: drawer.isOpen,
    enableRowHotkeys: true,
    goToNextRow,
    goToPreviousRow,
    pageSize,
    rowAttribute: 'data-report-row-id',
    rows: sortedRows,
    setPage,
    setToast,
    toast,
    toggleDrawer
  })

  const updateSortDescriptor = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor)
    setPage(1)
  }

  const { applyFilters, resetFilters } = createFilterActions({
    draftFilters,
    emptyFilters,
    setDraftFilters,
    setFilters,
    setPage
  })

  const saveRow = () => {
    const updatedRow = saveExistingRecordRow({
      selectedRow,
      form,
      columns: editableColumns,
      toRow: formToRow,
      setData,
      setActiveRowId,
      setForm,
      formFromRow: row => rowToForm(row, editableColumns),
      setMode
    })
    if (!updatedRow) return
    updateDrawerQuery({ id: updatedRow.id, mode: 'view' }, true)
    setToast({ message: 'Item updated', status: 'success' })
  }

  const deleteRow = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))

    if (activeRowId === rowId) {
      closeDrawer()
    }

    setToast({ message: 'Item deleted', status: 'success' })
  }

  const getRowUrl = (
    row: ReportRow,
    nextMode: Exclude<DrawerMode, 'edit'> | DrawerMode = 'view'
  ) => {
    const url = new URL(window.location.href)

    url.searchParams.set('id', row.id)
    url.searchParams.set('mode', nextMode)
    url.hash = ''

    return url.toString()
  }

  const copyRowLink = (row: ReportRow) => {
    copyRecordValue(getRowUrl(row, mode), 'URL', setToast)
  }

  const copyRowId = (row: ReportRow) => {
    copyRecordValue(row.id, 'ID', setToast)
  }

  const openRowPage = (row: ReportRow) => {
    window.open(getRowUrl(row), '_blank', 'noopener,noreferrer')
  }

  return {
    activeDateLabel,
    activeRowId,
    activeSortLabel,
    applyFilters,
    closeDrawer,
    copyRowId,
    copyRowLink,
    currentPage,
    customDateRange,
    datePreset,
    deleteRow,
    draftFilters,
    drawer,
    editableColumns,
    filters,
    form,
    goToNextRow,
    goToPreviousRow,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    mode,
    openDrawer,
    openRowPage,
    pageSize,
    paginatedRows,
    resetFilters,
    rowsPerPage,
    saveRow,
    searchQuery,
    selectedRow,
    selectedRowIndex,
    setDraftFilters,
    setForm,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    setMode,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    setSortDescriptor,
    setToast,
    sortDescriptor,
    sortedRows,
    tableSelectedKeys,
    toast,
    totalPages,
    updateCustomDateRange,
    updateDatePreset,
    updateSortDescriptor,
    updateTableSelection
  }
}

type ReportTableViewProps = Props & ReturnType<typeof useReportTableModel>

const ReportTableView = (props: ReportTableViewProps) => {
  return (
    <section className={classNames.page}>
      <ReportToolbar {...props} />
      <ReportResultsTable {...props} />
      <ReportDrawerLayer {...props} />
    </section>
  )
}

const ReportToolbar = ({
  config,
  dateOptions,
  rowCountOptions,
  statusLegend,
  ...model
}: ReportTableViewProps) => {
  const {
    activeDateLabel,
    activeSortLabel,
    applyFilters,
    datePreset,
    draftFilters,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    resetFilters,
    rowsPerPage,
    searchQuery,
    setDraftFilters,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    setPage,
    setRowsPerPage,
    setSearchQuery,
    updateCustomDateRange,
    updateDatePreset,
    updateSortDescriptor
  } = model

  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Reports</p>
          <h1 className={classNames.title}>{config.title}</h1>
        </div>

        <div className={classNames.toolbarActions}>
          <PageDateRangeDropdown
            activeDateLabel={activeDateLabel}
            ariaLabel="Schedule custom date range"
            classes={classNames}
            closeCustomOnDismiss
            dateOptions={dateOptions}
            datePreset={datePreset}
            isCustomDateRangeOpen={isCustomDateRangeOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            onCustomDateRangeChange={updateCustomDateRange}
            onCustomDateRangeOpenChange={setIsCustomDateRangeOpen}
            onDateDropdownOpenChange={setIsDateDropdownOpen}
            onDatePresetChange={updateDatePreset}
          />

          <FilterDropdown
            classes={classNames}
            showPlaceholder
            draftFilters={draftFilters}
            filters={config.filters}
            setDraftFilters={setDraftFilters}
            onApply={applyFilters}
            onReset={resetFilters}
          />

          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="outline">
                <SortVerticalIcon size={16} aria-hidden="true" />
                Sort by {activeSortLabel}
                <AltArrowDownIcon size={16} aria-hidden="true" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu aria-label={`Sort ${config.title}`}>
                {config.sortOptions.map(option => (
                  <Dropdown.Item
                    key={option.key}
                    id={option.key}
                    textValue={option.label}
                    onPress={() => updateSortDescriptor(option.descriptor)}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>

      <div className={classNames.headerRow}>
        <RowCountControl
          className={classNames.rowsControls}
          options={rowCountOptions}
          value={rowsPerPage}
          onChange={value => {
            setRowsPerPage(value)
            setPage(1)
          }}
        />

        <div className={classNames.controlsRight}>
          {config.showStatusLegend && <StatusLegend items={statusLegend} />}
          <RecordSearchField
            title={config.title}
            value={searchQuery}
            onChange={value => {
              setSearchQuery(value)
              setPage(1)
            }}
          />
        </div>
      </div>
    </Surface>
  )
}

const ReportResultsTable = ({ config, ...model }: ReportTableViewProps) => {
  const {
    activeRowId,
    currentPage,
    deleteRow,
    openDrawer,
    pageSize,
    paginatedRows,
    setPage,
    sortedRows,
    sortDescriptor,
    tableSelectedKeys,
    totalPages,
    updateSortDescriptor,
    updateTableSelection
  } = model

  return (
    <RecordTableShell
      contentProps={{
        'aria-label': config.ariaLabel,
        className: classNames.tableContent,
        selectedKeys: tableSelectedKeys,
        selectionMode: 'multiple',
        sortDescriptor,
        style: { minWidth: config.tableMinWidth },
        onSelectionChange: updateTableSelection,
        onSortChange: updateSortDescriptor
      }}
      header={
        <RecordTableHeader
          columns={config.columns}
          selectionColumnClassName={classNames.selectionColumn}
          actionLabel="Actions"
          renderHeader={(columnLabel, sortDirection) => (
            <SortableHeader sortDirection={sortDirection}>
              {columnLabel}
            </SortableHeader>
          )}
        />
      }
      bodyProps={{
        activeRowId,
        classes: classNames,
        columns: config.columns,
        emptyState: <TableEmptyState />,
        getRowClassName: getTableRowClassName,
        rowDataAttribute: 'data-report-row-id',
        rows: paginatedRows,
        renderCell: (row, column) => <ReportCell column={column} row={row} />,
        ...createRecordRowActions<ReportRow>(deleteRow, openDrawer)
      }}
      paginationProps={{
        className: classNames.paginationFooter,
        currentPage,
        pageSize,
        totalItems: sortedRows.length,
        totalPages,
        onPageChange: setPage
      }}
    />
  )
}

const ReportDrawerLayer = ({ ...model }: ReportTableViewProps) => {
  const {
    closeDrawer,
    copyRowId,
    copyRowLink,
    drawer,
    editableColumns,
    form,
    goToNextRow,
    goToPreviousRow,
    mode,
    openRowPage,
    saveRow,
    selectedRow,
    selectedRowIndex,
    setForm,
    setMode,
    setToast,
    sortedRows,
    toast
  } = model

  return (
    <>
      <AttendanceDrawer
        columns={editableColumns}
        form={form}
        mode={mode}
        row={selectedRow}
        canGoNext={
          selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1
        }
        canGoPrevious={selectedRowIndex > 0}
        drawerState={drawer}
        onCancel={closeDrawer}
        onClose={closeDrawer}
        onEdit={() => setMode('edit')}
        onFormChange={(field, value) =>
          setForm(current => ({ ...current, [field]: value }))
        }
        onGoNext={goToNextRow}
        onGoPrevious={goToPreviousRow}
        onCopyId={copyRowId}
        onCopyLink={copyRowLink}
        onOpenPage={openRowPage}
        onSave={saveRow}
      />

      <RecordToastLayer
        className={classNames.toast}
        toast={toast}
        onClose={() => setToast(null)}
      />
    </>
  )
}

export { ReportTablePage }

function StatusLegend({ items }: { items: Props['statusLegend'] }) {
  return (
    <div className={classNames.legend}>
      {items.map(item => (
        <Button key={item.label} variant="outline">
          <AttendanceMarker status={item.status} />
          {item.label}
        </Button>
      ))}
    </div>
  )
}

function ReportCell({ column, row }: { column: ReportColumn; row: ReportRow }) {
  const value = row[column.key]

  if (column.type === 'person') {
    return <PersonCell value={value} />
  }

  if (column.type === 'link') {
    return <span className={classNames.link}>{String(value)}</span>
  }

  if (column.type === 'status') {
    return <StatusChip status={String(value) as AttendanceStatus} />
  }

  if (column.type === 'badge') {
    return <StatusBadge value={String(value)} />
  }

  if (column.type === 'grade') {
    return (
      <span className={String(value) === 'F' ? classNames.gradeDanger : ''}>
        {String(value)}
      </span>
    )
  }

  if (column.type === 'percent') {
    const percent = Number(value)

    return (
      <span
        className={classNames.percentBadge}
        style={{ backgroundColor: percent < 50 ? '#f12c58' : '#156fe3' }}>
        {String(value)}
      </span>
    )
  }

  if (column.type === 'marker') {
    return <AttendanceMarker status={String(value) as AttendanceStatus} />
  }

  return <span>{String(value)}</span>
}

function PersonCell({ value }: { value: unknown }) {
  return (
    <RecordPersonCell
      value={value}
      secondaryKey="description"
      classes={{
        personCell: classNames.personCell,
        personAvatar: classNames.personAvatar,
        personText: classNames.personText,
        personName: classNames.personName,
        personSecondary: classNames.personDescription
      }}
    />
  )
}

function StatusBadge({ value }: { value: string }) {
  const isDanger =
    value === 'Inactive' || value === 'Rejected' || value === 'Overdue'
  const isWarning = value === 'Pending'
  const color = isDanger ? '#f12c58' : isWarning ? '#d97706' : '#21bf32'
  const background = isDanger ? '#ffe7ec' : isWarning ? '#fff4d6' : '#e9faea'

  return (
    <span
      className={classNames.badge}
      style={{ color, backgroundColor: background }}>
      <span
        className={classNames.badgeDot}
        style={{ backgroundColor: color }}
      />
      {value}
    </span>
  )
}

function StatusChip({ status }: { status: AttendanceStatus }) {
  return (
    <Chip color={getAttendanceChipColor(status)} size="sm" variant="soft">
      <span aria-hidden="true">●</span>
      <Chip.Label>{status}</Chip.Label>
    </Chip>
  )
}

function AttendanceMarker({ status }: { status: AttendanceStatus }) {
  return (
    <span
      aria-label={status}
      className={classNames.marker}
      style={{ backgroundColor: getStatusHex(status) }}
    />
  )
}

function SortableHeader({ children, sortDirection }: SortableHeaderProps) {
  return (
    <span className={classNames.sortableHeader}>
      {children.split('\n').map(line => (
        <span key={line}>{line}</span>
      ))}
      {sortDirection && <SortVerticalIcon size={12} aria-hidden="true" />}
    </span>
  )
}

function TableEmptyState() {
  return <RecordTableEmptyState classes={classNames} />
}

function AttendanceDrawer({
  columns,
  drawerState,
  form,
  mode,
  row,
  canGoNext,
  canGoPrevious,
  onCancel,
  onClose,
  onEdit,
  onFormChange,
  onGoNext,
  onGoPrevious,
  onCopyId,
  onCopyLink,
  onOpenPage,
  onSave
}: {
  columns: ReportColumn[]
  drawerState: ReturnType<typeof useDisclosure>
  form: FilterDraft
  mode: DrawerMode
  row: ReportRow | null
  canGoNext: boolean
  canGoPrevious: boolean
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onFormChange: (field: string, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onCopyId: (row: ReportRow) => void
  onCopyLink: (row: ReportRow) => void
  onOpenPage: (row: ReportRow) => void
  onSave: () => void
}) {
  return (
    <RecordDrawerFrame state={drawerState} className={classNames.drawerDialog}>
      <Drawer.Header className={classNames.drawerHeader}>
        <div className={classNames.drawerHeaderRow}>
          <div className={classNames.drawerTitleGroup}>
            <DrawerToggle onPress={onClose} />
            <h2 className={classNames.drawerTitle}>
              {row ? getDrawerTitle(row) : ''}
            </h2>
            {row && (
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <Button
                    isIconOnly
                    aria-label={`Copy ID ${row.id}`}
                    variant="ghost"
                    onPress={() => onCopyId(row)}>
                    <CopyIcon size={16} aria-hidden="true" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Copy</Tooltip.Content>
              </Tooltip>
            )}
          </div>
          <div className={classNames.drawerActions}>
            {row && (
              <>
                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <Button
                      isIconOnly
                      aria-label={`Copy URL for ${row.id}`}
                      variant="secondary"
                      onPress={() => onCopyLink(row)}>
                      <LinkIcon size={16} aria-hidden="true" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Copy clipboard</Tooltip.Content>
                </Tooltip>
                <DrawerEditAction
                  ariaLabel={`Edit ${row.id}`}
                  onPress={onEdit}
                />
                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <Button
                      isIconOnly
                      aria-label={`Open ${row.id}`}
                      variant="secondary"
                      onPress={() => onOpenPage(row)}>
                      <ArrowRightUpIcon size={16} aria-hidden="true" />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Open ↗</Tooltip.Content>
                </Tooltip>
              </>
            )}
            <RecordDrawerNavigation
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              variant="ghost"
              onGoNext={onGoNext}
              onGoPrevious={onGoPrevious}
            />
          </div>
        </div>
      </Drawer.Header>

      <Drawer.Body className={classNames.drawerBody}>
        <RecordDrawerBody
          isFormMode={mode === 'edit'}
          columns={columns}
          classes={classNames}
          form={form}
          row={row}
          renderCell={(item, column) => (
            <ReportCell column={column} row={item} />
          )}
          onFormChange={onFormChange}
        />
      </Drawer.Body>

      <Drawer.Footer className={classNames.drawerFooter}>
        <RecordDrawerFooter
          isFormMode={mode === 'edit'}
          formActionsClassName={classNames.drawerFormFooterActions}
          viewActionsClassName={classNames.drawerViewFooterActions}
          flexOneClassName={classNames.flexOne}
          onCancel={onCancel}
          onClose={onClose}
          onEdit={onEdit}
          onSave={onSave}
        />
      </Drawer.Footer>
    </RecordDrawerFrame>
  )
}

function formToRow(
  row: ReportRow,
  form: FilterDraft,
  columns: ReportColumn[]
): ReportRow {
  return columns.reduce<ReportRow>(
    (draft, column) => {
      const original = row[column.key]
      const value = form[column.key] ?? ''

      if (typeof original === 'number') {
        draft[column.key] = Number(value)
      } else if (isPersonValue(original)) {
        draft[column.key] = { ...original, name: value }
      } else {
        draft[column.key] = value
      }

      return draft
    },
    { ...row, viewedAt: toISODate(new Date()) }
  )
}

function getStatusHex(status: AttendanceStatus) {
  if (status === 'Absent') {
    return '#f12c58'
  }

  if (status === 'Late') {
    return '#21c1ed'
  }

  if (status === 'Half Day' || status === 'Halfday') {
    return '#111426'
  }

  if (status === 'Holiday') {
    return '#156fe3'
  }

  return '#21bf32'
}

function getAttendanceChipColor(
  status: AttendanceStatus | string
): 'danger' | 'default' | 'success' | 'warning' {
  if (status === 'Absent') {
    return 'danger'
  }

  if (status === 'Leave' || status === 'Late') {
    return 'warning'
  }

  if (status === 'Holiday' || status === 'Half Day' || status === 'Halfday') {
    return 'default'
  }

  return 'success'
}
