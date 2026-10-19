import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'

import type { ReportColumn, ReportRow } from './types'

export {
  dateOptions,
  emptyStatusLegend as statusLegend,
  rowCountOptions
} from '@pages/reports/_shared/attendance-options'

const columns: ReportColumn[] = [
  {
    key: 'feesGroup',
    label: 'Fees Group',
    allowsSorting: true,
    type: 'link',
    minWidth: 170
  },
  { key: 'feesCode', label: 'Fees Code', allowsSorting: true },
  { key: 'dueDate', label: 'Due Date', allowsSorting: true },
  { key: 'amount', label: 'Amount $', allowsSorting: true },
  { key: 'status', label: 'Status', type: 'badge', allowsSorting: true },
  { key: 'refId', label: 'Ref ID', allowsSorting: true },
  { key: 'mode', label: 'Mode', allowsSorting: true },
  { key: 'datePaid', label: 'Date Paid', allowsSorting: true },
  { key: 'discount', label: 'Discount ($)', allowsSorting: true },
  { key: 'fine', label: 'Fine ($)', allowsSorting: true },
  { key: 'balance', label: 'Balance ($)', allowsSorting: true }
]

const rows: ReportRow[] = [
  {
    id: 'fees-report-1',
    feesGroup: 'Class 1 General\n(Admission Fees)',
    feesCode: 'admission-fees',
    dueDate: '25 Mar 2024',
    amount: '2000',
    status: 'Paid',
    refId: '#435454',
    mode: 'Cash',
    datePaid: '25 Jan 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-13'
  },
  {
    id: 'fees-report-2',
    feesGroup: 'Class 1 General\n(Mar month Fees)',
    feesCode: 'mar-month-fees',
    dueDate: '10 Apr 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435453',
    mode: 'Cash',
    datePaid: '03 Apr 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-12'
  },
  {
    id: 'fees-report-3',
    feesGroup: 'Class 1 General\n(Apr month Fees)',
    feesCode: 'apr-month-fees',
    dueDate: '10 May 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435453',
    mode: 'Cash',
    datePaid: '03 Apr 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-11'
  },
  {
    id: 'fees-report-4',
    feesGroup: 'Class 1 General\n(May month Fees)',
    feesCode: 'may-month-fees',
    dueDate: '10 Jun 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435451',
    mode: 'Cash',
    datePaid: '02 Jun 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-10'
  },
  {
    id: 'fees-report-5',
    feesGroup: 'Class 1 General\n(Jun month Fees)',
    feesCode: 'jun-month-fees',
    dueDate: '10 Jul 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435450',
    mode: 'Cash',
    datePaid: '05 Jul 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-6',
    feesGroup: 'Class 1 General\n(Jul month Fees)',
    feesCode: 'jul-month-fees',
    dueDate: '10 Aug 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435449',
    mode: 'Cash',
    datePaid: '01 Aug 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-7',
    feesGroup: 'Class 1 General\n(Dec month Fees)',
    feesCode: 'dec-month-fees',
    dueDate: '10 Jan 2024',
    amount: '2500',
    status: 'Paid',
    refId: '#435443',
    mode: 'Cash',
    datePaid: '05 Jan 2024',
    discount: '10%',
    fine: '0',
    balance: '0',
    createdAt: '2026-05-09'
  },
  {
    id: 'fees-report-8',
    feesGroup: 'Class 1 General\n(Jan month Fees)',
    feesCode: 'jan-month-fees',
    dueDate: '10 Feb 2024',
    amount: '2000',
    status: 'Paid',
    refId: '#435443',
    mode: 'Cash',
    datePaid: '01 Feb 2024',
    discount: '10%',
    fine: '200',
    balance: '0',
    createdAt: '2026-05-09'
  }
]

export const feesReportsConfig = makeAttendancePageConfig({
  key: 'fees-reports',
  title: 'Fees Report List',
  ariaLabel: 'Fees reports',
  columns,
  rows,
  filters: [
    option('feesCode', 'Fees code', [
      'admission-fees',
      'mar-month-fees',
      'apr-month-fees'
    ]),
    option('status', 'Status', ['Paid'])
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1450
})
