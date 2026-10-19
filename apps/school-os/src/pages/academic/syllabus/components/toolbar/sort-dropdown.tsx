import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  sortOptions,
  syllabusColumnOptions
} from '@pages/academic/syllabus/data'
import { classNames } from '@pages/academic/syllabus/variants'
import { sortOrderOptions } from '@store/useAcademic/options'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort schedules',
  sortOptions,
  columnOptions: syllabusColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
