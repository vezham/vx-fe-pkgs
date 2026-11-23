import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { apiKeyClient } from '@vezham/auth-api-key/client'
import { basePaths, viewPaths } from '@vezham/auth-ui-core'
import { createAuthClient } from '@vezham/auth/react'

import { AuthProvider, useAuth } from '../../src/components/auth/auth-provider'

// vx-bot/NOTE: Mock better-auth
vi.mock('@vezham/auth/react', () => ({
  createAuthClient: vi.fn<() => unknown>(() => ({
    useSession: vi.fn<() => { data: null; isPending: boolean; error: null }>(
      () => ({
        data: null,
        isPending: false,
        error: null
      })
    )
  }))
}))

type ApiKeyTestClient = ReturnType<
  typeof createAuthClient<{ plugins: [ReturnType<typeof apiKeyClient>] }>
>

describe('useAuth', () => {
  const mockAuthClient = createAuthClient({
    baseURL: 'http://localhost:3000'
  })

  afterEach(() => {
    vi.clearAllMocks()
    // vx-bot/NOTE: Reset URL to base
    window.history.pushState({}, '', '/')
  })

  describe('basic functionality', () => {
    it('should throw error when AuthProvider is not provided', () => {
      expect(() => {
        renderHook(() => useAuth())
      }).toThrow('[Vezham Auth] AuthProvider is required')
    })

    it('should return config when authClient is provided via context', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider authClient={mockAuthClient} navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.authClient).toBeDefined()
      expect(result.current.basePaths).toBeDefined()
      expect(result.current.viewPaths).toBeDefined()
    })

    it('supports generic auth client narrowing for consumers', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider authClient={mockAuthClient} navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth<ApiKeyTestClient>(), {
        wrapper
      })

      expect(result.current.authClient).toBeDefined()
    })
  })

  describe('default configuration', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider authClient={mockAuthClient} navigate={() => undefined}>
        {children}
      </AuthProvider>
    )

    it('should have default basePaths', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.basePaths).toEqual(basePaths)
    })

    it('should have default viewPaths', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.viewPaths).toEqual(viewPaths)
    })

    it('should have default redirectTo', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      expect(result.current.redirectTo).toBe('/')
    })

    it('should have default baseURL as empty string', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      expect(result.current.baseURL).toBe('')
    })

    it('should have navigate function', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      expect(typeof result.current.navigate).toBe('function')
    })

    it('should have navigate function that accepts replace option', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })
      expect(typeof result.current.navigate).toBe('function')
    })
  })

  describe('configuration merging', () => {
    it('should use configurations from AuthProvider', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          authClient={mockAuthClient}
          baseURL="http://example.com"
          redirectTo="/dashboard"
          navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.baseURL).toBe('http://example.com')
      expect(result.current.redirectTo).toBe('/dashboard')
    })

    it('reads redirectTo from the current URL after client navigation', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          authClient={mockAuthClient}
          redirectTo="/fallback"
          navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.redirectTo).toBe('/fallback')

      window.history.pushState({}, '', '/auth/sign-in?redirectTo=%2Fdashboard')
      expect(result.current.redirectTo).toBe('/dashboard')

      window.history.pushState({}, '', '/auth/sign-in')
      expect(result.current.redirectTo).toBe('/fallback')
    })

    it('should merge nested configurations from AuthProvider', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          authClient={mockAuthClient}
          emailAndPassword={{ enabled: true, rememberMe: true }}
          navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.emailAndPassword?.enabled).toBe(true)
      expect(result.current.emailAndPassword?.rememberMe).toBe(true)
    })
  })

  describe('social providers configuration', () => {
    it('uses redirect sign-in by default', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider authClient={mockAuthClient} navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.socialSignInMode).toBe('redirect')
    })

    it('should accept social providers array', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          authClient={mockAuthClient}
          socialProviders={['github', 'google']}
          navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.socialProviders).toEqual(['github', 'google'])
    })

    it('accepts custom provider metadata', () => {
      const icon = <svg aria-label="Acme logo" />
      const provider = { id: 'acme-sso', label: 'Acme ID', icon }
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthProvider
          authClient={mockAuthClient}
          socialProviders={['github', provider]}
          navigate={() => undefined}>
          {children}
        </AuthProvider>
      )

      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.socialProviders?.[1]).toEqual(provider)
    })
  })
})
