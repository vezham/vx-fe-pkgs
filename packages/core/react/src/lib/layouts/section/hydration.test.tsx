import { act } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { SectionLayout } from './index'

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/academic/classes' }),
  useNavigate: () => vi.fn(),
  useRouter: () => ({ history: { back: vi.fn(), forward: vi.fn() } })
}))
vi.mock('../../components/workspace-navigation', () => ({
  useWorkspaceNavigation: () => ({
    isNavigationCollapsed: true,
    toggleNavigation: vi.fn(),
    registerMobileSidebar: vi.fn()
  }),
  useSidebarShortcut: vi.fn()
}))

const setViewport = (mobile: boolean) => {
  vi.stubGlobal('matchMedia', (media: string) => ({
    media,
    matches:
      mobile && (media === '(max-width: 767px)' || media === '(width < 640px)'),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  }))
}

const SectionFixture = () => (
  <SectionLayout
    title="Classes"
    tabs={[{ key: 'classes', title: 'All Classes', href: '/academic/classes' }]}
    sync={false}
    primaryAction={{
      key: 'create',
      label: 'Add Class',
      icon: 'vx:plus',
      onAction: vi.fn()
    }}>
    Class records
  </SectionLayout>
)

describe('Section layout hydration', () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => []
  })

  it.each([false, true])(
    'hydrates server markup without errors on a mobile viewport: %s',
    async mobile => {
      setViewport(false)
      const container = document.createElement('div')
      container.innerHTML = renderToString(<SectionFixture />)
      document.body.append(container)
      setViewport(mobile)
      const onRecoverableError = vi.fn()
      let root: ReturnType<typeof hydrateRoot> | undefined
      try {
        await act(async () => {
          root = hydrateRoot(container, <SectionFixture />, {
            onRecoverableError
          })
        })
        expect(onRecoverableError).not.toHaveBeenCalled()
        expect(container.querySelectorAll('[role="tablist"]')).toHaveLength(1)
        expect(container.textContent).toContain('Class records')
        expect(Boolean(container.querySelector('button.fixed'))).toBe(mobile)
      } finally {
        await act(async () => root?.unmount())
        container.remove()
      }
    }
  )
})
