// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartColumn,
  CircleQuestion,
  Gear,
  House,
  ListCheck,
  Persons,
  Receipt
} from '@gravity-ui/icons'

import { Sidebar } from '@vezham/react-pro-v3'
import { Avatar } from '@vezham/react-v3'

const navItems = [
  { icon: House, label: 'Dashboard' },
  { icon: Receipt, label: 'Orders' },
  { badge: 'New', icon: ListCheck, label: 'Tracker' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: Persons, label: 'Team' },
  { icon: Gear, label: 'Settings' }
]

export function IconOnly() {
  return (
    <Sidebar.Provider collapsible="none">
      <Sidebar className="[--sidebar-width:56px]">
        <Sidebar.Header className="items-center justify-center p-0 py-4">
          <Avatar className="size-8 shrink-0">
            <Avatar.Image
              alt="Kate Moore"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
            />
            <Avatar.Fallback>KM</Avatar.Fallback>
          </Avatar>
        </Sidebar.Header>
        <Sidebar.Content className="items-center justify-center px-1.5">
          <Sidebar.Group>
            <Sidebar.Menu
              aria-label="Navigation"
              className="items-center gap-1">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  id={item.label}
                  textValue={item.label}
                  tooltipProps={{ content: item.label, delay: 0 }}>
                  <Sidebar.MenuItemContent className="justify-center gap-0 p-2.5">
                    <Sidebar.MenuIcon>
                      <item.icon className="size-4" />
                    </Sidebar.MenuIcon>
                  </Sidebar.MenuItemContent>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className="items-center justify-center p-0 py-4">
          <Sidebar.Menu
            aria-label="Footer actions"
            className="items-center gap-1">
            <Sidebar.MenuItem
              id="support"
              textValue="Help & Support"
              tooltipProps={{ content: 'Help & Support', delay: 0 }}>
              <Sidebar.MenuItemContent className="justify-center gap-0 p-2.5">
                <Sidebar.MenuIcon>
                  <CircleQuestion className="size-4" />
                </Sidebar.MenuIcon>
              </Sidebar.MenuItemContent>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar>
      <Sidebar.Main>
        <div className="flex flex-col px-10 py-6">
          <h1 className="text-foreground text-lg font-semibold">Dashboard</h1>
          <p className="text-muted">
            Icon-only sidebar that is always collapsed.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
