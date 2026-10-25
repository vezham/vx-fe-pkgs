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
      description: 'See your upcoming events.',
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

it('accepts drops in the preview without showing a drop prompt', () => {
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
      title="Widget Center"
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
  expect(screen.getByRole('button', { name: 'Remove First' })).toHaveClass(
    'opacity-0',
    'group-hover:opacity-100',
    'group-focus-within:opacity-100'
  )
  const dataTransfer = {
    effectAllowed: '',
    setData: vi.fn(),
    getData: (type: string) =>
      type === 'application/x-vx-settings-tile' ? 'second' : ''
  }
  const suggestion = document.querySelector('[data-gallery-tile="second"]')
  if (suggestion === null) throw new Error('Second suggestion was not found')
  fireEvent.dragStart(suggestion, { dataTransfer })
  expect(screen.queryByText('Drop anywhere in preview')).toBeNull()
  fireEvent.drop(
    document.querySelector('[data-preview-drop-area]') as Element,
    { dataTransfer }
  )
  expect(onPlace).toHaveBeenCalledWith('second', undefined)
})

it('drops a small widget into the empty cell beside another small widget', () => {
  const onPlace = vi.fn()
  const tiles = [
    {
      id: 'calendar',
      label: 'Calendar',
      category: 'Calendar',
      shape: 'small' as const
    },
    {
      id: 'reminders',
      label: 'Reminders',
      category: 'Reminders',
      shape: 'medium' as const
    },
    {
      id: 'clock',
      label: 'World Clock',
      category: 'Clock',
      shape: 'small' as const
    }
  ]
  render(
    <TileGallery
      title="Widget Center"
      kind="widgets"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: tiles.map(tile => ({
          id: tile.id,
          label: tile.label,
          visible: tile.id !== 'clock',
          editable: true
        })),
        onPlace,
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )
  const dataTransfer = {
    effectAllowed: '',
    setData: vi.fn(),
    getData: (type: string) =>
      type === 'application/x-vx-settings-tile' ? 'clock' : ''
  }
  const suggestion = document.querySelector('[data-gallery-tile="clock"]')
  if (suggestion === null) throw new Error('Clock suggestion was not found')
  fireEvent.dragStart(suggestion, { dataTransfer })

  const emptySlot = document.querySelector(
    '[data-preview-empty-slot="calendar"]'
  )
  expect(emptySlot).toHaveClass('aspect-square')
  expect(emptySlot).not.toHaveTextContent('Drop here')
  fireEvent.drop(emptySlot as Element, { dataTransfer })

  expect(onPlace).toHaveBeenCalledWith('clock', 'reminders')
})

