import {
  gradeColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/grades/data'
import type {
  ClassRow,
  GradeColumnKey
} from '@pages/academic/examinations/grades/types'
import { getPaginationSummary } from '@pages/academic/examinations/grades/utils/grades'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/grades/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'

export const GradesTable = createAcademicEntityTable<ClassRow, GradeColumnKey>({
  ariaLabel: 'Grades',
  bulkAriaLabel: 'Grades bulk actions',
  bulkEntityLabel: 'grade item',
  bulkEntityPluralLabel: 'grade items',
  classNames,
  columns: gradeColumnOptions,
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
  selectionLabel: 'grade'
})
