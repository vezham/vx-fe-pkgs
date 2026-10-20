import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/class-routine/types'
import {
  getAcademicScheduleFields,
  getNextEntityId,
  validateAcademicPlacement,
  validateTimeAndStatus
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'
export { getEntityDrawerTitle as getDrawerTitle } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [
    `Grade ${row.classes}`,
    `Grade ${row.section}`,
    `Grade ${row.teacher}`,
    `Grade ${row.subject}`,
    `Grade ${row.day}`,
    `Grade ${row.classroom}`,
    row.status
  ]
}

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    ...getAcademicScheduleFields(row),
    teacher: row.teacher,
    day: row.day
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = validateAcademicPlacement(form)

  if (!form.teacher.trim()) {
    errors.teacher = 'Teacher is required.'
  }

  if (!form.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!form.day.trim()) {
    errors.day = 'Day is required.'
  }
  if (!form.classroom.trim()) {
    errors.classroom = 'Class Room is required.'
  }

  return validateTimeAndStatus(form, errors)
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
