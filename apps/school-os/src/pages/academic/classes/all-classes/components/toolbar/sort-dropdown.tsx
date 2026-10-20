import { classNames } from '@pages/academic/classes/all-classes/variants'
import { createSortDropdown } from '@pages/academic/shared/sort-dropdown'
import {
  allClassesColumnOptions,
  sortOptions,
  sortOrderOptions
} from '@store/useAcademic/useAllClasses/data'

const SortDropdown = createSortDropdown({
  ariaLabel: 'Sort classes',
  sortOptions,
  columnOptions: allClassesColumnOptions,
  itemClassName: classNames.dateOptionLabel,
  sortOrderOptions
})

export default SortDropdown
