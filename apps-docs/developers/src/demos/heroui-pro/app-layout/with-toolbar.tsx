// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  ChartColumn,
  CircleQuestion,
  Gear,
  House,
  Magnifier
} from '@gravity-ui/icons'

import { AppLayout, Navbar, Segment, Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Breadcrumbs, Button } from '@vezham/react-v3'

export function WithToolbar() {
  return (
    <AppLayout
      navbar={<DemoNavbar />}
      scrollMode="content"
      sidebar={<DemoSidebar />}
      footer={
        <div className="border-border bg-background flex items-center justify-between border-t px-4 py-2">
          <span className="text-muted text-xs">
            © 2026 HeroUI — sticky footer slot.
          </span>
          <span className="text-muted text-xs tabular-nums">
            v3.0.0-alpha.33
          </span>
        </div>
      }
      toolbar={
        <div className="border-border bg-background flex items-center gap-2 border-b px-4 py-2">
          <Segment aria-label="View mode" defaultSelectedKey="list">
            <Segment.Item id="list">List</Segment.Item>
            <Segment.Item id="board">Board</Segment.Item>
            <Segment.Item id="calendar">Calendar</Segment.Item>
          </Segment>
        </div>
      }>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-foreground text-xl font-semibold">
          Toolbar + Footer
        </h1>
        <p className="text-muted max-w-prose text-sm">
          A second sticky row renders below the navbar via the{' '}
          <code>toolbar</code> prop. The <code>footer</code> prop pins a row to
          the bottom of the body column. This demo uses{' '}
          <code>scrollMode="content"</code>, so scrolling happens inside the
          main content region while the shell rows stay visible.
        </p>
        <div className="grid gap-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="border-border rounded-md border p-4">
              <p className="text-foreground font-medium">Item {i + 1}</p>
              <p className="text-muted text-sm">
                Scroll this content area to keep toolbar and footer pinned.
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

const navItems = [
  { icon: House, label: 'Dashboard' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: Gear, label: 'Settings' }
]

function DemoSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">H</span>
            </div>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label">
              HeroUI
            </span>
          </div>
        </Sidebar.Header>
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
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">H</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              HeroUI
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Navigation">
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={`mobile-${item.label}`}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
    </>
  )
}

function DemoNavbar() {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Breadcrumbs className="min-w-0">
          <Breadcrumbs.Item className="min-w-0 font-semibold">
            <span className="flex min-w-0 items-center gap-2 overflow-hidden">
              <House className="size-4" />
              <span className="truncate">Dashboard</span>
            </span>
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <Navbar.Spacer />
        <Navbar.Content>
          <Navbar.Item aria-label="Search">
            <Magnifier className="size-4" />
          </Navbar.Item>
          <Navbar.Item aria-label="Notifications">
            <Bell className="size-4" />
          </Navbar.Item>
          <Button isIconOnly aria-label="Help" variant="ghost">
            <CircleQuestion className="size-4" />
          </Button>
          <Button isIconOnly aria-label="Account" variant="ghost">
            <Avatar className="size-6" color="success" variant="soft">
              <Avatar.Fallback className="text-xs font-semibold">
                JG
              </Avatar.Fallback>
            </Avatar>
          </Button>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
