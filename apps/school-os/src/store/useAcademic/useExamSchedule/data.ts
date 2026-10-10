import { type SortFieldOption } from '@pages/academic/shared/sort'

import type {
  ClassFormState,
  ClassRow,
  ClassStatus,
  ScheduleColumnOption
} from './types'

export { dateOptions, rowCountOptions } from '../options'

export const initialRows: ClassRow[] = [
  {
    id: 'RT167648',
    classes: 'I',
    section: 'A',
    examName: 'Monthly Test',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    date: '	13 May 2024',
    duration: '3hrs',
    subject: 'English',
    maximum: '100',
    classroom: '101',
    minimum: '35'
  },
  {
    id: 'RT167647',
    classes: 'I',
    section: 'B',
    examName: 'Monthly Test',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    date: '	14 May 2024',
    duration: '3hrs',
    subject: 'Math',
    maximum: '100',
    classroom: '104',
    minimum: '35'
  },
  {
    id: 'RT167646',
    classes: 'II',
    section: 'A',
    examName: 'Monthly Test',
    starttime: '12.00 AM',
    endtime: '01.15 PM',
    status: 'Active',

    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    date: '	15 May 2024',
    duration: '3hrs',
    subject: 'Physics',
    maximum: '100',
    classroom: '103',
    minimum: '35'
  },
  {
    id: 'RT167645',
    classes: 'II',
    section: 'B',
    examName: 'Unit Test',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    date: '	16 May 2024',
    duration: '3hrs',
    subject: 'Chemistry',
    maximum: '100',
    classroom: '105',
    minimum: '35'
  },
  {
    id: 'RT167644',
    classes: 'II',
    section: 'C',
    examName: 'Unit Test',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    date: '	17 May 2024',
    duration: '3hrs',
    subject: 'Biology',
    maximum: '100',
    classroom: '106',
    minimum: '35'
  },
  {
    id: 'RT167643',
    classes: 'III',
    section: 'A',
    examName: 'Unit Test',

    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    date: '	18 May 2024',
    duration: '3hrs',
    subject: 'Higher Math',
    maximum: '100',
    classroom: '102',
    minimum: '35'
  },
  {
    id: 'RT167642',
    classes: 'III',
    section: 'B',
    examName: 'Annual Exam',

    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    date: '	19 May 2024',
    duration: '3hrs',
    subject: 'Information Technology',
    maximum: '100',
    classroom: '107',
    minimum: '35'
  },
  {
    id: 'RT167641',
    classes: 'IV',
    section: 'A',
    examName: 'Annual Exam',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    date: '	20 May 2024',
    duration: '3hrs',
    subject: 'Moral Education',
    maximum: '100',
    classroom: '101',
    minimum: '35'
  },
  {
    id: 'RT167640',
    classes: 'IV',
    section: 'B',
    examName: 'Annual Exam',
    starttime: '12.00 PM',
    endtime: '01.15 PM',
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    date: '	21 May 2024',
    duration: '3hrs',
    subject: 'Finance',
    maximum: '100',
    classroom: '106',
    minimum: '35'
  },
  {
    id: 'RT167639',
    classes: 'V',
    section: 'A',
    examName: 'Chapter Wise Test',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    date: '	22 May 2024',
    duration: '3hrs',
    subject: 'Economics',
    maximum: '100',
    classroom: '104',
    minimum: '35'
  },
  {
    id: 'RT167638',
    classes: 'V',
    section: 'B',
    examName: 'Chapter Wise Test',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21',
    date: '	23 May 2024',
    duration: '3hrs',
    subject: 'Math',
    maximum: '100',
    classroom: '103',
    minimum: '35'
  },
  {
    id: 'RT167637',
    classes: 'III',
    section: 'A',
    examName: 'Weekly Test',

    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Inactive',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20',
    date: '	24 May 2024',
    duration: '3hrs',
    subject: 'Physics',
    maximum: '100',
    classroom: '101',
    minimum: '35'
  }
]

export const examScheduleColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 180,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'classes',
    label: 'Class',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 140
  },
  {
    key: 'section',
    label: 'Section',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 140
  },
  {
    key: 'examName',
    label: 'Exam Name',
    defaultWidth: 220,
    minWidth: 180,
    maxWidth: 280
  },
  {
    key: 'date',
    label: 'Exam Date',
    defaultWidth: 180,
    minWidth: 160,
    maxWidth: 220
  },
  {
    key: 'subject',
    label: 'Subject',
    defaultWidth: 180,
    minWidth: 150,
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
  },
  {
    key: 'duration',
    label: 'Duration',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  },
  {
    key: 'classroom',
    label: 'Room No',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'maximum',
    label: 'Max Marks',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'minimum',
    label: 'Min Marks',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  }
] as const satisfies readonly ScheduleColumnOption[]

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
  ...examScheduleColumnOptions.map(option => ({
    key: option.key,
    label: option.label,
    column: option.key
  }))
] satisfies readonly SortFieldOption[]

export const classOptions = ['I', 'II', 'III', 'IV', 'V']
export const sectionOptions = ['A', 'B', 'C', 'D', 'E']
export const examOptions = [
  'Weekly Test',
  'Monthly Test',
  'Unit Test',
  'Annual Exam',
  'Chapter Wise Test'
]
export const durationOptions = ['30', '45', '60', '90', '120', '180']
export const roomOptions = [
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110'
]

export const examdateOptions = [
  '13 May 2024',
  '14 May 2024',
  '15 May 2024',
  '16 May 2024'
]
export const subjectOptions = [
  'English',
  'Math',
  'Physics',
  'Chemistry',
  'Biology',
  'Higher Math',
  'Information Technology',
  'Moral Education',
  'Finance',
  'Economics'
]

export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  classes: '',
  section: '',
  examName: '',
  subject: '',
  date: '',
  starttime: '',
  endtime: '',
  duration: '',
  classroom: '',
  maximum: '',
  minimum: '',
  status: 'Active',
  scheduleRows: [
    {
      id: 'schedule-row-1',
      date: '',
      subject: '',
      classroom: '',
      maximum: '',
      minimum: ''
    }
  ]
}
