import { classNames } from '@pages/academic/classes/schedule/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  scheduleColumnOptions,
  sortOptions,
  sortOrderOptions
} from '@store/useAcademic/useClassSchedule'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: scheduleColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
