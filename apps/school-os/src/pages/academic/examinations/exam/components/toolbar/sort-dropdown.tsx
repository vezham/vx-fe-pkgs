import { sortOptions } from '@pages/academic/examinations/exam/data'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort exams',
  sortOptions
})

export default SortDropdown
