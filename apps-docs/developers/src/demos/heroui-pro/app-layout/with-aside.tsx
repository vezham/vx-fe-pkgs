// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  ChartColumn,
  CircleQuestion,
  Envelope,
  Magnifier,
  Pencil,
  Person
} from '@gravity-ui/icons'
import { useState } from 'react'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Disclosure,
  DisclosureGroup,
  Dropdown,
  Label,
  Separator
} from '@vezham/react-v3'

export function WithAside({
  asideMobile = 'hidden'
}: { asideMobile?: 'hidden' | 'sheet' } = {}) {
  return (
    <AppLayout
      aside={<ConversationDetailsAside />}
      asideMobile={asideMobile}
      navbar={<AsideNavbar />}
      sidebar={<AsideSidebar />}>
      <div className="flex flex-col gap-6 px-6 py-8">
        <header className="flex items-center gap-3">
          <Avatar className="size-10">
            <Avatar.Image
              alt="Dan Fox"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback>DF</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <h1 className="text-foreground text-base leading-tight font-semibold">
              Dan Fox
            </h1>
            <p className="text-muted text-xs tabular-nums">
              Email · 6 months ago
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-6">
          {messages.map(m => (
            <ChatMessage key={m.id} {...m} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { icon: <Envelope className="size-4" />, label: 'Inbox' }
]

const inboxNavItems = [
  { count: 3, icon: Envelope, label: 'My inbox' },
  { count: 13, icon: Envelope, isCurrent: true, label: 'All messages' },
  { icon: Pencil, label: 'Created by me' },
  { count: 10, icon: CircleQuestion, label: 'Unassigned' }
]

const teamInboxes = [
  { color: 'success', label: 'Customer success' },
  { color: 'danger', label: 'Sales' },
  { color: 'accent', label: 'Developers' }
]

type ChatMessageProps = {
  avatarFallback: string
  avatarSrc?: string
  body: string
  id: string
  isAgent?: boolean
  name: string
  timeAgo: string
}

const messages: ChatMessageProps[] = [
  {
    avatarFallback: 'DF',
    avatarSrc:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    body: "My direct deposit didn't show up today. It's usually here by now. Can you check what happened?",
    id: '1',
    name: 'Dan Fox',
    timeAgo: '6mo'
  },
  {
    avatarFallback: 'JG',
    avatarSrc:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    body: "Thanks for reaching out, Dan. I'm looking into this now and will get back to you shortly.",
    id: '2',
    isAgent: true,
    name: 'Junior Garcia',
    timeAgo: '6mo'
  },
  {
    avatarFallback: 'DF',
    avatarSrc:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    body: 'Thanks, I appreciate it!',
    id: '3',
    name: 'Dan Fox',
    timeAgo: '6mo'
  },
  {
    avatarFallback: 'JG',
    avatarSrc:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    body: "Good news — the deposit has been released and should land in your account within the next hour. Let me know if you don't see it.",
    id: '4',
    isAgent: true,
    name: 'Junior Garcia',
    timeAgo: '6mo'
  }
]

function ChatMessage({
  avatarFallback,
  avatarSrc,
  body,
  isAgent,
  name,
  timeAgo
}: ChatMessageProps) {
  return (
    <div
      className={`flex items-end gap-2 ${isAgent ? 'flex-row-reverse' : ''}`}>
      <Avatar size="sm">
        {avatarSrc ? <Avatar.Image alt={name} src={avatarSrc} /> : null}
        <Avatar.Fallback>{avatarFallback}</Avatar.Fallback>
      </Avatar>
      <div
        className={`flex max-w-md flex-col gap-1 ${isAgent ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2 ${
            isAgent
              ? 'bg-surface-tertiary text-foreground'
              : 'bg-surface text-foreground'
          }`}>
          <p className="text-sm leading-relaxed">{body}</p>
        </div>
        <p className="text-muted px-1 text-xs tabular-nums">{timeAgo}</p>
      </div>
    </div>
  )
}

function ConversationDetailsAside() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    new Set(['user-details'])
  )

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-foreground text-sm font-semibold">
          Conversation details
        </h2>
      </header>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-3 px-1 py-2">
          <DetailRow
            label="Assignee"
            value={
              <span className="flex items-center gap-2">
                <Avatar className="size-5" size="sm">
                  <Avatar.Image
                    alt="John Steele"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                  />
                  <Avatar.Fallback>JS</Avatar.Fallback>
                </Avatar>
                <span className="text-foreground text-sm font-medium">
                  John Steele
                </span>
              </span>
            }
          />
          <DetailRow
            label="Team"
            value={
              <span className="text-foreground text-sm font-medium">
                Developers
              </span>
            }
          />
          <DetailRow
            label="Priority"
            value={
              <span className="text-foreground text-sm font-medium">
                Normal
              </span>
            }
          />
          <DetailRow
            label="Status"
            value={
              <Chip color="success" size="sm" variant="soft">
                Open
              </Chip>
            }
          />
          <DetailRow
            label="Tags"
            value={
              <div className="flex flex-wrap justify-end gap-1.5">
                <Chip size="sm" variant="soft">
                  Billing
                </Chip>
                <Chip color="accent" size="sm" variant="soft">
                  Priority
                </Chip>
              </div>
            }
          />
        </div>
        <DisclosureGroup
          allowsMultipleExpanded
          className="mt-2 flex flex-col gap-2"
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}>
          <AsideDisclosure
            id="user-details"
            isExpanded={expandedKeys.has('user-details')}
            label="User details">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 pr-1 pb-3 pl-3 text-sm">
              <span className="text-muted">Name</span>
              <span className="text-foreground font-medium">Dan Fox</span>
              <span className="text-muted">Company</span>
              <span className="text-foreground font-medium">Ashby</span>
              <span className="text-muted">Type</span>
              <span className="text-foreground font-medium">Customer</span>
              <span className="text-muted">Email</span>
              <span className="text-foreground min-w-0 truncate font-medium">
                dan.fox@example.com
              </span>
            </div>
          </AsideDisclosure>
          <AsideDisclosure
            id="recent-conversations"
            isExpanded={expandedKeys.has('recent-conversations')}
            label="Recent conversations">
            <ul className="flex flex-col gap-2 pr-1 pb-3 pl-3 text-sm">
              <li className="text-foreground truncate">
                Payment failed on autopay
              </li>
              <li className="text-foreground truncate">
                How do I export invoices?
              </li>
              <li className="text-foreground truncate">Upgrade plan inquiry</li>
            </ul>
          </AsideDisclosure>
          <AsideDisclosure
            id="company-info"
            isExpanded={expandedKeys.has('company-info')}
            label="Company information">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 pr-1 pb-3 pl-3 text-sm">
              <span className="text-muted">Name</span>
              <span className="text-foreground font-medium">Ashby</span>
              <span className="text-muted">Plan</span>
              <span className="text-foreground font-medium">Enterprise</span>
              <span className="text-muted">Size</span>
              <span className="text-foreground font-medium">201 – 500</span>
            </div>
          </AsideDisclosure>
        </DisclosureGroup>
      </div>
      <footer className="border-border flex flex-col gap-1.5 border-t px-4 py-3">
        <Button fullWidth size="sm" variant="primary">
          Close conversation
        </Button>
        <Button fullWidth size="sm" variant="secondary">
          Snooze
        </Button>
      </footer>
    </div>
  )
}

