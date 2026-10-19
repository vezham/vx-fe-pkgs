import { gradeColumnOptions } from '@pages/academic/examinations/grades/data'
import type {
  DatePresetKey,
  FilterDraft,
  GradeColumnKey
} from '@pages/academic/examinations/grades/types'
import { classNames } from '@pages/academic/examinations/grades/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const GradesToolbar = createEntityToolbar<
  FilterDraft,
  GradeColumnKey,
  DatePresetKey
>({
  classNames,
  columns: gradeColumnOptions,
  columnsAriaLabel: 'Show or hide grade columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Grades',
  searchAriaLabel: 'Search grades'
})
