import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/examinations/exam/data'
import { classNames } from '@pages/academic/examinations/exam/variants'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Schedule custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
