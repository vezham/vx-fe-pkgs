import type {
  ClassRoutineColumnKey,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'
import { classRoutineColumnOptions } from '@store/useAcademic/useClassRoutine'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ClassRoutineToolbar = createEntityToolbar<
  FilterDraft,
  ClassRoutineColumnKey,
  DatePresetKey
>({
  classNames,
  columns: classRoutineColumnOptions,
  columnsAriaLabel: 'Show or hide class routine columns',
  columnsLabelClassName: classNames.dateOptionLabel,
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Routine'
})
