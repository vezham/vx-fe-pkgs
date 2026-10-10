import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/examinations/grades/data'
import { classNames } from '@pages/academic/examinations/grades/variants'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Grades custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
