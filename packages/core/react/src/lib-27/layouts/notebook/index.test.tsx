import { Notebook } from './index'

vi.mock('@vezham/env/vite', () => ({
  APP_BRAND_NAME: 'Test App',
  APP_BRAND_CHANNEL: undefined
}))

describe('Notebook layout options', () => {
  it('selects the most specific section and resolves all navigation URLs', () => {
    const options = Notebook.getLayoutOptions({
      title: 'Docs',
      path: '/docs/guides/install',
      sections: [
        { title: 'Docs', path: '/docs' },
        { title: 'Guides', path: '/docs/guides' }
      ],
      resolveUrl: path => `/cn${path}`,
      baseOptions: { nav: { title: 'Test App', url: '/cn/' } }
    })

    expect(options.nav).toMatchObject({
      title: 'Test App',
      url: '/cn/',
      mode: 'top'
    })
    expect(options.tabs).toEqual([
      { title: 'Docs', url: '/cn/docs', urls: undefined },
      {
        title: 'Guides',
        url: '/cn/docs/guides',
        urls: new Set(['/cn/docs/guides/install'])
      }
    ])
  })

  it('supports a single section and preserves custom sidebar configuration', () => {
    const options = Notebook.getLayoutOptions({
      title: 'Handbook',
      path: '/handbook',
      baseOptions: { sidebar: { collapsible: false } }
    })

    expect(options.tabs).toEqual([
      { title: 'Handbook', url: '/handbook', urls: new Set(['/handbook']) }
    ])
    expect(options.sidebar).toMatchObject({ collapsible: false })
  })
})
