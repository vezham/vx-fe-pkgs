import type { ClassFormState, HomeworkItem, SortOption } from './types'

export const homeworkData: HomeworkItem[] = [
  {
    id: 'HW1783929',
    classes: 'I',
    homeworkdate: '10 May 2024',
    submissiondate: '12 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Janet',
      secondaryText: 'Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'HW1783928',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30',
    classes: 'II',
    homeworkdate: '11 May 2024',
    submissiondate: '13 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Joann',
      secondaryText: 'Math Teacher'
    },
    section: 'B',
    subject: 'English'
  },
  {
    id: 'HW1783927',
    classes: 'III',
    homeworkdate: '12 May 2024',
    submissiondate: '14 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Kathleen',
      secondaryText: 'Physics Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'HW1783926',
    classes: 'IV',
    homeworkdate: '13 May 2024',
    submissiondate: '15 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Gifford',
      secondaryText: 'Chemistry Teacher'
    },
    section: 'B',
    subject: 'English',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'HW1783925',
    classes: 'V',
    homeworkdate: '14 May 2024',
    submissiondate: '16 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Lisa',
      secondaryText: 'Biology Teacher'
    },
    section: 'C',
    subject: 'English',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'HW1783924',
    classes: 'I',
    homeworkdate: '15 May 2024',
    submissiondate: '17 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Ralph',
      secondaryText: 'Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'HW1783923',
    classes: 'II',
    homeworkdate: '16 May 2024',
    submissiondate: '18 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Julie',
      secondaryText: 'IT Teacher'
    },
    section: 'B',
    subject: 'English',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'HW1783922',
    classes: 'III',
    homeworkdate: '17 May 2024',
    submissiondate: '19 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Ryan',
      secondaryText: 'Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'HW1783921',
    classes: 'IV',
    homeworkdate: '18 May 2024',
    submissiondate: '20 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Susan',
      secondaryText: 'Finance Teacher'
    },
    section: 'B',
    subject: 'English',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'HW1783920',
    classes: 'IV',
    homeworkdate: '19 May 2024',
    submissiondate: '21 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Richard',
      secondaryText: 'Economics Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
  },
  {
    id: 'HW1783919',
    classes: 'V',
    homeworkdate: '20 May 2024',
    submissiondate: '22 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Martha',
      secondaryText: 'Teacher'
    },
    section: 'C',
    subject: 'English',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21'
  },
  {
    id: 'HW1783918',
    classes: 'III',
    homeworkdate: '21 May 2024',
    submissiondate: '23 May 2024',
    status: 'Active',
    createdBy: {
      name: 'Albert',
      secondaryText: 'Teacher'
    },
    section: 'A',
    subject: 'English',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20'
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

export const classOptions = ['I', 'II', 'III', 'IV', 'V']
export const sectionOptions = ['A', 'B', 'C', 'D', 'E']
export const subjectOptions = [
  'English',
  'Maths',
  'Physics',
  'Chemistry',
  'Biology'
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

export const homeworkColumnOptions = [
  {
    key: 'classes',
    label: 'Class',
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 180
  },
  {
    key: 'homeworkdate',
    label: 'Homework Date',
    defaultWidth: 160,
    minWidth: 140,
    maxWidth: 220
  },
  {
    key: 'submissiondate',
    label: 'Submission Date',
    defaultWidth: 180,
    minWidth: 150,
    maxWidth: 240
  },
  {
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  }
] as const

export const emptyForm: ClassFormState = {
  classes: '',
  section: '',
  subject: '',
  homeworkdate: '',
  submissiondate: '',
  status: 'Active',
  date: '',
  attachments: ''
}
