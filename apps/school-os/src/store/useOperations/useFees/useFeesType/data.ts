import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { FeesTypeItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
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
    key: 'feesCode',
    label: 'Fees Code',
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
    key: 'description',
    label: 'Description',
    type: 'text',
    allowsSorting: true,
    minWidth: 280
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  }
]

export const feesTypeData: FeesTypeItem[] = [
  {
    id: 'fees-type-0',
    createdAt: '2026-05-11',
    displayId: 'FG80482',
    feesType: 'Admission Fees',
    feesCode: 'Admission-Fees',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-1',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesType: 'Apr-Mar',
    feesCode: 'Apr-Mar',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-2',
    createdAt: '2026-05-09',
    displayId: 'FG80480',
    feesType: 'Bus Fees',
    feesCode: 'Bus-Fees',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-3',
    createdAt: '2026-05-08',
    displayId: 'FG80479',
    feesType: '1st Installment Fees',
    feesCode: '1st-Installment-Fees',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-4',
    createdAt: '2026-05-07',
    displayId: 'FG80478',
    feesType: '2nd Installment Fees',
    feesCode: '2nd-Installment-Fees',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-type-5',
    createdAt: '2026-05-06',
    displayId: 'FG80477',
    feesType: '3rd Installment Fees',
    feesCode: '3rd-Installment-Fees',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-6',
    createdAt: '2026-05-05',
    displayId: 'FG80476',
    feesType: '4th Installment Fees',
    feesCode: '4th-Installment-Fees',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-7',
    createdAt: '2026-05-11',
    displayId: 'FG80475',
    feesType: 'Topper Discount',
    feesCode: 'Topper-Discount',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-type-8',
    createdAt: '2026-05-10',
    displayId: 'FG80474',
    feesType: '3rd Installment Fees',
    feesCode: '3rd-Installment-Fees',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-9',
    createdAt: '2026-05-09',
    displayId: 'FG80473',
    feesType: '4th Installment Fees',
    feesCode: '4th-Installment-Fees',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Active'
  }
]

export const feesTypeConfig = makeOperationPageConfig({
  key: 'fees-type',
  title: 'Fees Collection',
  pageTitle: 'Fees Type',
  listTitle: 'Fees Collection',
  addLabel: 'Add Fees Type',
  ariaLabel: 'Fees Type',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Fees Type'],
  columns,
  rows: feesTypeData,
  filters: [
    {
      key: 'id',
      label: 'Id',
      values: feesTypeData.map(row => row.displayId)
    },
    {
      key: 'name',
      label: 'Name',
      values: ['Francis', 'James', 'Charles']
    },
    {
      key: 'fees-group',
      label: 'Fees Group',
      values: feesTypeData.map(row => row.feesGroup)
    },
    {
      key: 'fees-type',
      label: 'Fees Type',
      values: feesTypeData.map(row => row.feesType)
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'feesType',
  tableMinWidth: 1320
})
