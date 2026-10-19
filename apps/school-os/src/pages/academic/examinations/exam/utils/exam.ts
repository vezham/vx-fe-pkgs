import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/examinations/exam/types'
import {
  getEntityDrawerTitle,
  getNextEntityId,
  validateTimeAndStatus
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.name}`, `Grade ${row.date}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    name: row.name,
    date: row.date,
    starttime: row.starttime,
    endtime: row.endtime,
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Exam Name is required.'
  }

  if (!form.date?.trim()) {
    errors.date = 'Exam Date is required.'
  }

  return validateTimeAndStatus(form, errors)
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'E', 6)
