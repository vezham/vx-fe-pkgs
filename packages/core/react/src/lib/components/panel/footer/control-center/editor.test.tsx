import { act, renderHook } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'

import { useTileEditor } from './editor'

const storageKey = 'test:control-center-editor'

afterEach(() => localStorage.removeItem(storageKey))

it('persists the selected control size when a tile is placed', () => {
  const tiles = [
    {
      id: 'appearance',
      label: 'Appearance',
      span: 'compact' as const
    }
  ]
  const { result } = renderHook(() => useTileEditor(tiles, storageKey))

  act(() => result.current.editor.onPlace?.('appearance', undefined, 'full'))

  expect(result.current.visibleTiles[0]?.span).toBe('full')
  expect(JSON.parse(localStorage.getItem(storageKey) ?? '{}')).toEqual({
    order: ['appearance'],
    hidden: [],
    spans: { appearance: 'full' }
  })
})

it('adds a control without changing its configured position', () => {
  const tiles = [
    { id: 'appearance', label: 'Appearance', span: 'compact' as const },
    { id: 'theme', label: 'Theme', span: 'wide' as const }
  ]
  localStorage.setItem(
    storageKey,
    JSON.stringify({ order: ['appearance', 'theme'], hidden: ['appearance'] })
  )
  const { result } = renderHook(() => useTileEditor(tiles, storageKey))

  act(() => result.current.editor.onAdd?.('appearance', 'wide'))

  expect(result.current.visibleTiles.map(tile => tile.id)).toEqual([
    'appearance',
    'theme'
  ])
  expect(result.current.visibleTiles[0]?.span).toBe('wide')
})
