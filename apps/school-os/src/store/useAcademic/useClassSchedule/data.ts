import type {
  ClassFormState,
  ClassScheduleColumnOption,
  ClassScheduleItem,
  ClassStatus,
  SortOption
} from './types'

export { dateOptions, sortOrderOptions, rowCountOptions } from '../options'

const classScheduleData: ClassScheduleItem[] = [
  {
    id: 'S148239',
    type: 'Class',
    starttime: '09.30 AM',
    endtime: '01.30 PM',
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'S148238',
    type: 'Class',
    starttime: '10.30 AM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30'
  },
  {
    id: 'S148237',
    type: 'Class',
    starttime: '11.30 AM',
    endtime: '03.30 PM',
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'S148236',
    type: 'Class',
    starttime: '12.30 PM',
    endtime: '04.30 PM',
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'S148235',
    type: 'Class',
    starttime: '01.30 PM',
    endtime: '04.30 PM',
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'S148234',
    type: 'Class',
    starttime: '10.30 AM',
    endtime: '04.30 PM',
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'S148233',
    type: 'Class',
    starttime: '11.30 AM',
    endtime: '12.30 PM',
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'S148232',
    type: 'Class',
    starttime: '12.30 PM',
    endtime: '04.30 PM',
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'S148231',
    type: 'Class',
    starttime: '01.30 PM',
    endtime: '04.30 PM',
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'S148230',
    type: 'Class',
    starttime: '02.30 PM',
    endtime: '05.30 PM',
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
  },
  {
    id: 'S148228',
    type: 'Class',
    starttime: '10.30 AM',
    endtime: '02.30 PM',
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21'
  },
  {
    id: 'S148229',
    type: 'Class',
    starttime: '11.30 AM',
    endtime: '03.30 PM',
    status: 'Inactive',
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

export const scheduleColumnOptions = [
  {
    key: 'id',
    label: 'ID',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
  },
  {
    key: 'type',
    label: 'Type',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 180
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
    key: 'status',
    label: 'Status',
    defaultWidth: 140,
    minWidth: 120,
    maxWidth: 160
  }
] as const satisfies readonly ClassScheduleColumnOption[]

export const typeOptions = ['Class']
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
export const statusOptions: ClassStatus[] = ['Active', 'Inactive']

export const emptyForm: ClassFormState = {
  type: '',
  starttime: '',
  endtime: '',
  status: 'Active'
}

export { classScheduleData as initialRows }
