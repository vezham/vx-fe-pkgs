import { useAuthPlugin } from '@vezham/auth-ui-react'
import { Monitor as Display, Moon, Palette, Sun } from '@vezham/icons-react'
import { Dropdown, Label, Tabs } from '@vezham/react-v3'

import { themePluginBase } from '../../lib/theme-plugin-base'

const ACTIVE_TAB_SELECTOR = '[role="tab"][aria-selected="true"]'

/**
 * Theme toggle dropdown item used inside `UserButton`. Callers are responsible
 * for ensuring theming is configured before rendering this component.
 */
export const ThemeToggleItem = () => {
  const { useTheme, localization } = useAuthPlugin(themePluginBase)
  const { theme, setTheme, themes = [] } = useTheme()

  // vx-bot/NOTE: The Tabs aren't part of the menu's keyboard-navigation list, so arrow-key
  // vx-bot/NOTE: nav can't reach them on its own. When the wrapper menu item receives focus
  // vx-bot/NOTE: we delegate focus to the active Tab so the user can switch themes with the
  // vx-bot/NOTE: Left/Right arrows. React's synthetic `onFocus` bubbles (it's wired to
  // vx-bot/NOTE: `focusin`), so we must guard against child-originated events: without the
  // vx-bot/NOTE: `target === currentTarget` check, an arrow-key focus move between tabs
  // vx-bot/NOTE: bubbles up here and the still-stale `aria-selected="true"` lookup yanks
  // vx-bot/NOTE: focus back to the previously selected tab.
  const focusActiveTab = (event: React.FocusEvent) => {
    if (event.target !== event.currentTarget) return
    const activeTab =
      event.currentTarget.querySelector<HTMLElement>(ACTIVE_TAB_SELECTOR)
    activeTab?.focus({ preventScroll: true })
  }

  // vx-bot/NOTE: Up/Down on a Tab escapes back to the previous/next sibling menu item so
  // vx-bot/NOTE: users can keep navigating the menu with the arrow keys after they've
  // vx-bot/NOTE: entered the Tabs.
  const handleTabsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return

    const target = event.target
    if (
      !(target instanceof HTMLElement) ||
      target.getAttribute('role') !== 'tab'
    )
      return

    const wrapper = target.closest<HTMLElement>('[role="menuitem"]')
    const menu = wrapper?.closest<HTMLElement>('[role="menu"]')
    if (!wrapper || !menu) return

    const items = Array.from(
      menu.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([data-disabled])'
      )
    )
    const currentIndex = items.indexOf(wrapper)
    if (currentIndex === -1) return
    const nextIndex =
      event.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1
    const next = items[nextIndex]
    if (!next) return

    event.preventDefault()
    next.focus()
  }

  return (
    <Dropdown.Item
      className="py-1 pe-2"
      onFocus={focusActiveTab}
      // vx-bot/NOTE: Without `shouldCloseOnSelect={false}` the menu auto-closes after the
      // vx-bot/NOTE: user changes themes, because clicking on a Tab bubbles up as a
      // vx-bot/NOTE: menu-item activation.
      shouldCloseOnSelect={false}>
      <Palette size={16} className="text-muted" />
      <Label>{localization.theme}</Label>

      <Tabs
        className="ml-auto"
        selectedKey={theme}
        onSelectionChange={key => setTheme(String(key))}>
        <Tabs.ListContainer onKeyDown={handleTabsKeyDown}>
          <Tabs.List
            aria-label={localization.theme}
            className="*:h-5 *:w-5 *:p-0">
            {themes.includes('system') && (
              <Tabs.Tab id="system" aria-label={localization.system}>
                <Display size={16} className="size-3" />

                <Tabs.Indicator />
              </Tabs.Tab>
            )}

            {themes.includes('light') && (
              <Tabs.Tab id="light" aria-label={localization.light}>
                <Sun size={16} className="size-3" />

                <Tabs.Indicator />
              </Tabs.Tab>
            )}

            {themes.includes('dark') && (
              <Tabs.Tab id="dark" aria-label={localization.dark}>
                <Moon size={16} className="size-3" />

                <Tabs.Indicator />
              </Tabs.Tab>
            )}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </Dropdown.Item>
  )
}
