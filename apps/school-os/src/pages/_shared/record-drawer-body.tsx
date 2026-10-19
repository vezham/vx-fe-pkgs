import type { ReactNode } from 'react'

import { Input, Label } from '@vezham/react-v3'

import { getRecordInputPlaceholder } from '@pages/_shared/table-utils'

type Column = { key: string; label: string; type?: string }
type Classes = {
  form: string
  field: string
  fieldLabel: string
  details: string
  detailLine: string
  detailLabel: string
  detailValue: string
}

export const RecordDrawerBody = <Row, ColumnValue extends Column>({
  isFormMode,
  columns,
  classes,
  form,
  row,
  renderCell,
  onFormChange
}: {
  isFormMode: boolean
  columns: readonly ColumnValue[]
  classes: Classes
  form: Record<string, string | null>
  row: Row | null
  renderCell: (row: Row, column: ColumnValue) => ReactNode
  onFormChange: (field: string, value: string) => void
}) =>
  isFormMode ? (
    <div className={classes.form}>
      {columns.map(column => (
        <div key={column.key} className={classes.field}>
          <Label className={classes.fieldLabel}>
            {column.label || column.key}
          </Label>
          <Input
            fullWidth
            placeholder={getRecordInputPlaceholder(column)}
            value={form[column.key] ?? ''}
            onChange={event => onFormChange(column.key, event.target.value)}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.details}>
      {columns.map(column => (
        <div key={column.key} className={classes.detailLine}>
          <p className={classes.detailLabel}>{column.label || column.key}</p>
          <div className={classes.detailValue}>
            {row ? renderCell(row, column) : '-'}
          </div>
        </div>
      ))}
    </div>
  )
