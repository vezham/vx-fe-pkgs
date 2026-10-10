import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { classNames } from '@pages/academic/homework/variants'
import { dateOptions } from '@store/useAcademic/options'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Schedule custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
