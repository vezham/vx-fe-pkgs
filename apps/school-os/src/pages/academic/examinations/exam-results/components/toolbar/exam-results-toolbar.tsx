import { examResultsColumnOptions } from '@pages/academic/examinations/exam-results/data'
import type {
  DatePresetKey,
  ExamResultsColumnKey,
  FilterDraft
} from '@pages/academic/examinations/exam-results/types'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ExamResultsToolbar = createEntityToolbar<
  FilterDraft,
  ExamResultsColumnKey,
  DatePresetKey
>({
  classNames,
  columns: examResultsColumnOptions,
  columnsAriaLabel: 'Show or hide exam result columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Exam Results',
  searchAriaLabel: 'Search exam results'
})
