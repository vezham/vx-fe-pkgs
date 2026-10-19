import { classroomColumnOptions } from '@pages/academic/classroom/data'
import type {
  ClassRow,
  ClassroomColumnKey
} from '@pages/academic/classroom/types'
import { getPaginationSummary } from '@pages/academic/classroom/utils/classroom'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classroom/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'
import { rowCountOptions } from '@store/useAcademic/options'

export const ClassroomTable = createAcademicEntityTable<
  ClassRow,
  ClassroomColumnKey
>({
  ariaLabel: 'Classroom',
  bulkAriaLabel: 'Classroom bulk actions',
  bulkEntityLabel: 'classroom',
  classNames,
  columns: classroomColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) =>
    columnKey === 'status' ? (
      <AcademicStatusChip status={row.status} />
    ) : (
      row[columnKey]
    ),
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'classroom'
})
