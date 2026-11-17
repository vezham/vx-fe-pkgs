import type { ComponentPropsWithoutRef } from 'react'

import { LibrarySelector } from '@components/docs/library-selector'
import { NotebookHeader } from '@components/docs/notebook-header'
import { SectionTabs } from '@components/docs/section-tabs'
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
    <NotebookHeader
      {...props}
      locale={locale}
      leading={<LibrarySelector library={library} locale={locale} />}>
      <SectionTabs
        library={library}
        locale={locale}
        platform={platform}
        selectedSection={selectedSection}
      />
    </NotebookHeader>
  )
}
