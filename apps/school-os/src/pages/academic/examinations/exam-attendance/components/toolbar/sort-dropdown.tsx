import { sortOptions } from '@pages/academic/examinations/exam-attendance/data'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort attendance',
  sortOptions
})

export default SortDropdown
