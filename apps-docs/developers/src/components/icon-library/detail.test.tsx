import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import { AssetDetail } from './detail'

const animations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)
beforeAll(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
})
afterAll(() => {
  if (animations)
    Object.defineProperty(Element.prototype, 'getAnimations', animations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
})

const { copy, getIconSvg } = vi.hoisted(() => ({
  copy: vi.fn().mockResolvedValue(true),
  getIconSvg: vi
    .fn()
    .mockResolvedValue('<svg xmlns="http://www.w3.org/2000/svg"/>')
}))

vi.mock('@vezham/hooks', () => ({
  useCopyToClipboard: () => ({ copy, isCopied: false, isUnavailable: false })
}))
vi.mock('./shell', () => ({
  AssetShell: ({ children }: { children: ReactNode }) => children
}))
vi.mock('../../lib/icon-library/runtime', () => ({
  iconCdnUrl:
    'https://cdn.jsdelivr.net/npm/@vezham/icons@1.0.7/dist/cdn/vezham-icons.js',
  loadIconRuntime: () => Promise.resolve(),
  getIconSvg,
  applyIconSecondaryColor: vi.fn()
}))
vi.mock('../../lib/icon-library/catalog', async importOriginal => ({
  ...(await importOriginal<typeof import('../../lib/icon-library/catalog')>()),
  loadCatalog: () =>
    Promise.resolve([
      {
        slug: 'align-bottom',
        title: 'AlignBottom',
        category: 'layout',
        keywords: '',
        subcategory: '',
        weights: ['outline', 'duotone-filled'],
        variants: {}
      }
    ])
}))

it('preserves the preview controls, framework guide and copy action', async () => {
  render(
    <AssetDetail
      kind="icons"
      name="align-bottom"
      locale="en"
      initialWeight="duotone-filled"
    />
  )
  await screen.findByRole('heading', { name: 'Align Bottom' })
  expect(document.title).toBe('Align Bottom - Icons | Vezham Developers')
  const grid = screen.getByRole('switch', { name: 'Preview grid' })
  expect(grid).toBeChecked()
  fireEvent.click(grid)
  expect(grid).not.toBeChecked()
  fireEvent.click(screen.getByRole('tab', { name: /^React$/ }))
  expect(
    screen.getByRole('link', { name: 'Read the integration guide' })
  ).toHaveAttribute('href', '/docs/assets/guides/react')
  fireEvent.click(screen.getByRole('button', { name: 'Copy SVG' }))
  await waitFor(() =>
    expect(copy).toHaveBeenCalledWith(
      '<svg xmlns="http://www.w3.org/2000/svg"/>'
    )
  )
  expect(getIconSvg).toHaveBeenCalledWith(
    'align-bottom',
    'duotone-filled',
    128,
    '#0485f7',
    '#9ecfff'
  )
  fireEvent.click(screen.getByRole('button', { name: 'Reset preview' }))
  expect(grid).toBeChecked()
})
