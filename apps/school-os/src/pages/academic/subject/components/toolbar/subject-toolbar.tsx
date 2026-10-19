import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'
import { subjectColumnOptions } from '@pages/academic/subject/data'
import type { DatePresetKey, FilterDraft } from '@pages/academic/subject/types'
import { classNames } from '@pages/academic/subject/variants'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const SubjectToolbar = createEntityToolbar<
  FilterDraft,
  string,
  DatePresetKey
>({
  classNames,
  columns: subjectColumnOptions,
  columnsAriaLabel: 'Show or hide subject columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Subject'
})
