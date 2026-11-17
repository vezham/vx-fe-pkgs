import { type Asset, filterAssets, parseCatalogSearch } from './catalog'

const assets: Asset[] = [
  {
    slug: 'filter',
    title: 'Filter',
    category: 'settings',
    keywords: 'preferences',
    subcategory: '',
    weights: ['outline'],
    variants: {}
  },
  {
    slug: 'settings',
    title: 'Settings',
    category: 'settings',
    keywords: 'gear cog',
    subcategory: '',
    weights: ['outline', 'filled'],
    variants: {}
  },
  {
    slug: 'home',
    title: 'Home',
    category: 'building',
    keywords: 'house dashboard',
    subcategory: '',
    weights: ['outline', 'filled'],
    variants: {}
  }
]
describe('asset catalog search', () => {
  it('ranks a matching icon above broad category matches and supports synonyms', () => {
    expect(
      filterAssets(assets, parseCatalogSearch({ q: 'gear' }), 'icons').map(
        asset => asset.slug
      )
    ).toEqual(['settings', 'filter'])
  })
  it('combines keyword, category and available-weight filters', () => {
    expect(
      filterAssets(
        assets,
        parseCatalogSearch({
          q: 'preferences',
          category: 'settings',
          weight: 'filled'
        }),
        'icons'
      )
    ).toEqual([])
    expect(
      filterAssets(
        assets,
        parseCatalogSearch({
          q: 'house',
          category: 'building',
          weight: 'filled'
        }),
        'icons'
      ).map(asset => asset.slug)
    ).toEqual(['home'])
  })
  it('bounds query size and rejects unsupported style and pagination input', () => {
    const parsed = parseCatalogSearch({
      q: 'x'.repeat(500),
      weight: 'bad',
      size: 10000,
      page: -10
    })
    expect(parsed.q).toHaveLength(200)
    expect(parsed).toMatchObject({ weight: 'outline', size: 72, page: 1 })
  })
})

describe('CDN collection ownership', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv(
      'V_ILLUSTRATIONS_CDN_URL',
      'https://illustrations.cdn.vezham.com'
    )
    vi.stubEnv('V_LOGOS_CDN_URL', 'https://logos.cdn.vezham.com')
    vi.stubEnv('V_APP_VER', '26.0.3')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('loads illustration and logo catalogs from their own CDN while keeping icon metadata local', async () => {
    const fetch = vi
      .fn()
      .mockImplementation(() => Promise.resolve(new Response('[]')))
    vi.stubGlobal('fetch', fetch)
    const { loadCatalog } = await import('./catalog')
    await Promise.all([
      loadCatalog('illustrations'),
      loadCatalog('logos'),
      loadCatalog('icons')
    ])
    expect(fetch.mock.calls.map(([url]) => url)).toEqual([
      'https://illustrations.cdn.vezham.com/catalog.json?vx=26.0.3',
      'https://logos.cdn.vezham.com/catalog.json?vx=26.0.3',
      '/icon-catalog/icons.json'
    ])
  })

  it('resolves assets on the same origin as their catalog and falls back to an available logo variant', async () => {
    const { assetUrl } = await import('./catalog')
    const asset = {
      ...assets[0],
      slug: 'react',
      variants: {
        original: 'https://logos.cdn.vezham.com/assets/react/original.svg',
        text: 'https://logos.cdn.vezham.com/assets/react/text.svg'
      }
    }
    expect(assetUrl('illustrations', { ...asset, slug: 'astronaut' })).toBe(
      'https://illustrations.cdn.vezham.com/assets/astronaut.svg?vx=26.0.3'
    )
    expect(assetUrl('logos', asset, 'text')).toBe(
      'https://logos.cdn.vezham.com/assets/react/text.svg?vx=26.0.3'
    )
    expect(assetUrl('logos', asset, 'missing')).toBe(
      'https://logos.cdn.vezham.com/assets/react/original.svg?vx=26.0.3'
    )
  })

  it('uses environment overrides for catalogs and SVGs even when logo metadata contains production URLs', async () => {
    vi.stubEnv('V_ILLUSTRATIONS_CDN_URL', 'http://localhost:4101/')
    vi.stubEnv('V_LOGOS_CDN_URL', 'https://logos.test.vezham.com/')
    vi.stubEnv('V_APP_VER', '26.0.4+preview')
    const fetch = vi
      .fn()
      .mockImplementation(() => Promise.resolve(new Response('[]')))
    vi.stubGlobal('fetch', fetch)
    const { loadCatalog, assetUrl } = await import('./catalog')
    await Promise.all([loadCatalog('illustrations'), loadCatalog('logos')])
    expect(fetch.mock.calls.map(([url]) => url)).toEqual([
      'http://localhost:4101/catalog.json?vx=26.0.4%2Bpreview',
      'https://logos.test.vezham.com/catalog.json?vx=26.0.4%2Bpreview'
    ])
    const asset = {
      ...assets[0],
      slug: 'react',
      variants: {
        original: 'https://logos.cdn.vezham.com/assets/react/original.svg'
      }
    }
    expect(assetUrl('illustrations', { ...asset, slug: 'astronaut' })).toBe(
      'http://localhost:4101/assets/astronaut.svg?vx=26.0.4%2Bpreview'
    )
    expect(assetUrl('logos', asset, 'missing')).toBe(
      'https://logos.test.vezham.com/assets/react/original.svg?vx=26.0.4%2Bpreview'
    )
  })
})
