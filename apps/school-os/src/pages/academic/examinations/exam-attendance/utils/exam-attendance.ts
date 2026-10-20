import type {
  AttendanceFormErrors,
  AttendanceFormState,
  AttendanceRow,
  AttendanceStatus
} from '@pages/academic/examinations/exam-attendance/types'
import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getAttendanceChipColor = (
  status: AttendanceStatus
): 'success' | 'danger' | 'accent' => {
  if (status === 'Present') {
    return 'success'
  }

  if (status === 'Absent') {
    return 'danger'
  }

  return 'accent'
}

export const getAttendanceTags = (row: AttendanceRow) => {
  return [
    row.classes ? `Class ${row.classes}` : null,
    row.section ? `Section ${row.section}` : null,
    row.examtype,
    row.status
  ].filter((tag): tag is string => Boolean(tag))
}

export const getStudentSecondaryText = (row: AttendanceRow) => {
  if (row.rollNo) {
    return `Roll No : ${row.rollNo}`
  }

  if (row.email) {
    return row.email
  }

  return [row.classes, row.section].filter(Boolean).join(' - ')
}

export const getDrawerTitle = (row: AttendanceRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: AttendanceRow): AttendanceFormState => {
  return {
    name: row.name,
    english: row.english,
    spanish: row.spanish,
    physics: row.physics,
    chemistry: row.chemistry,
    maths: row.maths,
    computer: row.computer,
    envscience: row.envscience,
    status: row.status
  }
}

export const validateAttendanceForm = (form: AttendanceFormState) => {
  const errors: AttendanceFormErrors = {}

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextAttendanceId = (rows: AttendanceRow[]) =>
  getNextEntityId(rows, 'EA', 6)
