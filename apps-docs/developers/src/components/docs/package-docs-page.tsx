import { Notebook } from '@vezham/react/layouts/notebook'
import { DocsRoutePage } from '@vezham/start/pages/docs/route'

import {
  PackageSelector,
  PackageVersionSelector
} from '@components/docs/package-selectors'
import { packagesDocs } from '@components/docs/packages-docs'
import { getNotebookConfig } from '@config/notebook'
import { docsPackages, getPackageDocsPath } from '@config/packages'
import type { Locale } from '@generated/vx'
import type { loadPackageDocs } from '@src/lib/docs/package-route'

type Props = { data: Awaited<ReturnType<typeof loadPackageDocs>> }

export const PackageDocsPage = ({ data }: Props) => (
  <DocsRoutePage
    data={data}
    docs={packagesDocs}
    shell="notebook"
    getLayoutOptions={locale => {
      const language = locale as Locale
      const selector = (
        <PackageSelector
          packageId={data.packageId}
          locale={language}
          page={data.page}
        />
      )
      return Notebook.getLayoutOptions({
        ...getNotebookConfig(language),
        path: getPackageDocsPath(data.packageId, data.page),
        title: docsPackages[data.packageId].name,
        leading: <PackageVersionSelector packageId={data.packageId} />,
        secondary: selector,
        sectionLabel: 'Package documentation sections',
        sections: data.sections
      })
    }}
  />
)
