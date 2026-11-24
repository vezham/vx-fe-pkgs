// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ChartColumn,
  ChartPie,
  ChevronLeft,
  CircleInfo,
  Gear,
  House,
  Persons,
  Pulse,
  Receipt
} from '@gravity-ui/icons'

import { Sidebar, useSidebarPages } from '@vezham/react-pro-v3'

const sidebarBrandName = 'HeroUI'

function MainMenu({ idPrefix = '' }: { idPrefix?: string }) {
  const { setActiveValue } = useSidebarPages()

  return (
    <Sidebar.Menu aria-label="Main navigation">
      <Sidebar.MenuItem
        id={`${idPrefix}overview`}
        textValue="Overview"
        onAction={() => setActiveValue('overview')}>
        <Sidebar.MenuIcon>
          <House className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Overview</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem
        id={`${idPrefix}analytics`}
        textValue="Analytics"
        onAction={() => setActiveValue('analytics')}>
        <Sidebar.MenuIcon>
          <ChartPie className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Analytics</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem
        id={`${idPrefix}settings`}
        textValue="Settings"
        onAction={() => setActiveValue('settings')}>
        <Sidebar.MenuIcon>
          <Gear className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Settings</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}

function BackItem({ idPrefix = '' }: { idPrefix?: string }) {
  const { setActiveValue } = useSidebarPages()

  return (
    <Sidebar.MenuItem
      id={`${idPrefix}back`}
      textValue="Back to menu"
      onAction={() => setActiveValue('main')}>
      <Sidebar.MenuIcon>
        <ChevronLeft className="size-4" />
      </Sidebar.MenuIcon>
      <Sidebar.MenuLabel>Back</Sidebar.MenuLabel>
    </Sidebar.MenuItem>
  )
}

function OverviewMenu({ idPrefix = '' }: { idPrefix?: string }) {
  return (
    <Sidebar.Menu aria-label="Overview navigation">
      <BackItem idPrefix={`${idPrefix}overview-`} />
      <Sidebar.Separator />
      <Sidebar.MenuItem
        isCurrent
        href="#"
        id={`${idPrefix}summary`}
        textValue="Summary">
        <Sidebar.MenuIcon>
          <CircleInfo className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Summary</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem
        href="#"
        id={`${idPrefix}activity`}
        textValue="Activity">
        <Sidebar.MenuIcon>
          <Pulse className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Activity</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}

function AnalyticsMenu({ idPrefix = '' }: { idPrefix?: string }) {
  return (
    <Sidebar.Menu aria-label="Analytics navigation">
      <BackItem idPrefix={`${idPrefix}analytics-`} />
      <Sidebar.Separator />
      <Sidebar.MenuItem
        isCurrent
        href="#"
        id={`${idPrefix}reports`}
        textValue="Reports">
        <Sidebar.MenuIcon>
          <ChartColumn className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Reports</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem href="#" id={`${idPrefix}traffic`} textValue="Traffic">
        <Sidebar.MenuIcon>
          <ChartPie className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Traffic</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}

function SettingsMenu({ idPrefix = '' }: { idPrefix?: string }) {
  return (
    <Sidebar.Menu aria-label="Settings navigation">
      <BackItem idPrefix={`${idPrefix}settings-`} />
      <Sidebar.Separator />
      <Sidebar.MenuItem
        isCurrent
        href="#"
        id={`${idPrefix}general`}
        textValue="General">
        <Sidebar.MenuIcon>
          <Gear className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>General</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem href="#" id={`${idPrefix}team`} textValue="Team">
        <Sidebar.MenuIcon>
          <Persons className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Team</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem href="#" id={`${idPrefix}billing`} textValue="Billing">
        <Sidebar.MenuIcon>
          <Receipt className="size-4" />
        </Sidebar.MenuIcon>
        <Sidebar.MenuLabel>Billing</Sidebar.MenuLabel>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  )
}

function NavPages({ idPrefix = '' }: { idPrefix?: string }) {
  return (
    <Sidebar.Pages defaultValue="main">
      <Sidebar.Page value="main">
        <Sidebar.Group>
          <MainMenu idPrefix={idPrefix} />
        </Sidebar.Group>
      </Sidebar.Page>
      <Sidebar.Page value="overview">
        <Sidebar.Group>
          <OverviewMenu idPrefix={idPrefix} />
        </Sidebar.Group>
      </Sidebar.Page>
      <Sidebar.Page value="analytics">
        <Sidebar.Group>
          <AnalyticsMenu idPrefix={idPrefix} />
        </Sidebar.Group>
      </Sidebar.Page>
      <Sidebar.Page value="settings">
        <Sidebar.Group>
          <SettingsMenu idPrefix={idPrefix} />
        </Sidebar.Group>
      </Sidebar.Page>
    </Sidebar.Pages>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <div className="bg-accent flex size-6 shrink-0 items-center justify-center rounded-md">
        <span className="text-sm font-bold text-white">H</span>
      </div>
      <span
        className="text-foreground text-sm font-semibold"
        data-sidebar="label">
        {sidebarBrandName}
      </span>
    </div>
  )
}

export function Pages() {
  return (
    <Sidebar.Provider>
      <Sidebar>
        <Sidebar.Header>
          <Brand />
        </Sidebar.Header>
        <Sidebar.Content>
          <NavPages />
        </Sidebar.Content>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <Brand />
        </Sidebar.Header>
        <Sidebar.Content>
          <NavPages idPrefix="mobile-" />
        </Sidebar.Content>
      </Sidebar.Mobile>
      <Sidebar.Main>
        <div className="flex items-center gap-3 p-4">
          <Sidebar.Trigger />
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="p-6">
          <p className="text-muted">
            Click <strong>Overview</strong>, <strong>Analytics</strong>, or{' '}
            <strong>Settings</strong> to slide to that page, then{' '}
            <strong>Back</strong> to return. The active page persists its state
            across transitions.
          </p>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}
