import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { Fragment, createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import mdx from '@vezham/docs-react/mdx'
import { InstallTabs } from '@vezham/react/components/install-tabs'

import { ComponentPreview } from './index'

const animations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)
const OriginalIntersectionObserver = globalThis.IntersectionObserver

beforeEach(() => {
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
  globalThis.IntersectionObserver = class extends OriginalIntersectionObserver {
    constructor(
      private callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      super(callback, options)
    }

    override observe = (target: Element) => {
      const rect = target.getBoundingClientRect()
      this.callback(
        [
          {
            boundingClientRect: rect,
            intersectionRatio: 1,
            intersectionRect: rect,
            isIntersecting: true,
            rootBounds: null,
            target,
            time: 0
          }
        ],
        this
      )
    }
  }
})

afterEach(() => {
  globalThis.IntersectionObserver = OriginalIntersectionObserver
  if (animations)
    Object.defineProperty(Element.prototype, 'getAnimations', animations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
})

describe('local component previews', () => {
  it('loads the InstallTabs demo and switches the real highlighted commands', async () => {
    render(<ComponentPreview name="react-install-tabs-development" />)
    await act(() => vi.dynamicImportSettled())
    expect(await screen.findByRole('tab', { name: 'pnpm' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await waitFor(() =>
      expect(screen.getByRole('tabpanel', { name: 'pnpm' })).toHaveTextContent(
        'pnpm add -D typescript vitest'
      )
    )
    fireEvent.click(screen.getByRole('tab', { name: 'npm' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel', { name: 'npm' })).toHaveTextContent(
        'npm install -D typescript vitest'
      )
    )
  })

  it('renders the packaged manager logos in shared install tabs', async () => {
    render(<InstallTabs packages="@vezham/react" />)
    await act(() => vi.dynamicImportSettled())
    for (const manager of ['npm', 'pnpm', 'yarn', 'bun']) {
      const tab = screen.getByRole('tab', { name: manager })
      expect(tab.querySelector('img')).toHaveAttribute(
        'src',
        expect.stringMatching(/^data:image\/svg\+xml,/)
      )
    }
    await waitFor(() =>
      expect(screen.getByRole('tabpanel', { name: 'npm' })).toHaveTextContent(
        'npm install @vezham/react'
      )
    )
  })

  it.each([
    ['react-bento-default', 'Explore components'],
    ['react-card-gallery-default', 'Browse components']
  ])('loads the %s layout example', async (name, action) => {
    render(<ComponentPreview name={name} />)
    await act(() => vi.dynamicImportSettled())
    expect(await screen.findByRole('link', { name: action })).toBeVisible()
  })

  it('loads the shared sidebar group example and expands a collapsed group', async () => {
    render(<ComponentPreview name="react-sidebar-group-default" />)
    await act(() => vi.dynamicImportSettled())
    const example = await screen.findByRole('navigation', {
      name: 'Example documentation'
    })
    expect(within(example).getByRole('link', { name: 'Brand' })).toBeVisible()
    const media = within(example).getByRole('button', { name: 'Media' })
    expect(media).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(media)
    expect(
      await within(example).findByRole('link', { name: 'VideoPlayer' })
    ).toBeVisible()
  })

  it('isolates a Notebook example and changes its viewport without reloading it', async () => {
    render(<ComponentPreview name="react-notebook-default" />)
    const frame = await screen.findByTitle('Basic notebook layout')
    expect(frame).toHaveAttribute('src', '/examples/react-notebook-default')
    expect(document.querySelector('#nd-subnav')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Desktop' }))
    expect(frame).toHaveStyle({ width: '1280px' })
    fireEvent.click(screen.getByRole('button', { name: 'Mobile' }))
    expect(frame).toHaveStyle({ width: '375px' })
    expect(screen.getByRole('button', { name: 'Mobile' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('link', { name: 'Open example' })).toHaveAttribute(
      'href',
      '/examples/react-notebook-default'
    )
  })

  it('loads the in-house Brand demo and exposes its import source', async () => {
    render(
      <ComponentPreview name="react-brand-channels">
        {createElement(
          mdx.pre,
          null,
          <code>
            {"import { Brand } from '@vezham/react/components/brand'"}
          </code>
        )}
      </ComponentPreview>
    )
    await act(() => vi.dynamicImportSettled())
    expect(await screen.findByText('Internal')).toBeVisible()
    expect(screen.getByText('OSS')).toBeVisible()
    fireEvent.click(screen.getByRole('tab', { name: 'Code' }))
    expect(
      screen.getByRole('region', { name: 'Example source code' })
    ).toHaveTextContent('@vezham/react/components/brand')
  })

  it('switches the VideoPlayer example between themed recordings', async () => {
    render(<ComponentPreview name="react-video-player-themed" />)
    await act(() => vi.dynamicImportSettled())
    const video = await screen.findByLabelText('Themed button demonstration')
    expect(video).toHaveAttribute(
      'src',
      expect.stringContaining('button-docs-light.mp4')
    )
    fireEvent.click(screen.getByRole('button', { name: 'Use dark recording' }))
    expect(video).toHaveAttribute(
      'src',
      expect.stringContaining('button-docs-dark.mp4')
    )
    expect(
      screen.getByRole('button', { name: 'Use light recording' })
    ).toBeVisible()
  })

  it('loads a Pro demo, supports interaction, and exposes its source', async () => {
    render(
      <ComponentPreview name="pro-cell-switch-default">
        {createElement(
          Fragment,
          null,
          createElement(
            mdx.pre,
            null,
            <code>{'import { CellSwitch } from "@vezham/react-pro-v3"'}</code>
          )
        )}
      </ComponentPreview>
    )
    await act(() => vi.dynamicImportSettled())
    const control = await screen.findByRole(
      'switch',
      { name: 'Animations' },
      { timeout: 3000 }
    )
    expect(control).toBeChecked()
    fireEvent.click(control)
    expect(control).not.toBeChecked()
    fireEvent.click(screen.getByRole('tab', { name: 'Code' }))
    expect(
      screen.getByRole('region', { name: 'Example source code' })
    ).toHaveTextContent('@vezham/react-pro-v3')
  })

  it('renders the disabled accordion and its active items', async () => {
    render(
      <ComponentPreview name="accordion-disabled">
        {createElement(
          Fragment,
          null,
          createElement(mdx.pre, null, <code>Example source</code>)
        )}
      </ComponentPreview>
    )
    await act(() => vi.dynamicImportSettled())
    expect(
      await screen.findByRole('button', { name: 'Disabled Item 1' })
    ).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Active Item' }))
    expect(
      await screen.findByText(
        'This item is active and can be toggled normally.'
      )
    ).toBeVisible()
    fireEvent.click(screen.getByRole('tab', { name: 'Code' }))
    expect(await screen.findByText('Example source')).toBeVisible()
    const source = screen.getByRole('region', { name: 'Example source code' })
    expect(source.closest('figure')).toHaveAttribute('data-line-numbers')
    expect(screen.getAllByRole('region')).toHaveLength(1)
    expect(screen.getAllByRole('button', { name: 'Copy Text' })).toHaveLength(1)
    expect(screen.queryByRole('button', { name: 'Show more' })).toBeNull()
  })
})
