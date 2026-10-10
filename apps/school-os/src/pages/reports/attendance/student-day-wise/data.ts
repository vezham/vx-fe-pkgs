import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type {
  AttendanceStatus,
  ReportColumn,
  ReportRow
} from '@pages/reports/_shared/types'
import { studentPeople } from '@pages/reports/attendance/people'

const studentDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  {
    key: 'admissionNo',
    label: 'Admission No',
    type: 'link',
    allowsSorting: true
  },
  { key: 'rollNo', label: 'Roll No', allowsSorting: true },
  { key: 'student', label: 'Name', type: 'person', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

const makeStudentDayWiseRows = (): ReportRow[] => {
  const statuses: AttendanceStatus[] = [
    'Present',
    'Present',
    'Half Day',
    'Present',
    'Absent',
    'Late',
    'Present',
    'Present',
    'Absent',
    'Present'
  ]

  return studentPeople.slice(0, 10).map((student, index) => ({
    id: `student-day-${index}`,
    serialNo: index + 1,
    admissionNo: `AD9892${434 - index}`,
    rollNo: 35013 - index,
    student,
    attendance: statuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export const studentDayWiseConfig = makeAttendancePageConfig({
  key: 'student-day-wise',
  title: 'Student Day Wise List',
  ariaLabel: 'Student day wise',
  columns: studentDayWiseColumns,
  rows: makeStudentDayWiseRows(),
  filters: [
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Half Day'
    ])
  ],
  initialColumn: 'serialNo',
  tableMinWidth: 900
})
