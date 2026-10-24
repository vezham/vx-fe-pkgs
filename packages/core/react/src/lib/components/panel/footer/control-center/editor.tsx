import { useSyncExternalStore } from 'react'

export type EditorState = {
  items: readonly {
    id: string
    label: string
    visible: boolean
    editable: boolean
  }[]
  onVisibilityChange: (id: string, visible: boolean) => void
  onMove: (id: string, offset: number) => void
  onReset: () => void
  onAdd?: (id: string, span?: string) => void
  onPlace?: (id: string, target?: string, span?: string) => void
}
type EditableTile = {
  id: string
  label?: string
  title?: string
  editable?: boolean
  span?: string
}
const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  window.addEventListener('vx:tile-preferences', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('vx:tile-preferences', onChange)
  }
}
export const useTileEditor = <Tile extends EditableTile>(
  tiles: readonly Tile[],
  storageKey = 'vx:control-center'
) => {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(storageKey) ?? '',
    () => ''
  )
  let order: string[] = []
  let hidden: string[] = []
  const spans: Record<string, string> = {}
  try {
    const value = JSON.parse(snapshot || '{}')
    if (Array.isArray(value.order))
      order = [
        ...new Set<string>(
          value.order.filter((id: unknown) => typeof id === 'string')
        )
      ]
    if (Array.isArray(value.hidden))
      hidden = value.hidden.filter((id: unknown) => typeof id === 'string')
    if (value.spans && typeof value.spans === 'object') {
      for (const [id, span] of Object.entries(value.spans)) {
        if (typeof span === 'string') spans[id] = span
      }
    }
  } catch {
    // vx-bot/NOTE: Invalid saved preferences fall back to the configured tiles.
  }
  const tilesById = new Map(tiles.map(tile => [tile.id, tile]))
  const orderedIds = new Set(order)
  const hiddenIds = new Set(hidden)
  const orderedTiles = [
    ...order.flatMap(id => {
      const tile = tilesById.get(id)
      return tile ? [tile] : []
    }),
    ...tiles.filter(tile => !orderedIds.has(tile.id))
  ].map(tile => (spans[tile.id] ? { ...tile, span: spans[tile.id] } : tile))
  const save = (
    nextOrder: readonly string[],
    nextHidden: readonly string[],
    nextSpans = spans
  ) => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ order: nextOrder, hidden: nextHidden, spans: nextSpans })
    )
    window.dispatchEvent(new Event('vx:tile-preferences'))
  }
  const editor: EditorState = {
    items: orderedTiles.map(tile => ({
      id: tile.id,
      label: tile.label ?? tile.title ?? tile.id.replaceAll('-', ' '),
      visible: !hiddenIds.has(tile.id),
      editable: tile.editable !== false
    })),
    onVisibilityChange: (id, visible) => {
      if (tilesById.get(id)?.editable === false) return
      save(
        order,
        visible
          ? hidden.filter(value => value !== id)
          : [...hidden.filter(value => value !== id), id]
      )
    },
    onMove: (id, offset) => {
      const ids = orderedTiles.map(tile => tile.id)
      const index = ids.indexOf(id),
        target = index + offset
      if (index < 0 || target < 0 || target >= ids.length) return
      ids.splice(index, 1)
      ids.splice(target, 0, id)
      save(ids, hidden)
    },
    onAdd: (id, span) => {
      if (!tilesById.has(id) || tilesById.get(id)?.editable === false) return
      save(
        order,
        hidden.filter(value => value !== id),
        span ? { ...spans, [id]: span } : spans
      )
    },
    onPlace: (id, target, span) => {
      if (!tilesById.has(id) || tilesById.get(id)?.editable === false) return
      const ids = orderedTiles.map(tile => tile.id)
      const from = ids.indexOf(id)
      const to = target ? ids.indexOf(target) : ids.length - 1
      if (from >= 0 && to >= 0 && from !== to) {
        ids.splice(from, 1)
        ids.splice(to, 0, id)
      }
      save(
        ids,
        hidden.filter(value => value !== id),
        span ? { ...spans, [id]: span } : spans
      )
    },
    onReset: () =>
      save(
        tiles.map(tile => tile.id),
        [],
        {}
      )
  }
  return {
    editor,
    orderedTiles,
    visibleTiles: orderedTiles.filter(tile => !hiddenIds.has(tile.id))
  }
}
