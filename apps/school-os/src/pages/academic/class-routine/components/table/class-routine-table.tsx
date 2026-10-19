import type {
  ClassRoutineColumnKey,
  ClassRow
} from '@pages/academic/class-routine/types'
import { getPaginationSummary } from '@pages/academic/class-routine/utils/class-routine'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/class-routine/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import {
  classRoutineColumnOptions,
  rowCountOptions
} from '@store/useAcademic/useClassRoutine'

export const ClassRoutineTable = createAcademicEntityTable<
  ClassRow,
  ClassRoutineColumnKey
>({
  ariaLabel: 'Class routine',
  bulkAriaLabel: 'Class routine bulk actions',
  bulkEntityLabel: 'class routine',
  classNames,
  columns: classRoutineColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) => row[columnKey],
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'schedule'
})
