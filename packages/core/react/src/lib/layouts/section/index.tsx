import { useHotkey } from '@tanstack/react-hotkeys'
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'

import { Drawer, Surface, useMediaQuery } from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { useMobileControls } from '../../components/mobile-controls'
import { ShortcutButton } from '../../components/shortcut-key'
import {
  useSidebarShortcut,
  useWorkspaceNavigation
} from '../../components/workspace-navigation'
import { type AppNavigationItem, getSelectedMenuKey } from '../../navigation'
import { useSectionPreferences } from './preferences'
import { SectionSidebar } from './sidebar'
import { useSectionSidebarState } from './sidebar-state'
import type { SectionSort } from './sort-menu'
import { SectionTabNavigation } from './tab-navigation'
import {
  type SectionAction,
  SectionActiveFilters,
  type SectionFilterKey,
  type SectionSearch,
  SectionToolbar,
  type SectionViewAction,
  type SectionViewMode
} from './toolbar'
import {
  SectionToolbarContentProvider,
  useRegisteredSectionToolbarContent
} from './toolbar-content'

export type SectionLayoutProps = {
  title: string
  sectionKey?: string
  navigationLabel?: string
  sidebarItems?: AppNavigationItem[]
  tabs: AppNavigationItem[]
  toolbar?: ReactNode
  search?: SectionSearch
  sync?: boolean
  filter?: boolean
  sort?: boolean
  onSortChange?: (value: SectionSort) => void
  view?: SectionViewAction[]
  onSync?: () => void
  menuActions?: SectionAction[]
  primaryAction?: SectionAction
  children: ReactNode
}

const EMPTY_SIDEBAR_ITEMS: AppNavigationItem[] = []
const EMPTY_MENU_ACTIONS: SectionAction[] = []
const EMPTY_VIEW_ACTIONS: SectionViewAction[] = []

const matchesPath = (pathname: string, href?: string) =>
  Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)))

const SectionBody = ({
  hasSidebar,
  isNavigationCollapsed,
  sidebarId,
  sidebar,
  filter,
  selectedFilters,
  setSelectedFilters,
  panelId,
  selectedTab,
  children
}: {
  hasSidebar: boolean
  isNavigationCollapsed: boolean
  sidebarId: string
  sidebar: ReactNode
  filter: boolean
  selectedFilters: SectionFilterKey[]
  setSelectedFilters: (filters: SectionFilterKey[]) => void
  panelId: string
  selectedTab?: AppNavigationItem
  children: ReactNode
}) => (
  <div className="order-1 flex min-h-0 min-w-0 flex-1">
    {hasSidebar && !isNavigationCollapsed && (
      <aside
        id={sidebarId}
        className="hidden w-56 shrink-0 overflow-y-auto md:block">
        {sidebar}
      </aside>
    )}
    <main
      className={`flex min-w-0 flex-1 flex-col gap-2 overflow-auto p-4 ${
        filter && selectedFilters.length > 0 ? 'pt-2' : ''
      }`}>
      {filter && (
        <SectionActiveFilters
          selectedFilters={selectedFilters}
          onSelectedFiltersChange={setSelectedFilters}
        />
      )}
      <Surface className="relative flex min-h-0 flex-1 flex-col rounded-lg p-4 sm:p-5">
        <div
          id={panelId}
          role={selectedTab ? 'tabpanel' : undefined}
          aria-label={selectedTab?.title}
          tabIndex={selectedTab ? 0 : undefined}
          className="m-0 flex min-h-0 flex-1 flex-col p-0">
          {children}
        </div>
      </Surface>
    </main>
  </div>
)

const SectionNavigationControls = ({
  isNavigationCollapsed,
  sidebarId,
  toggleNavigation
}: {
  isNavigationCollapsed: boolean
  sidebarId: string
  toggleNavigation: () => void
}) => {
  const router = useRouter()
  return (
    <>
      {!isNavigationCollapsed && (
        <ShortcutButton
          className="h-9 w-9 min-w-9 p-0"
          label="Hide Sidebar"
          shortcut="⌘ S"
          aria-keyshortcuts="Meta+S"
          aria-controls={sidebarId}
          aria-expanded
          onPress={toggleNavigation}>
          <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
        </ShortcutButton>
      )}
      <ShortcutButton
        className="hidden h-9 w-9 min-w-9 p-0 lg:inline-flex"
        label="Back"
        shortcut="⌘ ←"
        aria-keyshortcuts="Meta+ArrowLeft"
        onPress={() => router.history.back()}>
        <AppIcon icon="vx:arrow-left" size={18} aria-hidden="true" />
      </ShortcutButton>
      <ShortcutButton
        className="hidden h-9 w-9 min-w-9 p-0 lg:inline-flex"
        label="Forward"
        shortcut="⌘ →"
        aria-keyshortcuts="Meta+ArrowRight"
        onPress={() => router.history.forward()}>
        <AppIcon icon="vx:arrow-right" size={18} aria-hidden="true" />
      </ShortcutButton>
    </>
  )
}

