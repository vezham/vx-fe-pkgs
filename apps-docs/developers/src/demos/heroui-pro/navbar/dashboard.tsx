// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  Bell,
  CircleQuestion,
  Gear,
  Person
} from '@gravity-ui/icons'
import { useState } from 'react'

import { InlineSelect, Navbar } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  ListBox,
  Separator
} from '@vezham/react-v3'

const BrandMark = () => (
  <svg
    aria-hidden="true"
    className="size-5"
    fill="none"
    viewBox="0 0 24 34"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 8.22973V18.0896C0 18.5557 0.239547 18.9887 0.633655 19.2352L7.35585 23.4389C8.25167 23.9991 9.41193 23.3527 9.41193 22.2934V14.0053C9.41193 13.5285 9.66262 13.0871 10.0714 12.844L14.1719 10.4064V31.6481C14.1719 32.7039 15.3252 33.3509 16.2213 32.7979L23.1595 28.5156C23.5574 28.27 23.7998 27.8347 23.7998 27.3659V6.96774C23.7998 5.91715 22.6566 5.26934 21.7603 5.81202L14.1719 10.4064V1.35182C14.1719 0.304069 13.0342 -0.34416 12.1378 0.192813L0.65562 7.07073C0.249018 7.31429 0 7.7545 0 8.22973Z"
      fill="currentColor"
    />
  </svg>
)

const PathSeparator = () => (
  <svg
    aria-hidden="true"
    className="text-border size-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    viewBox="0 0 16 16">
    <path d="M10.75 2.75 5.25 13.25" strokeLinecap="round" />
  </svg>
)

const workspaces = [
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    fallback: 'SM',
    id: 'samlee',
    name: 'samlee'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    fallback: 'AC',
    id: 'acme-corp',
    name: 'acme-corp'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    fallback: 'MS',
    id: 'moonshot',
    name: 'moonshot'
  }
]

const projects = [
  { id: 'content-hub', name: 'content-hub' },
  { id: 'marketing-site', name: 'marketing-site' },
  { id: 'api-gateway', name: 'api-gateway' },
  { id: 'design-tokens', name: 'design-tokens' }
]

const timezones = [
  { id: 'utc', label: 'UTC', offset: 'UTC+00:00' },
  { id: 'pst', label: 'PST', offset: 'UTC−08:00' },
  { id: 'est', label: 'EST', offset: 'UTC−05:00' },
  { id: 'cet', label: 'CET', offset: 'UTC+01:00' },
  { id: 'jst', label: 'JST', offset: 'UTC+09:00' }
]

export function Dashboard() {
  const [workspace, setWorkspace] = useState<Key | null>('samlee')
  const [project, setProject] = useState<Key | null>('content-hub')
  const [timezone, setTimezone] = useState<Key | null>('utc')

  const selectedWorkspace =
    workspaces.find(w => w.id === workspace) ?? workspaces[0]!
  const selectedTimezone =
    timezones.find(t => t.id === timezone) ?? timezones[0]!

  return (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <Navbar position="static" shouldBlockScroll={false}>
        <Navbar.Header className="gap-2">
          <Navbar.Brand className="mr-1">
            <BrandMark />
            <span className="sr-only">HeroUI</span>
          </Navbar.Brand>

          <PathSeparator />

          <InlineSelect
            aria-label="Workspace"
            value={workspace}
            onChange={v => setWorkspace(v)}>
            <InlineSelect.Trigger className="gap-2">
              <Avatar className="size-5">
                <Avatar.Image
                  alt={selectedWorkspace.name}
                  src={selectedWorkspace.avatar}
                />
                <Avatar.Fallback className="text-[10px]">
                  {selectedWorkspace.fallback}
                </Avatar.Fallback>
              </Avatar>
              <span className="text-foreground text-sm font-medium">
                {selectedWorkspace.name}
              </span>
              <InlineSelect.Indicator />
            </InlineSelect.Trigger>
            <InlineSelect.Popover className="w-[220px]">
              <ListBox>
                {workspaces.map(w => (
                  <ListBox.Item key={w.id} id={w.id} textValue={w.name}>
                    <Avatar className="size-5">
                      <Avatar.Image alt={w.name} src={w.avatar} />
                      <Avatar.Fallback className="text-[10px]">
                        {w.fallback}
                      </Avatar.Fallback>
                    </Avatar>
                    {w.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </InlineSelect.Popover>
          </InlineSelect>

          <PathSeparator />

          <InlineSelect
            aria-label="Project"
            value={project}
            onChange={v => setProject(v)}>
            <InlineSelect.Trigger>
              <span className="text-foreground text-sm font-medium">
                {projects.find(p => p.id === project)?.name ??
                  projects[0]!.name}
              </span>
              <InlineSelect.Indicator />
            </InlineSelect.Trigger>
            <InlineSelect.Popover className="w-[200px]">
              <ListBox>
                {projects.map(p => (
                  <ListBox.Item key={p.id} id={p.id} textValue={p.name}>
                    {p.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </InlineSelect.Popover>
          </InlineSelect>

          <Navbar.Spacer />

          <div
            aria-label="Estimated monthly costs"
            className="hidden items-center gap-1.5 md:flex">
            <span className="text-muted text-[11px] font-medium tracking-wider uppercase">
              Est. costs
            </span>
            <span className="text-foreground text-sm font-semibold tabular-nums">
              $71.96
            </span>
          </div>

          <Navbar.Separator className="hidden h-4 md:block" />

          <InlineSelect
            aria-label="Timezone"
            value={timezone}
            onChange={v => setTimezone(v)}>
            <InlineSelect.Trigger>
              <span className="text-foreground text-sm font-medium">
                {selectedTimezone.label}
              </span>
              <InlineSelect.Indicator />
            </InlineSelect.Trigger>
            <InlineSelect.Popover className="w-[200px]">
              <ListBox>
                {timezones.map(t => (
                  <ListBox.Item
                    key={t.id}
                    id={t.id}
                    textValue={`${t.label} ${t.offset}`}>
                    <div className="flex flex-1 items-center justify-between gap-4 pr-6">
                      <span>{t.label}</span>
                      <span className="text-muted text-xs tabular-nums">
                        {t.offset}
                      </span>
                    </div>
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </InlineSelect.Popover>
          </InlineSelect>

          <Navbar.Content>
            <Navbar.Item aria-label="Notifications">
              <Bell data-slot="icon" />
            </Navbar.Item>

            <Dropdown>
              <Button isIconOnly aria-label="Account menu" variant="ghost">
                <Avatar className="size-7" color="success" variant="soft">
                  <Avatar.Fallback className="text-xs font-semibold">
                    SM
                  </Avatar.Fallback>
                </Avatar>
              </Button>
              <Dropdown.Popover
                className="min-w-[200px]"
                placement="bottom end">
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
                  <Dropdown.Item id="support" textValue="Help & support">
                    <CircleQuestion className="text-muted size-4" />
                    <Label>Help & support</Label>
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
    </div>
  )
}
