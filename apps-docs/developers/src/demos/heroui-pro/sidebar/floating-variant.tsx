// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartColumn,
  Gear,
  House,
  ListCheck,
  Persons,
  Receipt
} from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Breadcrumbs } from '@vezham/react-v3'

const sidebarBrandName = 'HeroUI'

const navItems = [
  { icon: House, label: 'Dashboard' },
  { icon: Receipt, label: 'Orders' },
  { badge: 'New', icon: ListCheck, label: 'Tracker' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: Persons, label: 'Team' },
  { icon: Gear, label: 'Settings' }
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

export function FloatingVariant() {
  return (
    <Sidebar.Provider collapsible="offcanvas" variant="floating">
      <Sidebar>
        <Sidebar.Header>
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
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Navigation">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  id={item.label}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">H</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              {sidebarBrandName}
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Navigation">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  id={item.label}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <House className="size-4" />, label: 'Dashboard' }]}
        />
        <div className="p-6">
          <p className="text-muted">
            Floating sidebar with rounded corners and shadow
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
