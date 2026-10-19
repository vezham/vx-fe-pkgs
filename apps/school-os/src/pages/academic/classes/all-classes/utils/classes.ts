import type {
  ClassFormErrors,
  ClassRow
} from '@pages/academic/classes/all-classes/types'
import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'
import { ClassFormState } from '@store/useAcademic/useAllClasses'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.className}`, `Section ${row.section}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    className: row.className,
    section: row.section,
    students: String(row.students),
    subjects: String(row.subjects),
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}
  const students = Number(form.students)
  const subjects = Number(form.subjects)

  if (!form.className.trim()) {
    errors.className = 'Class name is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.students.trim() || !Number.isFinite(students) || students < 0) {
    errors.students = 'No of students is required.'
  }

  if (!form.subjects.trim() || !Number.isFinite(subjects) || subjects < 0) {
    errors.subjects = 'No of subjects is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
