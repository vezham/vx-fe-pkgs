import type { FilterDropdownProps } from '@pages/academic/classes/all-classes/types'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import {
  classOptions,
  sectionOptions,
  statusOptions
} from '@store/useAcademic/useAllClasses'

const filters = [
  {
    field: 'className',
    ariaLabel: 'Filter by class',
    label: 'Class',
    placeholder: 'Select class',
    options: classOptions
  },
  {
    field: 'section',
    ariaLabel: 'Filter by section',
    label: 'Section',
    placeholder: 'Select section',
    options: sectionOptions
  },
  {
    field: 'status',
    ariaLabel: 'Filter by status',
    label: 'Status',
    placeholder: 'Select status',
    options: statusOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
