// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Archive,
  ArrowDown,
  ArrowUp,
  Book,
  BookOpen,
  Calendar,
  ChartColumn,
  ChevronDown,
  CircleQuestion,
  Code,
  Copy,
  Database,
  Ellipsis,
  EllipsisVertical,
  Envelope,
  EyeSlash,
  FileText,
  FolderOpen,
  Gear,
  Hashtag,
  House,
  Lock,
  Pencil,
  PencilToSquare,
  Person,
  Plus,
  Receipt,
  Rocket,
  ShoppingCart,
  Sparkles,
  SquareCheck,
  Star,
  Target,
  TrashBin
} from '@gravity-ui/icons'
import type { CSSProperties, ReactNode } from 'react'

import { Segment, Sidebar, useSidebar } from '@vezham/react-pro-v3'
import {
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

const complexSegmentNav = [
  { icon: House, id: 'home', label: 'Home' },
  { icon: Calendar, id: 'meetings', label: 'Meetings' },
  { icon: Sparkles, id: 'ai', label: 'Acme AI' },
  { icon: Envelope, id: 'inbox', label: 'Inbox' }
]

const complexRecents = [
  { icon: FileText, label: 'User Settings' },
  { icon: FileText, label: 'Onboarding Flow' },
  { icon: FileText, label: 'API Gateway' },
  { icon: FileText, label: 'Theme Builder' },
  { icon: FileText, label: 'Navigation' }
]

const complexFavorites = [
  { icon: BookOpen, label: 'Tutorials' },
  { icon: SquareCheck, label: 'My Tasks' }
]

const complexTeamspaceItems = [
  { icon: House, label: 'Home' },
  { icon: SquareCheck, label: 'My Tasks' },
  { icon: Target, label: 'Projects' },
  { icon: Rocket, label: 'Epics' },
  { icon: ChartColumn, isCurrent: true, label: 'Roadmap' },
  { icon: Sparkles, label: 'Sprint Board' },
  { icon: Code, label: 'Eng Board' },
  { icon: Pencil, label: 'Design Board' },
  { icon: Database, label: 'Sprints' },
  { icon: Star, label: 'Initiatives' },
  { icon: Lock, label: 'Vault' },
  { icon: Archive, label: 'Archive' },
  { icon: BookOpen, label: 'Wiki' },
  { icon: Sparkles, label: 'Brainstorm' },
  { icon: Person, label: 'Standup' },
  { icon: Rocket, label: 'Launch v3' }
]

const complexExtraTeamspaces = [
  { icon: Gear, label: 'Engineering' },
  { badge: Lock, icon: ChartColumn, label: 'Metrics' },
  { icon: Target, label: 'Tracker' },
  { icon: Receipt, label: 'Reports' }
]

const complexUtilityItems = [
  { icon: Book, label: 'Library' },
  { icon: SquareCheck, label: 'My Tasks' },
  { icon: ShoppingCart, label: 'Marketplace' },
  { icon: CircleQuestion, label: 'Help' },
  { icon: TrashBin, label: 'Trash' }
]

const ComplexSidebarInner = ({ idPrefix }: { idPrefix: string }) => {
  const { collapsible, isMobile, isOpen } = useSidebar()
  const isIconCollapsed = collapsible === 'icon' && !isMobile && !isOpen

  return (
    <>
      <Sidebar.Header>
        <div className="flex items-center justify-between px-1 py-2">
          <div className="flex items-center gap-3">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-amber-700">
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
              <PencilToSquare className="size-4" />
              <ChevronDown className="text-muted size-3" />
            </button>
          </div>
        </div>
        {!isIconCollapsed && (
          <Segment
            className="[&_.segment\_\_indicator]:bg-default bg-transparent p-0 [&_.segment\_\_indicator]:shadow-none"
            defaultSelectedKey="home"
            size="sm">
            {complexSegmentNav.map(tab => (
              <Segment.Item key={tab.id} className="w-auto" id={tab.id}>
                {({ isSelected }) => (
                  <>
                    <tab.icon className="size-4" />
                    <span
                      className="inline-grid transition-all duration-200 ease-out motion-reduce:transition-none"
                      style={{
                        gridTemplateColumns: isSelected ? '1fr' : '0fr',
                        opacity: isSelected ? 1 : 0
                      }}>
                      <span className="overflow-hidden">{tab.label}</span>
                    </span>
                  </>
                )}
              </Segment.Item>
            ))}
          </Segment>
        )}
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group className="[&>.sidebar__group-label]:capitalize">
          <Sidebar.GroupLabel className="capitalize">
            Recents
          </Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Recents">
            {complexRecents.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-${item.label}`}
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
          <Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Favorites">
            {complexFavorites.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-fav-${item.label}`}
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
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-personal`}
              textValue="Personal">
              <Sidebar.MenuIcon>
                <Person className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Personal</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem id={`${idPrefix}-add-agent`} textValue="Add new">
              <Sidebar.MenuIcon>
                <Plus className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel className="text-muted">
                Add new
              </Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>
            <span className="flex flex-1 items-center justify-between">
              Teamspaces
              <TeamspaceGroupActions label="Teamspaces" />
            </span>
          </Sidebar.GroupLabel>
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
                {complexTeamspaceItems.map(item => (
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
                    <Sidebar.MenuActions className="ml-auto">
                      <SidebarItemActions label={item.label} />
                    </Sidebar.MenuActions>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>

            {complexExtraTeamspaces.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-ts-extra-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                {item.badge ? (
                  <Sidebar.MenuChip>
                    <item.badge className="text-muted size-3" />
                  </Sidebar.MenuChip>
                ) : null}
                <Sidebar.MenuActions className="ml-auto">
                  <SidebarItemActions label={item.label} />
                </Sidebar.MenuActions>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Separator />

        <Sidebar.Group>
          <Sidebar.GroupLabel>Shared</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Shared">
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-shared-sprints`}
              textValue="Sprints">
              <Sidebar.MenuIcon>
                <Database className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Sprints</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>Apps</Sidebar.GroupLabel>
          <Sidebar.Menu aria-label="Apps">
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-mail`}
              textValue="Acme Mail">
              <Sidebar.MenuIcon>
                <Envelope className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Acme Mail</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem
              href="#"
              id={`${idPrefix}-calendar`}
              textValue="Acme Calendar">
              <Sidebar.MenuIcon>
                <Calendar className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Acme Calendar</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Separator />

      <Sidebar.Footer>
        {!isMobile && (
          <Sidebar.Menu aria-label="Utilities">
            {complexUtilityItems.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-util-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        )}
        <div className="flex items-center justify-center gap-2 px-2 py-2">
          {!isIconCollapsed && (
            <Button
              className={`text-muted flex h-10 flex-1 gap-2 text-sm ${isMobile ? 'border-default border bg-transparent shadow-none' : 'bg-surface shadow-surface'}`}
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
      </Sidebar.Footer>
    </>
  )
}

export function Complex() {
  return (
    <Sidebar.Provider>
      <Sidebar style={{ '--spacing': '0.2rem' } as CSSProperties}>
        <ComplexSidebarInner idPrefix="complex" />
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <ComplexSidebarInner idPrefix="complex-m" />
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[
            { icon: <ChartColumn className="size-4" />, label: 'Roadmap' }
          ]}
        />
        <div className="p-6">
          <p className="text-muted">
            Complex sidebar with compact spacing. All density is controlled via{' '}
            <code className="bg-default rounded px-1 py-0.5 text-xs">
              --spacing: 0.2rem
            </code>
            .
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
