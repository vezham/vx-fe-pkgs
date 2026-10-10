import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { CollectFeeItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'admissionNo',
    label: 'Adm No',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'rollNo',
    label: 'Roll No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'student',
    label: 'Student',
    type: 'person',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'className',
    label: 'Class',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'section',
    label: 'Section',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'amount',
    label: 'Amount ($)',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'lastDate',
    label: 'Last Date',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'paymentAction',
    label: 'Action',
    type: 'button',
    allowsSorting: false,
    minWidth: 120
  }
]

export const collectFeesData: CollectFeeItem[] = [
  {
    id: 'collect-fees-0',
    createdAt: '2026-05-11',
    admissionNo: 'AD124556',
    rollNo: 55365,
    student: {
      name: 'Janet',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    className: 'III',
    section: 'A',
    amount: 2000,
    lastDate: '15 May 2024',
    status: 'Paid',
    paymentAction: 'View Details'
  },
  {
    id: 'collect-fees-1',
    createdAt: '2026-05-10',
    admissionNo: 'AD124555',
    rollNo: 12454,
    student: {
      name: 'Joann',
      subtitle: 'IV, B',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    className: 'IV',
    section: 'B',
    amount: 156,
    lastDate: '15 May 2024',
    status: 'Paid',
    paymentAction: 'View Details'
  },
  {
    id: 'collect-fees-2',
    createdAt: '2026-05-09',
    admissionNo: 'AD124554',
    rollNo: 65454,
    student: {
      name: 'Kathleen',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    className: 'III',
    section: 'A',
    amount: 645,
    lastDate: '15 May 2024',
    status: 'Paid',
    paymentAction: 'View Details'
  },
  {
    id: 'collect-fees-3',
    createdAt: '2026-05-08',
    admissionNo: 'AD124553',
    rollNo: 78787,
    student: {
      name: 'Gifford',
      subtitle: 'I, B',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    className: 'I',
    section: 'B',
    amount: 456,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-4',
    createdAt: '2026-05-07',
    admissionNo: 'AD124552',
    rollNo: 31564,
    student: {
      name: 'Lisa',
      subtitle: 'II, B',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    className: 'II',
    section: 'B',
    amount: 645,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-5',
    createdAt: '2026-05-06',
    admissionNo: 'AD124551',
    rollNo: 78456,
    student: {
      name: 'Ralph',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    className: 'III',
    section: 'B',
    amount: 156,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-6',
    createdAt: '2026-05-05',
    admissionNo: 'AD124550',
    rollNo: 67897,
    student: {
      name: 'Julie',
      subtitle: 'IV, B',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    className: 'III',
    section: 'B',
    amount: 156,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-7',
    createdAt: '2026-05-11',
    admissionNo: 'P124549',
    rollNo: 47895,
    student: {
      name: 'Ryan',
      subtitle: 'III, A',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    className: 'VI',
    section: 'A',
    amount: 645,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-8',
    createdAt: '2026-05-10',
    admissionNo: 'AD124548',
    rollNo: 65547,
    student: {
      name: 'Susan',
      subtitle: 'I, B',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    className: 'VIII',
    section: 'B',
    amount: 456,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  },
  {
    id: 'collect-fees-9',
    createdAt: '2026-05-09',
    admissionNo: 'AD124547',
    rollNo: 65547,
    student: {
      name: 'Richard',
      subtitle: 'II, B',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    className: 'VII',
    section: 'B',
    amount: 456,
    lastDate: '15 May 2024',
    status: 'Unpaid',
    paymentAction: 'Collect Fees'
  }
]

export const collectFeesConfig = makeOperationPageConfig({
  key: 'collect-fees',
  title: 'Fees Collection',
  pageTitle: 'Collect Fees',
  listTitle: 'Fees List',
  addLabel: 'Collect Fees',
  ariaLabel: 'Collect Fees',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Collect Fees'],
  columns,
  rows: collectFeesData,
  filters: [
    {
      key: 'admissionno',
      label: 'Admission No',
      values: collectFeesData.map(row => row.admissionNo)
    },
    {
      key: 'rollno',
      label: 'Roll No',
      values: collectFeesData.map(row => String(row.rollNo))
    },
    {
      key: 'student',
      label: 'Student',
      values: collectFeesData.map(row => row.student?.name)
    },
    {
      key: 'class',
      label: 'Class',
      values: collectFeesData.map(row => row.className)
    },
    {
      key: 'section',
      label: 'Section',
      values: collectFeesData.map(row => row.section)
    },
    {
      key: 'amount',
      label: 'Amount',
      values: collectFeesData.map(row => String(row.amount))
    },
    {
      key: 'last-date',
      label: 'Last Date',
      values: collectFeesData.map(row => row.lastDate)
    }
  ],
  initialColumn: 'student',
  tableMinWidth: 1320
})
