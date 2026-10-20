import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'

import type { ReportColumn, ReportRow } from './types'

export {
  dateOptions,
  emptyStatusLegend as statusLegend,
  rowCountOptions
} from '@pages/reports/_shared/attendance-options'

const columns: ReportColumn[] = [
  { key: 'displayId', label: 'ID', allowsSorting: true },
  { key: 'className', label: 'Class', allowsSorting: true },
  { key: 'section', label: 'Section', allowsSorting: true },
  { key: 'students', label: 'No Of Students', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'class-report-1',
    displayId: '',
    className: 'I',
    section: 'A',
    students: 30,
    createdAt: '2026-05-13'
  },
  {
    id: 'class-report-2',
    displayId: '',
    className: 'I',
    section: 'B',
    students: 25,
    createdAt: '2026-05-12'
  },
  {
    id: 'class-report-3',
    displayId: '',
    className: 'II',
    section: 'A',
    students: 40,
    createdAt: '2026-05-11'
  },
  {
    id: 'class-report-4',
    displayId: '',
    className: 'II',
    section: 'B',
    students: 35,
    createdAt: '2026-05-10'
  },
  {
    id: 'class-report-5',
    displayId: '',
    className: 'II',
    section: 'C',
    students: 25,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-6',
    displayId: '',
    className: 'III',
    section: 'A',
    students: 30,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-7',
    displayId: '',
    className: 'III',
    section: 'B',
    students: 25,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-8',
    displayId: '',
    className: 'IV',
    section: 'A',
    students: 20,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-9',
    displayId: '',
    className: 'IV',
    section: 'B',
    students: 30,
    createdAt: '2026-05-09'
  },
  {
    id: 'class-report-10',
    displayId: '',
    className: 'V',
    section: 'A',
    students: 35,
    createdAt: '2026-05-09'
  }
]

export const classReportsConfig = makeAttendancePageConfig({
  key: 'class-reports',
  title: 'Class Report List',
  ariaLabel: 'Class reports',
  columns,
  rows,
  filters: [
    option('className', 'Class name', ['I', 'II', 'III', 'IV', 'V']),
    option('section', 'Section', ['A', 'B', 'C'])
  ],
  initialColumn: 'className',
  tableMinWidth: 980,
  actionLabel: 'View Details'
})
