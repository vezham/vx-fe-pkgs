import {
  examColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam/data'
import type {
  ClassRow,
  ExamColumnKey
} from '@pages/academic/examinations/exam/types'
import { getPaginationSummary } from '@pages/academic/examinations/exam/utils/exam'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'

export const ExamTable = createAcademicEntityTable<ClassRow, ExamColumnKey>({
  ariaLabel: 'Exams',
  bulkAriaLabel: 'Exam bulk actions',
  bulkEntityLabel: 'exam',
  classNames,
  columns: examColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) => row[columnKey],
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'exam'
})
