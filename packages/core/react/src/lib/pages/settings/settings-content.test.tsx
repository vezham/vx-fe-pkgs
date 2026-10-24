import { act, fireEvent, render, screen } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, expect, it, vi } from 'vitest'

import { getWidgetSize } from '../../components/panel/footer/notification-center/widget-tiles'
import { UserProvider } from '../../store/users/useUserStore'
import { SettingsContent } from './settings-content'
import { TileGallery } from './tile-gallery'

afterEach(() => {
  localStorage.removeItem('demo:notification-settings')
  document.documentElement.classList.remove('dark')
  document.documentElement.removeAttribute('data-theme-mode')
})

it('uses the saved widget size in the notification center preview', () => {
  expect(
    getWidgetSize({
      id: 'calendar',
      label: 'Calendar',
      category: 'Calendar',
      size: 'small',
      span: 'large'
    })
  ).toBe('large')
})

it('hydrates saved notification preferences without changing the initial server markup', async () => {
  localStorage.setItem(
    'demo:notification-settings',
    JSON.stringify({ sounds: false, badges: true })
  )
  const element = (
    <UserProvider>
      <SettingsContent active="Notifications" />
    </UserProvider>
  )
  const container = document.createElement('div')
  container.innerHTML = renderToString(element)
  document.body.append(container)
  const onRecoverableError = vi.fn()
  let root: ReturnType<typeof hydrateRoot> | undefined
  try {
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(
      screen.getByRole('switch', { name: 'Notification sounds' })
    ).not.toBeChecked()
    expect(
      screen.getByRole('switch', { name: 'Notification badges' })
    ).toBeChecked()
    fireEvent.click(screen.getByRole('switch', { name: 'Notification sounds' }))
    const preferences = localStorage.getItem('demo:notification-settings')
    if (preferences === null)
      throw new Error('Notification preferences were not saved')
    expect(JSON.parse(preferences)).toEqual({ sounds: true, badges: true })
  } finally {
    await act(async () => root?.unmount())
    container.remove()
  }
})

