import {
  examScheduleColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam-schedule/data'
import type {
  ClassRow,
  ScheduleColumnKey
} from '@pages/academic/examinations/exam-schedule/types'
import { getPaginationSummary } from '@pages/academic/examinations/exam-schedule/utils/exam-schedule'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam-schedule/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'

export const ExamScheduleTable = createAcademicEntityTable<
  ClassRow,
  ScheduleColumnKey
>({
  ariaLabel: 'Schedules',
  bulkAriaLabel: 'Exam schedule bulk actions',
  bulkEntityLabel: 'schedule item',
  bulkEntityPluralLabel: 'schedule items',
  classNames,
  columns: examScheduleColumnOptions,
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
  selectionLabel: 'schedule'
})
