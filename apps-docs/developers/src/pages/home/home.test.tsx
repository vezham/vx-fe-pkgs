import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { act, render, screen, within } from '@testing-library/react'

import { createRouter } from '@vezham/start/router/tanstack'

import { routeTree } from '../../routeTree.gen'

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

describe('shared homepage card layouts', () => {
  it.each(['en', 'cn'] as const)(
    'keeps %s content and localized card destinations in both layouts',
    async locale => {
      const prefix = locale === 'en' ? '' : '/cn'
      const router = createRouter({
        history: createMemoryHistory({ initialEntries: [prefix || '/'] }),
        routeTree
      })
      await router.load()
      render(<RouterProvider router={router} />)
      await act(() => vi.dynamicImportSettled())
      const gallery = await screen.findByRole('navigation', {
        name: 'Explore documentation list'
      })
      const bento = screen.getByRole('navigation', {
        name: 'Explore documentation'
      })
      for (const region of [gallery, bento]) {
        expect(
          within(region).getByRole('link', { name: 'Explore UI' })
        ).toHaveAttribute('href', prefix + '/docs/ui/react')
        expect(
          within(region).getByRole('link', { name: 'Read the handbook' })
        ).toHaveAttribute('href', prefix + '/handbook/markdown')
        expect(
          within(region).getByRole('link', { name: 'Browse assets' })
        ).toHaveAttribute('href', prefix + '/docs/assets/icons')
        expect(
          within(region).getByRole('link', { name: 'View packages' })
        ).toHaveAttribute('href', prefix + '/docs/packages')
        expect(
          within(region).getByRole('heading', {
            name: 'Your next interface starts here.',
            level: 2
          })
        ).toBeVisible()
      }
      expect(
        within(gallery).getByRole('region', {
          name: 'Scrollable documentation cards'
        })
      ).toHaveAttribute('tabindex', '0')
    }
  )
})
