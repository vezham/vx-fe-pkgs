import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, expect, vi } from 'vitest'

const noop = () => undefined

class ResizeObserverMock {
  observe = noop
  unobserve = noop
  disconnect = noop
}

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: number[] = []

  observe = noop
  unobserve = noop
  disconnect = noop
  takeRecords = () => []
}

expect.extend(matchers)

beforeEach(() => {
  window.scrollTo = vi.fn()
  Element.prototype.scrollTo = vi.fn()
})

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: noop,
      removeListener: noop,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: () => false
    })
  })
}

if (typeof globalThis.ResizeObserver !== 'function') {
  Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: ResizeObserverMock
  })
}

if (typeof globalThis.IntersectionObserver !== 'function') {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    writable: true,
    value: IntersectionObserverMock
  })
}

afterEach(() => {
  cleanup()
})
