import {
  classOptions,
  examdateOptions
} from '@pages/academic/examinations/exam-schedule/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/exam-schedule/types'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'classes',
    ariaLabel: 'Filter by classes',
    label: 'Class',
    placeholder: 'Select classes',
    options: classOptions
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
