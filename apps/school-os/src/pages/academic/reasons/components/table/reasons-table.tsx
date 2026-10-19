import { reasonsColumnOptions } from '@pages/academic/reasons/data'
import type { ClassRow } from '@pages/academic/reasons/types'
import { getPaginationSummary } from '@pages/academic/reasons/utils/reasons'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/reasons/variants'
import { formatDisplayDate } from '@pages/academic/shared/date'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { rowCountOptions } from '@store/useAcademic/options'

export const ReasonsTable = createAcademicEntityTable<ClassRow, string>({
  ariaLabel: 'Schedules',
  bulkAriaLabel: 'Reasons bulk actions',
  classNames,
  columns: reasonsColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: renderCellContent,
  rowCountOptions,
  rowHeaderKey: null
})

function renderCellContent(row: ClassRow, key: string) {
  switch (key) {
    case 'role':
      return row.role
    case 'reasons':
      return row.reasons
    case 'createdAt':
      return formatDisplayDate(row.createdAt)
    default:
      return null
  }
}
