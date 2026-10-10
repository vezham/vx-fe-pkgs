import { sectionColumnOptions } from '@pages/academic/section/data'
import type { ClassRow, SectionColumnKey } from '@pages/academic/section/types'
import { getPaginationSummary } from '@pages/academic/section/utils/section'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/section/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import { AcademicStatusChip } from '@pages/academic/shared/status-chip'
import { rowCountOptions } from '@store/useAcademic/options'

export const SectionTable = createAcademicEntityTable<
  ClassRow,
  SectionColumnKey
>({
  ariaLabel: 'Sections',
  bulkAriaLabel: 'Section bulk actions',
  bulkEntityLabel: 'section',
  classNames,
  columns: sectionColumnOptions,
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
