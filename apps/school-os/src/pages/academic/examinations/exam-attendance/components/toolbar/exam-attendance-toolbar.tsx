import { attendanceColumnOptions } from '@pages/academic/examinations/exam-attendance/data'
import type {
  AttendanceColumnKey,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/examinations/exam-attendance/types'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ExamAttendanceToolbar = createEntityToolbar<
  FilterDraft,
  AttendanceColumnKey,
  DatePresetKey
>({
  classNames,
  columns: attendanceColumnOptions,
  columnsAriaLabel: 'Show or hide attendance columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Exam Attendance',
  searchAriaLabel: 'Search attendance'
})
