import { sectionColumnOptions, sortOptions } from '@pages/academic/section/data'
import { classNames } from '@pages/academic/section/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: sectionColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
