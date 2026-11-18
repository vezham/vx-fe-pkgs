import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import type { Folder } from '@vezham/docs-core/page-tree'
import { deserializePageTree } from '@vezham/docs-core/source/client'
import { SidebarGroup } from '@vezham/react/components/sidebar-group'

import { createPlatformDocsLoader } from '../../lib/docs/platform-loader'
import { getPlatformLayoutOptions } from './platform-layout'

const animations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)

beforeEach(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
})

afterEach(() => {
  if (animations)
    Object.defineProperty(Element.prototype, 'getAnimations', animations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
})

const getOptions = (library: 'react' | 'react-v3' | 'react-pro-v3') =>
  getPlatformLayoutOptions({
    library,
    locale: 'en',
    page: 'components/brand',
    platform: 'web',
    platforms: ['web', 'native'],
    selectedSection: 'components',
    getPlatformParams: platform => ({
      lang: undefined,
      platform,
      _splat: 'components'
    })
  })

const renderGroup = (item: Folder) => {
  const Renderer = getOptions('react').sidebar?.components?.Folder
  if (!Renderer) throw new Error('Missing shared sidebar renderer')
  return render(
    <Renderer item={item}>
      {item.children.map(node =>
        node.type === 'page' ? (
          <a key={node.url} href={node.url}>
            {node.name}
          </a>
        ) : null
      )}
    </Renderer>
  )
}

describe('in-house React sidebar', () => {
  it('uses the shared renderer only for the in-house library', () => {
    expect(getOptions('react').sidebar?.components?.Folder).toBe(SidebarGroup)
    expect(getOptions('react-v3').sidebar?.components?.Folder).toBeUndefined()
    expect(
      getOptions('react-pro-v3').sidebar?.components?.Folder
    ).toBeUndefined()
  })

  it.each(['en', 'cn'])(
    'renders collapsible component groups with %s page links',
    async lang => {
      const data = await createPlatformDocsLoader('react')({
        params: { lang, platform: 'web', _splat: 'components/brand' }
      })
      const tree = deserializePageTree(data.pageTree)
      const prefix = lang === 'en' ? '' : '/cn'
      const brandUrl = prefix + '/docs/ui/react/web/components/brand'
      const navigation = tree.children.find(
        (node): node is Folder =>
          node.type === 'folder' &&
          node.children.some(
            child => child.type === 'page' && child.url === brandUrl
          )
      )
      const media = tree.children.find(
        node =>
          node.type === 'folder' &&
          node.children.some(
            child =>
              child.type === 'page' && child.url.endsWith('/video-player')
          )
      )
      expect(navigation).toMatchObject({
        type: 'folder',
        root: false,
        defaultOpen: true,
        index: undefined
      })
      expect(media).toMatchObject({
        type: 'folder',
        children: [
          {
            type: 'page',
            url: prefix + '/docs/ui/react/web/components/video-player'
          }
        ]
      })
      expect(JSON.stringify(tree)).not.toContain('/layouts/')
      if (!navigation) throw new Error('Missing Navigation group')
      renderGroup(navigation)
      const toggle = screen.getByRole('button', { name: 'Navigation' })
      expect(screen.getByRole('link', { name: 'Brand' })).toHaveAttribute(
        'href',
        brandUrl
      )
      expect(
        screen.getByRole('link', { name: 'SidebarGroup' })
      ).toHaveAttribute(
        'href',
        prefix + '/docs/ui/react/web/components/sidebar-group'
      )
      fireEvent.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await waitFor(() =>
        expect(screen.queryByRole('link', { name: 'Brand' })).toBeNull()
      )
    }
  )

  it('renders the layout documentation group with a stable Notebook URL', async () => {
    const data = await createPlatformDocsLoader('react')({
      params: { platform: 'web', _splat: 'layouts/notebook' }
    })
    const group = deserializePageTree(data.pageTree).children.find(
      (node): node is Folder => node.type === 'folder'
    )
    if (!group) throw new Error('Missing Documentation group')
    renderGroup(group)
    expect(
      screen.getByRole('button', { name: 'Documentation' })
    ).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Notebook' })).toHaveAttribute(
      'href',
      '/docs/ui/react/web/layouts/notebook'
    )
  })
})
