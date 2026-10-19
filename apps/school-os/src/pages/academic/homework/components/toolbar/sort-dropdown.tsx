import {
  homeworkColumnOptions,
  sortOptions
} from '@pages/academic/homework/data'
import { classNames } from '@pages/academic/homework/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: homeworkColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
