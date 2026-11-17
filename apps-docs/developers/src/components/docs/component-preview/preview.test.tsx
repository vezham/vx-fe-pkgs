import { act, fireEvent, render, screen } from '@testing-library/react'
import { Fragment, createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import mdx from '@vezham/docs-react/mdx'

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
