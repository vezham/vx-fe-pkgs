import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { VehicleDriverItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'driver',
    label: 'Driver',
    type: 'person',
    allowsSorting: true,
    minWidth: 170
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'licenseNo',
    label: 'Driver License No',
    type: 'text',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'address',
    label: 'Address',
    type: 'text',
    allowsSorting: true,
    minWidth: 300
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  }
]

export const vehicleDriversData: VehicleDriverItem[] = [
  {
    id: 'driver-0',
    createdAt: '2026-05-11',
    displayId: 'D0482',
    driver: {
      name: 'Thomas',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    phoneNumber: '+1 64044 748904',
    licenseNo: 'LCS7899456689',
    address: '2233 Wood Street, Slidell, LA',
    status: 'Active'
  },
  {
    id: 'driver-1',
    createdAt: '2026-05-10',
    displayId: 'D0481',
    driver: {
      name: 'Mary',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    phoneNumber: '+1 14541 55665',
    licenseNo: 'LCS7898222122',
    address: '2693 Parker Drive, Cleveland, OH',
    status: 'Active'
  },
  {
    id: 'driver-2',
    createdAt: '2026-05-09',
    displayId: 'D0480',
    driver: {
      name: 'Michael',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    phoneNumber: '+1 78954 85461',
    licenseNo: 'LCS7896987555',
    address: '4650 Aviation Way, Los Angeles, CA',
    status: 'Active'
  },
  {
    id: 'driver-3',
    createdAt: '2026-05-08',
    displayId: 'D0479',
    driver: {
      name: 'Jessie',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    phoneNumber: '+1 12345 68891',
    licenseNo: 'LCS7895752988',
    address: '3167 Stadium Drive, Worcester, MA',
    status: 'Active'
  },
  {
    id: 'driver-4',
    createdAt: '2026-05-07',
    displayId: 'D0478',
    driver: {
      name: 'Robert',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    phoneNumber: '+1 78454 78841',
    licenseNo: 'LCS7894518421',
    address: '1609 Smith Street, Worcester, MA',
    status: 'Active'
  },
  {
    id: 'driver-5',
    createdAt: '2026-05-06',
    displayId: 'D0477',
    driver: {
      name: 'Colleen',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    phoneNumber: '+1 78546 97894',
    licenseNo: 'LCS7893283854',
    address: '3341 Palmer Road, Columbus, OH',
    status: 'Active'
  },
  {
    id: 'driver-6',
    createdAt: '2026-05-05',
    displayId: 'D0476',
    driver: {
      name: 'Arthur',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    phoneNumber: '+1 97878 87854',
    licenseNo: 'LCS7892049287',
    address: '2261 Sweetwood Drive, Denver, CO',
    status: 'Active'
  },
  {
    id: 'driver-7',
    createdAt: '2026-05-11',
    displayId: 'D0475',
    driver: {
      name: 'Claudia',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    phoneNumber: '+1 64599 78542',
    licenseNo: 'LCS7890814720',
    address: '4025 Khale Street, Folly Beach, SC',
    status: 'Inactive'
  },
  {
    id: 'driver-8',
    createdAt: '2026-05-10',
    displayId: 'D0474',
    driver: {
      name: 'Johnson',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    phoneNumber: '+1 45781 45145',
    licenseNo: 'LCS7889580153',
    address: '3521 Harvest Lane Kansas City, MO',
    status: 'Active'
  },
  {
    id: 'driver-9',
    createdAt: '2026-05-09',
    displayId: 'D0473',
    driver: {
      name: 'Marquita',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    phoneNumber: '+1 45112 48879',
    licenseNo: 'LCS7888345586',
    address: '2603 Wood Duck Drive Marquette, MI',
    status: 'Active'
  }
]

export const vehicleDriversConfig = makeOperationPageConfig({
  key: 'vehicle-drivers',
  title: 'Drivers',
  pageTitle: 'Drivers',
  listTitle: 'Drivers List',
  addLabel: 'Add Drivers',
  ariaLabel: 'Drivers',
  breadcrumb: ['Dashboard', 'Management', 'Drivers'],
  columns,
  rows: vehicleDriversData,
  filters: [
    {
      key: 'driver',
      label: 'Driver',
      values: vehicleDriversData.map(row => row.driver?.name)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    },
    {
      key: 'more-filters',
      label: 'More Filters',
      values: ['Driver', 'Phone No', 'Driving License No', 'Address', 'Status']
    }
  ],
  initialColumn: 'driver',
  tableMinWidth: 1250
})
