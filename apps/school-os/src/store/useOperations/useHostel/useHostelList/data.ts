import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { HostelListItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'hostelName',
    label: 'Hostel Name',
    type: 'text',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'hostelType',
    label: 'Hostel Type',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'address',
    label: 'Address',
    type: 'text',
    allowsSorting: true,
    minWidth: 260
  },
  {
    key: 'intake',
    label: 'Intake',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    allowsSorting: true,
    minWidth: 320
  }
]

export const hostelListData: HostelListItem[] = [
  {
    id: 'hostel-0',
    createdAt: '2026-05-11',
    displayId: 'H823828',
    hostelName: 'Phoenix Residence',
    hostelType: 'Boys',
    address: '2233 Wood Street, Slidell, LA',
    intake: 150,
    description: 'Rising to nurture young minds'
  },
  {
    id: 'hostel-1',
    createdAt: '2026-05-10',
    displayId: 'H823827',
    hostelName: 'Tranquil Haven',
    hostelType: 'Girls',
    address: 'School Campus',
    intake: 200,
    description: 'Illuminating minds with knowledge and warmth'
  },
  {
    id: 'hostel-2',
    createdAt: '2026-05-09',
    displayId: 'H823826',
    hostelName: 'Radiant Towers',
    hostelType: 'Boys',
    address: 'School Campus',
    intake: 180,
    description: 'A nestling ground for budding intellectuals to thrive'
  },
  {
    id: 'hostel-3',
    createdAt: '2026-05-08',
    displayId: 'H823825',
    hostelName: 'Nova Nest',
    hostelType: 'Girls',
    address: '3167 Stadium Drive, Worcester, MA',
    intake: 180,
    description: 'Rising to nurture young minds'
  },
  {
    id: 'hostel-4',
    createdAt: '2026-05-07',
    displayId: 'H823824',
    hostelName: 'Vista Villa',
    hostelType: 'Boys',
    address: 'School Campus',
    intake: 250,
    description: 'Illuminating minds with knowledge and warmth'
  },
  {
    id: 'hostel-5',
    createdAt: '2026-05-06',
    displayId: 'H823823',
    hostelName: 'Zenith Zone',
    hostelType: 'Girls',
    address: 'School Campus',
    intake: 150,
    description: 'A nestling ground for budding intellectuals to thrive'
  },
  {
    id: 'hostel-6',
    createdAt: '2026-05-05',
    displayId: 'H823822',
    hostelName: 'Summit Springs',
    hostelType: 'Boys',
    address: '2261 Sweetwood Drive, Denver, CO',
    intake: 300,
    description: 'Rising to nurture young minds'
  },
  {
    id: 'hostel-7',
    createdAt: '2026-05-11',
    displayId: 'H823821',
    hostelName: 'Beacon Breeze',
    hostelType: 'Girls',
    address: 'School Campus',
    intake: 280,
    description: 'Illuminating minds with knowledge and warmth'
  },
  {
    id: 'hostel-8',
    createdAt: '2026-05-10',
    displayId: 'H823820',
    hostelName: 'Empyrean Estate',
    hostelType: 'Boys',
    address: 'School Campus',
    intake: 200,
    description: 'A nestling ground for budding intellectuals to thrive'
  },
  {
    id: 'hostel-9',
    createdAt: '2026-05-09',
    displayId: 'H823819',
    hostelName: 'Nexus Nook',
    hostelType: 'Girls',
    address: '2603 Wood Duck Drive Marquette, MI',
    intake: 350,
    description: 'Rising to nurture young minds'
  }
]

export const hostelListConfig = makeOperationPageConfig({
  key: 'hostel-list',
  title: 'Hostel',
  pageTitle: 'Hostel',
  listTitle: 'Hostel',
  addLabel: 'Add Hostel',
  ariaLabel: 'Hostel',
  breadcrumb: ['Dashboard', 'Management', 'Hostel'],
  columns,
  rows: hostelListData,
  filters: [
    {
      key: 'name',
      label: 'Name',
      values: hostelListData.map(row => row.name as string)
    },
    {
      key: 'types',
      label: 'Types',
      values: hostelListData.map(row => row.hostelType)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: ['Hostel Name', 'Hostel Type', 'Address', 'InTake', 'Description']
    }
  ],
  initialColumn: 'hostelName',
  tableMinWidth: 1300
})
