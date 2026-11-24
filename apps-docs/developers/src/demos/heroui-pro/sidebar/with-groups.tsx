// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  ChartColumn,
  Gear,
  House,
  Persons,
  Receipt
} from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Breadcrumbs } from '@vezham/react-v3'

const sidebarBrandName = 'HeroUI'

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

export function WithGroups() {
  return (
    <Sidebar.Provider>
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
            <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Platform">
              <Sidebar.MenuItem id="dashboard" textValue="Dashboard">
                <Sidebar.MenuIcon>
                  <House className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="analytics" textValue="Analytics">
                <Sidebar.MenuIcon>
                  <ChartColumn className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="orders" textValue="Orders">
                <Sidebar.MenuIcon>
                  <Receipt className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Orders</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Settings">
              <Sidebar.MenuItem id="general" textValue="General">
                <Sidebar.MenuIcon>
                  <Gear className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>General</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="team" textValue="Team">
                <Sidebar.MenuIcon>
                  <Persons className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="notifications" textValue="Notifications">
                <Sidebar.MenuIcon>
                  <Bell className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Notifications</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
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
            <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Platform">
              <Sidebar.MenuItem
                id="dashboard-mobile-groups"
                textValue="Dashboard">
                <Sidebar.MenuIcon>
                  <House className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Dashboard</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="analytics-mobile-groups"
                textValue="Analytics">
                <Sidebar.MenuIcon>
                  <ChartColumn className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="orders-mobile-groups" textValue="Orders">
                <Sidebar.MenuIcon>
                  <Receipt className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Orders</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Settings">
              <Sidebar.MenuItem id="general-mobile-groups" textValue="General">
                <Sidebar.MenuIcon>
                  <Gear className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>General</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="team-mobile-groups" textValue="Team">
                <Sidebar.MenuIcon>
                  <Persons className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="notifications-mobile-groups"
                textValue="Notifications">
                <Sidebar.MenuIcon>
                  <Bell className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Notifications</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <House className="size-4" />, label: 'Dashboard' }]}
        />
        <div className="p-6">
          <p className="text-muted">Main content area</p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