interface AsideDisclosureProps {
  children: React.ReactNode
  id: string
  isExpanded: boolean
  label: string
}

function AsideDisclosure({
  children,
  id,
  isExpanded,
  label
}: AsideDisclosureProps) {
  return (
    <Disclosure id={id}>
      <Disclosure.Heading>
        <Button
          className="h-8 w-full justify-between border-none px-3"
          slot="trigger"
          variant={isExpanded ? 'secondary' : 'tertiary'}>
          <span className="text-sm font-medium">{label}</span>
          <Disclosure.Indicator className="text-muted size-3.5" />
        </Button>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="pt-2">{children}</Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  )
}

interface DetailRowProps {
  label: string
  value: React.ReactNode
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex min-h-[28px] items-center justify-between gap-4">
      <span className="text-muted text-sm">{label}</span>
      <div className="flex items-center justify-end">{value}</div>
    </div>
  )
}

function AsideSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">I</span>
            </div>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label">
              Inbox
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Inbox">
              {inboxNavItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={item.label}
                  isCurrent={item.isCurrent}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.count ? (
                    <Sidebar.MenuChip>
                      <span className="text-muted text-xs">{item.count}</span>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Team inboxes</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Team inboxes">
              {teamInboxes.map(team => (
                <Sidebar.MenuItem
                  key={team.label}
                  href="#"
                  id={`team-${team.label}`}
                  textValue={team.label}>
                  <Sidebar.MenuIcon>
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: `var(--color-${team.color})` }}
                    />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{team.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="analytics" textValue="Analytics">
              <Sidebar.MenuIcon>
                <ChartColumn className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="help" textValue="Help Center">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help Center</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">I</span>
            </div>
            <span className="text-foreground text-sm font-semibold">Inbox</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Inbox">
              {inboxNavItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={item.label}
                  isCurrent={item.isCurrent}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                  {item.count ? (
                    <Sidebar.MenuChip>
                      <span className="text-muted text-xs">{item.count}</span>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Team inboxes</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Team inboxes">
              {teamInboxes.map(team => (
                <Sidebar.MenuItem
                  key={team.label}
                  href="#"
                  id={`team-mobile-${team.label}`}
                  textValue={team.label}>
                  <Sidebar.MenuIcon>
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: `var(--color-${team.color})` }}
                    />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{team.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem
              href="#"
              id="analytics-mobile"
              textValue="Analytics">
              <Sidebar.MenuIcon>
                <ChartColumn className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="help-mobile" textValue="Help Center">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help Center</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Mobile>
    </>
  )
}

function AsideNavbar() {
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
          <Dropdown>
            <Button isIconOnly aria-label="Account menu" variant="ghost">
              <Avatar className="size-6" color="success" variant="soft">
                <Avatar.Fallback className="text-xs font-semibold">
                  JG
                </Avatar.Fallback>
              </Avatar>
            </Button>
            <Dropdown.Popover className="min-w-[200px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item id="account" textValue="Account">
                  <Person className="text-muted size-4" />
                  <Label>Account</Label>
                </Dropdown.Item>
                <Separator />
                <Dropdown.Item id="sign-out" textValue="Log out">
                  <ArrowRightFromSquare className="text-muted size-4" />
                  <Label>Log out</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <AppLayout.AsideTrigger
            closedTooltip="Show details"
            openTooltip="Hide details"
          />
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
