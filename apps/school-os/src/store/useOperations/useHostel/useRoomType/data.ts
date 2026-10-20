import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { RoomTypeItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'roomType',
    label: 'Room Type',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    allowsSorting: true,
    minWidth: 520
  }
]

export const roomTypeData: RoomTypeItem[] = [
  {
    id: 'room-type-0',
    createdAt: '2026-05-11',
    displayId: 'RT846235',
    roomType: 'One Bed',
    description: 'Study together in comfort and camaraderie in our one bed room'
  },
  {
    id: 'room-type-1',
    createdAt: '2026-05-10',
    displayId: 'RT846234',
    roomType: 'One Bed AC',
    description:
      'Study together in comfort and camaraderie in our one bed ac room'
  },
  {
    id: 'room-type-2',
    createdAt: '2026-05-09',
    displayId: 'RT846233',
    roomType: 'Two Bed',
    description: 'Study together in comfort and camaraderie in our two bed room'
  },
  {
    id: 'room-type-3',
    createdAt: '2026-05-08',
    displayId: 'RT846232',
    roomType: 'Two Bed AC',
    description:
      'Study together in comfort and camaraderie in our two bed ac room'
  },
  {
    id: 'room-type-4',
    createdAt: '2026-05-07',
    displayId: 'RT846231',
    roomType: 'Three Bed',
    description:
      'Study together in comfort and camaraderie in our three bed room'
  },
  {
    id: 'room-type-5',
    createdAt: '2026-05-06',
    displayId: 'RT846230',
    roomType: 'Three Bed AC',
    description:
      'Study together in comfort and camaraderie in our three bed ac room'
  },
  {
    id: 'room-type-6',
    createdAt: '2026-05-05',
    displayId: 'RT846229',
    roomType: 'Four Bed',
    description:
      'Study together in comfort and camaraderie in our four bed room'
  },
  {
    id: 'room-type-7',
    createdAt: '2026-05-11',
    displayId: 'RT846228',
    roomType: 'Four Bed AC',
    description:
      'Study together in comfort and camaraderie in our four bed ac room'
  },
  {
    id: 'room-type-8',
    createdAt: '2026-05-10',
    displayId: 'RT846227',
    roomType: 'Five Bed',
    description:
      'Study together in comfort and camaraderie in our five bed room'
  },
  {
    id: 'room-type-9',
    createdAt: '2026-05-09',
    displayId: 'RT846226',
    roomType: 'Five Bed AC',
    description:
      'Study together in comfort and camaraderie in our five bed ac room'
  }
]

export const roomTypeConfig = makeOperationPageConfig({
  key: 'room-type',
  title: 'Room Type',
  pageTitle: 'Room Type',
  listTitle: 'Room Type',
  addLabel: 'Add Room Type',
  ariaLabel: 'Room Type',
  breadcrumb: ['Dashboard', 'Management', 'Room Type'],
  columns,
  rows: roomTypeData,
  filters: [
    {
      key: 'roomType',
      label: 'Room Type',
      values: ['One Bed', 'Two Bed', 'One Bed AC', 'Two Bed AC']
    }
  ],
  initialColumn: 'roomType',
  tableMinWidth: 1060
})
