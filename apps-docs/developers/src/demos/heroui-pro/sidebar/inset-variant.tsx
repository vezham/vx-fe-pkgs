// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Book,
  Code,
  Gear,
  Globe,
  House,
  ListCheck,
  SquareDashed
} from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { Sidebar } from '@vezham/react-pro-v3'
import { Breadcrumbs } from '@vezham/react-v3'

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

export function InsetVariant() {
  return (
    <Sidebar.Provider collapsible="offcanvas" variant="inset">
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
              <SquareDashed className="text-background size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                HeroUI Inc.
              </span>
              <span className="text-muted text-xs leading-tight">
                Enterprise
              </span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Platform">
              <Sidebar.MenuItem id="playground" textValue="Playground">
                <Sidebar.MenuIcon>
                  <Code className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Playground</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="models" textValue="Models">
                <Sidebar.MenuIcon>
                  <SquareDashed className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Models</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="documentation" textValue="Documentation">
                <Sidebar.MenuIcon>
                  <Book className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Documentation</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="settings" textValue="Settings">
                <Sidebar.MenuIcon>
                  <Gear className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Projects">
              <Sidebar.MenuItem
                id="design-engineering"
                textValue="Design Engineering">
                <Sidebar.MenuIcon>
                  <ListCheck className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Design Engineering</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="sales-marketing"
                textValue="Sales & Marketing">
                <Sidebar.MenuIcon>
                  <Globe className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Sales &amp; Marketing</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="travel" textValue="Travel">
                <Sidebar.MenuIcon>
                  <House className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Travel</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
              <SquareDashed className="text-background size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-sm leading-tight font-semibold">
                HeroUI Labs
              </span>
              <span className="text-muted text-xs leading-tight">
                Enterprise
              </span>
            </div>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Platform">
              <Sidebar.MenuItem
                id="playground-mobile-inset"
                textValue="Playground">
                <Sidebar.MenuIcon>
                  <Code className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Playground</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="models-mobile-inset" textValue="Models">
                <Sidebar.MenuIcon>
                  <SquareDashed className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Models</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="documentation-mobile-inset"
                textValue="Documentation">
                <Sidebar.MenuIcon>
                  <Book className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Documentation</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="settings-mobile-inset" textValue="Settings">
                <Sidebar.MenuIcon>
                  <Gear className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Projects">
              <Sidebar.MenuItem
                id="design-engineering-mobile-inset"
                textValue="Design Engineering">
                <Sidebar.MenuIcon>
                  <ListCheck className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Design Engineering</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem
                id="sales-marketing-mobile-inset"
                textValue="Sales & Marketing">
                <Sidebar.MenuIcon>
                  <Globe className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Sales &amp; Marketing</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem id="travel-mobile-inset" textValue="Travel">
                <Sidebar.MenuIcon>
                  <House className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Travel</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[
            {
              icon: <SquareDashed className="size-4" />,
              label: 'Build Your Application'
            },
            { label: 'Data Fetching' }
          ]}
        />
        <div className="grid gap-4 p-4 pt-0">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface rounded-xl border p-6" />
            <div className="bg-surface rounded-xl border p-6" />
            <div className="bg-surface rounded-xl border p-6" />
          </div>
          <div className="bg-surface min-h-[50vh] rounded-xl border p-6" />
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
