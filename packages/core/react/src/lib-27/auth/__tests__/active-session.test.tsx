import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Session } from '@vezham/auth'
import { type AuthClient, resolveAuthConfig } from '@vezham/auth-ui-core'
import type * as BetterAuthUiReactModule from '@vezham/auth-ui-react'

import { ActiveSession } from '../settings/security/active-session'
import './setup'

const config = resolveAuthConfig({ authClient: {} as AuthClient })
const revokeSession = vi.fn<(...args: unknown[]) => unknown>()
const activeSession: Session = {
  id: 'session-1',
  token: 'token-1',
  userId: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  expiresAt: new Date(Date.now() + 86400000),
  ipAddress: null,
  userAgent: null
}

vi.mock('@vezham/auth-ui-react', async importOriginal => ({
  ...(await importOriginal<typeof BetterAuthUiReactModule>()),
  useAuth: () => config,
  useSession: () => ({ data: null }),
  useRevokeSession: () => ({ mutate: revokeSession, isPending: false })
}))

beforeEach(() => revokeSession.mockClear())
afterEach(cleanup)

describe('active sessions', () => {
  it.each([null, '', undefined])(
    'keeps a session without a user agent revocable (%s)',
    async userAgent => {
      const session = { ...activeSession, userAgent }
      render(<ActiveSession activeSession={session} />)
      const user = userEvent.setup()
      await user.click(
        screen.getByRole('button', {
          name: config.localization.settings.revokeSession
        })
      )
      expect(revokeSession).toHaveBeenCalledWith(session)
    }
  )
})
