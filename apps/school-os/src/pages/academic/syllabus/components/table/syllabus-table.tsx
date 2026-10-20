import { Chip } from '@vezham/react-v3'

import { formatDisplayDate } from '@pages/academic/shared/date'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { syllabusColumnOptions } from '@pages/academic/syllabus/data'
import type { ClassRow } from '@pages/academic/syllabus/types'
import { getPaginationSummary } from '@pages/academic/syllabus/utils/syllabus'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/syllabus/variants'
import { rowCountOptions } from '@store/useAcademic/options'

export const SyllabusTable = createAcademicEntityTable<ClassRow, string>({
  ariaLabel: 'Schedules',
  bulkAriaLabel: 'Syllabus bulk actions',
  classNames,
  columns: syllabusColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: renderCellContent,
  rowCountOptions,
  rowHeaderKey: null
})

function renderCellContent(row: ClassRow, key: string) {
  switch (key) {
    case 'classes':
      return row.classes
    case 'section':
      return row.section
    case 'subject':
      return row.subject
    case 'createdAt':
      return formatDisplayDate(row.createdAt)
    case 'status':
      return (
        <Chip
          color={row.status === 'Active' ? 'success' : 'danger'}
          size="sm"
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      )
    default:
      return null
  }
}
