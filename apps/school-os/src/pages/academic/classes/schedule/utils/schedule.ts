import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/classes/schedule/types'
import {
  getEntityDrawerTitle,
  getNextEntityId,
  validateTimeAndStatus
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.type}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    type: row.type,
    starttime: row.starttime,
    endtime: row.endtime,
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.type.trim()) {
    errors.type = 'Type is required.'
  }

  return validateTimeAndStatus(form, errors)
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
