// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  Bulb,
  ChartColumn,
  ChevronsExpandVertical,
  CircleQuestion,
  Gear,
  Headphones,
  House,
  Magnifier,
  Megaphone,
  Microphone,
  Person,
  Persons,
  Plus,
  ShieldCheck,
  Sparkles,
  SquareArticle
} from '@gravity-ui/icons'

import {
  AppLayout,
  Navbar,
  PressableFeedback,
  Sidebar
} from '@vezham/react-pro-v3'
import { KPI } from '@vezham/react-pro-v3/kpi'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Dropdown,
  Label,
  Separator
} from '@vezham/react-v3'

export function InsetDashboard() {
  return (
    <AppLayout
      navbar={<DashboardNavbar />}
      sidebar={<DashboardSidebar />}
      sidebarCollapsible="offcanvas"
      sidebarVariant="inset">
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {kpiCards.map(card => (
            <KPI key={card.title}>
              <KPI.Header>
                <KPI.Title>{card.title}</KPI.Title>
              </KPI.Header>
              <KPI.Content>
                <KPI.Value maximumFractionDigits={0} value={card.value} />
                <KPI.Trend size="md" trend={card.trend}>
                  {card.change}
                </KPI.Trend>
              </KPI.Content>
              <KPI.Chart
                color={card.color}
                data={card.chartData}
                height={72}
                strokeWidth={1.5}
              />
            </KPI>
          ))}
        </div>
        <div className="bg-surface shadow-surface flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-sm font-semibold">
              Latest episodes
            </h2>
            <Button size="sm" variant="tertiary">
              View all
            </Button>
          </div>
          <ul className="-mx-3 flex flex-col gap-0.5">
            {latestEpisodes.map(episode => (
              <li key={episode.id}>
                <PressableFeedback
                  aria-label={`Open ${episode.title}`}
                  className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left">
                  <PressableFeedback.Ripple className="text-muted" />
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-soft text-accent flex size-8 items-center justify-center rounded-md">
                      <Microphone className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-foreground text-sm font-medium">
                        {episode.title}
                      </span>
                      <span className="text-muted text-xs">
                        Guest · {episode.guest}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-foreground text-sm font-medium tabular-nums">
                      {episode.plays}
                    </span>
                    <span className="text-muted text-xs tabular-nums">
                      {episode.publishedAt}
                    </span>
                  </div>
                </PressableFeedback>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}

const BreadcrumbItems = [
  { icon: <House className="size-4" />, label: 'Overview' }
]

const mainNavItems = [
  { icon: House, isCurrent: true, label: 'Overview' },
  { icon: Microphone, label: 'Episodes' },
  { icon: Persons, label: 'Guests' },
  { icon: ChartColumn, label: 'Analytics' },
  { icon: Megaphone, label: 'Campaigns' },
  { icon: Gear, label: 'Settings' }
]

const upcomingEpisodes = [
  { label: 'Designing for attention spans' },
  { label: 'The pricing conversation nobody wants' },
  { label: 'Building a creative studio from zero' },
  { label: 'Late-night debugging with Ada' }
]

const plays = [
  { value: 42000 },
  { value: 48500 },
  { value: 44200 },
  { value: 52100 },
  { value: 49800 },
  { value: 61400 },
  { value: 57900 },
  { value: 68200 },
  { value: 64500 },
  { value: 74800 },
  { value: 78600 },
  { value: 84210 }
]

const subscribers = [
  { value: 2740 },
  { value: 2890 },
  { value: 2820 },
  { value: 3010 },
  { value: 2950 },
  { value: 3180 },
  { value: 3240 },
  { value: 3190 },
  { value: 3330 },
  { value: 3410 },
  { value: 3380 },
  { value: 3487 }
]

const episodes = [
  { value: 34 },
  { value: 36 },
  { value: 35 },
  { value: 39 },
  { value: 38 },
  { value: 41 },
  { value: 43 },
  { value: 42 },
  { value: 45 },
  { value: 44 },
  { value: 47 },
  { value: 48 }
]

const kpiCards = [
  {
    change: '+14%',
    chartData: plays,
    color: 'var(--color-accent)',
    title: 'Monthly plays',
    trend: 'up' as const,
    value: 84210
  },
  {
    change: '+6%',
    chartData: subscribers,
    color: 'var(--color-success)',
    title: 'Active subscribers',
    trend: 'up' as const,
    value: 3487
  },
  {
    change: '2 scheduled',
    chartData: episodes,
    color: 'var(--color-muted)',
    title: 'Episodes published',
    trend: 'neutral' as const,
    value: 48
  }
]

const quickActions = [
  { icon: Magnifier, label: 'Search' },
  { count: 4, icon: SquareArticle, label: 'Drafts' }
]

const latestEpisodes = [
  {
    guest: 'Ada Park',
    id: '1',
    plays: '12,489',
    publishedAt: '2d',
    title: 'Designing for attention spans'
  },
  {
    guest: 'Mateo Silva',
    id: '2',
    plays: '8,902',
    publishedAt: '1w',
    title: 'The pricing conversation nobody wants'
  },
  {
    guest: 'Lenna Huang',
    id: '3',
    plays: '21,008',
    publishedAt: '2w',
    title: 'Building a creative studio from zero'
  },
  {
    guest: 'Kai Johansen',
    id: '4',
    plays: '4,132',
    publishedAt: '3w',
    title: 'Late-night debugging with Ada'
  }
]

function StudioSwitcher() {
  return (
    <Dropdown>
      <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2 rounded-lg px-1 py-1 text-left outline-none">
        <div className="bg-accent-soft flex size-6 shrink-0 items-center justify-center rounded-md">
          <Headphones className="text-accent size-3.5" />
        </div>
        <span
          className="text-foreground text-sm font-semibold"
          data-sidebar="label">
          Soundwave Studio
        </span>
        <ChevronsExpandVertical
          className="text-muted ml-auto size-3.5"
          data-sidebar="label"
        />
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-[220px]" placement="bottom start">
        <Dropdown.Menu>
          <Dropdown.Item id="workspace-personal" textValue="Personal">
            <Person className="text-muted size-4" />
            <Label>Personal</Label>
          </Dropdown.Item>
          <Dropdown.Item id="workspace-soundwave" textValue="Soundwave Studio">
            <Headphones className="text-muted size-4" />
            <Label>Soundwave Studio</Label>
          </Dropdown.Item>
          <Separator />
          <Dropdown.Item id="workspace-new" textValue="New workspace">
            <Plus className="text-muted size-4" />
            <Label>New workspace</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function UserMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger className="hover:bg-default flex items-center gap-2 rounded-lg py-1 pr-1 pl-2 text-left outline-none">
        <span className="text-foreground hidden text-sm font-medium sm:inline">
          Nora Kim
        </span>
        <Avatar className="size-6">
          <Avatar.Image
            alt="Nora Kim"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
          />
          <Avatar.Fallback>NK</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-[240px]" placement="bottom end">
        <div className="flex flex-col gap-0 px-3 pt-3 pb-1">
          <p className="text-foreground text-sm leading-5 font-medium">
            Nora Kim
          </p>
          <p className="text-muted text-xs leading-none">nora@soundwave.fm</p>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="account" textValue="My account">
            <Person className="text-muted size-4" />
            <Label>My account</Label>
          </Dropdown.Item>
          <Separator />
          <Dropdown.Item id="privacy" textValue="Privacy policy">
            <ShieldCheck className="text-muted size-4" />
            <Label>Privacy policy</Label>
          </Dropdown.Item>
          <Dropdown.Item id="feedback" textValue="Share feedback">
            <Bulb className="text-muted size-4" />
            <Label>Share feedback</Label>
          </Dropdown.Item>
          <Separator />
          <Dropdown.Item id="sign-out" textValue="Sign out">
            <ArrowRightFromSquare className="text-muted size-4" />
            <Label>Sign out</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function DashboardSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <StudioSwitcher />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Quick actions">
              {quickActions.map(action => (
                <Sidebar.MenuItem
                  key={action.label}
                  id={`quick-${action.label}`}
                  textValue={action.label}>
                  <Sidebar.MenuIcon>
                    <action.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{action.label}</Sidebar.MenuLabel>
                  {action.count ? (
                    <Sidebar.MenuChip>
                      <span className="text-muted text-xs">{action.count}</span>
                    </Sidebar.MenuChip>
                  ) : null}
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Main navigation">
              {mainNavItems.map(item => (
                <Sidebar.MenuItem
                  key={item.label}
                  href="#"
                  id={item.label}
                  isCurrent={item.isCurrent}
                  textValue={item.label}>
                  <Sidebar.MenuIcon>
                    <item.icon className="size-4" />
                  </Sidebar.MenuIcon>
                  <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Upcoming releases</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Upcoming releases">
              {upcomingEpisodes.map(episode => (
                <Sidebar.MenuItem
                  key={episode.label}
                  href="#"
                  id={`episode-${episode.label}`}
                  textValue={episode.label}>
                  <Sidebar.MenuLabel>{episode.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu aria-label="Resources">
            <Sidebar.MenuItem href="#" id="help" textValue="Help Center">
              <Sidebar.MenuIcon>
                <CircleQuestion className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>Help Center</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem href="#" id="changelog" textValue="What's new">
              <Sidebar.MenuIcon>
                <Sparkles className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>What's new</Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <StudioSwitcher />
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.Menu aria-label="Main navigation">
              {mainNavItems.map(item => (
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
          <Sidebar.Group>
            <Sidebar.GroupLabel>Upcoming releases</Sidebar.GroupLabel>
            <Sidebar.Menu aria-label="Upcoming releases">
              {upcomingEpisodes.map(episode => (
                <Sidebar.MenuItem
                  key={episode.label}
                  href="#"
                  id={`episode-mobile-${episode.label}`}
                  textValue={episode.label}>
                  <Sidebar.MenuLabel>{episode.label}</Sidebar.MenuLabel>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Mobile>
    </>
  )
}

function DashboardNavbar() {
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
        <UserMenu />
      </Navbar.Header>
    </Navbar>
  )
}
