import { deserializePageTree } from '@vezham/docs-core/source/client'

import { getUiLibraryRoute } from '../../components/docs/library-routes'
import {
  getPlatformDocsRuntime,
  platformDocsPageSchema
} from '../../components/docs/platform-docs'
import {
  getPlatformPage,
  getPlatformSections
} from '../../components/docs/platform-sections'
import { getComponentResources } from './component-resources'
import { createPlatformDocsLoader } from './platform-loader'

const loader = createPlatformDocsLoader('react-v3')

describe('UI documentation', () => {
  it('defaults to the in-house React library', async () => {
    const data = await createPlatformDocsLoader()({
      params: { platform: 'web', _splat: 'getting-started' }
    })
    expect(data.routePath).toBe('/docs/ui/react/web/getting-started')
    expect(getPlatformDocsRuntime('web')).toBe(
      getPlatformDocsRuntime('web', 'react')
    )
    expect(getPlatformSections('web').map(section => section.id)).toEqual([
      'getting-started',
      'components',
      'layouts'
    ])
    expect(getPlatformPage('native', 'components/button')).toBe(
      'getting-started'
    )
    expect(getUiLibraryRoute('react')).toBe(
      '/{-$lang}/docs/ui/react/$platform/$'
    )
  })

  it.each(['web', 'native'] as const)(
    'loads in-house %s MDX with its own navigation and markdown',
    async platform => {
      const data = await createPlatformDocsLoader('react')({
        params: { platform, _splat: 'getting-started' }
      })
      expect(data.title).toBe('Getting Started')
      expect(data.routePath).toBe(`/docs/ui/react/${platform}/getting-started`)
      expect(data.platforms).toEqual(['web', 'native'])
      expect(data.markdownUrl).toContain(`/docs/ui/react/${platform}/`)
      const runtime = getPlatformDocsRuntime(platform, 'react')
      const { page } = runtime.getDocsPage({ slugs: ['getting-started'] })
      expect(await runtime.getLLMText(page)).toContain(
        platform === 'native'
          ? 'TODO: Add getting started documentation for the in-house Vezham Native library.'
          : 'TODO: Add getting started documentation for the in-house Vezham library.'
      )
      const tree = JSON.stringify(deserializePageTree(data.pageTree).children)
      expect(tree).toContain(`/docs/ui/react/${platform}/getting-started`)
      expect(tree).not.toContain('/react-v3/')
      expect(tree).not.toContain('/react-pro-v3/')
      expect(
        getPlatformSections(platform, 'react').map(item => item.id)
      ).toEqual(
        platform === 'web'
          ? ['getting-started', 'components', 'layouts']
          : ['getting-started']
      )
    },
    20_000
  )

  it.each(['en', 'cn'] as const)(
    'loads Brand documentation with %s navigation and example source',
    async lang => {
      const prefix = lang === 'en' ? '' : '/cn'
      const data = await createPlatformDocsLoader('react')({
        params: { lang, platform: 'web', _splat: 'components/brand' }
      })
      expect(data.title).toBe('Brand')
      expect(data.routePath).toBe(
        `${prefix}/docs/ui/react/web/components/brand`
      )
      const tree = JSON.stringify(deserializePageTree(data.pageTree).children)
      expect(tree).toContain(`${prefix}/docs/ui/react/web/components/brand`)
      expect(tree).not.toContain('/react-v3/')
      expect(tree).not.toContain('/react-pro-v3/')
      const runtime = getPlatformDocsRuntime('web', 'react')
      const { page } = runtime.getDocsPage({
        lang,
        slugs: ['components', 'brand']
      })
      const markdown = await runtime.getLLMText(page)
      expect(markdown).toContain('@vezham/react/components/brand')
      expect(markdown).toContain('Brand.Link')
      expect(markdown).toContain('V_APP_BRAND_NAME')
      expect(markdown).toContain('react-brand-channels')
    },
    20_000
  )

  it.each([
    [
      'en',
      'components/install-tabs',
      'InstallTabs',
      '@vezham/react/components/install-tabs',
      'react-install-tabs-development'
    ],
    [
      'cn',
      'components/install-tabs',
      'InstallTabs',
      '@vezham/react/components/install-tabs',
      'InstallTabs.Command'
    ],
    [
      'en',
      'layouts/bento',
      'Bento',
      '@vezham/react/layouts/bento',
      'react-bento-default'
    ],
    [
      'cn',
      'layouts/bento',
      'Bento',
      '@vezham/react/layouts/bento',
      'Bento.Action'
    ],
    [
      'en',
      'layouts/card-gallery',
      'CardGallery',
      '@vezham/react/layouts/card-gallery',
      'react-card-gallery-default'
    ],
    [
      'cn',
      'layouts/card-gallery',
      'CardGallery',
      '@vezham/react/layouts/card-gallery',
      'CardGallery.Group'
    ],
    [
      'en',
      'components/sidebar-group',
      'SidebarGroup',
      '@vezham/react/components/sidebar-group',
      'react-sidebar-group-default'
    ],
    [
      'cn',
      'components/sidebar-group',
      'SidebarGroup',
      '@vezham/react/components/sidebar-group',
      'SidebarGroup.createGroups'
    ],
    [
      'en',
      'layouts/notebook',
      'Notebook',
      '@vezham/react/layouts/notebook',
      'react-notebook-default'
    ],
    [
      'cn',
      'layouts/notebook',
      'Notebook',
      '@vezham/react/layouts/notebook',
      'react-notebook-custom-controls'
    ],
    [
      'en',
      'components/video-player',
      'VideoPlayer',
      '@vezham/react/components/video-player',
      'react-video-player-themed'
    ],
    [
      'cn',
      'components/video-player',
      'VideoPlayer',
      '@vezham/react/components/video-player',
      'onPlayingChange'
    ]
  ])(
    'loads %s %s documentation and exported example source',
    async (lang, path, title, entry, example) => {
      const prefix = lang === 'en' ? '' : '/cn'
      const data = await createPlatformDocsLoader('react')({
        params: { lang, platform: 'web', _splat: path }
      })
      expect(data.title).toBe(title)
      expect(data.routePath).toBe(`${prefix}/docs/ui/react/web/${path}`)
      expect(
        JSON.stringify(deserializePageTree(data.pageTree).children)
      ).toContain(`${prefix}/docs/ui/react/web/${path}`)
      const runtime = getPlatformDocsRuntime('web', 'react')
      const { page } = runtime.getDocsPage({ lang, slugs: path.split('/') })
      const markdown = await runtime.getLLMText(page)
      expect(markdown).toContain(entry)
      expect(markdown).toContain(example)
    },
    20_000
  )

  it('compiles every phase-one Auth page with registered interactive examples', async () => {
    const runtime = getPlatformDocsRuntime('web', 'auth')
    const pages = runtime.source.getPages('en')
    expect(pages).toHaveLength(59)
    const data = await createPlatformDocsLoader('auth')({
      params: {
        lang: 'cn',
        platform: 'web',
        _splat: 'components/auth-provider'
      }
    })
    expect(data.routePath).toBe('/cn/docs/ui/auth/web/components/auth-provider')
    expect(data.platforms).toEqual(['web', 'native'])
    const nativeRuntime = getPlatformDocsRuntime('native', 'auth')
    const nativePage = nativeRuntime.source.getPages('en')[0]
    expect(await nativeRuntime.getLLMText(nativePage)).toContain(
      'TODO: Add Vezham Auth documentation and native package support.'
    )
    const examples = new Set<string>()
    for (const page of pages) {
      const markdown = await runtime.getLLMText(page)
      expect(markdown).not.toMatch(
        /@better-auth-ui\/|<type-table|<DocVariant|file=<rootDir>/
      )
      for (const match of markdown.matchAll(
        /<ComponentPreview name="([^"]+)"/g
      ))
        examples.add(match[1])
    }
    expect(examples.size).toBe(54)
    expect(examples).toContain('react-auth-api-key-api-keys')
    expect(examples).toContain('react-auth-email-email-verification-email')
    expect(examples).toContain('react-auth-organization-organization-members')
  }, 60_000)

  it('requires an in-house platform and rejects unavailable sections', async () => {
    const loadReact = createPlatformDocsLoader('react')
    for (const params of [
      { _splat: 'getting-started' },
      { platform: 'other', _splat: 'getting-started' },
      { platform: 'native', _splat: 'components' }
    ]) {
      await expect(loadReact({ params })).rejects.toMatchObject({
        isNotFound: true
      })
    }
    expect(getPlatformPage('native', 'components/button', 'react')).toBe(
      'getting-started'
    )
    const localized = await loadReact({
      params: { lang: 'cn', platform: 'native', _splat: 'getting-started' }
    })
    expect(localized.routePath).toBe('/cn/docs/ui/react/native/getting-started')
  })

  it('loads Pro Web MDX and its independent component navigation', async () => {
    const data = await createPlatformDocsLoader('react-pro-v3')({
      params: { platform: 'web', _splat: 'components/area-chart' }
    })
    expect(data.title).toBe('Area Chart')
    expect(data.routePath).toBe(
      '/docs/ui/react-pro-v3/web/components/area-chart'
    )
    expect(data.platforms).toEqual(['web', 'native'])
    expect(data.markdownUrl).toContain('/docs/ui/react-pro-v3/web/')
    const runtime = getPlatformDocsRuntime('web', 'react-pro-v3')
    const { page } = runtime.getDocsPage({
      slugs: ['components', 'area-chart']
    })
    expect(await runtime.getLLMText(page)).toContain(
      '@vezham/react-pro-v3/area-chart'
    )
    expect(
      JSON.stringify(deserializePageTree(data.pageTree).children)
    ).toContain('/docs/ui/react-pro-v3/web/components/area-chart')
  }, 20_000)

  it('loads Pro Native documentation, media, markdown and independent navigation', async () => {
    const data = await createPlatformDocsLoader('react-pro-v3')({
      params: { platform: 'native', _splat: 'components/fab' }
    })
    expect(data.title).toBe('FAB')
    expect(data.routePath).toBe('/docs/ui/react-pro-v3/native/components/fab')
    expect(data.platforms).toEqual(['web', 'native'])
    const runtime = getPlatformDocsRuntime('native', 'react-pro-v3')
    const { page } = runtime.getDocsPage({ slugs: ['components', 'fab'] })
    const markdown = await runtime.getLLMText(page)
    expect(markdown).toContain('heroui-native-pro')
    expect(markdown).toContain('native-pro/videos/fab-docs-light.mp4')
    const tree = JSON.stringify(deserializePageTree(data.pageTree).children)
    expect(tree).toContain('/docs/ui/react-pro-v3/native/components/fab')
    expect(tree).not.toContain('/components/data-grid')
  }, 20_000)

  it('requires a supported platform when loading Pro documentation', async () => {
    const loadPro = createPlatformDocsLoader('react-pro-v3')
    await expect(
      loadPro({ params: { _splat: 'getting-started' } })
    ).rejects.toMatchObject({ isNotFound: true })
    await expect(
      loadPro({ params: { platform: 'other', _splat: 'getting-started' } })
    ).rejects.toMatchObject({ isNotFound: true })
  })

  it('keeps matching Pro pages and falls back within the target section', () => {
    expect(
      getPlatformPage('native', 'components/area-chart', 'react-pro-v3')
    ).toBe('components/area-chart')
    expect(
      getPlatformPage('native', 'components/data-grid', 'react-pro-v3')
    ).toBe('components')
    expect(getPlatformPage('web', 'components/fab', 'react-pro-v3')).toBe(
      'components'
    )
    expect(
      getPlatformPage('web', 'getting-started/provider', 'react-pro-v3')
    ).toBe('getting-started')
  })

  // vx-bot/NOTE: The first loader call compiles MDX on shared CI workers.
  it.each(['web', 'native'] as const)(
    'loads the %s introduction and section navigation',
    async platform => {
      const data = await loader({
        params: { platform, _splat: 'getting-started' }
      })
      expect(data.title).toBeTruthy()
      expect(data.routePath).toBe(
        `/docs/ui/react-v3/${platform}/getting-started`
      )
      expect(
        deserializePageTree(data.pageTree).children.length
      ).toBeGreaterThan(0)
      expect(data.markdownUrl).toContain(`/docs/ui/react-v3/${platform}/`)
    },
    20_000
  )

  it('retains Chinese paths with English fallback content', async () => {
    const data = await loader({
      params: { platform: 'web', lang: 'cn', _splat: 'components/button' }
    })
    expect(data.title).toBe('Button')
    expect(data.locale).toBe('cn')
    expect(data.routePath).toBe('/cn/docs/ui/react-v3/web/components/button')
    expect(deserializePageTree(data.pageTree).children.length).toBeGreaterThan(
      0
    )
  })

  it('includes copied example source in markdown exports', async () => {
    const runtime = getPlatformDocsRuntime('web', 'react-v3')
    const { page } = runtime.getDocsPage({ slugs: ['components', 'button'] })
    const markdown = await runtime.getLLMText(page)
    expect(markdown).toContain('Button')
    expect(markdown).toContain('@heroui/react')
    expect(markdown).toContain('@vezham/react-v3')
    expect(markdown).toContain('button-basic')
    expect(markdown).not.toContain('Live example:')
  })

  it.each(['web', 'native'] as const)(
    'preserves %s component resource metadata',
    platform => {
      const runtime = getPlatformDocsRuntime(platform, 'react-v3')
      const { page } = runtime.getDocsPage({
        slugs: ['components', 'accordion']
      })
      const resources = getComponentResources(page.data.links)
      expect(resources.map(resource => resource.label)).toEqual(
        platform === 'web'
          ? ['Figma', 'Storybook', 'React Aria', 'Source', 'Styles source']
          : ['Source', 'Styles source']
      )
      expect(
        resources.find(resource => resource.label === 'Source')?.href
      ).toBe(
        platform === 'web'
          ? 'https://github.com/heroui-inc/heroui/tree/v3/packages/react/src/components/accordion/accordion.tsx'
          : 'https://github.com/heroui-inc/heroui-native/tree/main/src/components/accordion/accordion.tsx'
      )
    }
  )

  it('preserves absolute resource URLs in imported metadata', () => {
    expect(
      getComponentResources({
        rac: 'https://react-spectrum.adobe.com/react-aria/Form.html'
      })
    ).toMatchObject([
      {
        label: 'React Aria',
        href: 'https://react-spectrum.adobe.com/react-aria/Form.html'
      }
    ])
  })

  it('retains status, release attribution, and social images', () => {
    const runtime = getPlatformDocsRuntime('web', 'react-v3')
    expect(
      runtime.getDocsPage({ slugs: ['components', 'tabs'] }).page.data.status
    ).toBe('new')
    expect(
      runtime.getDocsPage({ slugs: ['getting-started', 'agents-md'] }).page.data
        .status
    ).toBe('preview')
    const metadata = platformDocsPageSchema.parse({
      title: 'Release',
      github: { pull: 6892 },
      image: 'https://example.com/cover.jpg'
    })
    expect(metadata.github).toEqual({ pull: 6892 })
    expect(metadata.image).toBe('https://example.com/cover.jpg')
  })

  it('offers migration only on Web and rejects unknown platforms', async () => {
    expect(
      getPlatformSections('native', 'react-v3').map(section => section.id)
    ).not.toContain('migration')
    expect(
      getPlatformSections('web', 'react-v3').map(section => section.id)
    ).toContain('migration')
    await expect(
      loader({ params: { platform: 'other', _splat: 'getting-started' } })
    ).rejects.toMatchObject({ isNotFound: true })
  })
})
