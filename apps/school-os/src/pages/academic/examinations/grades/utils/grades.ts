import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow
} from '@pages/academic/examinations/grades/types'
import {
  getEntityDrawerTitle,
  getNextEntityId
} from '@pages/academic/shared/entity-utils'

export { getPaginationSummary } from '@pages/academic/shared/entity-utils'

export const getClassTags = (row: ClassRow) => {
  return [
    `Grade ${row.grade}`,
    `Percentage ${row.percentage}`,
    `Points ${row.points}`,
    row.status
  ]
}

export const getDrawerTitle = (row: ClassRow) => getEntityDrawerTitle(row)

export const rowToForm = (row: ClassRow): ClassFormState => {
  return {
    grade: row.grade,
    marksfrom: getMarksFrom(row.percentage),
    marksupto: getMarksUpto(row.percentage),
    percentage: row.percentage,
    description: '',
    points: row.points,
    status: row.status
  }
}

export const validateClassForm = (form: ClassFormState) => {
  const errors: ClassFormErrors = {}

  if (!form.grade.trim()) {
    errors.grade = 'Grade is required.'
  }

  if (!form.marksfrom.trim()) {
    errors.marksfrom = 'Marks from is required.'
  }

  if (!form.marksupto.trim()) {
    errors.marksupto = 'Marks upto is required.'
  }

  if (!form.points.trim()) {
    errors.points = 'Grade points is required.'
  }

  if (form.marksfrom && form.marksupto) {
    const marksFrom = Number(form.marksfrom)
    const marksUpto = Number(form.marksupto)

    if (Number.isFinite(marksFrom) && Number.isFinite(marksUpto)) {
      if (marksFrom >= marksUpto) {
        errors.marksupto = 'Marks upto must be greater than marks from.'
      }
    }
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const createNextClassId = (rows: ClassRow[]) =>
  getNextEntityId(rows, 'G', 6)

export const getPercentageRange = (form: ClassFormState) => {
  if (form.percentage.trim()) {
    return form.percentage.trim()
  }

  return `${form.marksfrom}% - ${form.marksupto}%`
}

function getMarksFrom(value: string) {
  return value.match(/^(\d+)%/)?.[1] ?? ''
}

function getMarksUpto(value: string) {
  return value.match(/-\s*(\d+)%$/)?.[1] ?? ''
}
