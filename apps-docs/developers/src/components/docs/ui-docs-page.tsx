import { notFound } from '@tanstack/react-router'

import { i18n } from '@app/docs'
import { getPlatformDocs } from '@components/docs/platform-docs'
import { getPlatformLayoutOptions } from '@components/docs/platform-layout'
import { PlatformDocsRoutePage } from '@components/docs/platform-route-page'
import {
  getPlatformPage,
  getPlatformSections
} from '@components/docs/platform-sections'
import type { UiLibrary } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'
import type { createPlatformDocsLoader } from '@src/lib/docs/platform-loader'

type Props = {
  library: UiLibrary
  data: Awaited<ReturnType<ReturnType<typeof createPlatformDocsLoader>>>
  params: { lang?: string; platform?: string; _splat?: string }
}

export const UiDocsPage = ({ library, data, params }: Props) => {
  const { platform, _splat } = params
  if (platform !== 'web' && platform !== 'native') throw notFound()

  const locale = data.locale as Locale
  const platformSections = getPlatformSections(platform, library, locale)
  const section = _splat?.split('/')[0]
  const currentSection = platformSections.find(item => item.id === section)
  if (!data || !currentSection || !_splat) throw notFound()

  const getPlatformParams = (value: 'web' | 'native') => ({
    lang: locale === i18n.defaultLanguage ? undefined : locale,
    platform: value,
    _splat: getPlatformPage(value, _splat, library, locale)
  })

  return (
    <PlatformDocsRoutePage
      data={data}
      platform={platform}
      docs={getPlatformDocs(platform, library)}
      shell="notebook"
      getLayoutOptions={locale =>
        getPlatformLayoutOptions({
          library,
          locale: locale as Locale,
          page: _splat,
          platform,
          platforms: data.platforms,
          selectedSection: currentSection.id,
          getPlatformParams
        })
      }
    />
  )
}
