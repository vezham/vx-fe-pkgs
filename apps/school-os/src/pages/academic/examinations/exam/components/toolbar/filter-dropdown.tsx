import {
  examOptions,
  examdateOptions
} from '@pages/academic/examinations/exam/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/exam/types'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'name',
    ariaLabel: 'Filter by name',
    label: 'Exam Name',
    placeholder: 'Select name',
    options: examOptions
  },
  {
    field: 'date',
    ariaLabel: 'Filter by date',
    label: 'Exam Date',
    placeholder: 'Select date',
    options: examdateOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
