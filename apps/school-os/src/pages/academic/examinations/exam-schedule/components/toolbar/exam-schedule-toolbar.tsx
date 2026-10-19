import { examScheduleColumnOptions } from '@pages/academic/examinations/exam-schedule/data'
import type {
  DatePresetKey,
  FilterDraft,
  ScheduleColumnKey
} from '@pages/academic/examinations/exam-schedule/types'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ExamScheduleToolbar = createEntityToolbar<
  FilterDraft,
  ScheduleColumnKey,
  DatePresetKey
>({
  classNames,
  columns: examScheduleColumnOptions,
  columnsAriaLabel: 'Show or hide schedule columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Exam Schedule'
})
