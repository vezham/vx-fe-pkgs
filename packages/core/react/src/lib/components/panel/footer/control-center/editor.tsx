import { useLocalStore } from '@vezham/hooks'

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
interface TilePreferences {
  order: string[]
  hidden: string[]
  spans: Record<string, string>
}
const INITIAL_PREFERENCES: TilePreferences = {
  order: [],
  hidden: [],
  spans: {}
}
const parsePreferences = (data: unknown): TilePreferences => {
  if (!data || typeof data !== 'object') return INITIAL_PREFERENCES
  const value = data as Partial<TilePreferences>
  return {
    order: Array.isArray(value.order)
      ? [...new Set(value.order.filter(id => typeof id === 'string'))]
      : [],
    hidden: Array.isArray(value.hidden)
      ? value.hidden.filter(id => typeof id === 'string')
      : [],
    spans:
      value.spans && typeof value.spans === 'object'
        ? Object.fromEntries(
            Object.entries(value.spans).filter(
              ([, span]) => typeof span === 'string'
            )
          )
        : {}
  }
}
export const useTileEditor = <Tile extends EditableTile>(
  tiles: readonly Tile[],
  storageKey = 'vx:control-center'
) => {
  const { value: preferences, setValue } = useLocalStore(
    storageKey,
    INITIAL_PREFERENCES,
    {
      parse: parsePreferences
    }
  )
  const { order, hidden, spans } = preferences
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
    setValue({
      order: [...nextOrder],
      hidden: [...nextHidden],
      spans: nextSpans
    })
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