it('drops a hidden gallery tile into empty preview space without requiring an existing drop target', () => {
  const onPlace = vi.fn()
  const tiles = [
    {
      id: 'first',
      label: 'First',
      category: 'General',
      shape: 'small' as const
    },
    {
      id: 'second',
      label: 'Second',
      category: 'General',
      shape: 'small' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Widgets"
      kind="widgets"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: tiles.map(tile => ({
          id: tile.id,
          label: tile.label,
          visible: tile.id === 'first',
          editable: true
        })),
        onPlace,
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )
  fireEvent.drop(
    screen.getByRole('complementary', {
      name: 'Current widgets',
      hidden: true
    }),
    {
      dataTransfer: { getData: () => 'second' }
    }
  )
  expect(onPlace).toHaveBeenCalledWith('second', undefined)
})

it('offers each widget size once and adds the selected size', () => {
  const onAdd = vi.fn()
  render(
    <TileGallery
      title="Edit Widgets"
      kind="widgets"
      tiles={[
        {
          id: 'calendar',
          label: 'Calendar',
          category: 'Calendar',
          shape: 'small',
          suggestionGroup: 'Calendar',
          suggestionShapes: ['small', 'medium', 'large'] as const,
          suggestionPreview: size => <div data-preview-size={size} />
        }
      ]}
      onDone={vi.fn()}
      editor={{
        items: [
          { id: 'calendar', label: 'Calendar', visible: false, editable: true }
        ],
        onAdd,
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(screen.getByRole('heading', { name: 'Calendar' })).toBeTruthy()
  expect(document.querySelectorAll('[data-gallery-tile]')).toHaveLength(3)
  expect(
    document.querySelector('[data-gallery-tile="calendar:small"]')
  ).toHaveClass('w-24')
  expect(
    document.querySelector('[data-gallery-tile="calendar:medium"]')
  ).toHaveClass('w-full', 'max-w-[200px]')
  expect(
    document.querySelector('[data-gallery-tile="calendar:large"]')
  ).toHaveClass('w-full', 'max-w-[252px]')

  fireEvent.click(
    screen.getByRole('button', { name: 'Quick add Calendar (large)' })
  )
  expect(onAdd).toHaveBeenCalledWith('calendar', 'large')
})

it('adds a hidden control from its hover quick-add action', () => {
  const onVisibilityChange = vi.fn()
  const tiles = [
    {
      id: 'first',
      label: 'First',
      category: 'General',
      shape: 'compact' as const
    },
    {
      id: 'second',
      label: 'Second',
      category: 'General',
      shape: 'compact' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: tiles.map(tile => ({
          id: tile.id,
          label: tile.label,
          visible: tile.id === 'first',
          editable: true
        })),
        onVisibilityChange,
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  fireEvent.click(screen.getByRole('button', { name: 'Quick add Second' }))
  expect(onVisibilityChange).toHaveBeenCalledWith('second', true)
})

it('keeps suggestions stable while the preview reflects control order', () => {
  const tiles = [
    {
      id: 'appearance',
      label: 'Appearance',
      category: 'Appearance',
      shape: 'compact' as const
    },
    {
      id: 'theme',
      label: 'Theme',
      category: 'Appearance',
      shape: 'wide' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [
          { id: 'theme', label: 'Theme', visible: true, editable: true },
          {
            id: 'appearance',
            label: 'Appearance',
            visible: true,
            editable: true
          }
        ],
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(
    Array.from(document.querySelectorAll('[data-gallery-tile]')).map(tile =>
      tile.getAttribute('data-gallery-tile')
    )
  ).toEqual(['appearance', 'theme'])
  expect(
    Array.from(document.querySelectorAll('[data-preview-tile]')).map(tile =>
      tile.getAttribute('data-preview-tile')
    )
  ).toEqual(['theme', 'appearance'])
  expect(document.querySelector('[data-gallery-tile="appearance"]')).toHaveClass(
    'opacity-50'
  )
  expect(document.querySelector('[data-gallery-tile="appearance"]')).toHaveAttribute(
    'data-added',
    'true'
  )
})

it('adds a control suggestion with its selected size', () => {
  const onPlace = vi.fn()
  const tiles = [
    {
      id: 'appearance',
      label: 'Appearance',
      category: 'Appearance',
      shape: 'compact' as const,
      suggestionGroup: 'Appearance',
      suggestionShapes: ['compact', 'wide', 'full'] as const
    },
    {
      id: 'appearance-copy',
      label: 'Appearance',
      category: 'Appearance',
      shape: 'compact' as const,
      suggestionGroup: 'Appearance',
      suggestionShapes: ['compact', 'wide', 'full'] as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [
          {
            id: 'appearance',
            label: 'Appearance',
            visible: false,
            editable: true
          },
          {
            id: 'appearance-copy',
            label: 'Appearance',
            visible: false,
            editable: true
          }
        ],
        onPlace,
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(document.querySelectorAll('[data-gallery-tile]')).toHaveLength(3)
  expect(screen.getAllByRole('heading', { name: 'Appearance' })).toHaveLength(1)
  fireEvent.click(
    screen.getByRole('button', { name: 'Quick add Appearance (wide)' })
  )
  expect(onPlace).toHaveBeenCalledWith('appearance', undefined, 'wide')
})

it('offers medium and large content control suggestions', () => {
  const onPlace = vi.fn()
  const tiles = [
    {
      id: 'display',
      label: 'Display',
      category: 'Display & Brightness',
      shape: 'full' as const,
      suggestionGroup: 'Display',
      suggestionShapes: ['wide', 'full'] as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [
          { id: 'display', label: 'Display', visible: false, editable: true }
        ],
        onPlace,
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(document.querySelectorAll('[data-gallery-tile]')).toHaveLength(2)
  expect(
    document.querySelector('[data-gallery-tile="display:wide"]')
  ).toHaveClass('w-full', 'max-w-[200px]')
  expect(
    document.querySelector('[data-gallery-tile="display:full"]')
  ).toHaveClass('w-full', 'max-w-[252px]')
  fireEvent.click(
    screen.getByRole('button', { name: 'Quick add Display (wide)' })
  )
  expect(onPlace).toHaveBeenCalledWith('display', undefined, 'wide')
})

it('opens the mobile category menu from the gallery', () => {
  const tiles = [
    {
      id: 'first',
      label: 'First',
      category: 'General',
      shape: 'compact' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [{ id: 'first', label: 'First', visible: true, editable: true }],
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  const showMenu = screen.getByRole('button', { name: 'Show menu' })
  expect(showMenu).toHaveAttribute('aria-expanded', 'false')
  fireEvent.click(showMenu)
  expect(showMenu).toHaveAttribute('aria-expanded', 'true')
})

it('shows matching category navigation for global search results', () => {
  const tiles = [
    {
      id: 'theme',
      label: 'Theme',
      category: 'Appearance',
      shape: 'compact' as const
    },
    {
      id: 'sound',
      label: 'Sound',
      category: 'Sound & Media',
      shape: 'compact' as const
    },
    {
      id: 'media',
      label: 'Media',
      category: 'Sound & Media',
      shape: 'compact' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: tiles.map(tile => ({
          id: tile.id,
          label: tile.label,
          visible: true,
          editable: true
        })),
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  fireEvent.click(screen.getByRole('button', { name: 'Appearance' }))
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search controls' }), {
    target: { value: 'sound' }
  })

  expect(screen.getByRole('heading', { name: 'Search results' })).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Sound & Media' })).toBeTruthy()
  expect(screen.getByText('Sound')).toBeTruthy()
  expect(screen.getByText('Media')).toBeTruthy()
  expect(screen.queryByText('Theme')).toBeNull()

  fireEvent.click(screen.getByRole('button', { name: 'Clear controls search' }))

  expect(screen.getByRole('heading', { name: 'Suggestions' })).toBeTruthy()
  expect(screen.getByText('Theme')).toBeTruthy()
})

it('removes a preview control from its hover remove action', () => {
  const onVisibilityChange = vi.fn()
  const tiles = [
    {
      id: 'first',
      label: 'First',
      category: 'General',
      shape: 'compact' as const
    }
  ]
  render(
    <TileGallery
      title="Edit Controls"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [{ id: 'first', label: 'First', visible: true, editable: true }],
        onVisibilityChange,
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  fireEvent.click(screen.getByRole('button', { name: 'Remove First' }))
  expect(onVisibilityChange).toHaveBeenCalledWith('first', false)
})
