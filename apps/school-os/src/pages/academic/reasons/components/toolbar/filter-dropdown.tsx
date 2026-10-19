import { reasonOptions, roleOptions } from '@pages/academic/reasons/data'
import type { FilterDropdownProps } from '@pages/academic/reasons/types'
import { classNames } from '@pages/academic/reasons/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'role',
    ariaLabel: 'Filter by role',
    label: 'Role',
    placeholder: 'Select Role',
    options: roleOptions
  },
  {
    field: 'reasons',
    ariaLabel: 'Filter by reasons',
    label: 'Reason',
    placeholder: 'Select reasons',
    options: reasonOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
