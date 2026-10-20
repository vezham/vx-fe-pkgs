import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import { createSectionStatusFilters } from '@pages/academic/shared/section-status-filters'
import {
  classOptions,
  sectionOptions,
  statusOptions
} from '@pages/academic/syllabus/data'
import type { FilterDropdownProps } from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

const filters = [
  {
    field: 'classes',
    ariaLabel: 'Filter by Class',
    label: 'Class',
    placeholder: 'Select Class',
    options: classOptions
  },
  ...createSectionStatusFilters(sectionOptions, statusOptions)
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
