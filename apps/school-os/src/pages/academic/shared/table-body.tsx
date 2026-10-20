import type { ReactNode } from 'react'

import { Checkbox, Table } from '@vezham/react-v3'

type Column<Key extends string> = { key: Key }
type Row = { id: string }

type Props<RowValue extends Row, Key extends string> = {
  activeRowId: string | null
  columns: readonly Column<Key>[]
  emptyState: ReactNode
  rows: readonly RowValue[]
  rowDataAttribute?: `data-${string}`
  selectionLabel: string
  visibleColumns: ReadonlySet<string>
  getRowClassName: (isActive: boolean) => string
  renderCell: (row: RowValue, key: Key) => ReactNode
  onOpenRow: (row: RowValue) => void
}

export const AcademicTableBody = <RowValue extends Row, Key extends string>({
  activeRowId,
  columns,
  emptyState,
  rows,
  rowDataAttribute = 'data-class-row-id',
  selectionLabel,
  visibleColumns,
  getRowClassName,
  renderCell,
  onOpenRow
}: Props<RowValue, Key>) => (
  <Table.Body renderEmptyState={() => emptyState}>
    {rows.map(row => (
      <Table.Row
        key={row.id}
        id={row.id}
        {...{ [rowDataAttribute]: row.id }}
        className={getRowClassName(activeRowId === row.id)}>
        <Table.Cell>
          <Checkbox
            aria-label={`Select ${selectionLabel} ${row.id}`}
            slot="selection"
            onClick={event => event.stopPropagation()}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
        </Table.Cell>
        {columns
          .filter(column => visibleColumns.has(column.key))
          .map(column => (
            <Table.Cell
              key={column.key}
              onPointerDown={event => event.stopPropagation()}
              onClick={event => {
                event.stopPropagation()
                onOpenRow(row)
              }}>
              {renderCell(row, column.key)}
            </Table.Cell>
          ))}
      </Table.Row>
    ))}
  </Table.Body>
)
