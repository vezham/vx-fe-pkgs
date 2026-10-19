import { Chip } from '@vezham/react-v3'

import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { subjectColumnOptions } from '@pages/academic/subject/data'
import type { ClassRow } from '@pages/academic/subject/types'
import { getPaginationSummary } from '@pages/academic/subject/utils/subject'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/subject/variants'
import { rowCountOptions } from '@store/useAcademic/options'

export const SubjectTable = createAcademicEntityTable<ClassRow, string>({
  ariaLabel: 'Schedules',
  bulkAriaLabel: 'Subject bulk actions',
  classNames,
  columns: subjectColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: renderCellContent,
  rowCountOptions,
  rowHeaderKey: 'id'
})

function renderCellContent(row: ClassRow, key: string) {
  switch (key) {
    case 'id':
      return row.id
    case 'name':
      return row.name
    case 'code':
      return row.code
    case 'type':
      return row.type
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
