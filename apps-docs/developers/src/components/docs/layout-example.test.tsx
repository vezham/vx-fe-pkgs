import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { act, fireEvent, render, screen, within } from '@testing-library/react'

import { createRouter } from '@vezham/start/router/tanstack'

import { routeTree } from '../../routeTree.gen'
import { assertLayoutExample } from './layout-example'

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

const renderExample = async (name: string) => {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: [`/examples/${name}`] }),
    routeTree
  })
  await router.load()
  render(<RouterProvider router={router} />)
  await act(() => vi.dynamicImportSettled())
  await screen.findByRole('heading', { level: 1, name: 'Getting Started' })
  return router
}

describe('standalone notebook examples', () => {
  it('navigates between pages and selects the containing section', async () => {
    const router = await renderExample('react-notebook-default')
    fireEvent.click(screen.getByRole('link', { name: 'Installation' }))
    await screen.findByRole('heading', { level: 1, name: 'Installation' })
    expect(router.state.location.pathname).toBe(
      '/examples/react-notebook-default/guides/installation'
    )
    const tabs = screen.getByRole('navigation', {
      name: 'Documentation sections'
    })
    expect(within(tabs).getByRole('link', { name: 'Guides' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    fireEvent.click(within(tabs).getByRole('link', { name: 'Getting Started' }))
    await screen.findByRole('heading', { level: 1, name: 'Getting Started' })
  })

  it('renders custom branding and interactive header controls', async () => {
    await renderExample('react-notebook-custom-controls')
    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent('Acme')
    expect(header).toHaveTextContent('API')
    expect(header).toHaveTextContent('v2.0')
    const releaseNotes = within(header).getByRole('button', {
      name: 'Release notes'
    })
    fireEvent.click(releaseNotes)
    const notes = await screen.findByRole('dialog', { name: 'Version 2.0' })
    expect(notes).toHaveTextContent(
      'Section tabs and responsive drawers are now available.'
    )
  })

  it('rejects unregistered examples', () => {
    expect(() => assertLayoutExample('unknown')).toThrow(
      expect.objectContaining({ isNotFound: true })
    )
  })
})
