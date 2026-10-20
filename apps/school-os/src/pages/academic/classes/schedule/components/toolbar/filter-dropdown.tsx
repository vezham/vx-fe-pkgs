import type { FilterDropdownProps } from '@pages/academic/classes/schedule/types'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import { statusOptions, typeOptions } from '@store/useAcademic/useClassSchedule'

const filters = [
  {
    field: 'type',
    ariaLabel: 'Filter by class',
    label: 'Type',
    placeholder: 'Select class',
    options: typeOptions
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
