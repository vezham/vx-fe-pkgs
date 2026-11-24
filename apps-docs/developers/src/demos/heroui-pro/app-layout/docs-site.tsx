// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Book,
  Code,
  Cube,
  Display,
  LifeRing,
  LogoGithub,
  Moon,
  Palette,
  Rocket,
  SquareArticle,
  Sun
} from '@gravity-ui/icons'
import { useState } from 'react'

import { AppLayout, Navbar, Segment, Sidebar } from '@vezham/react-pro-v3'
import { Chip, Kbd, SearchField } from '@vezham/react-v3'

export function DocsSite() {
  return (
    <AppLayout
      navbar={<DocsNavbar />}
      sidebar={<DocsSidebar />}
      sidebarCollapsible="offcanvas">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Rocket className="text-accent size-5" />
          <span className="text-muted text-xs font-medium tracking-wider uppercase">
            Getting Started
          </span>
        </div>
        <h1 className="text-foreground mt-3 text-2xl font-bold">
          Introduction
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
          HeroUI is a modern React component library built on top of React Aria
          Components and Tailwind CSS v4. It provides accessible, customizable
          UI primitives for building high-quality web applications.
        </p>
        <h2 className="text-foreground mt-8 text-lg font-semibold">Features</h2>
        <ul className="text-muted mt-3 list-inside list-disc space-y-2 text-sm">
          <li>Accessible by default with React Aria</li>
          <li>Tailwind CSS v4 with design tokens</li>
          <li>Compound component patterns</li>
          <li>Dark mode support</li>
          <li>Server Component compatible</li>
        </ul>
      </div>
    </AppLayout>
  )
}

const BrandLogo = () => (
  <svg
    className="size-5"
    fill="none"
    viewBox="0 0 24 34"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 8.22973V18.0896C0 18.5557 0.239547 18.9887 0.633655 19.2352L7.35585 23.4389C8.25167 23.9991 9.41193 23.3527 9.41193 22.2934V14.0053C9.41193 13.5285 9.66262 13.0871 10.0714 12.844L14.1719 10.4064V31.6481C14.1719 32.7039 15.3252 33.3509 16.2213 32.7979L23.1595 28.5156C23.5574 28.27 23.7998 27.8347 23.7998 27.3659V6.96774C23.7998 5.91715 22.6566 5.26934 21.7603 5.81202L14.1719 10.4064V1.35182C14.1719 0.304069 13.0342 -0.34416 12.1378 0.192813L0.65562 7.07073C0.249018 7.31429 0 7.7545 0 8.22973Z"
      fill="currentColor"
    />
  </svg>
)

type DocsItem = {
  badge?: 'New' | 'Beta'
  label: string
}

type FlatSection = {
  icon: typeof Rocket
  items: DocsItem[]
  label: string
}

type NestedSection = {
  icon: typeof Cube
  label: string
  subsections: { items: DocsItem[]; label: string }[]
}

const gettingStarted: FlatSection = {
  icon: Rocket,
  items: [
    { label: 'Introduction' },
    { label: 'Installation' },
    { label: 'Project Structure' },
    { label: 'Editor Setup' },
    { label: 'Quick Start' }
  ],
  label: 'Getting Started'
}

const foundations: FlatSection = {
  icon: Palette,
  items: [
    { label: 'Design Tokens' },
    { label: 'Colors' },
    { label: 'Typography' },
    { label: 'Spacing' },
    { label: 'Dark Mode' },
    { label: 'Accessibility' }
  ],
  label: 'Foundations'
}

