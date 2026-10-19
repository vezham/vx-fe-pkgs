import type { FilterDropdownProps } from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'
import {
  classOptions,
  dayOptions,
  roomOptions,
  sectionOptions,
  teacherOptions
} from '@store/useAcademic/useClassRoutine'

const filters = [
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
    field: 'teacher',
    ariaLabel: 'Filter by teacher',
    label: 'Teacher',
    placeholder: 'Select teacher',
    options: teacherOptions
  },
  {
    field: 'classroom',
    ariaLabel: 'Filter by classroom',
    label: 'Room No',
    placeholder: 'Select classroom',
    options: roomOptions
  },
  {
    field: 'day',
    ariaLabel: 'Filter by day',
    label: 'Day',
    placeholder: 'Select day',
    options: dayOptions
  }
] as const

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
