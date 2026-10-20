import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'
import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/subject/types'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [
    `Grade ${row.name}`,
    `Grade ${row.code}`,
    `Grade ${row.type}`,
    row.status
  ]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    name: row.name,
    code: row.code,
    type: row.type,
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.code.trim()) {
    errors.code = 'Code is required.'
  }

  if (!form.type) {
    errors.type = 'Type is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