const getSectionTabs = (
  pathname: string,
  sidebarItems: AppNavigationItem[],
  tabs: AppNavigationItem[]
) => {
  const displayTabs = sidebarItems.some(
    item =>
      item.childrenDisplay === 'sidebar' && getSelectedMenuKey(pathname, [item])
  )
    ? []
    : tabs
  const selectedTab =
    displayTabs.find(tab => matchesPath(pathname, tab.href)) ?? displayTabs[0]
  return { displayTabs, selectedTab }
}

const useSectionNavigation = (
  sidebarItems: AppNavigationItem[],
  sync: boolean,
  onSync?: () => void
) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const router = useRouter()
  const { isNavigationCollapsed, toggleNavigation, registerMobileSidebar } =
    useWorkspaceNavigation()
  const {
    expandedKeys: expandedSidebarKeys,
    setExpandedKeys: setExpandedSidebarKeys
  } = useSectionSidebarState(sidebarItems, pathname)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const hasSidebar = sidebarItems.length > 0
  const toggleMobileSidebar = useCallback(
    () => setIsDrawerOpen(open => !open),
    []
  )
  useEffect(() => {
    if (hasSidebar) {
      return registerMobileSidebar({
        isOpen: isDrawerOpen,
        onToggle: toggleMobileSidebar
      })
    }
    return undefined
  }, [hasSidebar, isDrawerOpen, registerMobileSidebar, toggleMobileSidebar])
  const sidebarId = useId()
  const toggleSidebar = () => {
    if (hasSidebar && !window.matchMedia('(min-width: 768px)').matches) {
      toggleMobileSidebar()
    } else {
      toggleNavigation()
    }
  }
  useSidebarShortcut(toggleSidebar)
  useHotkey('Meta+ArrowLeft', () => router.history.back())
  useHotkey('Meta+ArrowRight', () => router.history.forward())
  useHotkey(
    'Meta+R',
    () => {
      onSync?.()
    },
    { enabled: sync && Boolean(onSync) }
  )
  return {
    pathname,
    navigate,
    isNavigationCollapsed,
    toggleNavigation,
    expandedSidebarKeys,
    setExpandedSidebarKeys,
    isDrawerOpen,
    setIsDrawerOpen,
    hasSidebar,
    sidebarId
  }
}

const getStateScope = (
  sectionKey: string | undefined,
  pathname: string,
  sidebarItems: AppNavigationItem[],
  tabs: AppNavigationItem[],
  title: string
) =>
  sectionKey ??
  getSelectedMenuKey(pathname, sidebarItems) ??
  (tabs.length > 0 ? JSON.stringify(tabs.map(tab => tab.key)) : title)

type SectionNavigation = ReturnType<typeof useSectionNavigation>

const SectionDrawer = ({
  title,
  navigation,
  children
}: {
  title: string
  navigation: SectionNavigation
  children: ReactNode
}) => {
  if (!navigation.hasSidebar) return null
  return (
    <Drawer.Backdrop
      isOpen={navigation.isDrawerOpen}
      onOpenChange={navigation.setIsDrawerOpen}>
      <Drawer.Content placement="left">
        <Drawer.Dialog className="bg-background w-[min(20rem,calc(100vw-2rem))]">
          <Drawer.Header>
            <Drawer.Heading>{title}</Drawer.Heading>
            <Drawer.CloseTrigger aria-label="Hide Sidebar" />
          </Drawer.Header>
          <Drawer.Body>{children}</Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

const useSectionSearch = (search?: SectionSearch) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, onOpenChange] = useState(false)
  return search ? { ...search, inputRef, isOpen, onOpenChange } : undefined
}

const SectionLayoutToolbar = ({
  options,
  navigation,
  preferences,
  displayTabs,
  selectedTab,
  onPanelIdChange,
  onTabChange,
  isCompactToolbar,
  hideCompactControls
}: {
  options: SectionLayoutProps
  navigation: SectionNavigation
  preferences: ReturnType<typeof useSectionPreferences>
  displayTabs: AppNavigationItem[]
  selectedTab?: AppNavigationItem
  onPanelIdChange: (id: string) => void
  onTabChange: (key: string) => void
  isCompactToolbar: boolean
  hideCompactControls: boolean
}) => {
  const {
    title,
    toolbar,
    search,
    sync = true,
    filter = false,
    sort = false,
    view = EMPTY_VIEW_ACTIONS,
    onSync,
    menuActions = EMPTY_MENU_ACTIONS,
    primaryAction
  } = options
  const { selectedFilters, setSelectedFilters, sortValue, handleSortChange } =
    preferences
  const registeredToolbarContent = useRegisteredSectionToolbarContent()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState<SectionViewMode>('grid')
  const toolbarSearch = useSectionSearch(search)
  const handleSync = useCallback(() => onSync?.(), [onSync])
  return (
    <SectionToolbar
      title={title}
      isNavigationCollapsed={navigation.isNavigationCollapsed}
      sync={sync}
      filter={filter}
      sort={sort}
      sortValue={sortValue}
      onSortChange={handleSortChange}
      view={view}
      selectedFilters={selectedFilters}
      onSelectedFiltersChange={setSelectedFilters}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      tabs={isCompactToolbar ? [] : displayTabs}
      selectedTabKey={selectedTab?.key}
      onPanelIdChange={onPanelIdChange}
      onTabChange={onTabChange}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      search={toolbarSearch}
      menuActions={menuActions}
      primaryAction={hideCompactControls ? undefined : primaryAction}
      toolbar={
        <>
          {toolbar}
          {registeredToolbarContent.desktop}
        </>
      }
      mobileToolbar={registeredToolbarContent.mobile}
      onSync={handleSync}
      navigationControls={
        <SectionNavigationControls
          isNavigationCollapsed={navigation.isNavigationCollapsed}
          sidebarId={navigation.sidebarId}
          toggleNavigation={navigation.toggleNavigation}
        />
      }
    />
  )
}

