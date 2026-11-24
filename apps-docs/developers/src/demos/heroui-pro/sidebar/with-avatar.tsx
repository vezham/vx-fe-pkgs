// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  ChartColumn,
  CircleQuestion,
  Gear,
  House,
  ListCheck,
  Persons,
  Receipt
} from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Breadcrumbs, Chip } from '@vezham/react-v3'

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

export function WithAvatar() {
  return (
    <Sidebar.Provider collapsible="icon">
      <Sidebar className="group">
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <Avatar className="size-8 shrink-0">
              <Avatar.Image
                alt="Kate Moore"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
              />
              <Avatar.Fallback>KM</Avatar.Fallback>
            </Avatar>
            <div
              className="flex min-w-0 flex-col group-data-[state=collapsed]:hidden"
              data-sidebar="label">
              <span className="text-foreground text-sm leading-tight font-medium">
                Kate Moore
              </span>
              <span className="text-muted text-xs leading-tight">
                kate@acme.com
              </span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Separator />
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Navigation">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={item.label}
                  isCurrent={item.label === 'Dashboard'}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Separator />
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="help" textValue="Help & Information">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help & Information</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="logout" textValue="Log out">
              <Sidebar.MenuIcon>
                <ArrowRightFromSquare className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <Avatar className="size-8 shrink-0">
              <Avatar.Image
                alt="Kate Moore"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
              />
              <Avatar.Fallback>KM</Avatar.Fallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="text-foreground text-sm leading-tight font-medium">
                Kate Moore
              </span>
              <span className="text-muted text-xs leading-tight">
                kate@acme.com
              </span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Separator />
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Navigation">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={`${item.label}-mobile-avatar`}
                  href="#"
                  id={`${item.label}-mobile-avatar`}
                  isCurrent={item.label === 'Dashboard'}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Separator />
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem
              href="#"
              id="help-mobile-avatar"
              textValue="Help & Information">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help & Information</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id="logout-mobile-avatar"
              textValue="Log out">
              <Sidebar.MenuIcon>
                <ArrowRightFromSquare className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <Persons className="size-4" />, label: 'Team' }]}
        />
        <div className="p-6">
          <p className="text-muted">Main content area</p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
