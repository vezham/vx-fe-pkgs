import {
  classOptions,
  examtypeOptions,
  sectionOptions
} from '@pages/academic/examinations/exam-results/data'
import type { FilterDropdownProps } from '@pages/academic/examinations/exam-results/types'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { createExamFilterFields } from '@pages/academic/examinations/shared-filter-fields'
import { AcademicFilterDropdown } from '@pages/academic/shared/filter-dropdown'

const filters = createExamFilterFields(
  classOptions,
  sectionOptions,
  examtypeOptions
)

export const FilterDropdown = (props: FilterDropdownProps) => (
  <AcademicFilterDropdown {...props} classes={classNames} filters={filters} />
)
