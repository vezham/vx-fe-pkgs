import type { ClassFormState, ClassRow } from '@pages/academic/section/types'
import {
  getEntityDrawerTitle,
  getNextEntityId,
  validateSectionForm
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [`Grade ${row.section}`, row.status]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    section: row.section,
    status: row.status
  }
}

export const validateClassForm = validateSectionForm

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
