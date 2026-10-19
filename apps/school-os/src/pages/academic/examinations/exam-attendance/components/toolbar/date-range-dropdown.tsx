import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { dateOptions } from '@pages/academic/examinations/exam-attendance/data'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Attendance custom date range',
  classes: classNames,
  closeCustomOnDismiss: true,
  dateOptions
})
