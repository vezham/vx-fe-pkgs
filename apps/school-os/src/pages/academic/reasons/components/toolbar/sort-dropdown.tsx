import { reasonsColumnOptions, sortOptions } from '@pages/academic/reasons/data'
import { classNames } from '@pages/academic/reasons/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: reasonsColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
