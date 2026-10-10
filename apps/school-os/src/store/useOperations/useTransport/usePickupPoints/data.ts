import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { PickupPointItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'pickupPoint',
    label: 'Pickup Point',
    type: 'text',
    allowsSorting: true,
    minWidth: 420
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'addedOn',
    label: 'Added On',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const pickupPointsData: PickupPointItem[] = [
  {
    id: 'pickup-0',
    createdAt: '2026-05-11',
    displayId: 'PP124556',
    pickupPoint: '2233 Wood Street, Slidell, LA',
    status: 'Active',
    addedOn: '15 May 2024'
  },
  {
    id: 'pickup-1',
    createdAt: '2026-05-10',
    displayId: 'PP124555',
    pickupPoint: '2693 Parker Drive, Cleveland, OH',
    status: 'Active',
    addedOn: '14 May 2024'
  },
  {
    id: 'pickup-2',
    createdAt: '2026-05-09',
    displayId: 'PP124554',
    pickupPoint: '4650 Aviation Way, Los Angeles, CA',
    status: 'Active',
    addedOn: '13 May 2024'
  },
  {
    id: 'pickup-3',
    createdAt: '2026-05-08',
    displayId: 'PP124553',
    pickupPoint: '3167 Stadium Drive, Worcester, MA',
    status: 'Active',
    addedOn: '12 May 2024'
  },
  {
    id: 'pickup-4',
    createdAt: '2026-05-07',
    displayId: 'PP124552',
    pickupPoint: '1609 Smith Street, Worcester, MA',
    status: 'Active',
    addedOn: '11 May 2024'
  },
  {
    id: 'pickup-5',
    createdAt: '2026-05-06',
    displayId: 'PP124551',
    pickupPoint: '3341 Palmer Road, Columbus, OH',
    status: 'Active',
    addedOn: '10 May 2024'
  },
  {
    id: 'pickup-6',
    createdAt: '2026-05-05',
    displayId: 'PP24550',
    pickupPoint: '2261 Sweetwood Drive, Denver, CO',
    status: 'Active',
    addedOn: '09 May 2024'
  },
  {
    id: 'pickup-7',
    createdAt: '2026-05-11',
    displayId: 'PP12455-1',
    pickupPoint: '4025 Khale Street, Folly Beach, SC',
    status: 'Inactive',
    addedOn: '08 May 2024'
  },
  {
    id: 'pickup-8',
    createdAt: '2026-05-10',
    displayId: 'PP12455-2',
    pickupPoint: '3521 Harvest Lane Kansas City, MO',
    status: 'Active',
    addedOn: '07 May 2024'
  },
  {
    id: 'pickup-9',
    createdAt: '2026-05-09',
    displayId: 'PP12455-3',
    pickupPoint: '2603 Wood Duck Drive Marquette, MI',
    status: 'Active',
    addedOn: '07 May 2024'
  }
]

export const pickupPointsConfig = makeOperationPageConfig({
  key: 'pickup-points',
  title: 'Pickup Points',
  pageTitle: 'Pickup Points',
  listTitle: 'Pickup Points List',
  addLabel: 'Add Pickup Points',
  ariaLabel: 'Pickup Points',
  breadcrumb: ['Dashboard', 'Management', 'Pickup Points'],
  columns,
  rows: pickupPointsData,
  filters: [
    {
      key: 'pickup-points',
      label: 'Pickup Points',
      values: pickupPointsData.map(row => row.pickupPoint)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'pickupPoint',
  tableMinWidth: 1060
})
