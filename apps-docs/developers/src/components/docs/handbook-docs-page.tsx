import { SidebarGroup } from '@vezham/react/components/sidebar-group'
import { Notebook } from '@vezham/react/layouts/notebook'
import { DocsRoutePage } from '@vezham/start/pages/docs/route'

import { handbookDocs } from '@components/docs/handbook-docs'
import { getNotebookConfig } from '@config/notebook'
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
      const options = Notebook.getLayoutOptions({
        ...getNotebookConfig(locale as Locale),
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
