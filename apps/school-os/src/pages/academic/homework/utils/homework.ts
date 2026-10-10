import type { SortDescriptor } from '@vezham/react-v3'

import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/homework/types'
import {
  getEntityDrawerTitle,
  getNextEntityId,
  validateAcademicPlacement
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [
    `Grade ${row.classes}`,
    `Grade ${row.section}`,
    `Grade ${row.homeworkdate}`,
    `Grade ${row.subject}`,
    `Grade ${row.submissiondate}`,
    `Grade ${row.attachments ?? '-'}`,
    row.status
  ]
}

export const getSortableValue = (
  row: ClassRow,
  column: SortDescriptor['column']
) => {
  if (column === 'createdBy') {
    return row.createdBy.name
  }

  return row[column as keyof ClassRow] ?? ''
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    classes: row.classes,
    section: row.section,
    subject: row.subject,
    homeworkdate: row.homeworkdate,
    submissiondate: row.submissiondate,
    attachments: row.attachments ?? '',
    status: row.status,
    date: row.date ?? ''
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = validateAcademicPlacement(form)

  if (!form.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!form.homeworkdate.trim()) {
    errors.homeworkdate = 'Day is required.'
  }
  if (!form.submissiondate.trim()) {
    errors.submissiondate = 'Class Room is required.'
  }

  if (!form.attachments.trim()) {
    errors.attachments = 'End time is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'C', 6)
