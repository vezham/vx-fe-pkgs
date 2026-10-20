import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import { issueBookColumns, issueBooksData } from '../useIssueBooks/data'
import type { ReturnItem } from './types'

const columns: OperationColumn[] = [
  ...issueBookColumns.slice(0, 5),
  {
    key: 'bookReturned',
    label: 'Book Returned',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  ...issueBookColumns.slice(5)
]

const returnedCounts = [0, 3, 2, 2, 4, 2, 3, 1, 4, 1]

export const returnData: ReturnItem[] = issueBooksData.map((book, index) => ({
  ...book,
  id: `return-${index}`,
  bookReturned: returnedCounts[index]
}))

export const returnBooksConfig = makeOperationPageConfig({
  key: 'return',
  title: 'Return Books',
  pageTitle: 'Return Books',
  listTitle: 'Return Books',
  addLabel: 'Return Book',
  ariaLabel: 'Return Books',
  breadcrumb: ['Dashboard', 'Management', 'Return Books'],
  columns,
  rows: returnData,
  filters: [
    {
      key: 'issuebook',
      label: 'Issue Book',
      values: returnData.map(row => row.dateOfIssue)
    },
    {
      key: 'name',
      label: 'Name',
      values: returnData.map(row => row.issueTo.name)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: [
        'ID',
        'Date of Issue',
        'Due Date',
        'Issue To',
        'Books Issued',
        'Books Returned',
        'Issue Remarks'
      ]
    }
  ],
  initialColumn: 'issueTo',
  tableMinWidth: 1280
})
