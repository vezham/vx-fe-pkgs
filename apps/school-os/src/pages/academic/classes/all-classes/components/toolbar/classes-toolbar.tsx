import type {
  AllClassesColumnKey,
  DatePresetKey,
  FilterDraft
} from '@pages/academic/classes/all-classes/types'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { createEntityToolbar } from '@pages/academic/shared/entity-toolbar'
import { allClassesColumnOptions } from '@store/useAcademic/useAllClasses/data'

import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import SortDropdown from './sort-dropdown'

export const ClassesToolbar = createEntityToolbar<
  FilterDraft,
  AllClassesColumnKey,
  DatePresetKey
>({
  classNames,
  columns: allClassesColumnOptions,
  columnsAriaLabel: 'All classes columns',
  dateDropdown: DateRangeDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title: 'Classes List',
  eyebrow: 'Classes',
  searchAriaLabel: 'Search classes'
})
