import { sortOptions } from '@pages/academic/examinations/exam-results/data'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort exam results',
  sortOptions
})

export default SortDropdown