const components: NestedSection = {
  icon: Cube,
  label: 'Components',
  subsections: [
    {
      items: [
        { label: 'Button' },
        { label: 'Button Group' },
        { label: 'Icon Button' },
        { label: 'Link' }
      ],
      label: 'Actions'
    },
    {
      items: [
        { label: 'TextField' },
        { label: 'Select' },
        { badge: 'Beta', label: 'Combobox' },
        { label: 'Checkbox' },
        { label: 'Radio Group' },
        { label: 'Switch' },
        { label: 'Slider' }
      ],
      label: 'Inputs'
    },
    {
      items: [
        { label: 'Avatar' },
        { label: 'Badge' },
        { label: 'Card' },
        { label: 'Chip' },
        { label: 'Skeleton' },
        { label: 'Tag' }
      ],
      label: 'Data Display'
    },
    {
      items: [
        { label: 'Alert' },
        { label: 'Progress' },
        { label: 'Spinner' },
        { badge: 'New', label: 'Toast' }
      ],
      label: 'Feedback'
    },
    {
      items: [
        { label: 'Breadcrumbs' },
        { label: 'Menu' },
        { label: 'Pagination' },
        { label: 'Tabs' }
      ],
      label: 'Navigation'
    },
    {
      items: [
        { label: 'Dialog' },
        { badge: 'Beta', label: 'Drawer' },
        { label: 'Popover' },
        { label: 'Tooltip' }
      ],
      label: 'Overlays'
    }
  ]
}

const hooks: FlatSection = {
  icon: Code,
  items: [
    { label: 'useTheme' },
    { label: 'useDisclosure' },
    { label: 'useMediaQuery' },
    { label: 'useControlledState' },
    { label: 'useInterval' }
  ],
  label: 'Hooks'
}

const guides: FlatSection = {
  icon: Book,
  items: [
    { label: 'Theming' },
    { label: 'Customizing Components' },
    { label: 'Server Components' },
    { label: 'Migrating from v2' },
    { label: 'Testing' }
  ],
  label: 'Guides'
}

const flatSections: FlatSection[] = [gettingStarted, foundations]
const secondaryFlatSections: FlatSection[] = [hooks, guides]

const renderBadge = (badge?: DocsItem['badge']) => {
  if (!badge) return null

  return (
    <Sidebar.MenuChip>
      <Chip
        color={badge === 'New' ? 'success' : 'accent'}
        size="sm"
        variant="soft">
        {badge}
      </Chip>
    </Sidebar.MenuChip>
  )
}

const renderFlatSection = (
  { icon: Icon, items, label }: FlatSection,
  keyPrefix: string
) => (
  <Sidebar.Group key={`${keyPrefix}-${label}`}>
    <Sidebar.GroupLabel className="flex items-center gap-2">
      <Icon className="text-muted size-3.5" />
      {label}
    </Sidebar.GroupLabel>
    <Sidebar.Menu aria-label={label}>
      {items.map(item => (
        <Sidebar.MenuItem
          key={`${keyPrefix}-${label}-${item.label}`}
          href="#"
          id={`${keyPrefix}-${label}-${item.label}`}
          isCurrent={item.label === 'Introduction'}
          textValue={item.label}>
          <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
          {renderBadge(item.badge)}
        </Sidebar.MenuItem>
      ))}
    </Sidebar.Menu>
  </Sidebar.Group>
)

