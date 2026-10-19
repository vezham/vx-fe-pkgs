import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'

import type { PersonValue, ReportColumn, ReportRow } from './types'

export {
  dateOptions,
  emptyStatusLegend as statusLegend,
  rowCountOptions
} from '@pages/reports/_shared/attendance-options'

const columns: ReportColumn[] = [
  {
    key: 'admissionNo',
    label: 'Admission No',
    allowsSorting: true,
    type: 'link'
  },
  { key: 'rollNo', label: 'Roll No', allowsSorting: true },
  { key: 'student', label: 'Name', type: 'person', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'section', label: 'Section', allowsSorting: true },
  { key: 'gender', label: 'Gender', allowsSorting: true },
  { key: 'parent', label: 'Parent', type: 'person', allowsSorting: true },
  { key: 'joinDate', label: 'Date Of Join', allowsSorting: true },
  { key: 'dob', label: 'DOB', allowsSorting: true },
  { key: 'status', label: 'Status', type: 'badge', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'student-report-1',
    admissionNo: 'AD9892434',
    rollNo: '35013',
    student: person('Janet', 'https://randomuser.me/api/portraits/men/41.jpg'),
    className: 'I',
    section: 'A',
    gender: 'Female',
    parent: person(
      'Thomas',
      'https://randomuser.me/api/portraits/women/44.jpg'
    ),
    joinDate: '25 Mar 2024',
    dob: '10 Jan 2015',
    status: 'Active',
    createdAt: '2026-05-13'
  },
  {
    id: 'student-report-2',
    admissionNo: 'AD9892433',
    rollNo: '35012',
    student: person(
      'Joann',
      'https://randomuser.me/api/portraits/women/28.jpg'
    ),
    className: 'I',
    section: 'A',
    gender: 'Male',
    parent: person(
      'Marquita',
      'https://randomuser.me/api/portraits/men/32.jpg'
    ),
    joinDate: '18 Mar 2024',
    dob: '19 Aug 2014',
    status: 'Active',
    createdAt: '2026-05-12'
  },
  {
    id: 'student-report-3',
    admissionNo: 'AD9892432',
    rollNo: '35011',
    student: person(
      'Kathleen',
      'https://randomuser.me/api/portraits/women/68.jpg'
    ),
    className: 'I',
    section: 'A',
    gender: 'Female',
    parent: person(
      'Johnson',
      'https://randomuser.me/api/portraits/women/17.jpg'
    ),
    joinDate: '14 Mar 2024',
    dob: '05 Dec 2017',
    status: 'Active',
    createdAt: '2026-05-11'
  },
  {
    id: 'student-report-4',
    admissionNo: 'AD9892431',
    rollNo: '35010',
    student: person(
      'Gifford',
      'https://randomuser.me/api/portraits/women/8.jpg'
    ),
    className: 'I',
    section: 'A',
    gender: 'Male',
    parent: person('Claudia', 'https://randomuser.me/api/portraits/men/53.jpg'),
    joinDate: '27 Feb 2024',
    dob: '22 Mar 2018',
    status: 'Active',
    createdAt: '2026-05-10'
  },
  {
    id: 'student-report-5',
    admissionNo: 'AD9892430',
    rollNo: '35009',
    student: person('Lisa', 'https://randomuser.me/api/portraits/men/12.jpg'),
    className: 'I',
    section: 'A',
    gender: 'Female',
    parent: person(
      'Arthur',
      'https://randomuser.me/api/portraits/women/55.jpg'
    ),
    joinDate: '13 Feb 2024',
    dob: '13 May 2017',
    status: 'Inactive',
    createdAt: '2026-05-09'
  },
  {
    id: 'student-report-6',
    admissionNo: 'AD9892429',
    rollNo: '35008',
    student: person('Lisa', 'https://randomuser.me/api/portraits/women/17.jpg'),
    className: 'I',
    section: 'A',
    gender: 'Male',
    parent: person('Colleen', 'https://randomuser.me/api/portraits/men/46.jpg'),
    joinDate: '11 Feb 2024',
    dob: '20 Jun 2015',
    status: 'Active',
    createdAt: '2026-05-09'
  },
  {
    id: 'student-report-7',
    admissionNo: 'AD9892428',
    rollNo: '35007',
    student: person(
      'Julie',
      'https://randomuser.me/api/portraits/women/44.jpg'
    ),
    className: 'I',
    section: 'A',
    gender: 'Female',
    parent: person('Robert', 'https://randomuser.me/api/portraits/men/20.jpg'),
    joinDate: '24 Jan 2024',
    dob: '18 Sep 2013',
    status: 'Active',
    createdAt: '2026-05-09'
  },
  {
    id: 'student-report-8',
    admissionNo: 'AD9892427',
    rollNo: '35006',
    student: person('Ryan', 'https://randomuser.me/api/portraits/women/68.jpg'),
    className: 'I',
    section: 'A',
    gender: 'Male',
    parent: person('Jessie', 'https://randomuser.me/api/portraits/men/32.jpg'),
    joinDate: '19 Jan 2024',
    dob: '26 Nov 2012',
    status: 'Active',
    createdAt: '2026-05-09'
  },
  {
    id: 'student-report-9',
    admissionNo: 'AD9892426',
    rollNo: '35005',
    student: person('Susan', 'https://randomuser.me/api/portraits/men/32.jpg'),
    className: 'I',
    section: 'A',
    gender: 'Female',
    parent: person(
      'Michael',
      'https://randomuser.me/api/portraits/women/8.jpg'
    ),
    joinDate: '08 Jan 2024',
    dob: '26 May 2010',
    status: 'Inactive',
    createdAt: '2026-05-09'
  },
  {
    id: 'student-report-10',
    admissionNo: 'AD9892425',
    rollNo: '35004',
    student: person(
      'Richard',
      'https://randomuser.me/api/portraits/women/44.jpg'
    ),
    className: 'I',
    section: 'A',
    gender: 'Male',
    parent: person('Mary', 'https://randomuser.me/api/portraits/men/12.jpg'),
    joinDate: '22 Dec 2024',
    dob: '06 Oct 2011',
    status: 'Active',
    createdAt: '2026-05-09'
  }
]

export const studentReportsConfig = makeAttendancePageConfig({
  key: 'student-reports',
  title: 'Student Report List',
  ariaLabel: 'Student reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('status', 'Status', ['Active', 'Inactive'])
  ],
  initialColumn: 'admissionNo',
  tableMinWidth: 1280
})

function person(
  name: string,
  avatar: string,
  description?: string
): PersonValue {
  return { name, avatar, description }
}
