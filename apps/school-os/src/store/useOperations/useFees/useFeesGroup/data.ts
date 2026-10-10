import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { FeesGroupItem } from './types'

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
    key: 'description',
    label: 'Description',
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

export const feesGroupData: FeesGroupItem[] = [
  {
    id: 'fees-group-0',
    createdAt: '2026-05-11',
    displayId: 'FG80482',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-1',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-2',
    createdAt: '2026-05-09',
    displayId: 'FG80480',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-3',
    createdAt: '2026-05-08',
    displayId: 'FG80479',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-4',
    createdAt: '2026-05-07',
    displayId: 'FG80478',
    feesGroup: 'Class 1- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-group-5',
    createdAt: '2026-05-06',
    displayId: 'FG80477',
    feesGroup: 'Class 1-II Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-6',
    createdAt: '2026-05-05',
    displayId: 'FG80476',
    feesGroup: 'Class 1-III Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-7',
    createdAt: '2026-05-11',
    displayId: 'FG80475',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-group-8',
    createdAt: '2026-05-10',
    displayId: 'FG80474',
    feesGroup: 'Class 3- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-9',
    createdAt: '2026-05-09',
    displayId: 'FG80473',
    feesGroup: 'Class 4- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  }
]

export const feesGroupConfig = makeOperationPageConfig({
  key: 'fees-group',
  title: 'Fees Collection',
  pageTitle: 'Fees Group',
  listTitle: 'Fees Collection',
  addLabel: 'Add Fees Group',
  ariaLabel: 'Fees Group',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Fees Group'],
  columns,
  rows: feesGroupData,
  filters: [
    {
      key: 'id',
      label: 'Id',
      values: feesGroupData.map(row => row.displayId)
    },
    {
      key: 'name',
      label: 'Name',
      values: ['Francis', 'James', 'Charles']
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1120
})
