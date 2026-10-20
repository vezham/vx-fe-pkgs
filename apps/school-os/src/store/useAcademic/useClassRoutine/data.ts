import type {
  ClassFormState,
  ClassRoutineColumnOption,
  ClassRoutineItem,
  SortOption
} from './types'

export { dateOptions, sortOrderOptions, rowCountOptions } from '../options'

export const classRoutineData: ClassRoutineItem[] = [
  {
    id: 'RT167648',
    classes: 'I',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01',
    section: 'A',
    teacher: 'Erickson',
    subject: 'English',
    day: 'Monday',
    classroom: '101'
  },
  {
    id: 'RT167647',
    classes: 'I',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    section: 'B',
    teacher: 'Mori',
    subject: 'Math',
    day: 'Tuesday',
    classroom: '102'
  },
  {
    id: 'RT167646',
    classes: 'II',
    starttime: '12.00 AM',
    endtime: '01.15 PM',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29',
    section: 'A',
    teacher: 'Joseph',
    subject: 'Physics',
    day: 'Wednesday',
    classroom: '103'
  },
  {
    id: 'RT167645',
    classes: 'II',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28',
    section: 'B',
    teacher: 'James',
    subject: 'Chemistry',
    day: 'Thursday',
    classroom: '104'
  },
  {
    id: 'RT167644',
    classes: 'II',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27',
    section: 'C',
    teacher: 'Federi',
    subject: 'Biology',
    day: 'Friday',
    classroom: '105'
  },
  {
    id: 'RT167643',
    classes: 'III',
    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26',
    section: 'A',
    teacher: 'Teresa',
    subject: 'Higher Math',
    day: 'Saturday',
    classroom: '106'
  },
  {
    id: 'RT167642',
    classes: 'III',
    starttime: '09.30 AM',
    endtime: '10.45 PM',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25',
    section: 'B',
    teacher: 'James',
    subject: 'Information Technology',
    day: 'Monday',
    classroom: '107'
  },
  {
    id: 'RT167641',
    classes: 'IV',
    starttime: '10.45 AM',
    endtime: '12.00 PM',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24',
    section: 'A',
    teacher: 'Hendrita',
    subject: 'Moral Education',
    day: 'Tuesday',
    classroom: '108'
  },
  {
    id: 'RT167640',
    classes: 'IV',
    starttime: '12.00 PM',
    endtime: '01.15 PM',
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23',
    section: 'B',
    teacher: 'Morgan',
    subject: 'Finance',
    day: 'Wednesday',
    classroom: '109'
  },
  {
    id: 'RT167639',
    classes: 'V',
    starttime: '01.15 PM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22',
    section: 'A',
    teacher: 'Ramsey',
    subject: 'Economics',
    day: 'Thursday',
    classroom: '110'
  },
  {
    id: 'RT167638',
    classes: 'V',
    starttime: '02.30 PM',
    endtime: '03.45 PM',
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21',
    section: 'B',
    teacher: 'Henry',
    subject: 'Math',
    day: 'Friday',
    classroom: '111'
  },
  {
    id: 'RT167637',
    classes: 'III',
    starttime: '03.45 PM',
    endtime: '05.00 PM',
    status: 'Inactive',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20',
    section: 'A',
    teacher: 'Jordan',
    subject: 'Physics',
    day: 'Saturday',
    classroom: '112'
  }
]

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
  }
] as const satisfies readonly SortOption[]

export const classRoutineColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180,
    isRowHeader: true
  },
  {
    key: 'classes',
    label: 'Class',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 180
  },
  {
    key: 'section',
    label: 'Section',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 160
  },
  {
    key: 'teacher',
    label: 'Teacher',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 240
  },
  {
    key: 'subject',
    label: 'Subject',
    defaultWidth: 200,
    minWidth: 160,
    maxWidth: 280
  },
  {
    key: 'day',
    label: 'Day',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 150
  },
  {
    key: 'starttime',
    label: 'Start Time',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'endtime',
    label: 'End Time',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'classroom',
    label: 'Classroom',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  }
] as const satisfies readonly ClassRoutineColumnOption[]

export const classOptions = ['I', 'II', 'III', 'IV', 'V']
export const sectionOptions = ['A', 'B', 'C', 'D', 'E']
export const teacherOptions = [
  'Erickson',
  'Joseph',
  'James',
  'Henry',
  'Fathima'
]
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
export const dayOptions = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export const emptyForm: ClassFormState = {
  classes: '',
  subject: '',
  section: '',
  teacher: '',
  day: '',
  classroom: '',
  starttime: '',
  endtime: '',
  status: 'Active'
}
