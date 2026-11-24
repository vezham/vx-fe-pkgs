// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  Bell,
  Book,
  BookOpen,
  Calendar,
  ChartColumn,
  ChevronDown,
  Code,
  Envelope,
  FileText,
  Gear,
  House,
  Magnifier,
  Pencil,
  Person,
  Persons,
  Plus,
  Rocket,
  Sparkles,
  SquareCheck,
  Target
} from '@gravity-ui/icons'
import type { CSSProperties } from 'react'

import { AppLayout, Navbar, Sidebar, useSidebar } from '@vezham/react-pro-v3'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Label,
  Separator
} from '@vezham/react-v3'

export function Complex() {
  return (
    <AppLayout navbar={<ComplexNavbar />} sidebar={<ComplexSidebar />}>
      <div className="p-6">
        <h1 className="text-foreground text-xl font-semibold">Roadmap</h1>
        <p className="text-muted mt-2 text-sm">
          A complex layout combining an agent-hub-style sidebar with compact
          spacing, multiple groups, chips, user dropdown, and a full navbar with
          breadcrumbs and actions.
        </p>
      </div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { icon: <ChartColumn className="size-4" />, label: 'Roadmap' }
]

const topNav = [
  { icon: Sparkles, isButton: true, label: 'New Agent' },
  { icon: Magnifier, isButton: true, label: 'Search' },
  { icon: House, label: 'Home' },
  { badge: '3', icon: Envelope, label: 'Inbox' },
  { icon: Calendar, label: 'Meetings' }
]

const recentChats = [
  { icon: Sparkles, label: 'Refactor auth module' },
  { icon: Sparkles, label: 'Debug payment flow' },
  { icon: Sparkles, label: 'Write API docs' },
  { icon: Sparkles, label: 'Review PR #482' }
]

const teamspaceItems = [
  { icon: House, label: 'Home' },
  { icon: SquareCheck, label: 'My Tasks' },
  { icon: Target, label: 'Projects' },
  { icon: Rocket, label: 'Epics' },
  { icon: ChartColumn, isCurrent: true, label: 'Roadmap' },
  { icon: Code, label: 'Eng Board' }
]

const agentItems = [
  { icon: Code, label: 'Coder' },
  { icon: BookOpen, label: 'Reviewer' },
  { icon: FileText, label: 'Writer' }
]

const ComplexSidebarInner = ({ idPrefix }: { idPrefix: string }) => {
  const { collapsible, isMobile, isOpen } = useSidebar()
  const isIconCollapsed = collapsible === 'icon' && !isMobile && !isOpen

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-600">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label">
              Acme Labs
            </span>
          </div>
          <div className="flex items-center" data-sidebar="label">
            <button className="text-foreground hover:bg-default flex items-center gap-0.5 rounded-md p-1">
              <Pencil className="size-4" />
            </button>
          </div>
        </div>
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu aria-label="Main navigation">
            {topNav.map(item => (
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
                {item.badge ? (
                  <Sidebar.MenuChip>
                    <Chip color="accent" size="sm" variant="soft">
                      <Chip.Label>{item.badge}</Chip.Label>
                    </Chip>
                  </Sidebar.MenuChip>
                ) : null}
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
          <Sidebar.GroupLabel>Recent chats</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Recent chats">
            {recentChats.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-chat-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>
            <span className="flex items-center gap-2">
              Agents
              <Chip size="sm" variant="soft">
                Beta
              </Chip>
            </span>
          </Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Agents">
            {agentItems.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-agent-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
            <Sidebar.MenuItem
              id={`${idPrefix}-add-agent`}
              textValue="Add agent">
              <Sidebar.MenuIcon>
                <Plus className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel className="text-muted">
                Add agent
              </Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>Teamspaces</Sidebar.GroupLabel>
          <Sidebar.Menu
            aria-label="Teamspaces"
            defaultExpandedKeys={[`${idPrefix}-acme-hq`]}>
            <Sidebar.MenuItem id={`${idPrefix}-acme-hq`} textValue="Acme HQ">
              <Sidebar.MenuIcon>
                <House className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Acme HQ
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {teamspaceItems.map(item => (
                  <Sidebar.MenuItem
                    key={item.label}
                    href="#"
                    id={`${idPrefix}-ts-${item.label}`}
                    isCurrent={item.isCurrent}
                    textValue={item.label}>
                    <Sidebar.MenuIcon>
                      <item.icon className="size-4" />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Separator />

        <Sidebar.Group>
          <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Apps">
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-app-docs`}
              textValue="Docs">
              <Sidebar.MenuIcon>
                <Book className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Docs</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-app-calendar`}
              textValue="Calendar">
              <Sidebar.MenuIcon>
                <Calendar className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Calendar</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Separator />

      <Sidebar.Footer className="gap-0">
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 px-2 py-2">
            {!isIconCollapsed && (
              <Button
                className="text-muted bg-surface shadow-surface flex h-9 flex-1 gap-2 text-sm"
                size="sm"
                variant="tertiary">
                <Sparkles className="size-4" />
                <span>New chat</span>
                <Kbd className="text-xs">
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>N</Kbd.Content>
                </Kbd>
              </Button>
            )}
            <Button isIconOnly size="sm" variant="tertiary">
              <Pencil className="text-muted size-4" />
            </Button>
          </div>
        )}
        <div className="px-2 pb-2">
          <Dropdown>
            <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none">
              <Avatar size="sm">
                <Avatar.Image
                  alt="Junior Garcia"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                />
                <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
              </Avatar>
              <span
                className="text-foreground text-sm font-medium"
                data-sidebar="label">
                Junior Garcia
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
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                    />
                    <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">
                      Junior Garcia
                    </p>
                    <p className="text-muted text-xs leading-none">
                      junior@heroui.com
                    </p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item
                  id={`${idPrefix}-dd-profile`}
                  textValue="Profile">
                  <Label>Profile</Label>
                </Dropdown.Item>
                <Dropdown.Item
                  id={`${idPrefix}-dd-settings`}
                  textValue="Settings">
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
        </div>
      </Sidebar.Footer>
    </>
  )
}

function ComplexSidebar() {
  return (
    <>
      <Sidebar style={{ '--spacing': '0.2rem' } as CSSProperties}>
        <ComplexSidebarInner idPrefix="complex" />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <ComplexSidebarInner idPrefix="complex-m" />
      </Sidebar.Mobile>
    </>
  )
}

function ComplexNavbar() {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Breadcrumbs className="min-w-0">
          {BreadcrumbItems.map((item, index) => (
            <Breadcrumbs.Item
              key={`${item.label}-${index}`}
              className="min-w-0 font-semibold">
              <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </span>
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Navbar.Spacer />
        <Navbar.Content>
          <Navbar.Item aria-label="Search">
            <Magnifier className="size-4" />
          </Navbar.Item>
          <Navbar.Item aria-label="Notifications">
            <Bell className="size-4" />
          </Navbar.Item>
          <Navbar.Separator />
          <Dropdown>
            <Button isIconOnly aria-label="Account menu" variant="ghost">
              <Avatar className="size-6">
                <Avatar.Image
                  alt="Junior Garcia"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
                />
                <Avatar.Fallback>JG</Avatar.Fallback>
              </Avatar>
            </Button>
            <Dropdown.Popover className="min-w-[200px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item id="account" textValue="Account">
                  <Person className="text-muted size-4" />
                  <Label>Account</Label>
                </Dropdown.Item>
                <Dropdown.Item id="settings" textValue="Settings">
                  <Gear className="text-muted size-4" />
                  <Label>Settings</Label>
                </Dropdown.Item>
                <Separator />
                <Dropdown.Item id="sign-out" textValue="Log out">
                  <ArrowRightFromSquare className="text-muted size-4" />
                  <Label>Log out</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
