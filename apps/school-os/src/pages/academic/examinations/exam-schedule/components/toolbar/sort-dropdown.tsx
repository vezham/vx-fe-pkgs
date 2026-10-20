import { sortOptions } from '@pages/academic/examinations/exam-schedule/data'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort exam schedules',
  sortOptions
})

export default SortDropdown
