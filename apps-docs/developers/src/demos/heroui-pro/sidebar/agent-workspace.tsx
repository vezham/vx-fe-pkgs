// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Archive,
  ArrowRightFromSquare,
  ArrowUpRightFromSquare,
  Code,
  CodeMerge,
  CodePullRequestCheck,
  Ellipsis,
  Gear,
  LayoutCellsLarge,
  Persons,
  Plus,
  TerminalLine,
  TrashBin
} from '@gravity-ui/icons'
import type { CSSProperties, ReactNode } from 'react'

import { Sidebar, useSidebar } from '@vezham/react-pro-v3'
import {
  Avatar,
  Breadcrumbs,
  Dropdown,
  Kbd,
  Label,
  Tooltip
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

type AgentWorkspaceTask = {
  branch?: string
  color?: string
  icon?: typeof Code
  label: string
  timeAgo?: string
}

type AgentWorkspaceSection = {
  items: AgentWorkspaceTask[]
  label: string
}

const StatusDot = ({ color = 'var(--color-muted)' }: { color?: string }) => (
  <span className="flex size-4 items-center justify-center">
    <span
      className="size-1.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  </span>
)

const agentWorkspaceSections: AgentWorkspaceSection[] = [
  {
    items: [
      {
        branch: 'fix/user-naming',
        icon: CodeMerge,
        label: 'User naming preference refactor',
        timeAgo: 'now'
      },
      {
        branch: 'feat/sidebar-kbd',
        label: 'Agents sidebar keyboard expe...',
        timeAgo: '12m'
      },
      { label: 'Glass sidebar group by none op...', timeAgo: '33m' },
      {
        branch: 'fix/cloud-errors',
        icon: CodePullRequestCheck,
        label: 'Cloud agent error message re...',
        timeAgo: '1h'
      },
      {
        branch: 'refactor/app-prop',
        icon: CodeMerge,
        label: 'UseApplicationProperty migrati...'
      },
      { label: 'Glass test timing stabilization' },
      { label: 'Flaky tests root cause', timeAgo: '10h' }
    ],
    label: 'acme/platform'
  },
  {
    items: [
      {
        branch: 'feat/responsive',
        icon: CodePullRequestCheck,
        label: 'Marketing pages responsiven...',
        timeAgo: '2h'
      },
      {
        icon: CodePullRequestCheck,
        label: 'Git & checkpoints automatic c...',
        timeAgo: '3h'
      },
      { label: 'Local server update process' },
      { label: 'Performance audit for redesigne...', timeAgo: '1d' },
      { label: 'Localized page SEO' }
    ],
    label: 'acme/landing'
  },
  {
    items: [
      {
        branch: 'feat/nlp-page',
        icon: CodeMerge,
        label: 'New page for natural language f...',
        timeAgo: '5h'
      },
      { label: 'Background worker retry handling' },
      { label: 'Admin-only metric strip for inco...' }
    ],
    label: 'acme/backoffice'
  },
  {
    items: [{ label: 'Plugin schema verification', timeAgo: '2d' }],
    label: 'tools/plugins'
  },
  {
    items: [
      { label: 'Light mode settings' },
      { label: 'MCP server setup', timeAgo: '4h' }
    ],
    label: 'compass'
  }
]

const AgentWorkspaceInner = ({ idPrefix }: { idPrefix: string }) => {
  const { isMobile } = useSidebar()

  return (
    <>
      <Sidebar.Header>
        <Sidebar.Menu aria-label="Top actions" className="px-1 py-2">
          <Sidebar.MenuItem id={`${idPrefix}-new-agent`} textValue="New Agent">
            <Sidebar.MenuIcon>
              <TerminalLine className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>New Agent</Sidebar.MenuLabel>
            <Sidebar.MenuChip>
              <Kbd className="text-xs">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>N</Kbd.Content>
              </Kbd>
            </Sidebar.MenuChip>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem
            isCurrent
            href="#"
            id={`${idPrefix}-marketplace`}
            textValue="Marketplace">
            <Sidebar.MenuIcon>
              <LayoutCellsLarge className="size-4" />
            </Sidebar.MenuIcon>
            <Sidebar.MenuLabel>Marketplace</Sidebar.MenuLabel>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Header>

      <Sidebar.Content>
        {agentWorkspaceSections.map(section => (
          <Sidebar.Group key={section.label}>
            <Sidebar.GroupLabel>
              <span className="flex flex-1 items-center justify-between">
                {section.label}
                <Tooltip delay={250}>
                  <Tooltip.Trigger>
                    <button
                      aria-label={`New task in ${section.label}`}
                      className="text-muted hover:bg-default -mr-1 flex size-5 items-center justify-center rounded-md">
                      <Plus className="size-3.5" />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>New task</Tooltip.Content>
                </Tooltip>
              </span>
            </Sidebar.GroupLabel>
            <Sidebar.Menu aria-label={section.label}>
              {section.items.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={`${idPrefix}-${section.label}-${item.label}`}
                  textValue={item.label}
                  tooltipProps={{
                    className: 'text-xs',
                    content: (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{item.label}</span>
                        <span className="opacity-60">
                          {section.label}
                          {item.branch ? ` · ${item.branch}` : ''}
                        </span>
                      </div>
                    ),
                    delay: 500,
                    placement: 'right'
                  }}>
                  <Sidebar.MenuIcon>
                    {item.icon ? (
                      <item.icon
                        className={`size-4 ${item.icon === CodePullRequestCheck ? 'text-purple-500' : 'text-accent'}`}
                      />
                    ) : (
                      <StatusDot color={item.color} />
                    )}
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.timeAgo ? (
                    <Sidebar.MenuChip>
                      <span className="text-muted text-[10px] leading-none">
                        {item.timeAgo}
                      </span>
                    </Sidebar.MenuChip>
                  ) : null}
                  <Sidebar.MenuActions className="ml-auto">
                    <Sidebar.MenuAction aria-label={`Archive ${item.label}`}>
                      <Archive className="size-3.5" />
                    </Sidebar.MenuAction>
                    <Sidebar.MenuAction aria-label={`Delete ${item.label}`}>
                      <TrashBin className="size-3.5" />
                    </Sidebar.MenuAction>
                  </Sidebar.MenuActions>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        ))}

        <Sidebar.Group>
          <Sidebar.Menu aria-label="Utility">
            <Sidebar.MenuItem id={`${idPrefix}-more`} textValue="More">
              <Sidebar.MenuIcon>
                <Ellipsis className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel className="text-muted">More</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-open-workspace`}
              textValue="Open Workspace">
              <Sidebar.MenuIcon>
                <ArrowUpRightFromSquare className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Open Workspace</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer className="px-2 pt-0 pb-2">
        <Dropdown>
          <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none">
            <Avatar size="sm">
              <Avatar.Image
                alt="Alex Chen"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
              />
              <Avatar.Fallback delayMs={600}>AC</Avatar.Fallback>
            </Avatar>
            <div className="flex min-w-0 flex-col" data-sidebar="label">
              <span className="text-foreground truncate text-sm leading-tight font-medium">
                Alex Chen
              </span>
              <span className="text-muted truncate text-xs leading-tight">
                Hero Labs
              </span>
            </div>
            {!isMobile && (
              <div
                className="ml-auto flex items-center gap-1"
                data-sidebar="label">
                <span className="text-muted hover:text-foreground flex size-6 items-center justify-center rounded-md">
                  <Gear className="size-3.5" />
                </span>
              </div>
            )}
          </Dropdown.Trigger>
          <Dropdown.Popover placement="top start">
            <div className="px-3 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <Avatar.Image
                    alt="Alex Chen"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg"
                  />
                  <Avatar.Fallback delayMs={600}>AC</Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <p className="text-sm leading-5 font-medium">Alex Chen</p>
                  <p className="text-muted text-xs leading-none">
                    alex@herolabs.dev
                  </p>
                </div>
              </div>
            </div>
            <Dropdown.Menu>
              <Dropdown.Item id={`${idPrefix}-dd-profile`} textValue="Profile">
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
      </Sidebar.Footer>
    </>
  )
}

export function AgentWorkspace() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ '--spacing': '0.2rem' } as CSSProperties}>
        <AgentWorkspaceInner idPrefix="aw" />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <AgentWorkspaceInner idPrefix="aw-m" />
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[
            { icon: <Code className="size-4" />, label: 'acme/platform' }
          ]}
        />
        <div className="p-6">
          <p className="text-muted">
            Workspace sidebar with agent tasks grouped by repository. Mirrors
            the pattern used by AI coding tools.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
