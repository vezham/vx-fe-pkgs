import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'
import { syllabusColumnOptions } from '@pages/academic/syllabus/data'
import type { DatePresetKey, FilterDraft } from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const SyllabusToolbar = createEntityToolbar<
  FilterDraft,
  string,
  DatePresetKey
>({
  classNames,
  columns: syllabusColumnOptions,
  columnsAriaLabel: 'Show or hide syllabus columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Syllabus'
})
