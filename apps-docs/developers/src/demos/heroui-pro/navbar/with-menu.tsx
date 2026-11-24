// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Bell, Gear, House, Magnifier, Persons } from '@gravity-ui/icons'
import { useState } from 'react'

import { Navbar } from '@vezham/react-pro-v3'
import { Avatar } from '@vezham/react-v3'

const BrandLogo = () => (
  <>
    <svg
      aria-hidden="true"
      className="h-[22px] w-auto"
      fill="none"
      height="22"
      viewBox="0 0 83 26"
      width="83"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M.54 6.73v7.48c0 .35.18.68.48.86l5.1 3.2c.68.42 1.56-.07 1.56-.88v-6.28c0-.36.19-.7.5-.88l3.1-1.85v16.11c0 .8.88 1.29 1.56.87l5.26-3.25c.3-.18.49-.51.49-.87V5.77c0-.8-.87-1.29-1.55-.88l-5.76 3.49V1.51c0-.79-.86-1.29-1.54-.88L1.03 5.85c-.3.18-.5.52-.5.88Z"
        fill="currentColor"
      />
      <path
        d="M37.88 14.22c0-2.12-.87-3.1-2.6-3.1-1.99 0-3.39 1.34-3.39 4.33v6.85h-3.58V3.27h3.58v6.96c.87-1.42 2.3-2.12 4.26-2.12 3.33 0 5.29 2.04 5.29 5.46v8.73h-3.56v-8.08Z"
        fill="currentColor"
      />
      <path
        d="M50.3 22.73c-4.45 0-7.27-2.88-7.27-7.31 0-4.38 2.8-7.32 7.27-7.32 4.85 0 7.48 3.43 6.75 8.25H46.61c.2 2.28 1.54 3.58 3.7 3.58 1.76 0 2.82-.9 3.1-1.79h3.56c-.56 2.66-3.03 4.59-6.66 4.59Zm-3.61-8.75h6.89c-.03-1.88-1.26-3.15-3.36-3.15-1.88 0-3.19 1.09-3.53 3.15Z"
        fill="currentColor"
      />
      <path
        d="M59 12.02c0-2.26 1.26-3.48 3.67-3.48h4.59v2.94h-4.67V22.3H59V12.02Z"
        fill="currentColor"
      />
      <path
        d="M75.1 22.73c-4.53 0-7.42-2.9-7.42-7.31 0-4.4 2.89-7.31 7.42-7.31 4.48 0 7.36 2.9 7.36 7.31 0 4.4-2.88 7.31-7.36 7.31Zm0-2.96c2.24 0 3.72-1.71 3.72-4.35s-1.48-4.38-3.72-4.38c-2.27 0-3.75 1.74-3.75 4.38s1.48 4.35 3.75 4.35Z"
        fill="currentColor"
      />
    </svg>
    <span className="sr-only">HeroUI</span>
  </>
)

const navItems = [
  { href: '#dashboard', icon: House, label: 'Dashboard' },
  { href: '#team', icon: Persons, label: 'Team' },
  { href: '#settings', icon: Gear, label: 'Settings' }
]

const sections = [
  {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae arcu sed nibh mattis consequat. Donec ac justo non urna tempor luctus.',
    label: 'Overview',
    title: 'Mobile navigation overlay'
  },
  {
    body: 'Suspendisse potenti. Praesent et mi eu purus viverra dignissim. Aenean tristique velit at mauris dictum, nec luctus eros gravida.',
    label: 'Activity',
    title: 'Recent workspace updates'
  },
  {
    body: 'Curabitur sit amet lorem id sem volutpat facilisis. Morbi at erat quis sem porta cursus. Fusce non mauris sit amet lectus feugiat rhoncus.',
    label: 'Notes',
    title: 'Project context'
  }
]

export function WithMenu() {
  const [currentItem, setCurrentItem] = useState('#dashboard')

  return (
    <div className="bg-background w-full overflow-visible">
      <Navbar defaultMenuOpen position="static" shouldBlockScroll={false}>
        <Navbar.Header>
          <Navbar.Brand>
            <BrandLogo />
          </Navbar.Brand>

          <Navbar.Content className="hidden sm:flex">
            {navItems.map(item => (
              <Navbar.Item
                key={item.href}
                href={item.href}
                isCurrent={item.href === currentItem}
                onClick={e => {
                  e.preventDefault()
                  setCurrentItem(item.href)
                }}>
                {item.label}
              </Navbar.Item>
            ))}
          </Navbar.Content>

          <Navbar.Spacer />

          <Navbar.Content>
            <Navbar.Item>
              <Magnifier data-slot="icon" />
            </Navbar.Item>
            <Navbar.Item>
              <Bell data-slot="icon" />
            </Navbar.Item>
            <Navbar.Separator />
            <Navbar.Item>
              <Avatar className="size-7">
                <Avatar.Image
                  alt="User avatar"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
                />
                <Avatar.Fallback>JG</Avatar.Fallback>
              </Avatar>
            </Navbar.Item>
          </Navbar.Content>

          <Navbar.MenuToggle />
        </Navbar.Header>

        <Navbar.Menu>
          {navItems.map(item => (
            <Navbar.MenuItem
              key={item.href}
              href={item.href}
              isCurrent={item.href === currentItem}
              onClick={e => {
                e.preventDefault()
                setCurrentItem(item.href)
              }}>
              <item.icon data-slot="icon" />
              {item.label}
            </Navbar.MenuItem>
          ))}
        </Navbar.Menu>
      </Navbar>

      <main className="flex min-h-[680px] flex-col gap-4 p-4 sm:p-6">
        <section className="bg-surface border-border flex flex-col gap-3 rounded-lg border p-4">
          <span className="text-muted text-xs font-medium uppercase">
            Dashboard
          </span>
          <h2 className="text-foreground text-xl font-semibold">
            Team workspace
          </h2>
          <p className="text-muted text-sm leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            id lectus scelerisque, gravida erat at, lacinia sem. Nunc sed luctus
            tortor, vitae porttitor ipsum.
          </p>
        </section>

        <div className="grid gap-3 sm:grid-cols-3">
          {sections.map(section => (
            <section
              key={section.title}
              className="bg-surface border-border flex flex-col gap-2 rounded-lg border p-4">
              <span className="text-muted text-xs font-medium">
                {section.label}
              </span>
              <h3 className="text-foreground text-sm font-semibold">
                {section.title}
              </h3>
              <p className="text-muted text-sm leading-6">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
