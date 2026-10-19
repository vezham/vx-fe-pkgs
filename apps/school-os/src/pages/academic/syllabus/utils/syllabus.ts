import {
  getEntityDrawerTitle,
  getNextEntityId,
  validateSectionForm
} from '@pages/academic/shared/entity-utils'
import type { ClassFormState, ClassRow } from '@pages/academic/syllabus/types'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [
    `Grade ${row.subject}`,
    `Grade ${row.section}`,
    `Grade ${row.classes}`,
    row.status
  ]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    section: row.section,
    status: row.status,
    classes: row.classes,
    subject: row.subject
  }
}

export const validateClassForm = validateSectionForm

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
