import { type SortFieldOption } from '@pages/academic/shared/sort'

import type { ClassFormState, ClassRow, ExamColumnOption } from './types'

export { dateOptions, rowCountOptions } from '../options'

export const initialRows: ClassRow[] = [
  {
    id: 'E140523',
    name: 'Weekly Test',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    date: '	13 May 2024'
  },
  {
    id: 'E140522',
    name: 'Monthly Test',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    date: '27 May 2024'
  },
  {
    id: 'E140521',
    name: 'Chapter Wise Test',
    starttime: '12.00 AM',
    endtime: '01.15 PM',
    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    date: '	05 Jun 2024'
  },
  {
    id: 'E140520',
    name: 'Unit Test',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    date: '	15 Jun 2024'
  },
  {
    id: 'E140519',
    name: 'Progress Test',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    date: '	20 Jun 2024'
  },
  {
    id: 'E140518',
    name: 'Oral Test',
    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    date: '	03 Jul 2024'
  },
  {
    id: 'E140517',
    name: 'Semester Exam',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    date: '	18 Jul 2024'
  },
  {
    id: 'E140516',
    name: 'Quarterly Exam',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    date: '	26 Aug 2024'
  },
  {
    id: 'E140515',
    name: 'Half yearly Exam',
    starttime: '12.00 PM',
    endtime: '01.15 PM',
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    date: '	15 Nov 2024'
  },
  {
    id: 'E140514',
    name: 'Anuual Exam',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    date: '	10 Mar 2025'
  }
]

export const examColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'name',
    label: 'Exam Name',
    defaultWidth: 240,
    minWidth: 180,
    maxWidth: 320
  },
  {
    key: 'date',
    label: 'Exam Date',
    defaultWidth: 180,
    minWidth: 160,
    maxWidth: 220
  },
  {
    key: 'starttime',
    label: 'Start Time',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 200
  },
  {
    key: 'endtime',
    label: 'End Time',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 200
  }
] as const satisfies readonly ExamColumnOption[]

export const sortOptions = [
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    column: 'viewedAt'
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    column: 'createdAt'
  },
  ...examColumnOptions.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
] satisfies readonly SortFieldOption[]

export const examOptions = [
  'Weekly Test',
  'Monthly Test',
  'Unit Test',
  'Annual Exam',
  'Chapter Wise Test'
]
export const examdateOptions = [
  '13 May 2024',
  '27 May 2024',
  '17 Jul 2024',
  '20 Aug 2024'
]

export const starttimeOptions = [
  '09.30 AM',
  '10.30 AM',
  '11.30 AM',
  '12.30 PM',
  '01.30 PM',
  '02.30 PM'
]
export const endtimeOptions = [
  '12.30 PM',
  '01.30 PM',
  '02.30 PM',
  '03.30 PM',
  '04.30 PM',
  '05.30 PM'
]
export const emptyForm: ClassFormState = {
  name: '',
  date: '',
  starttime: '',
  endtime: '',
  status: 'Active'
}
