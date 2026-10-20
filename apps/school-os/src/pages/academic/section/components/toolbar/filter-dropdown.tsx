import { sectionOptions, statusOptions } from '@pages/academic/section/data'
import type { FilterDropdownProps } from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import { createSectionStatusFilters } from '@pages/academic/shared/section-status-filters'

const filters = createSectionStatusFilters(sectionOptions, statusOptions)

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
