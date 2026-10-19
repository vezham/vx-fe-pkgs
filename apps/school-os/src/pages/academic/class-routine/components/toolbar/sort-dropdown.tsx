import { classNames } from '@pages/academic/class-routine/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  classRoutineColumnOptions,
  sortOptions,
  sortOrderOptions
} from '@store/useAcademic/useClassRoutine'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: classRoutineColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
