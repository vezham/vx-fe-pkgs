import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { SidebarGroup } from './index'

const animations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)

beforeEach(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
})

afterEach(() => {
  if (animations)
    Object.defineProperty(Element.prototype, 'getAnimations', animations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
})

describe('SidebarGroup', () => {
  it('keeps page links separate from the group toggle', async () => {
    render(
      <SidebarGroup item={{ type: 'folder', name: 'Navigation', children: [] }}>
        <a href="/brand">Brand</a>
      </SidebarGroup>
    )
    const toggle = screen.getByRole('button', { name: 'Navigation' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Brand' })).toHaveAttribute(
      'href',
      '/brand'
    )
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() =>
      expect(screen.queryByRole('link', { name: 'Brand' })).toBeNull()
    )
    fireEvent.click(toggle)
    expect(await screen.findByRole('link', { name: 'Brand' })).toBeVisible()
  })

  it('honors a folder that starts collapsed', async () => {
    render(
      <SidebarGroup
        item={{
          type: 'folder',
          name: 'Media',
          defaultOpen: false,
          children: []
        }}>
        <a href="/video">VideoPlayer</a>
      </SidebarGroup>
    )
    const toggle = screen.getByRole('button', { name: 'Media' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'VideoPlayer' })).toBeNull()
    fireEvent.click(toggle)
    expect(
      await screen.findByRole('link', { name: 'VideoPlayer' })
    ).toBeVisible()
  })
})
