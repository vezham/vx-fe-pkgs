import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/classroom/types'
import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.roomno}`, `Grade ${row.capacity}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    roomno: row.roomno,
    capacity: row.capacity,
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.roomno.trim()) {
    errors.roomno = 'Room No is required.'
  }

  if (!form.capacity.trim()) {
    errors.capacity = 'Capacity is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
