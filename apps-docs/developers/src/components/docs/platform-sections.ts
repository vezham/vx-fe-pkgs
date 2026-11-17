import { notFound } from '@tanstack/react-router'

import { getPlatformDocsRuntime } from '@components/docs/platform-docs'
import type { UiLibrary } from '@config/ui-libraries'
import {
  getContentPage,
  getContentSections
} from '@src/lib/docs/content-navigation'

export const getPlatformSections = (
  platform: 'web' | 'native',
  library: UiLibrary = 'react',
  locale?: string
) =>
  getContentSections(getPlatformDocsRuntime(platform, library).source, {
    locale
  }).map(section => ({ ...section, prefix: section.id }))

export const getPlatformPage = (
  platform: 'web' | 'native',
  page: string,
  library: UiLibrary = 'react',
  locale?: string
) => {
  const target = getContentPage(
    getPlatformDocsRuntime(platform, library).source,
    page,
    { locale }
  )
  if (target === undefined) throw notFound()
  return target
}
