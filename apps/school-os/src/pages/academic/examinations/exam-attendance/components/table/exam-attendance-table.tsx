import {
  attendanceColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam-attendance/data'
import type {
  AttendanceColumnKey,
  AttendanceRow,
  AttendanceStatus
} from '@pages/academic/examinations/exam-attendance/types'
import {
  getPaginationSummary,
  getStudentSecondaryText
} from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam-attendance/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { StudentNameCell as SharedStudentNameCell } from '@pages/academic/shared/student-name-cell'

export const ExamAttendanceTable = createAcademicEntityTable<
  AttendanceRow,
  AttendanceColumnKey
>({
  ariaLabel: 'Exam attendance',
  bulkAriaLabel: 'Exam attendance bulk actions',
  bulkEntityLabel: 'attendance item',
  bulkEntityPluralLabel: 'attendance items',
  classNames,
  columns: attendanceColumnOptions,
  emptyMessage: 'No attendance found',
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) =>
    columnKey === 'id' ? (
      row.id
    ) : columnKey === 'name' ? (
      <StudentNameCell row={row} />
    ) : (
      <AttendanceMarker status={row[columnKey] as AttendanceStatus} />
    ),
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'attendance',
  rowDataAttribute: 'data-attendance-row-id'
})

function StudentNameCell({ row }: { row: AttendanceRow }) {
  return (
    <SharedStudentNameCell
      avatar={row.avatar}
      classes={classNames}
      name={row.name}
      secondaryText={getStudentSecondaryText(row)}
    />
  )
}

function AttendanceMarker({ status }: { status: AttendanceStatus }) {
  const colorClass =
    status === 'Present'
      ? 'bg-success'
      : status === 'Absent'
        ? 'bg-danger'
        : 'bg-[#14b8e6]'

  return (
    <span
      aria-label={status}
      className={`${classNames.attendanceMarker} ${colorClass}`}
      role="img"
    />
  )
}