const renderComponentsSection = (keyPrefix: string) => (
  <Sidebar.Group key={`${keyPrefix}-${components.label}`}>
    <Sidebar.GroupLabel className="flex items-center gap-2">
      <components.icon className="text-muted size-3.5" />
      {components.label}
    </Sidebar.GroupLabel>
    <Sidebar.Menu
      aria-label={components.label}
      defaultExpandedKeys={[`${keyPrefix}-Inputs`]}
      showGuideLines="hover">
      {components.subsections.map(subsection => (
        <Sidebar.MenuItem
          key={`${keyPrefix}-${subsection.label}`}
          id={`${keyPrefix}-${subsection.label}`}
          textValue={subsection.label}>
          <Sidebar.MenuLabel>{subsection.label}</Sidebar.MenuLabel>
          <Sidebar.MenuTrigger>
            <Sidebar.MenuIndicator />
          </Sidebar.MenuTrigger>
          <Sidebar.Submenu>
            {subsection.items.map(item => (
              <Sidebar.MenuItem
                key={`${keyPrefix}-${subsection.label}-${item.label}`}
                href="#"
                id={`${keyPrefix}-${subsection.label}-${item.label}`}
                textValue={item.label}>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
                {renderBadge(item.badge)}
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Submenu>
        </Sidebar.MenuItem>
      ))}
    </Sidebar.Menu>
  </Sidebar.Group>
)

const DocsSidebarHeader = () => (
  <div className="flex items-center gap-3 px-1 py-2">
    <BrandLogo />
    <div className="flex flex-col">
      <span className="text-foreground text-sm leading-tight font-semibold">
        HeroUI Docs
      </span>
      <span className="text-muted text-xs leading-tight">v3.0 Beta</span>
    </div>
  </div>
)

const DocsSidebarContent = ({ keyPrefix }: { keyPrefix: string }) => (
  <>
    {flatSections.map(section => renderFlatSection(section, keyPrefix))}
    {renderComponentsSection(keyPrefix)}
    {secondaryFlatSections.map(section =>
      renderFlatSection(section, keyPrefix)
    )}
  </>
)

const DocsSidebarFooter = ({ keyPrefix }: { keyPrefix: string }) => (
  <Sidebar.Menu aria-label="Footer links">
    <Sidebar.MenuItem
      href="#"
      id={`${keyPrefix}-changelog`}
      textValue="Changelog">
      <Sidebar.MenuIcon>
        <SquareArticle className="size-4" />
      </Sidebar.MenuIcon>
      <Sidebar.MenuLabel>Changelog</Sidebar.MenuLabel>
      <Sidebar.MenuChip>
        <Chip color="success" size="sm" variant="soft">
          New
        </Chip>
      </Sidebar.MenuChip>
    </Sidebar.MenuItem>
    <Sidebar.MenuItem href="#" id={`${keyPrefix}-github`} textValue="GitHub">
      <Sidebar.MenuIcon>
        <LogoGithub className="size-4" />
      </Sidebar.MenuIcon>
      <Sidebar.MenuLabel>GitHub</Sidebar.MenuLabel>
    </Sidebar.MenuItem>
    <Sidebar.MenuItem
      href="#"
      id={`${keyPrefix}-help`}
      textValue="Help & Support">
      <Sidebar.MenuIcon>
        <LifeRing className="size-4" />
      </Sidebar.MenuIcon>
      <Sidebar.MenuLabel>Help & Support</Sidebar.MenuLabel>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
)

function DocsSidebar() {
  return (
    <>
      <Sidebar>
        <Sidebar.Header>
          <DocsSidebarHeader />
        </Sidebar.Header>
        <Sidebar.Content>
          <DocsSidebarContent keyPrefix="desktop" />
        </Sidebar.Content>
        <Sidebar.Footer>
          <DocsSidebarFooter keyPrefix="desktop" />
        </Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar>
      <Sidebar.Mobile>
        <Sidebar.Header>
          <DocsSidebarHeader />
        </Sidebar.Header>
        <Sidebar.Content>
          <DocsSidebarContent keyPrefix="mobile" />
        </Sidebar.Content>
        <Sidebar.Footer>
          <DocsSidebarFooter keyPrefix="mobile" />
        </Sidebar.Footer>
      </Sidebar.Mobile>
    </>
  )
}

function DocsNavbar() {
  const [theme, setTheme] = useState<string>('system')

  return (
    <Navbar maxWidth="full">
      <Navbar.Header>
        <AppLayout.MenuToggle />
        <Sidebar.Trigger />
        <Navbar.Spacer />
        <SearchField
          aria-label="Search documentation"
          className="w-[200px]"
          variant="secondary">
          <SearchField.Group className="h-8">
            <SearchField.SearchIcon />
            <SearchField.Input className="w-16" placeholder="Search docs…" />
            <Kbd className="pointer-events-none mr-1.5 text-xs">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>K</Kbd.Content>
            </Kbd>
          </SearchField.Group>
        </SearchField>
        <Navbar.Spacer />
        <Navbar.Content>
          <Segment
            className="gap-0"
            selectedKey={theme}
            size="sm"
            onSelectionChange={key => setTheme(key as string)}>
            <Segment.Item
              aria-label="Light"
              className="size-[28px] px-0"
              id="light">
              <Sun className="size-3.5" />
            </Segment.Item>
            <Segment.Item
              aria-label="Dark"
              className="size-[28px] px-0"
              id="dark">
              <Moon className="size-3.5" />
            </Segment.Item>
            <Segment.Item
              aria-label="System"
              className="size-[28px] px-0"
              id="system">
              <Display className="size-3.5" />
            </Segment.Item>
          </Segment>
        </Navbar.Content>
      </Navbar.Header>
    </Navbar>
  )
}
