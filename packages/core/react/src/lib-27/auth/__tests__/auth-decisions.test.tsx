import { QueryClient } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'

import { agentAuthLocalization } from '@vezham/auth-ui-core/plugins/agent-auth'
import { oauthProviderLocalization } from '@vezham/auth-ui-core/plugins/oauth-provider'

import { AuthProvider } from '../auth-provider'
import { AgentApproval } from '../plugins/agent-auth/agent-approval'
import { agentAuthPlugin } from '../plugins/agent-auth/plugin'
import { AuthorizedApplication } from '../plugins/oauth-provider/authorized-application'
import { oauthProviderPlugin } from '../plugins/oauth-provider/plugin'
import { requireElement } from './setup'
import './setup'

const now = new Date()
const session = {
  session: {
    id: 'session',
    token: 'token',
    userId: 'user',
    createdAt: now,
    updatedAt: now,
    expiresAt: new Date(Date.now() + 60000)
  },
  user: {
    id: 'user',
    name: 'Ada',
    email: 'ada@example.com',
    emailVerified: true,
    createdAt: now,
    updatedAt: now
  }
}

afterEach(() => {
  cleanup()
  window.history.replaceState({}, '', '/')
})
it('preserves capability selection when limits are opened', async () => {
  const user = userEvent.setup()
  window.history.replaceState({}, '', '/auth/agent?agent_id=agent')
  const capabilities = Array.from({ length: 24 }, (_, number) => ({
    capability: `capability_${number + 1}`,
    status: 'pending',
    approvalStrength: 'session',
    constraints: { maxItems: number + 1 }
  }))
  const approve = vi.fn<() => Promise<void>>(async () => undefined)
  const adapter = {
    getApproval: async () => ({
      id: 'agent',
      name: 'Agent',
      hostId: 'host',
      mode: 'delegated',
      status: 'pending',
      createdAt: now,
      grants: capabilities,
      requestedCapabilities: capabilities
    }),
    approve,
    deny: vi.fn<() => Promise<void>>(async () => undefined),
    listAgents: async () => [],
    revoke: async () => undefined
  } as never
  const authClient = { getSession: async () => session } as never
  render(
    <AuthProvider
      authClient={authClient}
      navigate={vi.fn<(...args: unknown[]) => unknown>()}
      plugins={[agentAuthPlugin({ adapter })]}
      queryClient={new QueryClient()}>
      <AgentApproval />
    </AuthProvider>
  )
  const checkbox = await screen.findByRole('checkbox', {
    name: capabilities[0].capability
  })
  const allow = screen.getByRole('button', {
    name: agentAuthLocalization.allow
  })
  const summary = screen.getAllByText(agentAuthLocalization.constraints, {
    selector: 'summary'
  })[0]
  await user.click(summary)
  expect(requireElement(summary.closest('details')).open).toBe(true)
  expect(approve).not.toHaveBeenCalled()
  await user.click(requireElement(checkbox.closest('label')))
  await user.click(allow)
  await waitFor(() =>
    expect(approve).toHaveBeenCalledWith({
      agentId: 'agent',
      approvalId: undefined,
      userCode: undefined,
      capabilities: capabilities.slice(1).map(grant => grant.capability)
    })
  )
})
it('expands granted permissions without moving or invoking the revoke action', async () => {
  const user = userEvent.setup()
  const remove = vi.fn<() => Promise<Record<string, unknown>>>(async () => ({}))
  const authClient = {
    getSession: async () => session,
    oauth2: {
      publicClient: async () => ({ client_id: 'app', client_name: 'App' }),
      deleteConsent: remove
    }
  } as never
  render(
    <AuthProvider
      authClient={authClient}
      navigate={vi.fn<(...args: unknown[]) => unknown>()}
      plugins={[oauthProviderPlugin()]}
      queryClient={new QueryClient()}>
      <AuthorizedApplication
        application={{
          clientId: 'app',
          consentIds: ['consent'],
          scopes: ['profile', 'email']
        }}
      />
    </AuthProvider>
  )
  await screen.findByText('App', { exact: true })
  const summary = screen.getByText(oauthProviderLocalization.permissions)
  const revoke = screen.getByRole('button', {
    name: oauthProviderLocalization.removeAuthorization
  })
  const before = revoke.getBoundingClientRect().top
  await user.click(summary)
  const details = requireElement(summary.closest('details'))
  expect(details.open).toBe(true)
  expect(details.querySelectorAll('li')).toHaveLength(2)
  expect(revoke.getBoundingClientRect().top).toBe(before)
  expect(remove).not.toHaveBeenCalled()
  await user.click(summary)
  expect(details.open).toBe(false)
})
