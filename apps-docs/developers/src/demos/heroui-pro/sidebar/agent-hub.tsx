// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowDown,
  ArrowRightFromSquare,
  ArrowUp,
  Bell,
  Book,
  BookOpen,
  Calendar,
  ChartColumn,
  ChevronDown,
  Code,
  Copy,
  Ellipsis,
  EllipsisVertical,
  EyeSlash,
  FileText,
  FolderOpen,
  Gear,
  Hashtag,
  House,
  Magnifier,
  Pencil,
  Person,
  Persons,
  Plus,
  Rocket,
  ShoppingCart,
  Sparkles,
  SquareCheck,
  Target,
  TrashBin
} from '@gravity-ui/icons'
import type { CSSProperties, ReactNode } from 'react'

import { Sidebar, useSidebar } from '@vezham/react-pro-v3'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Kbd,
  Label
} from '@vezham/react-v3'

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

const TeamspaceGroupActions = ({ label }: { label: string }) => (
  <Dropdown>
    <Dropdown.Trigger
      aria-label={`${label} section actions`}
      className="text-muted hover:bg-default -mr-1 flex size-6 items-center justify-center rounded-md">
      <Ellipsis className="size-4" />
    </Dropdown.Trigger>
    <Dropdown.Popover className="w-48" offset={6} placement="right top">
      <Dropdown.Menu aria-label={`${label} section actions`}>
        <Dropdown.Section>
          <Dropdown.Item id="show" textValue="Show">
            <Hashtag className="text-muted size-4 shrink-0" />
            <Label>Show</Label>
          </Dropdown.Item>
          <Dropdown.Item id="move-up" textValue="Move up">
            <ArrowUp className="text-muted size-4 shrink-0" />
            <Label>Move up</Label>
          </Dropdown.Item>
          <Dropdown.Item id="move-down" textValue="Move down">
            <ArrowDown className="text-muted size-4 shrink-0" />
            <Label>Move down</Label>
          </Dropdown.Item>
          <Dropdown.Item id="hide" textValue="Hide section">
            <EyeSlash className="text-muted size-4 shrink-0" />
            <Label>Hide section</Label>
          </Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section>
          <Dropdown.Item id="new-teamspace" textValue="New teamspace">
            <Plus className="text-muted size-4 shrink-0" />
            <Label>New teamspace</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open-library" textValue="Open in Library">
            <Book className="text-muted size-4 shrink-0" />
            <Label>Open in Library</Label>
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
)

const agentHubTopNav = [
  {
    icon: Sparkles,
    isButton: true,
    label: 'New Agent',
    tooltip: 'Create a new agent'
  },
  {
    icon: Magnifier,
    isButton: true,
    label: 'Search',
    tooltip: 'Search conversations and agents'
  },
  { icon: House, label: 'Home', tooltip: 'Overview and recent activity' },
  { icon: Bell, label: 'Activity', tooltip: 'Notifications and updates' },
  {
    icon: ShoppingCart,
    label: 'Marketplace',
    tooltip: 'Browse and install agents'
  }
]

const agentHubConversations = [
  { icon: Sparkles, label: 'Refactor auth module' },
  { icon: Sparkles, label: 'Debug payment flow' },
  { icon: Sparkles, label: 'Write API docs' },
  { icon: Sparkles, label: 'Review PR #482' },
  { icon: Sparkles, label: 'Plan v3 migration' }
]

const agentHubWorkspaceItems = [
  { icon: Code, label: 'Backend API' },
  { icon: Rocket, label: 'Mobile app' },
  { icon: Target, label: 'Tracker' }
]

const agentHubTeamWorkspaceItems = [
  { icon: Target, label: 'Roadmap Q3' },
  { icon: SquareCheck, label: 'Sprint tasks' },
  { icon: ChartColumn, label: 'Analytics dashboard' },
  { icon: BookOpen, label: 'Team wiki' }
]

const AgentHubInner = ({ idPrefix }: { idPrefix: string }) => {
  const { collapsible, isMobile, isOpen } = useSidebar()
  const isIconCollapsed = collapsible === 'icon' && !isMobile && !isOpen

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-violet-600">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label">
              AgentHub
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
            {agentHubTopNav.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href={item.isButton ? undefined : '#'}
                id={`${idPrefix}-nav-${item.label}`}
                isCurrent={item.label === 'Home'}
                textValue={item.label}
                tooltipProps={{
                  className: 'bg-foreground text-background',
                  content: item.tooltip,
                  delay: 250,
                  placement: 'right'
                }}>
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
          <Sidebar.GroupLabel>Recent chats</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Recent chats">
            {agentHubConversations.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-chat-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                <Sidebar.MenuActions className="ml-auto">
                  <SidebarItemActions label={item.label} />
                </Sidebar.MenuActions>
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
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-agent-coder`}
              textValue="Coder">
              <Sidebar.MenuIcon>
                <Code className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Coder</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-agent-reviewer`}
              textValue="Reviewer">
              <Sidebar.MenuIcon>
                <BookOpen className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Reviewer</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-agent-writer`}
              textValue="Writer">
              <Sidebar.MenuIcon>
                <FileText className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Writer</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
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
          <Sidebar.GroupLabel>
            <span className="flex flex-1 items-center justify-between">
              Workspaces
              <TeamspaceGroupActions label="Workspaces" />
            </span>
          </Sidebar.GroupLabel>
          <Sidebar.Menu
            aria-label="Workspaces"
            defaultExpandedKeys={[`${idPrefix}-ws-personal`]}>
            <Sidebar.MenuItem
              id={`${idPrefix}-ws-personal`}
              textValue="Personal">
              <Sidebar.MenuIcon>
                <Person className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Personal
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {agentHubWorkspaceItems.map(item => (
                  <Sidebar.MenuItem
                    key={item.label}
                    href="#"
                    id={`${idPrefix}-ws-p-${item.label}`}
                    isCurrent={item.label === 'Backend API'}
                    textValue={item.label}>
                    <Sidebar.MenuIcon>
                      <item.icon className="size-4" />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                    <Sidebar.MenuActions className="ml-auto">
                      <SidebarItemActions label={item.label} />
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem id={`${idPrefix}-ws-team`} textValue="Team">
              <Sidebar.MenuIcon>
                <Persons className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Team
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {agentHubTeamWorkspaceItems.map(item => (
                  <Sidebar.MenuItem
                    key={item.label}
                    href="#"
                    id={`${idPrefix}-ws-t-${item.label}`}
                    textValue={item.label}>
                    <Sidebar.MenuIcon>
                      <item.icon className="size-4" />
                    </Sidebar.MenuIcon>
                    <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                    <Sidebar.MenuActions className="ml-auto">
                      <SidebarItemActions label={item.label} />
                    </Sidebar.MenuActions>
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

export function AgentHub() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ '--spacing': '0.2rem' } as CSSProperties}>
        <AgentHubInner idPrefix="agent-hub" />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <AgentHubInner idPrefix="agent-hub-m" />
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <Code className="size-4" />, label: 'Backend API' }]}
        />
        <div className="p-6">
          <p className="text-muted">
            Agent-focused sidebar for AI startups. Combines compact spacing,
            workspaces, recent chats, and a user dropdown menu.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
