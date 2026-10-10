import { homeworkColumnOptions } from '@pages/academic/homework/data'
import type { DatePresetKey, FilterDraft } from '@pages/academic/homework/types'
import { classNames } from '@pages/academic/homework/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const HomeworkToolbar = createEntityToolbar<
  FilterDraft,
  string,
  DatePresetKey
>({
  classNames,
  columns: homeworkColumnOptions,
  columnsAriaLabel: 'Show or hide homework columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Homework'
})
