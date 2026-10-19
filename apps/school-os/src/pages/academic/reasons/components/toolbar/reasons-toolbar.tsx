import { reasonsColumnOptions } from '@pages/academic/reasons/data'
import type { DatePresetKey, FilterDraft } from '@pages/academic/reasons/types'
import { classNames } from '@pages/academic/reasons/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ReasonsToolbar = createEntityToolbar<
  FilterDraft,
  string,
  DatePresetKey
>({
  classNames,
  columns: reasonsColumnOptions,
  columnsAriaLabel: 'Show or hide reason columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Academic Reasons'
})
