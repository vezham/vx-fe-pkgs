import { Link } from '@tanstack/react-router'

import {
  Notebook,
  notebookSectionTabVariants
} from '@vezham/react/layouts/notebook'

import { i18n } from '@app/docs'
import { getUiLibraryRoute } from '@components/docs/library-routes'
import { getPlatformSections } from '@components/docs/platform-sections'
import type { UiLibrary } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

type Props = {
  library?: UiLibrary
  locale: Locale
  platform: 'web' | 'native'
  selectedSection: string
}

export const SectionTabs = ({
  library = 'react',
  locale,
  platform,
  selectedSection
}: Props) => {
  return (
    <Notebook.SectionTabs>
      {getPlatformSections(platform, library, locale).map(item => (
        <Link
          key={item.id}
          to={getUiLibraryRoute(library)}
          params={{
            lang: locale === i18n.defaultLanguage ? undefined : locale,
            platform,
            _splat: item.page
          }}
          className={notebookSectionTabVariants({
            selected: item.id === selectedSection
          })}>
          {item.title}
        </Link>
      ))}
    </Notebook.SectionTabs>
  )
}
