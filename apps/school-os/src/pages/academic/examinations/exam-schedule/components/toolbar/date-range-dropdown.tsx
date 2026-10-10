import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/examinations/exam-schedule/data'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Schedule custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
