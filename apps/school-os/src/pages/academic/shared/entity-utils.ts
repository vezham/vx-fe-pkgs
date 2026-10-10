import type { SortDescriptor } from '@vezham/react-v3'

import { toISODate } from '@pages/academic/shared/date'

type IdentifiedEntity = {
  id: string
}

export const getEntityDrawerTitle = (row: object) => {
  const values = row as Record<string, unknown>
  const idValue = [
    values.displayId,
    values.refId,
    values.studentId,
    values.admissionNo,
    values.admissionNumber,
    values.serialNo,
    values.sNo,
    values.id
  ]
    .map(getDrawerText)
    .find(Boolean)
  const nameValue = [
    values.name,
    values.studentName,
    values.staffName,
    values.teacherName
  ]
    .map(getDrawerText)
    .find(Boolean)

  if (idValue) {
    return idValue.startsWith('#') ? idValue : `#${idValue}`
  }

  return nameValue || '-'
}

export const getNextEntityId = (
  rows: IdentifiedEntity[],
  prefix: string,
  padding = 6
) => {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `${prefix}${String(nextNumber).padStart(padding, '0')}`
}

const makeNewEntityRow = <
  Form,
  Row extends IdentifiedEntity,
  Fields extends object
>(
  form: Form,
  rows: Row[],
  createId: (rows: Row[]) => string,
  toFields: (form: Form) => Fields
) => ({
  id: createId(rows),
  ...toFields(form),
  createdAt: toISODate(new Date()),
  viewedAt: toISODate(new Date())
})

const makeUpdatedEntityRow = <Form, Row extends object, Fields extends object>(
  form: Form,
  row: Row,
  toFields: (form: Form) => Fields
) => ({ ...row, ...toFields(form) })

export const createEntityRowMutations = <
  Form,
  Row extends IdentifiedEntity,
  Fields extends object
>(
  createId: (rows: Row[]) => string,
  toFields: (form: Form) => Fields
) => ({
  makeNewRow: (form: Form, rows: Row[]) =>
    makeNewEntityRow(form, rows, createId, toFields),
  makeUpdatedRow: (form: Form, row: Row) =>
    makeUpdatedEntityRow(form, row, toFields)
})

export const createEntitySortLabel =
  (
    sortOptions: readonly { column: SortDescriptor['column']; label: string }[],
    columnOptions: readonly { key: SortDescriptor['column']; label: string }[]
  ) =>
  (column: SortDescriptor['column']) =>
    sortOptions.find(option => option.column === column)?.label ??
    columnOptions.find(option => option.key === column)?.label ??
    'Sort'

export const getPaginationSummary = (
  page: number,
  pageSize: number,
  total: number
) => {
  if (!total) {
    return '0 of 0'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return `${start}-${end} of ${total}`
}

export const validateSectionForm = (form: {
  section: string
  status: string
}) => {
  const errors: { section?: string; status?: string } = {}

  if (!form.section.trim()) {
    errors.section = 'Section Name is required.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export const validateAcademicPlacement = (form: {
  classes: string
  section: string
}) => {
  const errors: { classes?: string; section?: string } = {}

  if (!form.classes.trim()) {
    errors.classes = 'Class is required.'
  }
  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  return errors
}

export const getAcademicScheduleFields = <
  Row extends {
    classes: string
    section: string
    subject: string
    starttime: string
    endtime: string
    classroom: string
    status: string
  }
>(
  row: Row
): Pick<
  Row,
  | 'classes'
  | 'section'
  | 'subject'
  | 'starttime'
  | 'endtime'
  | 'classroom'
  | 'status'
> => ({
  classes: row.classes,
  section: row.section,
  subject: row.subject,
  starttime: row.starttime,
  endtime: row.endtime,
  classroom: row.classroom,
  status: row.status
})

const getTimeInMinutes = (value: string) => {
  const timeInputMatch = value.match(/^(\d{2}):(\d{2})$/)

  if (timeInputMatch) {
    const [, hourValue, minuteValue] = timeInputMatch
    return Number(hourValue) * 60 + Number(minuteValue)
  }

  const match = value.match(/^(\d{2})\.(\d{2})\s(AM|PM)$/)

  if (!match) {
    return 0
  }

  const [, hourValue, minuteValue, period] = match
  const hour = Number(hourValue)
  const minute = Number(minuteValue)
  const normalizedHour =
    period === 'PM' ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour

  return normalizedHour * 60 + minute
}

export const validateTimeAndStatus = <
  Errors extends {
    starttime?: string
    endtime?: string
    status?: string
  }
>(
  form: { starttime: string; endtime: string; status: string },
  errors: Errors
): Errors => {
  if (!form.starttime.trim()) {
    errors.starttime = 'Start time is required.'
  }

  if (!form.endtime.trim()) {
    errors.endtime = 'End time is required.'
  }

  if (
    form.starttime &&
    form.endtime &&
    getTimeInMinutes(form.endtime) <= getTimeInMinutes(form.starttime)
  ) {
    errors.endtime = 'End time must be after start time.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

const getDrawerText = (value: unknown) => {
  if (value && typeof value === 'object' && 'name' in value) {
    return String((value as { name?: unknown }).name ?? '').trim()
  }

  if (value === null || value === undefined) return ''

  return String(value).trim().split('\n')[0]
}
