import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/reasons/types'
import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.role}`, `Grade ${row.reasons}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    name: '',
    status: row.status,
    role: row.role,
    reasons: row.reasons
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.role.trim()) {
    errors.role = 'Section Role is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
