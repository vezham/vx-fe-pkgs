import { fireEvent, render, waitFor, within } from '@testing-library/react'

import { docsPackageIds, docsPackages } from '../../config/packages'
import { PackageSelector, PackageVersionSelector } from './package-selectors'

const { navigate, viewport } = vi.hoisted(() => ({
  navigate: vi.fn(),
  viewport: { isMobile: false }
}))
vi.mock('@vezham/react-v3', async original => ({
  ...(await original<typeof import('@vezham/react-v3')>()),
  useMediaQuery: () => viewport.isMobile
}))
vi.mock('@tanstack/react-router', async original => ({
  ...(await original<typeof import('@tanstack/react-router')>()),
  useNavigate: () => navigate
}))

describe('package selectors', () => {
  const animations = Object.getOwnPropertyDescriptor(
    Element.prototype,
    'getAnimations'
  )

  beforeEach(() => {
    navigate.mockClear()
    viewport.isMobile = false
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

  it.each(['en', 'cn'] as const)(
    'lists all packages and preserves the section for %s',
    async locale => {
      const view = render(
        <PackageSelector packageId="env" locale={locale} page="guides" />
      )
      fireEvent.click(view.getByRole('button', { name: /Choose package/ }))
      for (const id of docsPackageIds)
        expect(
          await view.findByRole('option', {
            name: docsPackages[id].name
          })
        ).toBeTruthy()
      fireEvent.click(view.getByRole('option', { name: '@vezham/hooks' }))
      await waitFor(() =>
        expect(navigate).toHaveBeenCalledWith({
          to: `${locale === 'cn' ? '/cn' : ''}/docs/packages/hooks/guides`
        })
      )
    }
  )

  it('shows only the current documented version as Latest', async () => {
    const view = render(<PackageVersionSelector packageId="env" />)
    expect(
      view.getByRole('button', { name: /Package version/ }).textContent
    ).toContain(docsPackages.env.version)
    fireEvent.click(view.getByRole('button', { name: /Package version/ }))
    expect(await view.findByText('Latest')).toBeTruthy()
    const options = view.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0].getAttribute('aria-selected')).toBe('true')
  })

  it.each(['en', 'cn'] as const)(
    'shows the selected package in a Sheet, preserves the section and closes for %s',
    async locale => {
      viewport.isMobile = true
      const view = render(
        <PackageSelector packageId="env" locale={locale} page="guides" />
      )
      const trigger = view.getByRole('button', { name: 'Choose package' })
      expect(trigger.textContent).toContain('@vezham/env')
      fireEvent.click(trigger)
      const dialog = within(
        await view.findByRole('dialog', { name: 'Choose package' })
      )
      for (const id of docsPackageIds)
        expect(
          dialog.getByRole('option', { name: docsPackages[id].name })
        ).toBeTruthy()
      expect(
        dialog.getByRole('option', { name: '@vezham/env' })
      ).toHaveAttribute('aria-selected', 'true')
      const option = dialog.getByRole('option', { name: '@vezham/hooks' })
      fireEvent.mouseDown(option, { button: 0 })
      fireEvent.mouseUp(option, { button: 0 })
      fireEvent.click(option)
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith({
          to: `${locale === 'cn' ? '/cn' : ''}/docs/packages/hooks/guides`
        })
        expect(
          view.queryByRole('dialog', { name: 'Choose package' })
        ).toBeNull()
      })
    }
  )

  it('dismisses the package Sheet without navigation', async () => {
    viewport.isMobile = true
    const view = render(
      <PackageSelector packageId="env" locale="en" page="getting-started" />
    )
    fireEvent.click(view.getByRole('button', { name: 'Choose package' }))
    const dialog = within(
      await view.findByRole('dialog', { name: 'Choose package' })
    )
    fireEvent.click(dialog.getByRole('button', { name: /close/i }))
    await waitFor(() => expect(view.queryByRole('dialog')).toBeNull())
    expect(navigate).not.toHaveBeenCalled()
  })

  it('dismisses an open Sheet when switching to the desktop Select', async () => {
    viewport.isMobile = true
    const selector = (
      <PackageSelector packageId="env" locale="en" page="guides" />
    )
    const view = render(selector)
    fireEvent.click(view.getByRole('button', { name: 'Choose package' }))
    expect(
      await view.findByRole('dialog', { name: 'Choose package' })
    ).toBeTruthy()
    viewport.isMobile = false
    view.rerender(<PackageSelector packageId="env" locale="en" page="guides" />)
    expect(view.queryByRole('dialog')).toBeNull()
    fireEvent.click(view.getByRole('button', { name: /Choose package/ }))
    expect(await view.findByRole('listbox')).toBeTruthy()
  })
})
