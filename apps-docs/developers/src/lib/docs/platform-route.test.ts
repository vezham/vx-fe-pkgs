import { getPlatformDocsRuntime } from '../../components/docs/platform-docs'
import { uiLibraries } from '../../config/ui-libraries'
import {
  createPlatformDocsRouteOptions,
  createPlatformMarkdownHandler
} from './platform-route'

describe('shared UI documentation routes', () => {
  it.each(Object.keys(uiLibraries) as (keyof typeof uiLibraries)[])(
    'keeps %s markdown exports on the selected library and platform',
    async library => {
      for (const platform of ['web', 'native'] as const) {
        const runtime = getPlatformDocsRuntime(platform, library)
        const { page } = runtime.getDocsPage({ slugs: ['getting-started'] })
        const response = await createPlatformMarkdownHandler(library)({
          params: { platform, _splat: 'getting-started' }
        })
        expect(response.status).toBe(200)
        expect(response.headers.get('content-type')).toBe('text/markdown')
        expect(await response.text()).toBe(await runtime.getLLMText(page))
      }
    },
    20_000
  )

  it('rejects unsupported platforms without resolving a docs collection', async () => {
    const response = await createPlatformMarkdownHandler('react')({
      params: { platform: 'other' }
    })
    expect(response.status).toBe(404)
  })

  it('preserves localized titles and the page-specific social image', async () => {
    const options = createPlatformDocsRouteOptions('react-v3')
    const params = { lang: 'cn', platform: 'web', _splat: 'getting-started' }
    const data = await options.loader({ params })
    const meta = options.head({ params, loaderData: data }).meta
    expect(meta).toContainEqual({
      title: 'Introduction - Vezham v3 Web | Vezham Developers'
    })
    expect(meta).toContainEqual({ property: 'og:image', content: data.image })
  })
})
