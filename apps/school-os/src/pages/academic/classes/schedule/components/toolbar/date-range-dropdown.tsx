import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { dateOptions } from '@store/useAcademic/useClassSchedule'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Schedule custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
