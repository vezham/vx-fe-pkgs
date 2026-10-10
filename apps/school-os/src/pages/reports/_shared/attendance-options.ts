import type { AttendanceStatus } from './types'

export const rowCountOptions = ['10', '25', '50']

export const emptyStatusLegend: {
  status: AttendanceStatus
  label: string
  icon: string
}[] = []

export { dateOptions } from '@src/utils/date-options'

export const statusLegend: {
  status: AttendanceStatus
  label: string
  icon: string
}[] = [
  { status: 'Present', label: 'Present', icon: 'vx:check' },
  { status: 'Absent', label: 'Absent', icon: 'vx:close' },
  { status: 'Late', label: 'Late', icon: 'vx:clock-3' },
  { status: 'Halfday', label: 'Halfday', icon: 'vx:calendar-days' },
  { status: 'Holiday', label: 'Holiday', icon: 'vx:verified' }
]
