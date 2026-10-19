import type { Selection, SortDescriptor } from '@vezham/react-v3'

import {
  formatDateRangeLabel,
  getPresetDateRange
} from '@pages/_shared/table-utils'
import { useTableRowView } from '@pages/_shared/use-table-row-view'

type DateRange = { start: string; end: string }

export const useRecordTableViewState = <Row extends { id: string }>(options: {
  activeRowId: string | null
  customDateRange: DateRange | null
  data: Row[]
  datePreset: Parameters<typeof getPresetDateRange>[0]
  page: number
  rowsPerPage: string
  selectedRowKeys: Selection
  sortDescriptor: SortDescriptor
  sortOptions: readonly { descriptor: SortDescriptor; label: string }[]
  sortedRows: Row[]
}) => {
  const {
    activeRowId,
    customDateRange,
    data,
    datePreset,
    page,
    rowsPerPage,
    selectedRowKeys,
    sortDescriptor,
    sortOptions,
    sortedRows
  } = options
  const rowView = useTableRowView({
    activeRowId,
    data,
    page,
    rowsPerPage,
    selectedRowKeys,
    sortedRows
  })
  const activeSortLabel =
    sortOptions.find(
      option =>
        option.descriptor.column === sortDescriptor.column &&
        option.descriptor.direction === sortDescriptor.direction
    )?.label ?? 'Ascending'
  const activeDateLabel =
    datePreset === 'custom'
      ? customDateRange
        ? formatDateRangeLabel(customDateRange)
        : 'Custom Range'
      : formatDateRangeLabel(getPresetDateRange(datePreset))

  return {
    activeDateLabel,
    activeSortLabel,
    ...rowView
  }
}
