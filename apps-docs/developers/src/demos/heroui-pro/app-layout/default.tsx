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
  Magnifier,
  Person
} from '@gravity-ui/icons'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  Label,
  Separator
} from '@vezham/react-v3'

export function Default() {
  return (
    <AppLayout navbar={<DemoNavbar />} sidebar={<DemoSidebar />}>
      <div className="p-6">
        <h1 className="text-foreground text-xl font-semibold">Dashboard</h1>
        <p className="text-muted mt-2 text-sm">
          The sidebar fills the full viewport height while the navbar and main
          content live in the right column. Resize to mobile to see the sidebar
          collapse into a sheet.
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
  {
    icon: ChartColumn,
    items: ['Overview', 'Reports', 'Conversions'],
    label: 'Analytics'
  },
  { badge: 'New', icon: ListCheck, label: 'Tracker' },
  {
    icon: Gear,
    items: ['General', 'Team', 'Notifications'],
    label: 'Settings'
  }
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
            <Sidebar.Menu
              aria-label="Navigation"
              defaultExpandedKeys={['Analytics']}>
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href={item.items ? undefined : '#'}
                  id={item.label}
                  isCurrent={item.label === 'Dashboard'}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>
                    {item.label}
                    {item.items ? (
                      <Sidebar.MenuTrigger>
                        <Sidebar.MenuIndicator />
                      </Sidebar.MenuTrigger>
                    ) : null}
                  </Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                  {item.items ? (
                    <Sidebar.Submenu>
                      {item.items.map(subitem => (
                        <Sidebar.MenuItem
                          key={subitem}
                          href="#"
                          id={`${item.label}-${subitem}`}
                          textValue={subitem}>
                          <Sidebar.MenuLabel>{subitem}</Sidebar.MenuLabel>
                        </Sidebar.MenuItem>
                      ))}
                    </Sidebar.Submenu>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Footer actions">
            <Sidebar.MenuItem href="#" id="help" textValue="Help & Information">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help & Information</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="logout" textValue="Log out">
              <Sidebar.MenuIcon>
                <ArrowRightFromSquare className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Log out</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
        <Sidebar.Rail />
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
            <Sidebar.Menu
              aria-label="Navigation"
              defaultExpandedKeys={['Analytics']}>
              {navItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href={item.items ? undefined : '#'}
                  id={item.label}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>
                    {item.label}
                    {item.items ? (
                      <Sidebar.MenuTrigger>
                        <Sidebar.MenuIndicator />
                      </Sidebar.MenuTrigger>
                    ) : null}
                  </Sidebar.MenuLabel>
                  {item.badge ? (
                    <Sidebar.MenuChip>
                      <Chip color="success" size="sm" variant="soft">
                        {item.badge}
                      </Chip>
                    </Sidebar.MenuChip>
                  ) : null}
                  {item.items ? (
                    <Sidebar.Submenu>
                      {item.items.map(subitem => (
                        <Sidebar.MenuItem
                          key={subitem}
                          href="#"
                          id={`${item.label}-${subitem}`}
                          textValue={subitem}>
                          <Sidebar.MenuLabel>{subitem}</Sidebar.MenuLabel>
                        </Sidebar.MenuItem>
                      ))}
                    </Sidebar.Submenu>
                  ) : null}
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
          <Navbar.Separator />
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
