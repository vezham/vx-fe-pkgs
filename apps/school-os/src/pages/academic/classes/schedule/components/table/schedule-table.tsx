import type {
  ClassRow,
  ScheduleColumnKey
} from '@pages/academic/classes/schedule/types'
import { getPaginationSummary } from '@pages/academic/classes/schedule/utils/schedule'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classes/schedule/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'
import {
  rowCountOptions,
  scheduleColumnOptions
} from '@store/useAcademic/useClassSchedule/data'

export const ScheduleTable = createAcademicEntityTable<
  ClassRow,
  ScheduleColumnKey
>({
  ariaLabel: 'Schedules',
  bulkAriaLabel: 'Schedule bulk actions',
  classNames,
  columns: scheduleColumnOptions,
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
