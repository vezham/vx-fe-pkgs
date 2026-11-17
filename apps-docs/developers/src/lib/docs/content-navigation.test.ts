import { handbookDocsRuntime } from '../../components/docs/handbook-docs'
import {
  getAvailableDocsPackages,
  packagesDocsRuntime
} from '../../components/docs/packages-docs'
import { getPlatformDocsRuntime } from '../../components/docs/platform-docs'
import {
  getPlatformPage,
  getPlatformSections
} from '../../components/docs/platform-sections'
import { getComponentCatalog } from './component-catalog'
import { getContentPage, getContentSections } from './content-navigation'
import { docsRuntimes } from './runtimes'

describe('content navigation', () => {
  it('uses section metadata instead of the introduction page title', () => {
    const sections = getPlatformSections('web', 'react-v3')
    expect(sections[0]).toMatchObject({
      id: 'getting-started',
      title: 'Getting Started'
    })
    expect(
      getPlatformDocsRuntime('web', 'react-v3').source.getPage([
        'getting-started'
      ])?.data.title
    ).toBe('Introduction')
  })

  it('follows reordered metadata and removed sections without a code list', () => {
    const source = getPlatformDocsRuntime('web', 'react-pro-v3').source
    const tree = source.getPageTree()
    const spy = vi.spyOn(source, 'getPageTree').mockReturnValue({
      ...tree,
      children: tree.children.filter(
        node =>
          node.type === 'folder' &&
          source.getNodeMeta(node)?.path === 'components/meta.json'
      )
    })
    try {
      expect(
        getPlatformSections('web', 'react-pro-v3').map(section => section.id)
      ).toEqual(['components'])
      expect(getPlatformPage('web', 'getting-started', 'react-pro-v3')).toBe(
        'components'
      )
    } finally {
      spy.mockRestore()
    }
  })

  it('reads changed section labels from metadata', () => {
    const source = getPlatformDocsRuntime('native', 'react-pro-v3').source
    const original = source.getNodeMeta.bind(source)
    const spy = vi
      .spyOn(source, 'getNodeMeta')
      .mockImplementation((node, locale) => {
        const meta = original(node, locale)
        return meta &&
          node.type === 'folder' &&
          meta.path === 'components/meta.json'
          ? { ...meta, data: { ...meta.data, title: 'Patterns' } }
          : meta
      })
    try {
      expect(
        getPlatformSections('native', 'react-pro-v3').find(
          section => section.id === 'components'
        )?.title
      ).toBe('Patterns')
    } finally {
      spy.mockRestore()
    }
  })

  it('uses live source pages instead of the imported gallery page list', () => {
    const source = getPlatformDocsRuntime('web', 'react-pro-v3').source
    const original = source.getPage.bind(source)
    const page = original(['components', 'area-chart'])
    if (!page) throw new Error('Missing Area Chart fixture')
    const spy = vi
      .spyOn(source, 'getPage')
      .mockImplementation((slugs, locale) =>
        slugs?.join('/') === 'components/new-example'
          ? { ...page, slugs: ['components', 'new-example'] }
          : original(slugs, locale)
      )
    try {
      expect(
        getPlatformPage('web', 'components/new-example', 'react-pro-v3')
      ).toBe('components/new-example')
    } finally {
      spy.mockRestore()
    }
  })

  it('derives handbook sections and their order from the merged collection', () => {
    expect(getContentSections(handbookDocsRuntime.source)).toEqual([
      { id: 'markdown', title: 'Markdown', page: 'markdown' }
    ])
  })

  it('keeps package page resolution within the target package and section', () => {
    expect(
      getContentPage(packagesDocsRuntime.source, 'guides/missing', {
        prefix: 'hooks',
        locale: 'cn'
      })
    ).toBe('guides')
    expect(
      getContentPage(packagesDocsRuntime.source, 'missing', { prefix: 'hooks' })
    ).toBe('getting-started')
  })

  it('uses root content metadata for package availability and ordering', () => {
    const source = packagesDocsRuntime.source
    const tree = source.getPageTree()
    const spy = vi.spyOn(source, 'getPageTree').mockReturnValue({
      ...tree,
      children: tree.children
        .filter(
          node =>
            node.type === 'folder' &&
            source.getNodeMeta(node)?.path !== 'env/meta.json'
        )
        .reverse()
    })
    try {
      expect(getAvailableDocsPackages()).toEqual([
        'hooks',
        'config',
        'devtools',
        'utils',
        'template',
        'start'
      ])
    } finally {
      spy.mockRestore()
    }
  })

  it('reads gallery metadata from component MDX and excludes section indexes', () => {
    const source = getPlatformDocsRuntime('web', 'react-v3').source
    const button = source.getPage(['components', 'button'])
    expect(
      getComponentCatalog('web').find(page => page.slug === 'button')
    ).toMatchObject({
      title: button?.data.title,
      status: button?.data.status ?? null,
      url: button?.url
    })
    expect(
      getComponentCatalog('web').some(page => page.slug === 'components')
    ).toBe(false)
  })

  it('keeps gallery links on the selected locale, library, and platform', () => {
    const catalog = getComponentCatalog('native', 'react-pro-v3', 'cn')
    expect(catalog.find(page => page.slug === 'fab')?.url).toBe(
      '/cn/docs/ui/react-pro-v3/native/components/fab'
    )
    expect(catalog.some(page => page.url.includes('/react-v3/'))).toBe(false)
  })

  it('registers every content source once for search and LLM endpoints', () => {
    const urls = docsRuntimes.flatMap(runtime =>
      runtime.source.getPages().map(page => `${page.locale}:${page.url}`)
    )
    expect(new Set(urls).size).toBe(urls.length)
    expect(urls).toContain('en:/handbook/markdown')
  })
})
