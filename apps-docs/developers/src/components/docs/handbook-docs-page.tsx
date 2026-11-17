import { DocsRoutePage } from '@vezham/start/pages/docs/route'

import { handbookDocs } from '@components/docs/handbook-docs'
import { getNotebookLayoutOptions } from '@components/docs/notebook-layout'
import { SidebarGroup } from '@components/docs/sidebar-group'
import type { Locale } from '@generated/vx'
import type { loadHandbookDocs } from '@src/lib/docs/handbook-route'

export const HandbookDocsPage = ({
  data
}: {
  data: Awaited<ReturnType<typeof loadHandbookDocs>>
}) => (
  <DocsRoutePage
    data={data}
    docs={handbookDocs}
    shell="notebook"
    getLayoutOptions={locale => {
      const options = getNotebookLayoutOptions({
        locale: locale as Locale,
        path: `/handbook${data.page ? `/${data.page}` : ''}`,
        title: data.collectionTitle ?? data.title ?? '',
        sectionLabel: 'Handbook sections',
        sections: data.sections.map(section => ({
          title: section.title,
          path: `/handbook${section.page ? `/${section.page}` : ''}`
        }))
      })
      return {
        ...options,
        sidebar: {
          ...options.sidebar,
          components: { Folder: SidebarGroup }
        }
      }
    }}
  />
)
