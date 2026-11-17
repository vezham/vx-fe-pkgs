import { act, fireEvent, render, screen } from '@testing-library/react'
import { type ReactNode, useState } from 'react'

import {
  type AssetKind,
  type CatalogSearch,
  parseCatalogSearch
} from '../../lib/icon-library/catalog'
import { AssetGallery } from './gallery'

vi.mock('./shell', () => ({
  AssetShell: ({ children }: { children: ReactNode }) => children
}))

vi.mock('@tanstack/react-router', async importOriginal => ({
  ...(await importOriginal<typeof import('@tanstack/react-router')>()),
  useHydrated: () => true,
  Link: ({
    children,
    'aria-label': label
  }: {
    children: ReactNode
    'aria-label'?: string
  }) => (
    <a href="/docs/assets/icons/asset-000" aria-label={label}>
      {children}
    </a>
  )
}))

vi.mock('../../lib/icon-library/catalog', async importOriginal => ({
  ...(await importOriginal<typeof import('../../lib/icon-library/catalog')>()),
  loadCatalog: async () =>
    Array.from({ length: 125 }, (_, index) => ({
      slug: `asset-${String(index).padStart(3, '0')}`,
      title: `Asset ${String(index).padStart(3, '0')}`,
      category: 'general',
      keywords: '',
      subcategory: '',
      weights: ['outline', 'filled'],
      variants: {}
    }))
}))

vi.mock('../../lib/icon-library/runtime', async importOriginal => ({
  ...(await importOriginal<typeof import('../../lib/icon-library/runtime')>()),
  loadIconRuntime: async () => undefined
}))

const Gallery = ({
  kind = 'logos',
  initialSearch = parseCatalogSearch({}, kind),
  onUpdate
}: {
  kind?: AssetKind
  initialSearch?: CatalogSearch
  onUpdate?: (search: CatalogSearch) => void | Promise<void>
}) => {
  const [search, setSearch] = useState(initialSearch)
  return (
    <AssetGallery
      kind={kind}
      locale="en"
      search={search}
      onSearchChange={async next => {
        await onUpdate?.(next)
        setSearch(next)
      }}
    />
  )
}

describe('gallery loading', () => {
  it.each(['icons', 'illustrations', 'logos'] as const)(
    'appends %s without replacing earlier cards and stops at the end',
    async kind => {
      render(<Gallery kind={kind} />)
      const button = await screen.findByRole('button', { name: 'Load more' })
      const first = screen.getByRole('link', { name: 'View Asset 000' })
      expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(60)
      fireEvent.click(button)
      await screen.findByText('Showing 120 of 125')
      expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(120)
      expect(screen.getByRole('link', { name: 'View Asset 000' })).toBe(first)
      fireEvent.click(await screen.findByRole('button', { name: 'Load more' }))
      await screen.findByText('Showing 125 of 125')
      expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(125)
      expect(screen.queryByRole('button', { name: 'Load more' })).toBeNull()
    }
  )

  it('restores the loaded range from saved URL search state', async () => {
    const onUpdate = vi.fn()
    const { unmount } = render(<Gallery onUpdate={onUpdate} />)
    fireEvent.click(await screen.findByRole('button', { name: 'Load more' }))
    await screen.findByText('Showing 120 of 125')
    const savedSearch = onUpdate.mock.calls[0][0] as CatalogSearch
    expect(savedSearch.page).toBe(2)
    unmount()
    render(<Gallery initialSearch={savedSearch} />)
    await screen.findByText('Showing 120 of 125')
    expect(screen.getByRole('link', { name: 'View Asset 119' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'View Asset 000' })).toBeTruthy()
  })

  it('resets the loaded range after changing a search filter', async () => {
    const onUpdate = vi.fn()
    render(
      <Gallery
        initialSearch={parseCatalogSearch({ page: 2 }, 'logos')}
        onUpdate={onUpdate}
      />
    )
    await screen.findByText('Showing 120 of 125')
    const input = screen.getByRole('searchbox', { name: 'Search logos' })
    fireEvent.change(input, { target: { value: 'Asset 124' } })
    await screen.findByText('Showing 1 of 1')
    expect(onUpdate).toHaveBeenLastCalledWith(
      expect.objectContaining({ q: 'Asset 124', page: 1 })
    )
    fireEvent.change(input, { target: { value: '' } })
    await screen.findByText('Showing 60 of 125')
  })

  it('keeps existing cards visible and prevents repeated presses while loading', async () => {
    let finish: () => void = () => undefined
    const pending = new Promise<void>(resolve => {
      finish = resolve
    })
    const onUpdate = vi.fn(() => pending)
    render(<Gallery onUpdate={onUpdate} />)
    fireEvent.click(await screen.findByRole('button', { name: 'Load more' }))
    const button = await screen.findByRole('button', { name: 'Loading…' })
    expect(button).toHaveAttribute('data-pending')
    expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(60)
    fireEvent.click(button)
    expect(onUpdate).toHaveBeenCalledOnce()
    await act(async () => {
      finish()
      await pending
    })
    await screen.findByText('Showing 120 of 125')
  })
})
