import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { AssignItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'routeName',
    label: 'Route',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'pickupPoint',
    label: 'Pickup Point',
    type: 'text',
    allowsSorting: true,
    minWidth: 330
  },
  {
    key: 'vehicle',
    label: 'Vehicle',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'driver',
    label: 'Driver',
    type: 'person',
    allowsSorting: true,
    minWidth: 200
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  }
]

export const assignVehicleData: AssignItem[] = [
  {
    id: 'assign-0',
    createdAt: '2026-05-11',
    displayId: 'B80482',
    routeName: 'Seattle',
    pickupPoint: '2233 Wood Street, Slidell, LA',
    vehicle: 8930,
    driver: {
      name: 'Thomas',
      subtitle: '+1 64044 748904',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-1',
    createdAt: '2026-05-10',
    displayId: 'B80481',
    routeName: 'Camden',
    pickupPoint: '2693 Parker Drive, Cleveland, OH',
    vehicle: 1235,
    driver: {
      name: 'Mary',
      subtitle: '+1 14541 55665',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-2',
    createdAt: '2026-05-09',
    displayId: 'B80482',
    routeName: 'Detroit',
    pickupPoint: '4650 Aviation Way, Los Angeles, CA',
    vehicle: 6465,
    driver: {
      name: 'Michael',
      subtitle: '+1 78954 85461',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-3',
    createdAt: '2026-05-08',
    displayId: 'B80481',
    routeName: 'Nashville',
    pickupPoint: '3167 Stadium Drive, Worcester, MA',
    vehicle: 7895,
    driver: {
      name: 'Jessie',
      subtitle: '+1 12345 68891',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-4',
    createdAt: '2026-05-07',
    displayId: 'B80482',
    routeName: 'Port Graham',
    pickupPoint: '1609 Smith Street, Worcester, MA',
    vehicle: 4625,
    driver: {
      name: 'Robert',
      subtitle: '+1 78454 78841',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-5',
    createdAt: '2026-05-06',
    displayId: 'B80481',
    routeName: 'Brooklyn North',
    pickupPoint: '3341 Palmer Road, Columbus, OH',
    vehicle: 7854,
    driver: {
      name: 'Colleen',
      subtitle: '+1 78546 97894',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-6',
    createdAt: '2026-05-05',
    displayId: 'B80482',
    routeName: 'Kansas City',
    pickupPoint: '2261 Sweetwood Drive, Denver, CO',
    vehicle: 9789,
    driver: {
      name: 'Arthur',
      subtitle: '+1 97878 87854',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-7',
    createdAt: '2026-05-11',
    displayId: 'B80481',
    routeName: 'Rochester',
    pickupPoint: '4025 Khale Street, Folly Beach, SC',
    vehicle: 4569,
    driver: {
      name: 'Claudia',
      subtitle: '+1 64599 78542',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    status: 'Inactive'
  },
  {
    id: 'assign-8',
    createdAt: '2026-05-10',
    displayId: 'B80482',
    routeName: 'Brooklyn Central',
    pickupPoint: '3521 Harvest Lane Kansas City, MO',
    vehicle: 7857,
    driver: {
      name: 'Johnson',
      subtitle: '+1 45781 45145',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    status: 'Active'
  },
  {
    id: 'assign-9',
    createdAt: '2026-05-09',
    displayId: 'B80481',
    routeName: 'Seattle',
    pickupPoint: '2603 Wood Duck Drive Marquette, MI',
    vehicle: 6879,
    driver: {
      name: 'Marquita',
      subtitle: '+1 45112 48879',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    status: 'Active'
  }
]

export const assignVehicleConfig = makeOperationPageConfig({
  key: 'assign',
  title: 'Assign Vehicle',
  pageTitle: 'Assign Vehicle',
  listTitle: 'Assign Vehicle List',
  addLabel: 'Assign New Vehicle',
  ariaLabel: 'Assign Vehicle',
  breadcrumb: ['Dashboard', 'Management', 'Assign Vehicle'],
  columns,
  rows: assignVehicleData,
  filters: [
    {
      key: 'route',
      label: 'Route',
      values: assignVehicleData.map(row => row.routeName)
    },
    {
      key: 'pickup-points',
      label: 'Pickup Points',
      values: assignVehicleData.map(row => row.pickupPoint)
    },
    {
      key: 'vehicleno',
      label: 'Vehicle No',
      values: assignVehicleData.map(row => String(row.vehicle))
    },
    {
      key: 'driver',
      label: 'Driver',
      values: assignVehicleData.map(row => row.driver?.name)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    },
    {
      key: 'more-filters',
      label: 'More Filters',
      values: ['ID', 'Route', 'Pickup Point', 'Driver', 'Vehicle', 'Status']
    }
  ],
  initialColumn: 'routeName',
  tableMinWidth: 1320
})
