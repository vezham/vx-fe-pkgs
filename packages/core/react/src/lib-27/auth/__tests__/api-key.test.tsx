import { QueryClient } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  API_KEY_EXPIRATION_SECONDS_PER_DAY,
  type ListedApiKey
} from '@vezham/auth-ui-core/plugins/api-key'

import { AuthProvider } from '../auth-provider'
import { ApiKeys } from '../plugins/api-key/api-keys'
import { CreateApiKeyDialog } from '../plugins/api-key/create-api-key-dialog'
import { NewApiKeyDialog } from '../plugins/api-key/new-api-key-dialog'
import { apiKeyPlugin } from '../plugins/api-key/plugin'
import './setup'

const createMockAuthClient = (
  create = vi.fn<() => Promise<{ key: string; name: null }>>(async () => ({
    key: 'api-key-secret',
    name: null
  }))
) => {
  return {
    apiKey: { create },
    useSession: () => ({ data: null, isPending: false, error: null })
  } as unknown as Parameters<typeof AuthProvider>[0]['authClient']
}

const ControlledNewApiKeyDialog = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <NewApiKeyDialog
      isOpen={isOpen}
      name="Deploy key"
      onOpenChange={setIsOpen}
      secretKey="api-key-secret"
    />
  )
}

const createListedApiKey = (id: string): ListedApiKey => {
  const now = new Date('2026-01-01T00:00:00.000Z')

  return {
    configId: 'default',
    createdAt: now,
    enabled: true,
    expiresAt: null,
    id,
    lastRefillAt: null,
    lastRequest: null,
    metadata: null,
    name: `Key ${id}`,
    permissions: null,
    prefix: null,
    rateLimitEnabled: false,
    rateLimitMax: null,
    rateLimitTimeWindow: null,
    referenceId: 'user-1',
    refillAmount: null,
    refillInterval: null,
    remaining: null,
    requestCount: 0,
    start: 'bau_',
    updatedAt: now
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('<NewApiKeyDialog />', () => {
  it('shows inline feedback after copying the key', async () => {
    const user = userEvent.setup()
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue()

    render(
      <AuthProvider
        authClient={createMockAuthClient()}
        navigate={() => undefined}
        plugins={[apiKeyPlugin()]}>
        <ControlledNewApiKeyDialog />
      </AuthProvider>
    )

    await user.click(screen.getByRole('button', { name: /copy to clipboard/i }))

    expect(writeText).toHaveBeenCalledWith('api-key-secret')
    expect(
      screen.getByRole('button', { name: /copied to clipboard/i })
    ).toBeInTheDocument()
  })

  it('dismisses the controlled dialog after the key is saved', async () => {
    const user = userEvent.setup()

    render(
      <AuthProvider
        authClient={createMockAuthClient()}
        navigate={() => undefined}
        plugins={[apiKeyPlugin()]}>
        <ControlledNewApiKeyDialog />
      </AuthProvider>
    )

    await user.click(screen.getByRole('button', { name: /i've saved my key/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})

describe('<CreateApiKeyDialog />', () => {
  it('sends the default expiration interval to Better Auth in seconds', async () => {
    const user = userEvent.setup()
    const create = vi.fn<() => Promise<{ key: string; name: null }>>(
      async () => ({
        key: 'api-key-secret',
        name: null
      })
    )

    render(
      <AuthProvider
        authClient={createMockAuthClient(create)}
        navigate={() => undefined}
        plugins={[apiKeyPlugin()]}>
        <CreateApiKeyDialog isOpen onOpenChange={() => undefined} />
      </AuthProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Create API key' }))

    await waitFor(() => {
      expect(create).toHaveBeenCalledWith(
        expect.objectContaining({
          expiresIn: 30 * API_KEY_EXPIRATION_SECONDS_PER_DAY,
          fetchOptions: { throw: true }
        })
      )
    })
  })

  it('hides the expiration field when the plugin opts out', () => {
    render(
      <AuthProvider
        authClient={createMockAuthClient()}
        navigate={() => undefined}
        plugins={[apiKeyPlugin({ keyExpiration: false })]}>
        <CreateApiKeyDialog isOpen onOpenChange={() => undefined} />
      </AuthProvider>
    )

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })
})

describe('<ApiKeys />', () => {
  it('keeps the requested page when loading it fails', async () => {
    const user = userEvent.setup()
    const apiKeys = ['1', '2', '3'].map(createListedApiKey)
    const list = vi.fn<
      (params: {
        query?: { limit?: number; offset?: number }
      }) => Promise<unknown>
    >(async ({ query }: { query?: { limit?: number; offset?: number } }) => {
      if (query?.offset === 2) throw new Error('Page failed')

      return {
        apiKeys,
        limit: query?.limit,
        offset: query?.offset,
        total: apiKeys.length
      }
    })
    const authClient = {
      apiKey: { list },
      getSession: vi.fn<() => Promise<{ user: { id: string } }>>(async () => ({
        user: { id: 'user-1' }
      }))
    } as unknown as Parameters<typeof AuthProvider>[0]['authClient']

    render(
      <AuthProvider
        authClient={authClient}
        navigate={() => undefined}
        plugins={[apiKeyPlugin({ pageSize: 2 })]}
        queryClient={
          new QueryClient({
            defaultOptions: { queries: { retry: false } }
          })
        }>
        <ApiKeys hideCreate hideDelete hideUpdate />
      </AuthProvider>
    )

    await user.click(await screen.findByRole('button', { name: 'Next page' }))

    await waitFor(() => {
      expect(list).toHaveBeenCalledTimes(2)
      expect(list).toHaveBeenLastCalledWith(
        expect.objectContaining({
          query: expect.objectContaining({ offset: 2 })
        })
      )
    })
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled()
  })
})
