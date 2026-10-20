import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type { ReportColumn, ReportRow } from '@pages/reports/_shared/types'
import {
  staffTeacherDayStatuses,
  teacherPeople
} from '@pages/reports/attendance/people'

const teacherDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  { key: 'teacherId', label: 'ID', type: 'link', allowsSorting: true },
  { key: 'person', label: 'Name', type: 'person', allowsSorting: true },
  { key: 'subject', label: 'Subject', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

const makeTeacherDayWiseRows = (): ReportRow[] => {
  const subjects = [
    'Physics',
    'Computer',
    'English',
    'Spanish',
    'Env Science',
    'Chemistry',
    'Maths',
    'Biology',
    'Economics',
    'Finance'
  ]
  return teacherPeople.map((teacher, index) => ({
    id: `teacher-day-${index}`,
    serialNo: index + 1,
    teacherId: `T8491${27 - index}`,
    person: teacher,
    subject: subjects[index],
    attendance: staffTeacherDayStatuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export const teacherDayWiseConfig = makeAttendancePageConfig({
  key: 'teacher-day-wise',
  title: 'Teacher Day Wise List',
  ariaLabel: 'Teacher day wise',
  columns: teacherDayWiseColumns,
  rows: makeTeacherDayWiseRows(),
  filters: [
    option('subject', 'Subject', [
      'Physics',
      'Computer',
      'English',
      'Spanish',
      'Env Science',
      'Chemistry',
      'Maths',
      'Biology',
      'Economics',
      'Finance'
    ]),
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
