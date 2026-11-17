import { handbookDocsRuntime } from '@components/docs/handbook-docs'
import { packagesDocsRuntime } from '@components/docs/packages-docs'
import { getPlatformDocsRuntime } from '@components/docs/platform-docs'
import { type UiLibrary, uiLibraries, uiPlatforms } from '@config/ui-libraries'
import { iconDocsRuntime } from '@src/lib/icon-library/docs'

export const docsRuntimes = [
  handbookDocsRuntime,
  packagesDocsRuntime,
  iconDocsRuntime,
  ...Object.keys(uiLibraries).flatMap(library =>
    (Object.keys(uiPlatforms) as (keyof typeof uiPlatforms)[]).map(platform =>
      getPlatformDocsRuntime(platform, library as UiLibrary)
    )
  )
]
