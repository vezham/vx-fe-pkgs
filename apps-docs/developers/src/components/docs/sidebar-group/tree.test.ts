import type { Item, Node } from '@vezham/docs-core/page-tree'

import { createSidebarGroups, filterSidebarTree } from './tree'

const page = (url: string): Item => ({ type: 'page', name: url, url })
const filter = (nodes: Node[]) =>
  filterSidebarTree({ docsBase: '/docs', prefix: 'web', nodes })

describe('sidebar page tree', () => {
  it('scopes an empty section prefix to the collection landing page', () => {
    const index = page('/handbook')
    expect(
      filterSidebarTree({
        docsBase: '/handbook',
        prefix: '',
        nodes: [
          index,
          page('/handbook/markdown'),
          page('/handbook/markdown/handbooks/basic')
        ]
      })
    ).toEqual([index])
  })

  it('keeps section labels when the index is listed as a child page', () => {
    const overview = { type: 'separator', name: 'Overview' } as const
    const handbook = { type: 'separator', name: 'Handbook' } as const
    const index = page('/docs/web')
    const guide = page('/docs/web/guide')
    expect(
      filter([
        {
          type: 'folder',
          name: 'Web',
          children: [overview, index, handbook, guide]
        }
      ])
    ).toEqual([overview, index, handbook, guide])
  })

  it('matches the exact section and descendants within the docs base', () => {
    const index = page('/docs/web')
    const child = page('/docs/web/start')
    expect(
      filter([
        index,
        child,
        page('/docs/webview'),
        page('/docs/native/start'),
        page('/xxxx/web'),
        page('/docsx/web'),
        { type: 'separator', name: 'Other' }
      ])
    ).toEqual([index, child])
  })

  it('prunes empty folders and unwraps a single retained folder without mutating it', () => {
    const index = page('/docs/web')
    const child = page('/docs/web/start')
    const nodes: Node[] = [
      {
        type: 'folder',
        name: 'Web',
        root: true,
        index,
        children: [
          {
            type: 'folder',
            name: 'Guide',
            children: [child, page('/docs/native')]
          },
          { type: 'folder', name: 'Empty', children: [] }
        ]
      },
      { type: 'folder', name: 'Native', children: [page('/docs/native')] }
    ]
    const original = structuredClone(nodes)
    expect(filter(nodes)).toEqual([
      index,
      {
        type: 'folder',
        name: 'Guide',
        defaultOpen: true,
        root: false,
        index: undefined,
        children: [child]
      }
    ])
    expect(nodes).toEqual(original)
  })

  it('retains index-only folders and removes unrelated indexes', () => {
    const index = page('/docs/web')
    expect(
      filter([{ type: 'folder', name: 'Web', index, children: [] }])
    ).toEqual([index])
    const child = page('/docs/web/start')
    expect(
      filter([
        {
          type: 'folder',
          name: 'Web',
          index: page('/docs/native'),
          children: [child]
        }
      ])
    ).toEqual([child])
  })

  it('keeps multiple matching folders and returns an empty tree when none match', () => {
    const nodes: Node[] = ['a', 'b'].map(name => ({
      type: 'folder',
      name,
      children: [page(`/docs/web/${name}`)]
    }))
    expect(filter(nodes)).toHaveLength(2)
    expect(filter([])).toEqual([])
    expect(
      filter([
        {
          type: 'folder',
          name: 'Other',
          index: page('/docs/native'),
          children: []
        }
      ])
    ).toEqual([])
  })

  it('keeps nested group indexes as links without changing the source tree', () => {
    const index = page('/docs/web/guide')
    const nestedIndex = page('/docs/web/guide/examples')
    const example = page('/docs/web/guide/examples/basic')
    const nodes: Node[] = [
      page('/docs/web'),
      {
        type: 'folder',
        name: 'Guide',
        index,
        children: [
          {
            type: 'folder',
            name: 'Examples',
            index: nestedIndex,
            children: [example]
          },
          page('/docs/native/guide')
        ]
      }
    ]
    const original = structuredClone(nodes)

    expect(
      createSidebarGroups({ docsBase: '/docs', prefix: 'web', nodes })
    ).toEqual([
      page('/docs/web'),
      {
        type: 'folder',
        name: 'Guide',
        defaultOpen: true,
        root: false,
        index: undefined,
        children: [
          index,
          {
            type: 'folder',
            name: 'Examples',
            defaultOpen: true,
            root: false,
            index: undefined,
            children: [nestedIndex, example]
          }
        ]
      }
    ])
    expect(nodes).toEqual(original)
  })
})
