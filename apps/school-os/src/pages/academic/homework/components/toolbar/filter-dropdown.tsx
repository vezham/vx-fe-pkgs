import {
  classOptions,
  dayOptions,
  sectionOptions,
  subjectOptions
} from '@pages/academic/homework/data'
import type { FilterDropdownProps } from '@pages/academic/homework/types'
import { classNames } from '@pages/academic/homework/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = [
  {
    field: 'subject',
    ariaLabel: 'Filter by subject',
    label: 'Subject',
    placeholder: 'Select subject',
    options: subjectOptions
  },
  {
    field: 'classes',
    ariaLabel: 'Filter by classes',
    label: 'Class',
    placeholder: 'Select classes',
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
    field: 'date',
    ariaLabel: 'Filter by date',
    label: 'Date',
    placeholder: 'Select date',
    options: dayOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
