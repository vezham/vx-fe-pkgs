import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import { sortOptions, subjectColumnOptions } from '@pages/academic/subject/data'
import { classNames } from '@pages/academic/subject/variants'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: subjectColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
