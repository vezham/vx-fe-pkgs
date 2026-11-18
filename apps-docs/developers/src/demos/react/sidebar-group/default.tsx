import type { Folder } from '@vezham/docs-core/page-tree'
import { SidebarGroup } from '@vezham/react/components/sidebar-group'

const groups: Folder[] = [
  {
    type: 'folder',
    name: 'Navigation',
    children: [
      {
        type: 'page',
        name: 'Brand',
        url: '/docs/ui/react/web/components/brand'
      },
      {
        type: 'page',
        name: 'SidebarGroup',
        url: '/docs/ui/react/web/components/sidebar-group'
      }
    ]
  },
  {
    type: 'folder',
    name: 'Media',
    defaultOpen: false,
    children: [
      {
        type: 'page',
        name: 'VideoPlayer',
        url: '/docs/ui/react/web/components/video-player'
      }
    ]
  }
]

export const Default = () => (
  <nav aria-label="Example documentation" className="w-full max-w-64">
    {groups.map(item => (
      <SidebarGroup key={String(item.name)} item={item}>
        {item.children.map(page =>
          page.type === 'page' ? (
            <a
              key={page.url}
              href={page.url}
              className="text-muted hover:bg-default-hover hover:text-foreground rounded-md px-2 py-1.5 text-sm">
              {page.name}
            </a>
          ) : null
        )}
      </SidebarGroup>
    ))}
  </nav>
)
