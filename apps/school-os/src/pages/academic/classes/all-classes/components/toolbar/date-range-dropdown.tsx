import { createPageDateRangeDropdown } from '@pages/_shared/date-range-dropdown'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { dateOptions } from '@store/useAcademic/useAllClasses'

export const DateRangeDropdown = createPageDateRangeDropdown({
  ariaLabel: 'Class custom date range',
  classes: classNames,
  closeCustomOnDismiss: false,
  dateOptions
})
