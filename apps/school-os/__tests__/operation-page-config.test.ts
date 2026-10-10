import { describe, expect, it } from 'vitest'

import { makeOperationPageConfig } from '../src/pages/operations/_shared/config'

describe('operation page config', () => {
  it('uses the page sort column for both directions and createdAt for recent rows', () => {
    const config = makeOperationPageConfig({
      key: 'books',
      title: 'Books',
      pageTitle: 'Books',
      listTitle: 'Book list',
      addLabel: 'Add book',
      ariaLabel: 'Books',
      breadcrumb: ['Dashboard', 'Books'],
      columns: [],
      rows: [],
      filters: [],
      initialColumn: 'title',
      tableMinWidth: 800
    })

    expect(config.initialSort).toEqual({
      column: 'title',
      direction: 'ascending'
    })
    expect(config.sortOptions.map(option => option.descriptor)).toEqual([
      { column: 'title', direction: 'ascending' },
      { column: 'title', direction: 'descending' },
      { column: 'createdAt', direction: 'descending' }
    ])
  })
})
