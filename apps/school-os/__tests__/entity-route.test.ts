import { describe, expect, it } from 'vitest'

import { createEntityRoute } from '../src/pages/academic/shared/entity-route'

describe('academic entity routes', () => {
  const route = createEntityRoute('/academic/section')

  it('keeps an application prefix when resolving the base path', () => {
    expect(route.getBasePath('/school/academic/section/row-1')).toBe(
      '/school/academic/section'
    )
  })

  it('reads an encoded row ID from the path', () => {
    expect(route.getRowIdFromPath('/school/academic/section/row%2F1')).toBe(
      'row/1'
    )
    expect(route.getRowIdFromPath('/school/academic/section')).toBeNull()
  })

  it('builds a link for a row without carrying over the current fragment', () => {
    const originalUrl = window.location.href
    window.history.replaceState(
      null,
      '',
      '/school/academic/section/old?id=old&filter=active#details'
    )

    expect(route.getRowUrl({ id: 'row/1' }, 'edit')).toBe(
      `${window.location.origin}/school/academic/section/row%2F1?filter=active&mode=edit`
    )

    window.history.replaceState(null, '', originalUrl)
  })

  it('updates the drawer URL and clears it when the drawer closes', () => {
    const originalUrl = window.location.href
    window.history.replaceState(null, '', '/school/academic/section')

    route.updateDrawerQuery({ id: 'row/1', mode: 'edit' })
    expect(window.location.pathname).toBe('/school/academic/section/row%2F1')
    expect(new URLSearchParams(window.location.search).get('mode')).toBe('edit')

    route.updateDrawerQuery(null, true)
    expect(window.location.pathname).toBe('/school/academic/section')
    expect(window.location.search).toBe('')
    window.history.replaceState(null, '', originalUrl)
  })
})
