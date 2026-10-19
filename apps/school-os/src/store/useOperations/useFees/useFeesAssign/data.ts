import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { FeesAssignItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'serialNo',
    label: 'SNo',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'feesGroup',
    label: 'Fees Group',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'feesType',
    label: 'Fees Type',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
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
    key: 'gender',
    label: 'Gender',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'category',
    label: 'Category',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const feesAssignData: FeesAssignItem[] = [
  {
    id: 'fees-assign-0',
    createdAt: '2026-05-11',
    serialNo: '01',
    feesGroup: 'Admission-Fees',
    feesType: 'Tuition Fees',
    className: 'I',
    section: 'B',
    amount: 1250,
    gender: 'Male',
    category: 'BC'
  },
  {
    id: 'fees-assign-1',
    createdAt: '2026-05-10',
    serialNo: '02',
    feesGroup: 'Class 1 General',
    feesType: 'Monthly Fees',
    className: 'III',
    section: 'C',
    amount: 250,
    gender: 'Both',
    category: 'MBC'
  },
  {
    id: 'fees-assign-2',
    createdAt: '2026-05-09',
    serialNo: '03',
    feesGroup: 'Monthly Fees',
    feesType: 'Admission Fees',
    className: 'IX',
    section: 'F',
    amount: 656,
    gender: 'Female',
    category: 'FC'
  },
  {
    id: 'fees-assign-3',
    createdAt: '2026-05-08',
    serialNo: '04',
    feesGroup: 'Discount',
    feesType: 'Bus Fees',
    className: 'X',
    section: 'R',
    amount: 6225,
    gender: 'Male',
    category: 'BC'
  },
  {
    id: 'fees-assign-4',
    createdAt: '2026-05-07',
    serialNo: '05',
    feesGroup: 'Admission-Fees',
    feesType: 'Tuition Fees',
    className: 'III',
    section: 'E',
    amount: 454,
    gender: 'Both',
    category: 'MBC'
  },
  {
    id: 'fees-assign-5',
    createdAt: '2026-05-06',
    serialNo: '06',
    feesGroup: 'Class 1 General',
    feesType: 'Monthly Fees',
    className: 'IV',
    section: 'A',
    amount: 214,
    gender: 'Male',
    category: 'All'
  },
  {
    id: 'fees-assign-6',
    createdAt: '2026-05-05',
    serialNo: '07',
    feesGroup: 'Monthly Fees',
    feesType: 'Admission Fees',
    className: 'V',
    section: 'B',
    amount: 145,
    gender: 'Both',
    category: 'FC'
  },
  {
    id: 'fees-assign-7',
    createdAt: '2026-05-11',
    serialNo: '08',
    feesGroup: 'Discount',
    feesType: 'Bus Fees',
    className: 'X',
    section: 'B',
    amount: 147,
    gender: 'Male',
    category: 'FC'
  },
  {
    id: 'fees-assign-8',
    createdAt: '2026-05-10',
    serialNo: '09',
    feesGroup: 'Admission-Fees',
    feesType: 'Tuition Fees',
    className: 'VI',
    section: 'A',
    amount: 457,
    gender: 'Female',
    category: 'FC'
  },
  {
    id: 'fees-assign-9',
    createdAt: '2026-05-09',
    serialNo: '10',
    feesGroup: 'Class 1 General',
    feesType: 'Monthly Fees',
    className: 'V',
    section: 'A',
    amount: 654,
    gender: 'Female',
    category: 'All'
  }
]

export const feesAssignConfig = makeOperationPageConfig({
  key: 'fees-assign',
  title: 'Fees Collection',
  pageTitle: 'Assign Fees',
  listTitle: 'Fees Collection',
  addLabel: 'Assign New',
  ariaLabel: 'Assign Fees',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Assign Fees'],
  columns,
  rows: feesAssignData,
  filters: [
    {
      key: 'section',
      label: 'Section',
      values: feesAssignData.map(row => row.section)
    },
    {
      key: 'category',
      label: 'Category',
      values: feesAssignData.map(row => row.category)
    },
    {
      key: 'gender',
      label: 'Gender',
      values: feesAssignData.map(row => row.gender)
    }
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1320
})
