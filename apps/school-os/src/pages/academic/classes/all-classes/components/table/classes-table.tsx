import { Chip } from '@vezham/react-v3'

import type {
  AllClassesColumnKey,
  ClassRow
} from '@pages/academic/classes/all-classes/types'
import { getPaginationSummary } from '@pages/academic/classes/all-classes/utils/classes'
import {
  classNames,
  getTableRowClassName
} from '@pages/academic/classes/all-classes/variants'
import { createAcademicEntityTable } from '@pages/academic/shared/entity-table'
import {
  allClassesColumnOptions,
  rowCountOptions
} from '@store/useAcademic/useAllClasses/data'

export const ClassesTable = createAcademicEntityTable<
  ClassRow,
  AllClassesColumnKey
>({
  ariaLabel: 'All classes',
  bulkAriaLabel: 'All classes bulk actions',
  classNames,
  columns: allClassesColumnOptions,
  getPaginationSummary,
  getRowClassName: getTableRowClassName,
  renderCell: (row, columnKey) =>
    columnKey === 'status' ? (
      <Chip
        color={row.status === 'Active' ? 'success' : 'danger'}
        size="sm"
        variant="soft">
        <span aria-hidden="true">●</span>
        <Chip.Label>{row.status}</Chip.Label>
      </Chip>
    ) : columnKey === 'subjects' ? (
      row.subjects.toString().padStart(2, '0')
    ) : (
      row[columnKey]
    ),
  rowCountOptions,
  rowHeaderKey: 'id',
  selectionLabel: 'class'
})
