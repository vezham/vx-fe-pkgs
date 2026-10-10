import type { ReactNode } from 'react'

import { type Selection, type SortDescriptor, Table } from '@vezham/react-v3'

import { BulkActionBar } from '@pages/academic/shared/bulk-action-bar'
import type { DrawerMode } from '@pages/academic/shared/entity-types'
import { AcademicTableBody } from '@pages/academic/shared/table-body'
import { AcademicTableEmptyState } from '@pages/academic/shared/table-empty-state'
import { AcademicTableHeader } from '@pages/academic/shared/table-header'
import { TablePaginationFooter } from '@pages/academic/shared/table-pagination-footer'

type AcademicEntityTableProps<
  Row extends { id: string },
  Key extends string
> = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: Row[]
  selectedCount: number
  selectedKeys: Selection
  rowsPerPage: string
  visibleColumns: Set<Key>
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onBulkEdit: () => void
  onBulkCopyIds: () => void
  onBulkCopyLinks: () => void
  onBulkDelete: () => void
  onDelete: (rowId: string) => void
  onOpenDrawer: (mode: DrawerMode, row: Row) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onClearSelection: () => void
  onSelectionChange: (keys: Selection) => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

type Column = {
  key: string
  label: string
  defaultWidth: number
  minWidth?: number
  maxWidth?: number
}

type FrameProps = {
  ariaLabel: string
  body: ReactNode
  bulkActions: ReactNode
  columns: readonly Column[]
  currentPage: number
  pageSize: number
  rowCountOptions: readonly string[]
  rowHeaderKey?: string | null
  rowsPerPage: string
  selectedKeys: Selection
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  visibleColumns: ReadonlySet<string>
  classNames: {
    tableContent: string
    selectionColumn: string
    sortableHeader: string
    rowsControls: string
  }
  getPaginationSummary: (page: number, size: number, total: number) => string
  onPageChange: (value: number | ((current: number) => number)) => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSelectionChange: (keys: Selection) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

const AcademicEntityTableFrame = ({
  ariaLabel,
  body,
  bulkActions,
  columns,
  currentPage,
  pageSize,
  rowCountOptions,
  rowHeaderKey = 'id',
  rowsPerPage,
  selectedKeys,
  sortDescriptor,
  totalPages,
  totalRows,
  visibleColumns,
  classNames,
  getPaginationSummary,
  onPageChange,
  onRowsPerPageChange,
  onSelectionChange,
  onSortChange
}: FrameProps) => {
  const tableMinWidth =
    48 +
    132 +
    columns.reduce(
      (total, column) =>
        total + (visibleColumns.has(column.key) ? column.defaultWidth : 0),
      0
    )

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.ResizableContainer>
          <Table.Content
            aria-label={ariaLabel}
            className={classNames.tableContent}
            style={{ minWidth: `${tableMinWidth}px` }}
            selectedKeys={selectedKeys}
            selectionBehavior="toggle"
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={onSelectionChange}
            onSortChange={onSortChange}>
            <AcademicTableHeader
              columns={columns}
              rowHeaderKey={rowHeaderKey ?? undefined}
              selectionColumnClassName={classNames.selectionColumn}
              sortableHeaderClassName={classNames.sortableHeader}
              visibleColumns={visibleColumns}
            />
            {body}
          </Table.Content>
        </Table.ResizableContainer>
      </Table.ScrollContainer>

      <TablePaginationFooter
        currentPage={currentPage}
        rowCountOptions={rowCountOptions}
        rowsControlsClassName={classNames.rowsControls}
        rowsPerPage={rowsPerPage}
        summary={getPaginationSummary(currentPage, pageSize, totalRows)}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />

      {bulkActions}
    </Table>
  )
}

type TableConfig<Row extends { id: string }, Key extends string> = {
  ariaLabel: string
  bulkAriaLabel: string
  bulkEntityLabel?: string
  bulkEntityPluralLabel?: string
  classNames: FrameProps['classNames'] & {
    emptyState: string
    emptyIcon: string
    emptyText: string
  }
  columns: readonly (Column & { key: Key })[]
  emptyMessage?: string
  getPaginationSummary: FrameProps['getPaginationSummary']
  getRowClassName: (isActive: boolean) => string
  renderCell: (row: Row, key: Key) => ReactNode
  rowCountOptions: readonly string[]
  rowDataAttribute?: `data-${string}`
  rowHeaderKey?: string | null
  selectionLabel?: string
}

export const createAcademicEntityTable = <
  Row extends { id: string },
  Key extends string
>(
  config: TableConfig<Row, Key>
) => {
  return (props: AcademicEntityTableProps<Row, Key>) => (
    <AcademicEntityTableFrame
      ariaLabel={config.ariaLabel}
      body={
        <AcademicTableBody
          activeRowId={props.activeRowId}
          columns={config.columns}
          emptyState={
            <AcademicTableEmptyState
              classes={config.classNames}
              message={config.emptyMessage}
            />
          }
          getRowClassName={config.getRowClassName}
          rows={props.rows}
          rowDataAttribute={config.rowDataAttribute}
          selectionLabel={config.selectionLabel ?? 'schedule'}
          visibleColumns={props.visibleColumns}
          renderCell={config.renderCell}
          onOpenRow={row => props.onOpenDrawer('view', row)}
        />
      }
      bulkActions={
        <BulkActionBar
          ariaLabel={config.bulkAriaLabel}
          deleteLabel="Delete"
          editLabel="Edit"
          entityLabel={config.bulkEntityLabel}
          entityPluralLabel={config.bulkEntityPluralLabel}
          selectedCount={props.selectedCount}
          onClearSelection={props.onClearSelection}
          onCopyIds={props.onBulkCopyIds}
          onCopyLinks={props.onBulkCopyLinks}
          onDelete={props.onBulkDelete}
          onEdit={props.onBulkEdit}
        />
      }
      columns={config.columns}
      currentPage={props.currentPage}
      pageSize={props.pageSize}
      rowCountOptions={config.rowCountOptions}
      rowHeaderKey={config.rowHeaderKey}
      rowsPerPage={props.rowsPerPage}
      selectedKeys={props.selectedKeys}
      sortDescriptor={props.sortDescriptor}
      totalPages={props.totalPages}
      totalRows={props.totalRows}
      visibleColumns={props.visibleColumns}
      classNames={config.classNames}
      getPaginationSummary={config.getPaginationSummary}
      onPageChange={props.onPageChange}
      onRowsPerPageChange={props.onRowsPerPageChange}
      onSelectionChange={props.onSelectionChange}
      onSortChange={props.onSortChange}
    />
  )
}