it('offers each widget size once and adds the selected size', () => {
  const onAdd = vi.fn()
  render(
    <TileGallery
      title="Widget Center"
      kind="widgets"
      tiles={[
        {
          id: 'calendar',
          label: 'Calendar',
          description: 'See your upcoming events.',
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
  expect(screen.getAllByText('See your upcoming events.')).toHaveLength(3)
  expect(
    document.querySelector('[data-gallery-tile="calendar:small"]')
  ).toHaveClass(
    'w-[7.375rem]',
    'grid',
    'h-full',
    'self-stretch',
    'grid-rows-[minmax(0,1fr)_auto]'
  )
  expect(
    document.querySelector('[data-gallery-tile="calendar:small"] [inert]')
  ).toHaveClass('h-full')
  expect(
    document.querySelector('[data-gallery-tile="calendar:medium"]')
  ).toHaveClass('w-[15.75rem]', 'max-w-full')
  expect(
    document.querySelector('[data-gallery-tile="calendar:large"]')
  ).toHaveClass('w-[15.75rem]', 'max-w-full')

  fireEvent.click(
    screen.getByRole('button', { name: 'Quick add Calendar (large)' })
  )
  expect(onAdd).toHaveBeenCalledWith('calendar', 'large')
})

it('uses the Notification Center grid for suggestion and preview widget sizes', () => {
  const tiles = [
    {
      id: 'weather',
      label: 'Weather',
      category: 'Weather',
      shape: 'medium' as const,
      suggestionGroup: 'Weather',
      suggestionShapes: ['small', 'medium', 'large'] as const,
      suggestionPreview: (size: string) => <div data-preview-size={size} />
    }
  ]
  render(
    <TileGallery
      title="Widget Center"
      kind="widgets"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [
          { id: 'weather', label: 'Weather', visible: true, editable: true }
        ],
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(
    document.querySelector('[data-gallery-tile="weather:small"]')
  ).toHaveClass('w-[7.375rem]')
  expect(
    document.querySelector('[data-gallery-tile="weather:medium"]')
  ).toHaveClass('w-[15.75rem]', 'max-w-full')
  expect(
    document.querySelector('[data-gallery-tile="weather:large"]')
  ).toHaveClass('w-[15.75rem]', 'max-w-full')
  expect(document.querySelector('[data-preview-tile="weather"]')).toHaveClass(
    'col-span-2'
  )
  expect(
    document.querySelector('[data-preview-tile="weather"]')?.parentElement
  ).toHaveClass('auto-rows-[calc((100cqw-1rem)/2)]', 'grid-cols-2', 'gap-4')
  expect(
    document.querySelector('[data-preview-tile="weather"]')?.parentElement
      ?.parentElement
  ).toHaveClass('max-w-[260px]', 'p-1')
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
      title="Control Center"
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
      title="Control Center"
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
  expect(
    document.querySelector('[data-gallery-tile="appearance"]')
  ).toHaveClass('opacity-50')
  expect(
    document.querySelector('[data-gallery-tile="appearance"]')
  ).toHaveAttribute('data-added', 'true')
})

it('uses the Control Center grid for suggestion and preview control sizes', () => {
  const tiles = [
    {
      id: 'bluetooth',
      label: 'Bluetooth',
      category: 'Connectivity',
      shape: 'wide' as const,
      suggestionGroup: 'Bluetooth',
      suggestionShapes: ['wide', 'full'] as const,
      suggestionPreview: (span: string) => <button data-preview-span={span} />
    }
  ]
  render(
    <TileGallery
      title="Control Center"
      kind="controls"
      tiles={tiles}
      onDone={vi.fn()}
      editor={{
        items: [
          { id: 'bluetooth', label: 'Bluetooth', visible: true, editable: true }
        ],
        onVisibilityChange: vi.fn(),
        onMove: vi.fn(),
        onReset: vi.fn()
      }}
    />
  )

  expect(
    document.querySelector('[data-gallery-tile="bluetooth:wide"]')
  ).toHaveClass('w-full', 'max-w-[12.125rem]')
  expect(
    document.querySelector('[data-gallery-tile="bluetooth:full"]')
  ).toHaveClass('w-[17rem]')
  expect(document.querySelector('[data-preview-tile="bluetooth"]')).toHaveClass(
    'col-span-2',
    'min-[420px]:col-span-3'
  )
  expect(
    document.querySelector('[data-preview-tile="bluetooth"]')?.parentElement
  ).toHaveClass('gap-x-2', 'gap-y-3', 'sm:grid-cols-4')
  expect(
    document.querySelector('[data-preview-tile="bluetooth"]')?.parentElement
      ?.parentElement
  ).toHaveClass('max-w-72')
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
      title="Control Center"
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
      title="Control Center"
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
  ).toHaveClass('w-full', 'max-w-[12.125rem]')
  expect(
    document.querySelector('[data-gallery-tile="display:full"]')
  ).toHaveClass('w-[17rem]')
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
      title="Control Center"
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
      title="Control Center"
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
      shape: 'full' as const
    }
  ]
  render(
    <TileGallery
      title="Control Center"
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

  const remove = screen.getByRole('button', { name: 'Remove First' })
  expect(remove).toHaveClass(
    'size-6!',
    'border-danger',
    'bg-transparent!',
    'text-danger'
  )
  expect(remove).not.toHaveClass('w-full')
  expect(document.querySelector('[data-preview-tile="first"]')).toHaveClass(
    'sm:col-span-4'
  )
  expect(document.querySelector('[data-preview-tile="first"]')).not.toHaveClass(
    '[&>button]:w-full'
  )
  fireEvent.click(remove)
  expect(onVisibilityChange).toHaveBeenCalledWith('first', false)
})
