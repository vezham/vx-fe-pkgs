import { capacityOptions, roomnoOptions } from '@pages/academic/classroom/data'
import type { FilterDropdownProps } from '@pages/academic/classroom/types'
import { classNames } from '@pages/academic/classroom/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'roomno',
    ariaLabel: 'Filter by class',
    label: 'Room No',
    placeholder: 'Select class',
    options: roomnoOptions
  },
  {
    field: 'capacity',
    ariaLabel: 'Filter by capacity',
    label: 'Capacity',
    placeholder: 'Select capacity',
    options: capacityOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
