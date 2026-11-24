import { handbookDocsRuntime } from '@components/docs/handbook-docs'
import { packagesDocsRuntime } from '@components/docs/packages-docs'
import { getPlatformDocsRuntimes } from '@components/docs/platform-docs'
import { iconDocsRuntime } from '@src/lib/icon-library/docs'

export const docsRuntimes = [
  handbookDocsRuntime,
  packagesDocsRuntime,
  iconDocsRuntime,
  ...getPlatformDocsRuntimes()
]
