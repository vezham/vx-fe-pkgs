import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { FeesMasterItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
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
    key: 'dueDate',
    label: 'Due Date',
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
    key: 'fineType',
    label: 'Fine Type',
    type: 'badge',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'fineAmount',
    label: 'Fine Amount ($)',
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
  }
]

export const feesMasterData: FeesMasterItem[] = [
  {
    id: 'fees-master-0',
    createdAt: '2026-05-11',
    displayId: 'FG80482',
    feesGroup: 'Admission-Fees',
    feesType: 'Tuition Fees',
    dueDate: '30 Jan 2025',
    amount: 1250,
    fineType: 'None',
    fineAmount: 200,
    status: 'Active'
  },
  {
    id: 'fees-master-1',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesGroup: 'Class 1 General',
    feesType: 'Monthly Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Percentage',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-2',
    createdAt: '2026-05-09',
    displayId: 'FG80481',
    feesGroup: 'Monthly Fees',
    feesType: 'Admission Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Percentage',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-3',
    createdAt: '2026-05-08',
    displayId: 'FG80481',
    feesGroup: 'Class 1 Lump Sum',
    feesType: 'Bus Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Percentage',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-4',
    createdAt: '2026-05-07',
    displayId: 'FG80481',
    feesGroup: 'Class 1- I Installment',
    feesType: 'Tuition Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Fixed',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-5',
    createdAt: '2026-05-06',
    displayId: 'FG80481',
    feesGroup: 'Class 1-II Installment',
    feesType: 'Monthly Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Percentage',
    fineAmount: 300,
    status: 'Inactive'
  },
  {
    id: 'fees-master-6',
    createdAt: '2026-05-05',
    displayId: 'FG80481',
    feesGroup: 'Discount',
    feesType: 'Admission Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'None',
    fineAmount: 300,
    status: 'Inactive'
  },
  {
    id: 'fees-master-7',
    createdAt: '2026-05-11',
    displayId: 'FG80481',
    feesGroup: 'Class 3- I Installment',
    feesType: 'Bus Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'None',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-8',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesGroup: 'Class 2- I Installment',
    feesType: 'Tuition Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Fixed',
    fineAmount: 300,
    status: 'Active'
  },
  {
    id: 'fees-master-9',
    createdAt: '2026-05-09',
    displayId: 'FG80481',
    feesGroup: 'Class 4- I Installment',
    feesType: 'Monthly Fees',
    dueDate: '12 May 2025',
    amount: 250,
    fineType: 'Fixed',
    fineAmount: 300,
    status: 'Active'
  }
]

export const feesMasterConfig = makeOperationPageConfig({
  key: 'fees-master',
  title: 'Fees Collection',
  pageTitle: 'Fees Master',
  listTitle: 'Fees Collection',
  addLabel: 'Add Fees Master',
  ariaLabel: 'Fees Master',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Fees Master'],
  columns,
  rows: feesMasterData,
  filters: [
    {
      key: 'id',
      label: 'Id',
      values: feesMasterData.map(row => row.displayId)
    },
    {
      key: 'fees-group',
      label: 'Fees Group',
      values: feesMasterData.map(row => row.feesGroup)
    },
    {
      key: 'fees-type',
      label: 'Fees Type',
      values: feesMasterData.map(row => row.feesType)
    },
    {
      key: 'due-date',
      label: 'Due Date',
      values: feesMasterData.map(row => row.dueDate)
    }
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1320
})
