import {
  classroomColumnOptions,
  sortOptions
} from '@pages/academic/classroom/data'
import { classNames } from '@pages/academic/classroom/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: classroomColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
