import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { BookItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'bookName',
    label: 'Book Name',
    type: 'text',
    allowsSorting: true,
    minWidth: 190
  },
  {
    key: 'bookNo',
    label: 'Book No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'publisher',
    label: 'Publisher',
    type: 'text',
    allowsSorting: true,
    minWidth: 170
  },
  {
    key: 'author',
    label: 'Author',
    type: 'text',
    allowsSorting: true,
    minWidth: 170
  },
  {
    key: 'subject',
    label: 'Subject',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'rackNo',
    label: 'Rack No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'qty',
    label: 'Qty',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'available',
    label: 'Available',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'price',
    label: 'Price',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'postDate',
    label: 'Post Date',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const booksData: BookItem[] = [
  {
    id: 'book-0',
    createdAt: '2026-05-11',
    displayId: 'LB864723',
    bookName: 'Echoes of Eternity',
    bookNo: 501,
    publisher: 'Aurora Press',
    author: 'Isabella Rivers',
    subject: 'History',
    rackNo: 6550,
    qty: 150,
    available: 120,
    price: '$300',
    postDate: '15 May 2024'
  },
  {
    id: 'book-1',
    createdAt: '2026-05-10',
    displayId: 'LB864722',
    bookName: 'The Stars of Eldorado',
    bookNo: 502,
    publisher: 'Nebula Press',
    author: 'Amanda Grayson',
    subject: 'Science',
    rackNo: 6551,
    qty: 200,
    available: 180,
    price: '$280',
    postDate: '14 May 2024'
  },
  {
    id: 'book-2',
    createdAt: '2026-05-09',
    displayId: 'LB864721',
    bookName: 'The Glass Painter',
    bookNo: 503,
    publisher: 'Artisan Reads',
    author: 'Isabel Marquez',
    subject: 'Literary',
    rackNo: 6552,
    qty: 180,
    available: 160,
    price: '$320',
    postDate: '13 May 2024'
  },
  {
    id: 'book-3',
    createdAt: '2026-05-08',
    displayId: 'LB864720',
    bookName: 'Beyond the Edge',
    bookNo: 504,
    publisher: 'Explorer Press',
    author: 'Leo Finnegan',
    subject: 'Adventure',
    rackNo: 6553,
    qty: 120,
    available: 100,
    price: '$350',
    postDate: '12 May 2024'
  },
  {
    id: 'book-4',
    createdAt: '2026-05-07',
    displayId: 'LB864719',
    bookName: 'Shadow Symphony',
    bookNo: 505,
    publisher: 'Harmony House',
    author: 'Claire Vincent',
    subject: 'Gothic',
    rackNo: 6554,
    qty: 220,
    available: 160,
    price: '$280',
    postDate: '11 May 2024'
  },
  {
    id: 'book-5',
    createdAt: '2026-05-06',
    displayId: 'LB864718',
    bookName: 'The Last Library',
    bookNo: 506,
    publisher: 'Aurora Press',
    author: 'Isabella Rivers',
    subject: 'History',
    rackNo: 6555,
    qty: 170,
    available: 150,
    price: '$300',
    postDate: '10 May 2024'
  },
  {
    id: 'book-6',
    createdAt: '2026-05-05',
    displayId: 'LB864717',
    bookName: 'The Saffron Tide',
    bookNo: 507,
    publisher: 'Nebula Press',
    author: 'Amanda Grayson',
    subject: 'Science',
    rackNo: 6556,
    qty: 140,
    available: 100,
    price: '$280',
    postDate: '09 May 2024'
  },
  {
    id: 'book-7',
    createdAt: '2026-05-11',
    displayId: 'LB864716',
    bookName: 'Windswept',
    bookNo: 508,
    publisher: 'Artisan Reads',
    author: 'Isabel Marquez',
    subject: 'Literary',
    rackNo: 6557,
    qty: 300,
    available: 270,
    price: '$320',
    postDate: '08 May 2024'
  },
  {
    id: 'book-8',
    createdAt: '2026-05-10',
    displayId: 'LB864715',
    bookName: 'Frostbound Throne',
    bookNo: 509,
    publisher: 'Explorer Press',
    author: 'Leo Finnegan',
    subject: 'Adventure',
    rackNo: 6558,
    qty: 320,
    available: 200,
    price: '$350',
    postDate: '07 May 2024'
  },
  {
    id: 'book-9',
    createdAt: '2026-05-09',
    displayId: 'LB864714',
    bookName: 'The Last Alchemist',
    bookNo: 510,
    publisher: 'Harmony House',
    author: 'Claire Vincent',
    subject: 'Gothic',
    rackNo: 6559,
    qty: 190,
    available: 170,
    price: '$280',
    postDate: '07 May 2024'
  }
]

export const booksConfig = makeOperationPageConfig({
  key: 'books',
  title: 'Books',
  pageTitle: 'Books',
  listTitle: 'Books',
  addLabel: 'Add Book',
  ariaLabel: 'Books',
  breadcrumb: ['Dashboard', 'Management', 'Books'],
  columns,
  rows: booksData,
  filters: [
    {
      key: 'bookno',
      label: 'Book No',
      values: booksData.map(row => String(row.bookNo))
    },
    {
      key: 'subject',
      label: 'Subject',
      values: booksData.map(row => row.subject)
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: ['ID', 'Book Name', 'Book No', 'Publisher', 'Author', 'Rack No']
    }
  ],
  initialColumn: 'bookName',
  tableMinWidth: 1520
})
