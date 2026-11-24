// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChartColumn, Gear, House, ListCheck } from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Breadcrumbs, Chip } from '@vezham/react-v3'

const sidebarBrandName = 'HeroUI'

const nestedNavItems = [
  { icon: House, label: 'Dashboard' },
  {
    icon: ChartColumn,
    items: ['Overview', 'Reports', 'Exports'],
    label: 'Analytics'
  },
  { badge: 'New', icon: ListCheck, label: 'Tracker' },
  {
    icon: Gear,
    items: ['General', 'Billing', 'Team'],
    label: 'Settings'
  }
]

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

const SidebarBrand = () => (
  <div className="flex items-center gap-3 px-1 py-2">
    <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
      <span className="text-sm font-bold text-white">H</span>
    </div>
    <span
      className="text-foreground text-sm font-semibold"
      data-sidebar="label">
      {sidebarBrandName}
    </span>
  </div>
)

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

function NavigationMenu({ idPrefix = '' }: { idPrefix?: string }) {
  return (
    <Sidebar.Menu
      aria-label="Navigation"
      defaultExpandedKeys={[`${idPrefix}analytics`]}>
      {nestedNavItems.map(item => {
        const itemId = `${idPrefix}${slug(item.label)}`

        return (
          <Sidebar.MenuItem
            key={itemId}
            href={item.items ? undefined : '#'}
            id={itemId}
            isCurrent={item.label === 'Dashboard'}
            textValue={item.label}>
            <Sidebar.MenuIcon>
              <item.icon className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>
              {item.label}
              {item.items ? (
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              ) : null}
            </Sidebar.MenuLabel>
            {item.badge ? (
              <Sidebar.MenuChip>
                <Chip color="success" size="sm" variant="soft">
                  {item.badge}
                </Chip>
              </Sidebar.MenuChip>
            ) : null}
            {item.items ? (
              <Sidebar.Submenu>
                {item.items.map(subitem => (
                  <Sidebar.MenuItem
                    key={`${itemId}-${slug(subitem)}`}
                    href="#"
                    id={`${itemId}-${slug(subitem)}`}
                    textValue={subitem}>
                    <Sidebar.MenuLabel>{subitem}</Sidebar.MenuLabel>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            ) : null}
          </Sidebar.MenuItem>
        )
      })}
    </Sidebar.Menu>
  )
}

export function ReducedMotion() {
  return (
    <Sidebar.Provider reduceMotion collapsible="icon">
      <Sidebar>
        <Sidebar.Header>
          <SidebarBrand />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <NavigationMenu />
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <SidebarBrand />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <NavigationMenu idPrefix="mobile-" />
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[
            { icon: <ChartColumn className="size-4" />, label: 'Analytics' },
            { label: 'Reports' }
          ]}
        />
        <div className="p-6">
          <p className="text-muted">
            reduceMotion is enabled, so nested sections open and close
            instantly.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
