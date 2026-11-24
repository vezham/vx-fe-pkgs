// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Bell, ChartColumn, House, Magnifier, Person } from '@gravity-ui/icons'

import { AppLayout, Navbar, Sidebar } from '@vezham/react-pro-v3'
import { Avatar, Button } from '@vezham/react-v3'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'activity', title: 'Activity' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'metrics', title: 'Metrics' },
  { id: 'notes', title: 'Notes' }
]

const navItems = [
  { icon: House, label: 'Home' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: Bell, label: 'Alerts' }
]

export function ContentScroll() {
  const jumpToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId)

    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }

  return (
    <AppLayout
      navbar={<DemoNavbar />}
      scrollMode="content"
      sidebar={<DemoSidebar />}
      footer={
        <div className="border-border bg-background flex items-center justify-between border-t px-4 py-2">
          <span className="text-muted text-xs">Content scroll footer</span>
          <span className="text-muted text-xs tabular-nums">
            v3.0.0-alpha.33
          </span>
        </div>
      }>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
        <div className="border-border bg-surface sticky top-0 z-10 rounded-xl border p-3">
          <p className="text-muted mb-2 text-xs font-medium tracking-wide uppercase">
            Jump to
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <Button
                key={section.id}
                size="sm"
                variant="tertiary"
                onPress={() => jumpToSection(section.id)}>
                {section.title}
              </Button>
            ))}
          </div>
        </div>

        {sections.map(section => (
          <section key={section.id} className="scroll-mt-24" id={section.id}>
            <h2 className="text-foreground text-xl font-semibold">
              {section.title}
            </h2>
            <div className="mt-3 grid gap-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <article
                  key={`${section.id}-${index}`}
                  className="border-border rounded-xl border p-4">
                  <p className="text-foreground text-sm font-medium">
                    {section.title} item {index + 1}
                  </p>
                  <p className="text-muted mt-1 text-sm">
                    In <code>scrollMode=&quot;content&quot;</code>, the main
                    column scrolls while the sidebar and navbar remain fixed.
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppLayout>
  )
}

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
                  key={`mobile-${item.label}`}
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
                <Person className="size-3.5" />
              </Avatar.Fallback>
            </Avatar>
          </Button>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
