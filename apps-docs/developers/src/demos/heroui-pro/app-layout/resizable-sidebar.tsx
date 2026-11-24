// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  Bell,
  ChartColumn,
  CircleQuestion,
  Gear,
  House,
  ListCheck,
  Magnifier
} from '@gravity-ui/icons'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Breadcrumbs, Button, Chip } from '@vezham/react-v3'

const AUTO_SAVE_ID = 'app-layout-demo:resizable-sidebar'

export function ResizableSidebar() {
  return (
    <AppLayout
      sidebarResizable
      navbar={<DemoNavbar />}
      resizableAutoSaveId={AUTO_SAVE_ID}
      sidebar={<DemoSidebar />}
      sidebarCollapsible="offcanvas"
      sidebarDefaultSize="280px"
      sidebarMaxSize="420px"
      sidebarMinSize="220px"
      sidebarResizeBehavior="preserve-pixel-size">
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-foreground text-xl font-semibold">
          Resizable sidebar
        </h1>
        <p className="text-muted max-w-prose text-sm">
          Drag the vertical handle between the sidebar and the main area to
          resize. Reload the page — the layout is persisted via{' '}
          <code>resizableAutoSaveId</code>.
        </p>
      </div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { icon: <House className="size-4" />, label: 'Dashboard' }
]

const navItems = [
  { icon: House, label: 'Dashboard' },
  { icon: ChartColumn, label: 'Analytics' },
  { badge: 'New', icon: ListCheck, label: 'Tracker' },
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
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="help" textValue="Help">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="logout" textValue="Log out">
              <Sidebar.MenuIcon>
                <ArrowRightFromSquare className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
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
                  id={item.label}
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
