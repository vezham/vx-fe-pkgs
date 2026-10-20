import { describe, expect, it } from 'vitest'

import { makeAttendancePageConfig } from '../src/pages/reports/_shared/config'

describe('attendance page config', () => {
  it('keeps page sorting and recent activity options', () => {
    const config = makeAttendancePageConfig({
      key: 'students',
      title: 'Students',
      ariaLabel: 'Students',
      columns: [],
      rows: [],
      filters: [],
      initialColumn: 'name',
      tableMinWidth: 800
    })

    expect(config.sortOptions.map(option => option.descriptor)).toEqual([
      { column: 'name', direction: 'ascending' },
      { column: 'name', direction: 'descending' },
      { column: 'viewedAt', direction: 'descending' },
      { column: 'createdAt', direction: 'descending' }
    ])
  })
})
