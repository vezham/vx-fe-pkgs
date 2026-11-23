import { i18n } from '@app/docs'
import { getPlatformDocsRuntime } from '@components/docs/platform-docs'
import type { UiLibrary } from '@config/ui-libraries'

const getCatalog = (
  section: 'components' | 'layouts' | 'auth',
  platform: 'web' | 'native',
  library: UiLibrary,
  locale: string
) =>
  getPlatformDocsRuntime(platform, library)
    .source.getPages(locale)
    .flatMap(page => {
      if (
        page.slugs[0] !== section ||
        page.slugs.length < 2 ||
        !page.data.title
      )
        return []
      return [
        {
          platform,
          slug: page.slugs[page.slugs.length - 1],
          title: page.data.title,
          status: page.data.status ?? null,
          url: page.url
        }
      ]
    })

export const getComponentCatalog = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react-v3',
  locale: string = i18n.defaultLanguage
) => getCatalog('components', platform, library, locale)

export const getLayoutCatalog = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react',
  locale: string = i18n.defaultLanguage
) => getCatalog('layouts', platform, library, locale)

export const getAuthCatalog = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react',
  locale: string = i18n.defaultLanguage
) => getCatalog('auth', platform, library, locale)
