import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import { codeOptions, nameOptions } from '@pages/academic/subject/data'
import type { FilterDropdownProps } from '@pages/academic/subject/types'
import { classNames } from '@pages/academic/subject/variants'

const filters = [
  {
    field: 'name',
    ariaLabel: 'Filter by class',
    label: 'Name',
    placeholder: 'Select name',
    options: nameOptions
  },
  {
    field: 'code',
    ariaLabel: 'Filter by code',
    label: 'Code',
    placeholder: 'Select code',
    options: codeOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