const SectionLayoutContent = (props: SectionLayoutProps) => {
  const {
    title,
    sectionKey,
    navigationLabel = `${title} sections`,
    sidebarItems = EMPTY_SIDEBAR_ITEMS,
    tabs,
    search,
    filter = false,
    onSortChange,
    primaryAction,
    children
  } = props
  const navigation = useSectionNavigation(
    sidebarItems,
    props.sync ?? true,
    props.onSync
  )
  const { isFooterHidden } = useMobileControls()
  const isCompactToolbar = useMediaQuery('(max-width: 767px)')
  const shouldHideCompactControls = isCompactToolbar && isFooterHidden
  const stateScope = getStateScope(
    sectionKey,
    navigation.pathname,
    sidebarItems,
    tabs,
    title
  )
  const preferences = useSectionPreferences(stateScope, onSortChange)
  const { displayTabs, selectedTab } = getSectionTabs(
    navigation.pathname,
    sidebarItems,
    tabs
  )
  const fallbackPanelId = useId()
  const [panelId, setPanelId] = useState(fallbackPanelId)
  const handleTabChange = useCallback(
    (key: string) => {
      const tab = displayTabs.find(item => item.key === String(key))
      if (tab?.href) void navigation.navigate({ to: tab.href })
    },
    [displayTabs, navigation]
  )
  const sidebar = (
    <SectionSidebar
      items={sidebarItems}
      pathname={navigation.pathname}
      label={navigationLabel}
      expandedKeys={navigation.expandedSidebarKeys}
      onExpandedChange={navigation.setExpandedSidebarKeys}
      onNavigate={() => navigation.setIsDrawerOpen(false)}
    />
  )

  const content = (
    <>
      <SectionLayoutToolbar
        options={props}
        navigation={navigation}
        preferences={preferences}
        displayTabs={displayTabs}
        selectedTab={selectedTab}
        onPanelIdChange={setPanelId}
        onTabChange={handleTabChange}
        isCompactToolbar={isCompactToolbar}
        hideCompactControls={shouldHideCompactControls}
      />
      {isCompactToolbar && !shouldHideCompactControls && (
        <SectionTabNavigation
          title={title}
          tabs={displayTabs}
          selectedTabKey={selectedTab?.key}
          onPanelIdChange={setPanelId}
          onTabChange={handleTabChange}
          className={`order-2 mb-3 w-fit min-w-0 self-center ${
            search && primaryAction
              ? 'max-w-[calc(100%-9rem)]'
              : 'max-w-[calc(100%-1.5rem)]'
          }`}
        />
      )}
      <SectionBody
        hasSidebar={navigation.hasSidebar}
        isNavigationCollapsed={navigation.isNavigationCollapsed}
        sidebarId={navigation.sidebarId}
        sidebar={sidebar}
        filter={filter}
        selectedFilters={preferences.selectedFilters}
        setSelectedFilters={preferences.setSelectedFilters}
        panelId={panelId}
        selectedTab={selectedTab}>
        {children}
      </SectionBody>
    </>
  )

  return (
    <div className="bg-background flex h-full min-h-0 min-w-0 flex-1 flex-col">
      {content}
      <SectionDrawer title={title} navigation={navigation}>
        {sidebar}
      </SectionDrawer>
    </div>
  )
}

const SectionLayout = (props: SectionLayoutProps) => (
  <SectionToolbarContentProvider>
    <SectionLayoutContent {...props} />
  </SectionToolbarContentProvider>
)

export type {
  SectionAction,
  SectionFilterKey,
  SectionSearch,
  SectionViewAction,
  SectionViewMode
} from './toolbar'
export { SectionLayout }
export { useSectionToolbarContent } from './toolbar-content'
export { useMobileToolbarNavigation } from './toolbar-more-sheet'

export type { SectionSort } from './sort-menu'
