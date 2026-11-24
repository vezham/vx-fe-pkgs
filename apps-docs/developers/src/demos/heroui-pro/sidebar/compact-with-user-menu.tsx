// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  Bell,
  ChevronDown,
  FileText,
  Gear,
  Globe,
  House,
  Lock,
  Magnifier,
  Persons,
  Plus
} from '@gravity-ui/icons'
import type { CSSProperties, ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Breadcrumbs, Dropdown, Kbd, Label } from '@vezham/react-v3'

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

const compactUserMenuTopNav = [
  { icon: Magnifier, isButton: true, label: 'Search' },
  { icon: House, label: 'Home' },
  { icon: Bell, label: 'Activity' },
  { icon: Globe, label: 'Browse' }
]

const compactUserMenuSpaceItems = [
  { icon: FileText, label: 'Design Tokens' },
  { icon: FileText, label: 'Color Palette' },
  { icon: FileText, label: 'Typography' }
]

const CompactWithUserMenuInner = ({ idPrefix }: { idPrefix: string }) => (
  <>
    <Sidebar.Header>
      <div className="flex items-center gap-3 px-1 py-2">
        <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-green-600">
          <span className="text-sm font-bold text-white">H</span>
        </div>
        <span
          className="text-foreground text-sm font-semibold"
          data-sidebar="label">
          HeroUI Labs
        </span>
      </div>
    </Sidebar.Header>

    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.Menu aria-label="Main navigation">
          {compactUserMenuTopNav.map(item => (
            <Sidebar.MenuItem
              key={item.label}
              href={item.isButton ? undefined : '#'}
              id={`${idPrefix}-nav-${item.label}`}
              isCurrent={item.label === 'Home'}
              textValue={item.label}>
              <Sidebar.MenuIcon>
                <item.icon className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
              {item.label === 'Search' ? (
                <Sidebar.MenuChip>
                  <Kbd className="text-xs">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>K</Kbd.Content>
                  </Kbd>
                </Sidebar.MenuChip>
              ) : null}
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
        <Sidebar.Menu
          aria-label="Spaces"
          defaultExpandedKeys={[`${idPrefix}-my-library`]}>
          <Sidebar.MenuItem
            id={`${idPrefix}-my-library`}
            textValue="My library">
            <Sidebar.MenuIcon>
              <Lock className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>
              My library
              <Sidebar.MenuTrigger>
                <Sidebar.MenuIndicator />
              </Sidebar.MenuTrigger>
            </Sidebar.MenuLabel>
            <Sidebar.Submenu>
              {compactUserMenuSpaceItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={`${idPrefix}-sp-${item.label}`}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Submenu>
          </Sidebar.MenuItem>

          <Sidebar.MenuItem
            href="#"
            id={`${idPrefix}-design-team`}
            textValue="Design team">
            <Sidebar.MenuIcon>
              <Persons className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>Design team</Sidebar.MenuLabel>
          </Sidebar.MenuItem>

          <Sidebar.MenuItem id={`${idPrefix}-add-space`} textValue="Add space">
            <Sidebar.MenuIcon>
              <Plus className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel className="text-muted">
              Add space
            </Sidebar.MenuLabel>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Separator />

    <Sidebar.Footer className="px-2 pt-0 pb-2">
      <Dropdown>
        <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none">
          <Avatar size="sm">
            <Avatar.Image
              alt="Junior Garcia"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
            />
            <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
          </Avatar>
          <span
            className="text-foreground text-sm font-medium"
            data-sidebar="label">
            Junior
          </span>
          <ChevronDown
            className="text-muted ml-auto size-3"
            data-sidebar="label"
          />
        </Dropdown.Trigger>
        <Dropdown.Popover placement="top start">
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                <Avatar.Image
                  alt="Junior Garcia"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                />
                <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col gap-0">
                <p className="text-sm leading-5 font-medium">Junior Garcia</p>
                <p className="text-muted text-xs leading-none">
                  junior@heroui.com
                </p>
              </div>
            </div>
          </div>
          <Dropdown.Menu>
            <Dropdown.Item
              id={`${idPrefix}-dd-dashboard`}
              textValue="Dashboard">
              <Label>Dashboard</Label>
            </Dropdown.Item>
            <Dropdown.Item id={`${idPrefix}-dd-profile`} textValue="Profile">
              <Label>Profile</Label>
            </Dropdown.Item>
            <Dropdown.Item id={`${idPrefix}-dd-settings`} textValue="Settings">
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Settings</Label>
                <Gear className="text-muted size-3.5" />
              </div>
            </Dropdown.Item>
            <Dropdown.Item
              id={`${idPrefix}-dd-create-team`}
              textValue="Create Team">
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Create Team</Label>
                <Persons className="text-muted size-3.5" />
              </div>
            </Dropdown.Item>
            <Dropdown.Item
              id={`${idPrefix}-dd-logout`}
              textValue="Logout"
              variant="danger">
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Log Out</Label>
                <ArrowRightFromSquare className="text-danger size-3.5" />
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </Sidebar.Footer>
  </>
)

export function CompactWithUserMenu() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ '--spacing': '0.2rem' } as CSSProperties}>
        <CompactWithUserMenuInner idPrefix="compact-user-menu" />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <CompactWithUserMenuInner idPrefix="compact-user-menu-m" />
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <House className="size-4" />, label: 'Home' }]}
        />
        <div className="p-6">
          <p className="text-muted">
            Compact sidebar with user dropdown menu. Uses{' '}
            <code className="bg-default rounded px-1 py-0.5 text-xs">
              --spacing: 0.2rem
            </code>{' '}
            for dense layout.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
