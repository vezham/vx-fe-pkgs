import { Chip } from '@vezham/react-v3'

import {
  examResultsColumnOptions,
  rowCountOptions
} from '@pages/academic/examinations/exam-results/data'
import type {
  ClassRow,
  ExamResultsColumnKey
} from '@pages/academic/examinations/exam-results/types'
import { getPaginationSummary } from '@pages/academic/examinations/exam-results/utils/exam-results'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/examinations/exam-results/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { StudentNameCell as SharedStudentNameCell } from '@pages/academic/shared/student-name-cell'

export const ExamResultsTable = createAcademicEntityTable<
  ClassRow,
  ExamResultsColumnKey
>({
  ariaLabel: 'Exam results',
  bulkAriaLabel: 'Exam results bulk actions',
  bulkEntityLabel: 'exam result',
  bulkEntityPluralLabel: 'exam results',
  classNames,
  columns: examResultsColumnOptions,
  emptyMessage: 'No results found',
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) =>
    columnKey === 'name' ? (
      <StudentNameCell row={row} />
    ) : columnKey === 'result' ? (
      <Chip
        color={row.result === 'Pass' ? 'success' : 'danger'}
        size="sm"
        variant="soft">
        <span aria-hidden="true">●</span>
        <Chip.Label>{row.result}</Chip.Label>
      </Chip>
    ) : (
      row[columnKey]
    ),
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'exam result'
})

function StudentNameCell({ row }: { row: ClassRow }) {
  return (
    <SharedStudentNameCell
      avatar={row.avatar}
      classes={classNames}
      name={row.name}
      secondaryText={getStudentSecondaryText(row)}
    />
  )
}

function getStudentSecondaryText(row: ClassRow) {
  if (row.rollNo) {
    return `Roll No : ${row.rollNo}`
  }

  if (row.email) {
    return row.email
  }

  return [row.classes, row.section].filter(Boolean).join(' - ')
}
