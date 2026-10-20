import type { ReactNode } from 'react'

import { Table } from '@vezham/react-v3'

type Column = {
  key: string
  label: string
  type?: string
  allowsSorting?: boolean
  minWidth?: number
}

export const RecordTableHeader = <ColumnValue extends Column>({
  columns,
  selectionColumnClassName,
  actionLabel,
  renderHeader
}: {
  columns: readonly ColumnValue[]
  selectionColumnClassName: string
  actionLabel: string
  renderHeader: (
    label: string,
    sortDirection?: 'ascending' | 'descending'
  ) => ReactNode
}) => (
  <Table.Header>
    <Table.Column className={selectionColumnClassName} />
    {columns.map(column => (
      <Table.Column
        key={column.key}
        allowsSorting={column.allowsSorting}
        id={column.key}
        isRowHeader={column.type === 'person'}
        style={{ minWidth: column.minWidth }}>
        {({ sortDirection }) => renderHeader(column.label, sortDirection)}
      </Table.Column>
    ))}
    <Table.Column>{actionLabel}</Table.Column>
  </Table.Header>
)
