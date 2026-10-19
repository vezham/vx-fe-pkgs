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
    type: 'link',
    allowsSorting: true
  },
  {
    key: 'student',
    label: 'Student Name',
    type: 'person',
    allowsSorting: true
  },
  { key: 'medicalUsed', label: 'Medical Leave(10)\nUsed', allowsSorting: true },
  {
    key: 'medicalAvailable',
    label: 'Medical Leave(10)\nAvailable',
    allowsSorting: true
  },
  { key: 'casualUsed', label: 'Casual Leave(12)\nUsed', allowsSorting: true },
  {
    key: 'casualAvailable',
    label: 'Casual Leave(12)\nAvailable',
    allowsSorting: true
  },
  {
    key: 'maternityUsed',
    label: 'Maternity Leave(10)\nUsed',
    allowsSorting: true
  },
  {
    key: 'maternityAvailable',
    label: 'Maternity Leave(10)\nAvailable',
    allowsSorting: true
  },
  {
    key: 'paternityUsed',
    label: 'Paternity Leave(10)\nUsed',
    allowsSorting: true
  },
  {
    key: 'paternityAvailable',
    label: 'Paternity Leave(10)\nAvailable',
    allowsSorting: true
  },
  { key: 'specialUsed', label: 'Special Leave(10)\nUsed', allowsSorting: true },
  {
    key: 'specialAvailable',
    label: 'Special Leave(10)\nAvailable',
    allowsSorting: true
  }
]

const rows: ReportRow[] = [
  leaveRow(
    'leave-report-1',
    'AD9892434',
    'Janet',
    'https://randomuser.me/api/portraits/women/44.jpg',
    '35013',
    '2026-05-13'
  ),
  leaveRow(
    'leave-report-2',
    'AD9892433',
    'Joann',
    'https://randomuser.me/api/portraits/men/32.jpg',
    '35012',
    '2026-05-12'
  ),
  leaveRow(
    'leave-report-3',
    'AD9892432',
    'Kathleen',
    'https://randomuser.me/api/portraits/women/68.jpg',
    '35011',
    '2026-05-11'
  ),
  leaveRow(
    'leave-report-4',
    'AD9892431',
    'Gifford',
    'https://randomuser.me/api/portraits/men/53.jpg',
    '35010',
    '2026-05-10'
  ),
  leaveRow(
    'leave-report-5',
    'AD9892430',
    'Lisa',
    'https://randomuser.me/api/portraits/women/17.jpg',
    '35009',
    '2026-05-09'
  ),
  leaveRow(
    'leave-report-6',
    'AD9892429',
    'Ralph',
    'https://randomuser.me/api/portraits/men/12.jpg',
    '35008',
    '2026-05-09'
  ),
  leaveRow(
    'leave-report-7',
    'AD9892428',
    'Julie',
    'https://randomuser.me/api/portraits/women/8.jpg',
    '35007',
    '2026-05-09'
  ),
  leaveRow(
    'leave-report-8',
    'AD9892427',
    'Ryan',
    'https://randomuser.me/api/portraits/men/9.jpg',
    '35006',
    '2026-05-09'
  ),
  leaveRow(
    'leave-report-9',
    'AD9892426',
    'Susan',
    'https://randomuser.me/api/portraits/women/28.jpg',
    '35004',
    '2026-05-09'
  ),
  leaveRow(
    'leave-report-10',
    'AD9892425',
    'Richard',
    'https://randomuser.me/api/portraits/men/41.jpg',
    '35003',
    '2026-05-09'
  )
]

export const leaveReportsConfig = makeAttendancePageConfig({
  key: 'leave-reports',
  title: 'Leave Report List',
  ariaLabel: 'Leave reports',
  columns,
  rows,
  filters: [
    option('medicalUsed', 'Medical used', ['2']),
    option('casualUsed', 'Casual used', ['4'])
  ],
  initialColumn: 'admissionNo',
  tableMinWidth: 1500
})

function leaveRow(
  id: string,
  admissionNo: string,
  name: string,
  avatar: string,
  rollNo: string,
  createdAt: string
): ReportRow {
  return {
    id,
    admissionNo,
    student: person(name, avatar, `Roll No : ${rollNo}`),
    medicalUsed: 2,
    medicalAvailable: 8,
    casualUsed: 4,
    casualAvailable: 8,
    maternityUsed: 0,
    maternityAvailable: 10,
    paternityUsed: 0,
    paternityAvailable: 10,
    specialUsed: 0,
    specialAvailable: 10,
    createdAt
  }
}

function person(
  name: string,
  avatar: string,
  description?: string
): PersonValue {
  return { name, avatar, description }
}
