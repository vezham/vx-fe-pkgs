// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Book,
  Copy,
  EllipsisVertical,
  FolderOpen,
  TrashBin
} from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Breadcrumbs, Dropdown, Label } from '@vezham/react-v3'

const docsSections = [
  {
    items: ['Installation', 'Project Structure'],
    label: 'Getting Started'
  },
  {
    items: [
      'Routing',
      'Data Fetching',
      'Rendering',
      'Caching',
      'Styling',
      'Testing'
    ],
    label: 'Build Your Application'
  },
  {
    items: ['Components', 'Functions', 'Hooks', 'Config'],
    label: 'API Reference'
  }
]

const SidebarStoryHeader = ({
  items
}: {
  items: Array<{
    icon?: ReactNode
    label: string
  }>
}) => (
  <div className="flex items-center gap-3 p-4">
    <Sidebar.Trigger />
    <Breadcrumbs className="min-w-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Breadcrumbs.Item
            key={`${item.label}-${index}`}
            className={`min-w-0 ${isLast ? 'font-semibold' : 'text-muted'}`}
            href={isLast ? undefined : '#'}>
            <span className="flex min-w-0 items-center gap-2 overflow-hidden">
              {item.icon}
              <span className="truncate">{item.label}</span>
            </span>
          </Breadcrumbs.Item>
        )
      })}
    </Breadcrumbs>
  </div>
)

const SidebarItemActions = ({ label }: { label: string }) => (
  <Dropdown>
    <Dropdown.Trigger
      aria-label={`More actions for ${label}`}
      className="sidebar__menu-action"
      data-slot="sidebar-menu-action">
      <EllipsisVertical className="size-4" />
    </Dropdown.Trigger>
    <Dropdown.Popover className="w-44" offset={6} placement="right top">
      <Dropdown.Menu aria-label={`${label} actions`}>
        <Dropdown.Item id="open" textValue="Open">
          <FolderOpen className="text-muted size-4 shrink-0" />
          <Label>Open</Label>
        </Dropdown.Item>
        <Dropdown.Item id="duplicate" textValue="Duplicate">
          <Copy className="text-muted size-4 shrink-0" />
          <Label>Duplicate</Label>
        </Dropdown.Item>
        <Dropdown.Item id="delete" textValue="Delete" variant="danger">
          <TrashBin className="text-danger size-4 shrink-0" />
          <Label>Delete</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
)

export function CollapsibleGroups() {
  return (
    <Sidebar.Provider collapsible="offcanvas">
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-xs font-bold text-white">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                Documentation
              </span>
              <span className="text-muted text-xs leading-tight">v1.0.0</span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu
            aria-label="Documentation navigation"
            defaultExpandedKeys={['Build Your Application']}
            showGuideLines="hover">
            {docsSections.map(section => (
              <Sidebar.MenuSection key={section.label}>
                <Sidebar.MenuHeader>{section.label}</Sidebar.MenuHeader>
                <Sidebar.MenuItem id={section.label} textValue={section.label}>
                  <Sidebar.MenuLabel>{section.label}</Sidebar.MenuLabel>
                  <Sidebar.MenuTrigger>
                    <Sidebar.MenuIndicator />
                  </Sidebar.MenuTrigger>
                  <Sidebar.Submenu>
                    {section.items.map(item => (
                      <Sidebar.MenuItem
                        key={item}
                        href="#"
                        id={`${section.label}-${item}`}
                        isCurrent={item === 'Data Fetching'}
                        textValue={item}>
                        <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                        <Sidebar.MenuActions className="ml-auto">
                          <SidebarItemActions label={item} />
                        </Sidebar.MenuActions>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Submenu>
                </Sidebar.MenuItem>
              </Sidebar.MenuSection>
            ))}
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-xs font-bold text-white">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                Documentation
              </span>
              <span className="text-muted text-xs leading-tight">v1.0.0</span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu
            aria-label="Documentation navigation"
            defaultExpandedKeys={['Build Your Application']}
            showGuideLines="hover">
            {docsSections.map(section => (
              <Sidebar.MenuSection key={`${section.label}-mobile`}>
                <Sidebar.MenuHeader>{section.label}</Sidebar.MenuHeader>
                <Sidebar.MenuItem
                  id={`${section.label}-mobile`}
                  textValue={section.label}>
                  <Sidebar.MenuLabel>{section.label}</Sidebar.MenuLabel>
                  <Sidebar.MenuTrigger>
                    <Sidebar.MenuIndicator />
                  </Sidebar.MenuTrigger>
                  <Sidebar.Submenu>
                    {section.items.map(item => (
                      <Sidebar.MenuItem
                        key={`${item}-mobile`}
                        href="#"
                        id={`${section.label}-${item}-mobile`}
                        isCurrent={item === 'Data Fetching'}
                        textValue={item}>
                        <Sidebar.MenuLabel>{item}</Sidebar.MenuLabel>
                        <Sidebar.MenuActions className="ml-auto">
                          <SidebarItemActions label={item} />
                        </Sidebar.MenuActions>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Submenu>
                </Sidebar.MenuItem>
              </Sidebar.MenuSection>
            ))}
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[
            {
              icon: <Book className="size-4" />,
              label: 'Build Your Application'
            },
            { label: 'Data Fetching' }
          ]}
        />
        <div className="p-6">
          <p className="text-muted">
            Documentation content area. Toggle the sidebar with the trigger
            button.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
