import { classroomColumnOptions } from '@pages/academic/classroom/data'
import type {
  ClassroomColumnKey,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/classroom/types'
import { classNames } from '@pages/academic/classroom/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ClassroomToolbar = createEntityToolbar<
  FilterDraft,
  ClassroomColumnKey,
  DatePresetKey
>({
  classNames,
  columns: classroomColumnOptions,
  columnsAriaLabel: 'Show or hide classroom columns',
  columnsLabelClassName: classNames.dateOptionLabel,
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Room'
})
