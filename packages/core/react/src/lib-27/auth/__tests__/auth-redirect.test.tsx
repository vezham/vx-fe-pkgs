import { QueryClient } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Auth } from '../auth'
import { AuthProvider } from '../auth-provider'
import './setup'

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
}

const createMockAuthClient = (
  getSession: () => Promise<unknown> = async () => null
) => {
  return {
    getSession: vi.fn<() => Promise<unknown>>(getSession)
  } as unknown as Parameters<typeof AuthProvider>[0]['authClient']
}

const renderAuthRedirect = (authClient = createMockAuthClient()) => {
  return render(
    <AuthProvider
      authClient={authClient}
      navigate={() => undefined}
      queryClient={createTestQueryClient()}>
      <Auth path="redirect" />
    </AuthProvider>
  )
}

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('<AuthRedirect />', () => {
  it('renders through the built-in Auth path dispatcher', () => {
    window.history.pushState(
      {},
      '',
      '/auth/redirect?redirectTo=%2Fsettings%2Faccount'
    )

    const { container } = renderAuthRedirect(
      createMockAuthClient(() => new Promise(() => undefined))
    )

    expect(container.querySelector('[data-slot="spinner"]')).toBeInTheDocument()
  })
})
