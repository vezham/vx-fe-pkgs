import { sortOptions } from '@pages/academic/examinations/grades/data'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort grades',
  sortOptions
})

export default SortDropdown
