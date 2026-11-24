// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  CircleQuestion,
  Folder,
  Gear,
  House,
  LayoutColumns,
  Magnifier,
  Palette,
  Person,
  SquareArticle,
  TextAlignLeft
} from '@gravity-ui/icons'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Dropdown,
  Label,
  Separator
} from '@vezham/react-v3'

export function WithBreadcrumbs() {
  return (
    <AppLayout navbar={<BreadcrumbsNavbar />} sidebar={<BreadcrumbsSidebar />}>
      <div className="p-6">
        <h1 className="text-foreground text-xl font-semibold">Components</h1>
        <p className="text-muted mt-2 text-sm">
          The navbar shows a multi-level breadcrumb trail reflecting the current
          navigation depth. This pattern is common in project management and
          nested content apps.
        </p>
      </div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { label: 'Home' },
  { label: 'Projects' },
  { label: 'Design System' },
  { icon: <LayoutColumns className="size-4" />, label: 'Components' }
]

const projectNavItems = [
  { icon: House, label: 'Overview' },
  { icon: LayoutColumns, label: 'Components' },
  { icon: Palette, label: 'Tokens' },
  { icon: TextAlignLeft, label: 'Typography' },
  { icon: SquareArticle, label: 'Changelog' },
  { icon: Gear, label: 'Settings' }
]

function BreadcrumbsSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">DS</span>
            </div>
            <span
              className="text-foreground text-sm font-semibold"
              data-sidebar="label">
              Design System
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Project navigation">
              {projectNavItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={item.label}
                  isCurrent={item.label === 'Components'}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspaces</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Workspaces">
              <Sidebar.MenuItem href="#" id="ws-frontend" textValue="Frontend">
                <Sidebar.MenuIcon>
                  <Folder className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Frontend</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem href="#" id="ws-backend" textValue="Backend">
                <Sidebar.MenuIcon>
                  <Folder className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Backend</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer">
            <Sidebar.MenuItem href="#" id="help" textValue="Help">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <div className="flex items-center gap-3 px-1 py-2">
            <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
              <span className="text-sm font-bold text-white">DS</span>
            </div>
            <span className="text-foreground text-sm font-semibold">
              Design System
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Project navigation">
              {projectNavItems.map(item => (
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

function BreadcrumbsNavbar() {
  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Breadcrumbs className="min-w-0">
          {BreadcrumbItems.map((item, index) => {
            const isLast = index === BreadcrumbItems.length - 1
            const isMiddle = !isLast && index > 0

            return (
              <Breadcrumbs.Item
                key={`${item.label}-${index}`}
                className={`min-w-0 ${isLast ? 'font-semibold' : 'text-muted'} ${isMiddle ? 'hidden md:flex' : ''}`}
                href={isLast ? undefined : '#'}>
                <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </span>
              </Breadcrumbs.Item>
            )
          })}
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
                  alt="User avatar"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
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
                <Separator />
                <Dropdown.Item id="sign-out" textValue="Log out">
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
