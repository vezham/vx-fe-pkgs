import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type { ReportColumn, ReportRow } from '@pages/reports/_shared/types'
import { person, studentPeople } from '@pages/reports/attendance/people'

const parentPeople = [
  person('Mary', 'https://randomuser.me/api/portraits/women/6.jpg'),
  person('Michael', 'https://randomuser.me/api/portraits/men/6.jpg'),
  person('Jessie', 'https://randomuser.me/api/portraits/women/40.jpg'),
  person('Robert', 'https://randomuser.me/api/portraits/men/20.jpg'),
  person('Colleen', 'https://randomuser.me/api/portraits/women/22.jpg'),
  person('Arthur', 'https://randomuser.me/api/portraits/men/46.jpg'),
  person('Claudia', 'https://randomuser.me/api/portraits/women/24.jpg'),
  person('Johnson', 'https://randomuser.me/api/portraits/men/54.jpg'),
  person('Marquita', 'https://randomuser.me/api/portraits/women/77.jpg'),
  person('Thomas', 'https://randomuser.me/api/portraits/men/67.jpg')
]

const studentAttendanceTypeColumns: ReportColumn[] = [
  {
    key: 'admissionNo',
    label: 'Admission No',
    type: 'link',
    allowsSorting: true
  },
  { key: 'admissionDate', label: 'Date of Admission', allowsSorting: true },
  {
    key: 'student',
    label: 'Student Name',
    type: 'person',
    allowsSorting: true
  },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'dob', label: 'Date of Birth', allowsSorting: true },
  { key: 'parent', label: 'Parent Name', type: 'person', allowsSorting: true },
  { key: 'count', label: 'Count', allowsSorting: true }
]

const makeStudentsAttendanceTypeRows = (): ReportRow[] => {
  const admissionDates = [
    '25 Mar 2024',
    '18 Mar 2024',
    '14 Mar 2024',
    '27 Feb 2024',
    '13 Feb 2024',
    '11 Feb 2024',
    '24 Jan 2024',
    '19 Jan 2024',
    '08 Jan 2024',
    '22 Dec 2024',
    '15 Dec 2024'
  ]
  const classes = [
    'III',
    'IV',
    'II',
    'I',
    'II',
    'III',
    'V',
    'VI',
    'VIII',
    'VII',
    'IX'
  ]
  const birthDates = [
    '10 Jan 2015',
    '19 Aug 2014',
    '05 Dec 2017',
    '22 Mar 2018',
    '13 May 2017',
    '20 Jun 2015',
    '18 Sep 2013',
    '26 Nov 2012',
    '26 May 2010',
    '06 Oct 2011',
    '27 Dec 2009'
  ]
  const counts = [22, 15, 24, 22, 22, 24, 24, 24, 24, 24, 24]

  return studentPeople.map((student, index) => ({
    id: `student-type-${index}`,
    admissionNo: `AD9892${434 - index}`,
    admissionDate: admissionDates[index],
    student,
    className: classes[index],
    dob: birthDates[index],
    parent: parentPeople[index % parentPeople.length],
    count: counts[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export const studentsAttendanceTypeConfig = makeAttendancePageConfig({
  key: 'students-attendance-type',
  title: 'Students Attendance Type List',
  ariaLabel: 'Students attendance type',
  columns: studentAttendanceTypeColumns,
  rows: makeStudentsAttendanceTypeRows(),
  filters: [
    option('className', 'Class', [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ]),
    option('count', 'Count', ['15', '22', '24'])
  ],
  initialColumn: 'admissionNo',
  tableMinWidth: 960
})
