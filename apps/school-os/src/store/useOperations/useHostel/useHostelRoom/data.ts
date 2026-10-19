import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { HostelRoomItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'roomNo',
    label: 'Room No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'hostelName',
    label: 'Hostel Name',
    type: 'text',
    allowsSorting: true,
    minWidth: 190
  },
  {
    key: 'roomType',
    label: 'Room Type',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'bedCount',
    label: 'No Of Bed',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'costPerBed',
    label: 'Cost Per Bed',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const hostelRoomData: HostelRoomItem[] = [
  {
    id: 'room-0',
    createdAt: '2026-05-11',
    displayId: 'HR819382',
    roomNo: 'A1',
    hostelName: 'Phoenix Residence',
    roomType: 'One Bed',
    bedCount: 1,
    costPerBed: '$200'
  },
  {
    id: 'room-1',
    createdAt: '2026-05-10',
    displayId: 'HR819381',
    roomNo: 'A2',
    hostelName: 'Tranquil Haven',
    roomType: 'One Bed AC',
    bedCount: 1,
    costPerBed: '$300'
  },
  {
    id: 'room-2',
    createdAt: '2026-05-09',
    displayId: 'HR819380',
    roomNo: 'A3',
    hostelName: 'Radiant Towers',
    roomType: 'Two Bed',
    bedCount: 2,
    costPerBed: '$400'
  },
  {
    id: 'room-3',
    createdAt: '2026-05-08',
    displayId: 'HR819379',
    roomNo: 'A4',
    hostelName: 'Nova Nest',
    roomType: 'One Bed',
    bedCount: 1,
    costPerBed: '$200'
  },
  {
    id: 'room-4',
    createdAt: '2026-05-07',
    displayId: 'HR819378',
    roomNo: 'B1',
    hostelName: 'Vista Villa',
    roomType: 'Two Bed AC',
    bedCount: 2,
    costPerBed: '$600'
  },
  {
    id: 'room-5',
    createdAt: '2026-05-06',
    displayId: 'HR819377',
    roomNo: 'B2',
    hostelName: 'Phoenix Residence',
    roomType: 'One Bed',
    bedCount: 1,
    costPerBed: '$200'
  },
  {
    id: 'room-6',
    createdAt: '2026-05-05',
    displayId: 'HR819376',
    roomNo: 'B3',
    hostelName: 'Tranquil Haven',
    roomType: 'One Bed AC',
    bedCount: 1,
    costPerBed: '$300'
  },
  {
    id: 'room-7',
    createdAt: '2026-05-11',
    displayId: 'HR819375',
    roomNo: 'B4',
    hostelName: 'Radiant Towers',
    roomType: 'Two Bed',
    bedCount: 2,
    costPerBed: '$400'
  },
  {
    id: 'room-8',
    createdAt: '2026-05-10',
    displayId: 'HR819374',
    roomNo: 'C1',
    hostelName: 'Nova Nest',
    roomType: 'One Bed',
    bedCount: 1,
    costPerBed: '$200'
  },
  {
    id: 'room-9',
    createdAt: '2026-05-09',
    displayId: 'HR819373',
    roomNo: 'C2',
    hostelName: 'Vista Villa',
    roomType: 'Two Bed AC',
    bedCount: 2,
    costPerBed: '$600'
  }
]

export const hostelRoomConfig = makeOperationPageConfig({
  key: 'hostel-room',
  title: 'Hostel Rooms',
  pageTitle: 'Hostel Rooms',
  listTitle: 'Hostel Rooms',
  addLabel: 'Add Hostel Rooms',
  ariaLabel: 'Hostel Rooms',
  breadcrumb: ['Dashboard', 'Management', 'Hostel Rooms'],
  columns,
  rows: hostelRoomData,
  filters: [
    {
      key: 'roomno',
      label: 'Room No',
      values: hostelRoomData.map(row => row.roomNo)
    },
    {
      key: 'name',
      label: 'Name',
      values: hostelRoomData.map(row => row.name as string)
    },
    {
      key: 'types',
      label: 'Types',
      values: hostelRoomData.map(row => row.hostelType as string)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: ['Room No', 'Hostel Name', 'Room Type', 'No of Bed', 'Cost']
    }
  ],
  initialColumn: 'roomNo',
  tableMinWidth: 1160
})
