import type {
  DatePresetKey,
  FilterDraft,
  ScheduleColumnKey
} from '@pages/academic/classes/schedule/types'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'
import { scheduleColumnOptions } from '@store/useAcademic/useClassSchedule'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ScheduleToolbar = createEntityToolbar<
  FilterDraft,
  ScheduleColumnKey,
  DatePresetKey
>({
  classNames,
  columns: scheduleColumnOptions,
  columnsAriaLabel: 'Schedule columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Schedule List',
  eyebrow: 'Classes'
})
