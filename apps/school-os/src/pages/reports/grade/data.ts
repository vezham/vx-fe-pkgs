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
  { key: 'english', label: 'English', allowsSorting: true },
  { key: 'spanish', label: 'Spanish', allowsSorting: true },
  { key: 'physics', label: 'Physics', allowsSorting: true },
  { key: 'chemistry', label: 'Chemistry', allowsSorting: true },
  { key: 'maths', label: 'Maths', allowsSorting: true },
  { key: 'computer', label: 'Computer', allowsSorting: true },
  { key: 'envScience', label: 'Env Science', allowsSorting: true },
  { key: 'total', label: 'Total', allowsSorting: true },
  { key: 'percent', label: 'Percent(%)', allowsSorting: true },
  { key: 'grade', label: 'Grade', type: 'grade', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'grade-report-1',
    admissionNo: 'AD9892434',
    student: person(
      'Janet',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'Roll No : 35013'
    ),
    english: 95,
    spanish: 93,
    physics: 88,
    chemistry: 90,
    maths: 85,
    computer: 98,
    envScience: 95,
    total: 644,
    percent: 92,
    grade: 'O',
    createdAt: '2026-05-13'
  },
  {
    id: 'grade-report-2',
    admissionNo: 'AD9892433',
    student: person(
      'Joann',
      'https://randomuser.me/api/portraits/men/32.jpg',
      'Roll No : 35012'
    ),
    english: 30,
    spanish: 35,
    physics: 36,
    chemistry: 28,
    maths: 38,
    computer: 40,
    envScience: 37,
    total: 244,
    percent: 34,
    grade: 'F',
    createdAt: '2026-05-12'
  },
  {
    id: 'grade-report-3',
    admissionNo: 'AD9892432',
    student: person(
      'Kathleen',
      'https://randomuser.me/api/portraits/women/68.jpg',
      'Roll No : 35011'
    ),
    english: 70,
    spanish: 80,
    physics: 85,
    chemistry: 78,
    maths: 82,
    computer: 83,
    envScience: 80,
    total: 558,
    percent: 79,
    grade: 'A',
    createdAt: '2026-05-11'
  },
  {
    id: 'grade-report-4',
    admissionNo: 'AD9892431',
    student: person(
      'Gifford',
      'https://randomuser.me/api/portraits/men/53.jpg',
      'Roll No : 35010'
    ),
    english: 60,
    spanish: 68,
    physics: 65,
    chemistry: 70,
    maths: 67,
    computer: 72,
    envScience: 75,
    total: 477,
    percent: 68,
    grade: 'B+',
    createdAt: '2026-05-10'
  },
  {
    id: 'grade-report-5',
    admissionNo: 'AD9892430',
    student: person(
      'Lisa',
      'https://randomuser.me/api/portraits/women/17.jpg',
      'Roll No : 35009'
    ),
    english: 36,
    spanish: 30,
    physics: 40,
    chemistry: 38,
    maths: 50,
    computer: 48,
    envScience: 43,
    total: 285,
    percent: 40,
    grade: 'F',
    createdAt: '2026-05-09'
  },
  {
    id: 'grade-report-6',
    admissionNo: 'AD9892429',
    student: person(
      'Ralph',
      'https://randomuser.me/api/portraits/men/12.jpg',
      'Roll No : 35008'
    ),
    english: 43,
    spanish: 50,
    physics: 62,
    chemistry: 70,
    maths: 65,
    computer: 58,
    envScience: 60,
    total: 408,
    percent: 58,
    grade: 'B',
    createdAt: '2026-05-09'
  },
  {
    id: 'grade-report-7',
    admissionNo: 'AD9892428',
    student: person(
      'Julie',
      'https://randomuser.me/api/portraits/women/8.jpg',
      'Roll No : 35007'
    ),
    english: 72,
    spanish: 80,
    physics: 75,
    chemistry: 78,
    maths: 84,
    computer: 87,
    envScience: 76,
    total: 552,
    percent: 78,
    grade: 'A',
    createdAt: '2026-05-09'
  },
  {
    id: 'grade-report-8',
    admissionNo: 'AD9892427',
    student: person(
      'Ryan',
      'https://randomuser.me/api/portraits/men/9.jpg',
      'Roll No : 35006'
    ),
    english: 40,
    spanish: 48,
    physics: 42,
    chemistry: 47,
    maths: 32,
    computer: 58,
    envScience: 50,
    total: 317,
    percent: 45,
    grade: 'F',
    createdAt: '2026-05-09'
  },
  {
    id: 'grade-report-9',
    admissionNo: 'AD9892426',
    student: person(
      'Susan',
      'https://randomuser.me/api/portraits/women/28.jpg',
      'Roll No : 35004'
    ),
    english: 60,
    spanish: 62,
    physics: 65,
    chemistry: 70,
    maths: 72,
    computer: 63,
    envScience: 78,
    total: 470,
    percent: 67,
    grade: 'B+',
    createdAt: '2026-05-09'
  },
  {
    id: 'grade-report-10',
    admissionNo: 'AD9892425',
    student: person(
      'Richard',
      'https://randomuser.me/api/portraits/men/41.jpg',
      'Roll No : 35003'
    ),
    english: 72,
    spanish: 78,
    physics: 85,
    chemistry: 83,
    maths: 86,
    computer: 90,
    envScience: 92,
    total: 586,
    percent: 83,
    grade: 'A+',
    createdAt: '2026-05-09'
  }
]

export const gradeReportsConfig = makeAttendancePageConfig({
  key: 'grade-reports',
  title: 'Grade Report List',
  ariaLabel: 'Grade reports',
  columns,
  rows,
  filters: [option('grade', 'Grade', ['O', 'A+', 'A', 'B+', 'B', 'F'])],
  initialColumn: 'admissionNo',
  tableMinWidth: 1320
})

function person(
  name: string,
  avatar: string,
  description?: string
): PersonValue {
  return { name, avatar, description }
}
