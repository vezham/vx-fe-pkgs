import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { VehicleItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'vehicleNo',
    label: 'Vehicle No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'vehicleModel',
    label: 'Vehicle Model',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'madeYear',
    label: 'Made of Year',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'registrationNo',
    label: 'Registration No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'chassisNo',
    label: 'Chassis No',
    type: 'code',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'gpsDeviceId',
    label: 'GPS Device ID',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'trackAction',
    label: '',
    type: 'button',
    allowsSorting: false,
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

export const vehiclesData: VehicleItem[] = [
  {
    id: 'vehicle-0',
    createdAt: '2026-05-11',
    displayId: 'B80482',
    vehicleNo: '+164044748904',
    vehicleModel: 'Scania',
    madeYear: 2021,
    registrationNo: 'US1A3545',
    chassisNo: '32546665456',
    gpsDeviceId: 'GPS7899456689',
    trackAction: 'Live Track',
    driver: {
      name: 'Thomas',
      subtitle: '+1 64044 748904',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-1',
    createdAt: '2026-05-10',
    displayId: 'B80481',
    vehicleNo: '+11454155665',
    vehicleModel: 'Mini Bus',
    madeYear: 2024,
    registrationNo: 'US2B5465',
    chassisNo: '32546653111',
    gpsDeviceId: 'GPS7899345578',
    trackAction: 'Live Track',
    driver: {
      name: 'Mary',
      subtitle: '+1 14541 55665',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-2',
    createdAt: '2026-05-09',
    displayId: 'B80482',
    vehicleNo: '+17895485461',
    vehicleModel: 'Mini Bus',
    madeYear: 2017,
    registrationNo: 'US3C4547',
    chassisNo: '32546640766',
    gpsDeviceId: 'GPS7899234467',
    trackAction: 'Live Track',
    driver: {
      name: 'Michael',
      subtitle: '+1 78954 85461',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-3',
    createdAt: '2026-05-08',
    displayId: 'B80481',
    vehicleNo: '+11234568891',
    vehicleModel: 'Kinsmart',
    madeYear: 2022,
    registrationNo: 'US4D1234',
    chassisNo: '32546628421',
    gpsDeviceId: 'GPS7899123356',
    trackAction: 'Live Track',
    driver: {
      name: 'Jessie',
      subtitle: '+1 12345 68891',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-4',
    createdAt: '2026-05-07',
    displayId: 'B80482',
    vehicleNo: '+17845478841',
    vehicleModel: 'Single deck',
    madeYear: 2019,
    registrationNo: 'US1A6547',
    chassisNo: '32546616076',
    gpsDeviceId: 'GPS7899012245',
    trackAction: 'Live Track',
    driver: {
      name: 'Robert',
      subtitle: '+1 78454 78841',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-5',
    createdAt: '2026-05-06',
    displayId: 'B80481',
    vehicleNo: '+17854697894',
    vehicleModel: 'Scania',
    madeYear: 2015,
    registrationNo: 'US1A3545',
    chassisNo: '32546603731',
    gpsDeviceId: 'GPS7898901134',
    trackAction: 'Live Track',
    driver: {
      name: 'Colleen',
      subtitle: '+1 78546 97894',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-6',
    createdAt: '2026-05-05',
    displayId: 'B80482',
    vehicleNo: '+19787887854',
    vehicleModel: 'Mini Bus',
    madeYear: 2024,
    registrationNo: 'US2B5465',
    chassisNo: '32546591386',
    gpsDeviceId: 'GPS7898790023',
    trackAction: 'Live Track',
    driver: {
      name: 'Arthur',
      subtitle: '+1 97878 87854',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-7',
    createdAt: '2026-05-11',
    displayId: 'B80481',
    vehicleNo: '+16459978542',
    vehicleModel: 'Mini Bus',
    madeYear: 2016,
    registrationNo: 'US3C4547',
    chassisNo: '32546579041',
    gpsDeviceId: 'GPS7898678912',
    trackAction: 'Live Track',
    driver: {
      name: 'Claudia',
      subtitle: '+1 64599 78542',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    status: 'Inactive'
  },
  {
    id: 'vehicle-8',
    createdAt: '2026-05-10',
    displayId: 'B80482',
    vehicleNo: '+14578145145',
    vehicleModel: 'Kinsmart',
    madeYear: 2018,
    registrationNo: 'US4D1234',
    chassisNo: '32546566696',
    gpsDeviceId: 'GPS7898567801',
    trackAction: 'Live Track',
    driver: {
      name: 'Johnson',
      subtitle: '+1 45781 45145',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    status: 'Active'
  },
  {
    id: 'vehicle-9',
    createdAt: '2026-05-09',
    displayId: 'B80481',
    vehicleNo: '+14511248879',
    vehicleModel: 'Single deck',
    madeYear: 2023,
    registrationNo: 'US1A6547',
    chassisNo: '32546554351',
    gpsDeviceId: 'GPS7898456690',
    trackAction: 'Live Track',
    driver: {
      name: 'Marquita',
      subtitle: '+1 45112 48879',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    status: 'Active'
  }
]

export const vehiclesConfig = makeOperationPageConfig({
  key: 'vehicles',
  title: 'Transport',
  pageTitle: 'Transport',
  listTitle: 'Transport',
  addLabel: 'Add Vehicle',
  ariaLabel: 'Transport',
  breadcrumb: ['Dashboard', 'Management', 'Transport'],
  columns,
  rows: vehiclesData,
  filters: [
    {
      key: 'vehicleno',
      label: 'Vehicle No',
      values: vehiclesData.map(row => row.vehicleNo)
    },
    {
      key: 'model',
      label: 'Model',
      values: vehiclesData.map(row => row.vehicleModel)
    },
    {
      key: 'name',
      label: 'Name',
      values: vehiclesData.map(row => row.driver?.name)
    },
    {
      key: 'gps-device',
      label: 'GPS Device',
      values: vehiclesData.map(row => row.gpsDeviceId)
    },
    {
      key: 'driver',
      label: 'Driver',
      values: vehiclesData.map(row => row.driver?.name)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    },
    {
      key: 'more-filters',
      label: 'More Filters',
      values: [
        'ID',
        'Vehicle No',
        'Vehicle Model',
        'Made of year',
        'Registration No',
        'Status'
      ]
    }
  ],
  initialColumn: 'vehicleNo',
  tableMinWidth: 1580
})
