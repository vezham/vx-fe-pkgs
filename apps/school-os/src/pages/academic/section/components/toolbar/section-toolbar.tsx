import { sectionColumnOptions } from '@pages/academic/section/data'
import type {
  DatePresetKey,
  FilterDraft,
  SectionColumnKey
} from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const SectionToolbar = createEntityToolbar<
  FilterDraft,
  SectionColumnKey,
  DatePresetKey
>({
  classNames,
  columns: sectionColumnOptions,
  columnsAriaLabel: 'Show or hide section columns',
  columnsLabelClassName: classNames.dateOptionLabel,
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Class Section'
})
