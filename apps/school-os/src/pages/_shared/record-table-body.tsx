import type { ReactNode } from 'react'

import {
  Eye as EyeIcon,
  MenuDots as MenuDotsIcon,
  Pen as PenIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { Button, Checkbox, Dropdown, Table } from '@vezham/react-v3'

type Row = { id: string }
type Column = { key: string }
type Classes = {
  dangerIcon: string
  menuItemLabel: string
  rowActions: string
}

export type RecordTableBodyProps<
  RowValue extends Row,
  ColumnValue extends Column
> = {
  activeRowId: string | null
  classes: Classes
  columns: readonly ColumnValue[]
  emptyState: ReactNode
  rowDataAttribute: string
  rows: readonly RowValue[]
  getRowClassName: (isActive: boolean) => string
  renderCell: (row: RowValue, column: ColumnValue) => ReactNode
  onDelete: (row: RowValue) => void
  onEdit: (row: RowValue) => void
  onView: (row: RowValue) => void
}

export const RecordTableBody = <
  RowValue extends Row,
  ColumnValue extends Column
>({
  activeRowId,
  classes,
  columns,
  emptyState,
  rowDataAttribute,
  rows,
  getRowClassName,
  renderCell,
  onDelete,
  onEdit,
  onView
}: RecordTableBodyProps<RowValue, ColumnValue>) => (
  <Table.Body renderEmptyState={() => emptyState}>
    {rows.map(row => (
      <Table.Row
        key={row.id}
        id={row.id}
        {...{ [rowDataAttribute]: row.id }}
        className={getRowClassName(activeRowId === row.id)}
        onAction={() => onView(row)}>
        <Table.Cell>
          <Checkbox
            aria-label={`Select ${row.id}`}
            slot="selection"
            onClick={event => event.stopPropagation()}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
          </Checkbox>
        </Table.Cell>
        {columns.map(column => (
          <Table.Cell key={column.key}>{renderCell(row, column)}</Table.Cell>
        ))}
        <Table.Cell>
          <div className={classes.rowActions}>
            <Button
              isIconOnly
              aria-label={`Edit ${row.id}`}
              variant="ghost"
              onPress={() => onEdit(row)}>
              <PenIcon size={16} aria-hidden="true" />
            </Button>
            <Button
              isIconOnly
              aria-label={`Delete ${row.id}`}
              variant="outline"
              onPress={() => onDelete(row)}>
              <TrashBinTrashIcon
                className={classes.dangerIcon}
                size={16}
                aria-hidden="true"
              />
            </Button>
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  isIconOnly
                  aria-label={`More actions for ${row.id}`}
                  variant="ghost">
                  <MenuDotsIcon size={18} aria-hidden="true" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu aria-label={`Actions for ${row.id}`}>
                  <Dropdown.Item
                    id="view"
                    textValue="View"
                    onPress={() => onView(row)}>
                    <span className={classes.menuItemLabel}>
                      <EyeIcon size={16} aria-hidden="true" />
                      View
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
)
