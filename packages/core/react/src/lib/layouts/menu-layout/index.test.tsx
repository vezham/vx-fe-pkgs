import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { MenuLayout } from './index'

vi.mock('./index-md', () => ({
  MenuMD: () => <nav>Desktop navigation</nav>
}))
vi.mock('./index-sm', () => ({
  MenuSM: () => <nav>Mobile navigation</nav>
}))

vi.mock('@vezham/react-v3', async importOriginal => {
  const actual = await importOriginal<typeof import('@vezham/react-v3')>()
  return { useMediaQuery: actual.useMediaQuery }
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Menu layout hydration', () => {
  it.each([false, true])(
    'hydrates consistently when the mobile media query is %s',
    async matches => {
      vi.stubGlobal('matchMedia', () => ({
        matches,
        addListener: vi.fn(),
        removeListener: vi.fn()
      }))
      const container = document.createElement('div')
      container.innerHTML = renderToString(<MenuLayout items={[]} />)
      expect(container.textContent).toBe('Desktop navigation')
      const onRecoverableError = vi.fn()
      const root = hydrateRoot(container, <MenuLayout items={[]} />, {
        onRecoverableError
      })
      try {
        await act(async () => {
          await Promise.resolve()
        })
        expect(container.textContent).toBe(
          matches ? 'Mobile navigation' : 'Desktop navigation'
        )
        expect(onRecoverableError).not.toHaveBeenCalled()
      } finally {
        await act(async () => root.unmount())
      }
    }
  )
})
