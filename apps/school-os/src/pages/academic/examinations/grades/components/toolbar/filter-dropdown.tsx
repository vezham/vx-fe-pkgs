import {
  gradeOptions,
  percentageOptions,
  pointOptions
} from '@pages/academic/examinations/grades/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/grades/types'
import { classNames } from '@pages/academic/examinations/grades/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'grade',
    ariaLabel: 'Filter by grade',
    label: 'Grade',
    placeholder: 'Select grade',
    options: gradeOptions
  },
  {
    field: 'percentage',
    ariaLabel: 'Filter by percentage',
    label: 'Percentage',
    placeholder: 'Select percentage',
    options: percentageOptions
  },
  {
    field: 'points',
    ariaLabel: 'Filter by points',
    label: 'Points',
    placeholder: 'Select points',
    options: pointOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
