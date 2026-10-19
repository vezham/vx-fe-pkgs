import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/examinations/exam-schedule/types'
import {
  getAcademicScheduleFields,
  validateAcademicPlacement,
  validateTimeAndStatus
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'
export { getEntityDrawerTitle as getDrawerTitle } from '@pages/academic/shared/entity-utils'

export const getScheduleTags = (row: ClassRow) => {
  return [
    `Grade ${row.classes}`,
    `Section ${row.section}`,
    row.examName,
    row.subject,
    `Room ${row.classroom}`,
    row.status
  ]
}

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    ...getAcademicScheduleFields(row),
    examName: row.examName,
    date: row.date,
    duration: row.duration,
    maximum: row.maximum,
    minimum: row.minimum,
    scheduleRows: [
      {
        id: `${row.id}-schedule`,
        date: row.date,
        subject: row.subject,
        classroom: row.classroom,
        maximum: row.maximum,
        minimum: row.minimum
      }
    ]
  }
}

export const validateScheduleForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = validateAcademicPlacement(form)

  if (!form.examName.trim()) {
    errors.examName = 'Exam name is required.'
  }

  if (!form.duration.trim()) {
    errors.duration = 'Duration is required.'
  }

  if (
    !form.scheduleRows.length ||
    form.scheduleRows.some(
      scheduleRow =>
        !scheduleRow.date.trim() ||
        !scheduleRow.subject.trim() ||
        !scheduleRow.classroom.trim() ||
        !scheduleRow.maximum.trim() ||
        !scheduleRow.minimum.trim()
    )
  ) {
    errors.scheduleRows = 'Complete every exam schedule row.'
  }

  return validateTimeAndStatus(form, errors)
}
