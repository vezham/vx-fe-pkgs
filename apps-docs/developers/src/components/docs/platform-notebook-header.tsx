import type { ComponentPropsWithoutRef } from 'react'

import { Notebook } from '@vezham/react/layouts/notebook'

import { LibrarySelector } from '@components/docs/library-selector'
import { SectionTabs } from '@components/docs/section-tabs'
import { getNotebookConfig } from '@config/notebook'
import type { UiLibrary } from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

type Props = ComponentPropsWithoutRef<'header'> & {
  library?: UiLibrary
  locale: Locale
  platform: 'web' | 'native'
  selectedSection: string
}

export const PlatformNotebookHeader = ({
  library = 'react',
  locale,
  platform,
  selectedSection,
  ...props
}: Props) => {
  return (
    <Notebook.Header
      {...props}
      {...getNotebookConfig(locale).headerProps}
      leading={<LibrarySelector library={library} locale={locale} />}>
      <SectionTabs
        library={library}
        locale={locale}
        platform={platform}
        selectedSection={selectedSection}
      />
    </Notebook.Header>
  )
}
