import { examColumnOptions } from '@pages/academic/examinations/exam/data'
import type {
  DatePresetKey,
  ExamColumnKey,
  FilterDraft
} from '@pages/academic/examinations/exam/types'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ExamToolbar = createEntityToolbar<
  FilterDraft,
  ExamColumnKey,
  DatePresetKey
>({
  classNames,
  columns: examColumnOptions,
  columnsAriaLabel: 'Show or hide exam columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Exams'
})
