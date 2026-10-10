import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/examinations/exam-results/data'
import { classNames } from '@pages/academic/examinations/exam-results/variants'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Exam results custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
