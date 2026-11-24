// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Bell,
  CircleQuestion,
  Envelope,
  House,
  Magnifier
} from '@gravity-ui/icons'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Breadcrumbs, Button, Chip } from '@vezham/react-v3'

const AUTO_SAVE_ID = 'app-layout-demo:resizable-aside'

export function ResizableAside() {
  return (
    <AppLayout
      asideResizable
      sidebarResizable
      aside={<DetailsAside />}
      asideDefaultSize="320px"
      asideMaxSize="420px"
      asideMinSize="260px"
      asideResizeBehavior="preserve-pixel-size"
      asideToggleShortcut="mod+."
      navbar={<DemoNavbar />}
      resizableAutoSaveId={AUTO_SAVE_ID}
      sidebar={<DemoSidebar />}
      sidebarCollapsible="offcanvas"
      sidebarDefaultSize="260px"
      sidebarMaxSize="380px"
      sidebarMinSize="220px"
      sidebarResizeBehavior="preserve-pixel-size">
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-foreground text-xl font-semibold">
          Resizable aside
        </h1>
        <p className="text-muted max-w-prose text-sm">
          Both the sidebar and the aside are user-resizable. Toggle the aside
          with the trigger in the top right or with <kbd>⌘</kbd> <kbd>.</kbd>.
        </p>
      </div>
    </AppLayout>
  )
}

function DetailsAside() {
  return (
    <div className="flex h-full flex-col">
      <header className="px-4 pt-4 pb-2">
        <h2 className="text-foreground text-sm font-semibold">Details</h2>
      </header>
      <div className="flex flex-col gap-3 px-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">Status</span>
          <Chip color="success" size="sm" variant="soft">
            Open
          </Chip>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Priority</span>
          <span className="text-foreground">Normal</span>
        </div>
      </div>
    </div>
  )
}

function DemoSidebar() {
  return (
    <>
      <Sidebar>
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
            <Sidebar.Menu aria-label="Navigation">
              <Sidebar.MenuItem isCurrent href="#" id="inbox" textValue="Inbox">
                <Sidebar.MenuIcon>
                  <Envelope className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem href="#" id="home" textValue="Home">
                <Sidebar.MenuIcon>
                  <House className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Home</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
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
            <Sidebar.Menu aria-label="Navigation">
              <Sidebar.MenuItem href="#" id="inbox-mobile" textValue="Inbox">
                <Sidebar.MenuIcon>
                  <Envelope className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>Inbox</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
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
              <Envelope className="size-4" />
              <span className="truncate">Inbox</span>
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
          <AppLayout.AsideTrigger
            closedTooltip="Show details"
            openTooltip="Hide details"
          />
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
