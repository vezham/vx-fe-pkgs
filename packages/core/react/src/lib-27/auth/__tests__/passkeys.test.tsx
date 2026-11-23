import { QueryClient } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { AuthProvider } from '../auth-provider'
import { PasskeyButton } from '../plugins/passkey/passkey-button'
import { Passkeys } from '../plugins/passkey/passkeys'
import { passkeyPlugin } from '../plugins/passkey/plugin'
import './setup'

// vx-bot/NOTE: Each render gets its own QueryClient so the React Query cache doesn't
// vx-bot/NOTE: leak across tests (the default `<AuthProvider>` falls back to a
// vx-bot/NOTE: module-level client otherwise).
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
  })
}

// vx-bot/NOTE: ---------------------------------------------------------------------------
// vx-bot/NOTE: <PasskeyButton />
// vx-bot/NOTE: ---------------------------------------------------------------------------

/**
 * Minimal `authClient` shape required by `<PasskeyButton>`. We only need
 * `signIn.passkey` — the only better-auth API the component touches.
 */
const createPasskeyButtonAuthClient = () => {
  const passkey = vi.fn<
    (params?: {
      autoFill?: boolean
    }) => Promise<{ data: Record<string, unknown>; error: null }>
  >(async () => ({
    data: {},
    error: null
  }))

  return {
    signIn: { passkey },
    useSession: () => ({ data: null, isPending: false, error: null })
  } as unknown as Parameters<typeof AuthProvider>[0]['authClient'] & {
    signIn: { passkey: typeof passkey }
  }
}

const renderPasskeyButton = (
  authClient = createPasskeyButtonAuthClient(),
  {
    autoFill = false,
    strictMode = false
  }: { autoFill?: boolean; strictMode?: boolean } = {}
) => {
  const button = (
    <AuthProvider
      authClient={authClient}
      navigate={() => undefined}
      plugins={[passkeyPlugin({ autoFill })]}
      queryClient={createTestQueryClient()}>
      <PasskeyButton />
    </AuthProvider>
  )

  return {
    authClient,
    ...render(strictMode ? <StrictMode>{button}</StrictMode> : button)
  }
}

describe('<PasskeyButton />', () => {
  it("renders a 'Continue with Passkey' button", () => {
    renderPasskeyButton()
    expect(
      screen.getByRole('button', { name: /continue with passkey/i })
    ).toBeInTheDocument()
  })

  it('calls authClient.signIn.passkey on click', async () => {
    const user = userEvent.setup()
    const { authClient } = renderPasskeyButton()

    await user.click(
      screen.getByRole('button', { name: /continue with passkey/i })
    )

    await waitFor(() => {
      expect(authClient.signIn.passkey).toHaveBeenCalledTimes(1)
    })

    expect(authClient.signIn.passkey).toHaveBeenCalledWith(
      expect.objectContaining({
        autoFill: false,
        fetchOptions: expect.objectContaining({ throw: true })
      })
    )
  })

  it('opens a conditionally mediated request when autofill is enabled', async () => {
    const { authClient } = renderPasskeyButton(
      createPasskeyButtonAuthClient(),
      { autoFill: true }
    )

    await waitFor(() => {
      expect(authClient.signIn.passkey).toHaveBeenCalledWith(
        expect.objectContaining({ autoFill: true })
      )
    })
  })

  it('opens one conditional request in React Strict Mode', async () => {
    const { authClient } = renderPasskeyButton(
      createPasskeyButtonAuthClient(),
      {
        autoFill: true,
        strictMode: true
      }
    )

    await waitFor(() => {
      expect(authClient.signIn.passkey).toHaveBeenCalledOnce()
    })
  })

  it('keeps explicit sign-in available while conditional autofill is pending', async () => {
    const user = userEvent.setup()
    const pendingAutoFill = new Promise<never>(() => undefined)
    const authClient = createPasskeyButtonAuthClient()

    authClient.signIn.passkey.mockImplementation(async params => {
      if (params?.autoFill) return pendingAutoFill

      return { data: {}, error: null }
    })

    renderPasskeyButton(authClient, { autoFill: true })

    await waitFor(() => {
      expect(authClient.signIn.passkey).toHaveBeenCalledWith(
        expect.objectContaining({ autoFill: true })
      )
    })

    const button = screen.getByRole('button', {
      name: /continue with passkey/i
    })

    expect(button).toBeEnabled()
    await user.click(button)

    await waitFor(() => {
      expect(authClient.signIn.passkey).toHaveBeenCalledWith(
        expect.objectContaining({ autoFill: false })
      )
    })
  })

  it('stays out of the way on the signUp view', async () => {
    const authClient = createPasskeyButtonAuthClient()
    const { container } = render(
      <AuthProvider
        authClient={authClient}
        navigate={() => undefined}
        plugins={[passkeyPlugin({ autoFill: true })]}
        queryClient={createTestQueryClient()}>
        <PasskeyButton view="signUp" />
      </AuthProvider>
    )

    // vx-bot/NOTE: Neither the button nor the autofill request belongs on sign-up.
    await vi.waitFor(() => {
      expect(authClient.signIn.passkey).not.toHaveBeenCalled()
    })
    expect(container).toBeEmptyDOMElement()
  })
})

// vx-bot/NOTE: ---------------------------------------------------------------------------
// vx-bot/NOTE: <Passkeys />
// vx-bot/NOTE: ---------------------------------------------------------------------------

/**
 * Minimal `authClient` shape required by `<Passkeys>`. Needs
 * `passkey.listUserPasskeys`, `passkey.addPasskey`, and `passkey.deletePasskey`.
 */
const createPasskeysAuthClient = (
  passkeys: { id: string; name: string | null; createdAt: Date }[] = []
) => {
  const session = {
    user: { id: 'user-1', email: 'user@example.com' },
    session: { id: 'session-1', token: 'session-token' }
  }

  // vx-bot/NOTE: Every query and mutation passes `fetchOptions: { throw: true }`, which
  // vx-bot/NOTE: means the better-auth client unwraps `{ data, error }` and resolves
  // vx-bot/NOTE: with `data` directly (or throws on error). The mocks mirror that.
  const getSession = vi.fn<
    () => Promise<{
      user: { id: string; email: string }
      session: { id: string; token: string }
    }>
  >(async () => session)
  const listUserPasskeys = vi.fn<
    () => Promise<{ id: string; name: string | null; createdAt: Date }[]>
  >(async () => passkeys)
  const addPasskey = vi.fn<
    (params?: unknown) => Promise<{ id: string; name: null; createdAt: Date }>
  >(async () => ({
    id: 'new',
    name: null,
    createdAt: new Date()
  }))
  const deletePasskey = vi.fn<
    (params?: unknown) => Promise<Record<string, unknown>>
  >(async () => ({}))

  return {
    getSession,
    passkey: { listUserPasskeys, addPasskey, deletePasskey },
    useSession: () => ({ data: session, isPending: false, error: null })
  } as unknown as Parameters<typeof AuthProvider>[0]['authClient'] & {
    getSession: typeof getSession
    passkey: {
      listUserPasskeys: typeof listUserPasskeys
      addPasskey: typeof addPasskey
      deletePasskey: typeof deletePasskey
    }
  }
}

const renderPasskeys = (
  authClient = createPasskeysAuthClient(),
  pluginOptions?: Parameters<typeof passkeyPlugin>[0]
) => {
  return {
    authClient,
    ...render(
      <AuthProvider
        authClient={authClient}
        navigate={() => undefined}
        plugins={[passkeyPlugin(pluginOptions)]}
        queryClient={createTestQueryClient()}>
        <Passkeys />
      </AuthProvider>
    )
  }
}

describe('<Passkeys />', () => {
  it('renders the section heading and empty state copy', async () => {
    renderPasskeys()

    await waitFor(() => {
      expect(screen.getByText(/^passkeys$/i)).toBeInTheDocument()
      expect(screen.getByText(/^no passkeys$/i)).toBeInTheDocument()
      expect(
        screen.getByText(/create a passkey to securely access your account/i)
      ).toBeInTheDocument()
    })
  })

  it("renders an 'Add passkey' button", async () => {
    renderPasskeys()
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /add passkey/i })
      ).toBeInTheDocument()
    })
  })

  it('opens the name dialog when the add button is clicked', async () => {
    const user = userEvent.setup()
    renderPasskeys()

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /add passkey/i })
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /add passkey/i }))

    expect(await screen.findByRole('alertdialog')).toBeInTheDocument()
  })

  it('calls addPasskey when the dialog is submitted without a name', async () => {
    const user = userEvent.setup()
    const { authClient } = renderPasskeys()

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /add passkey/i })
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /add passkey/i }))

    const dialog = await screen.findByRole('alertdialog')

    await user.click(
      within(dialog).getByRole('button', { name: /add passkey/i })
    )

    await waitFor(() => {
      expect(authClient.passkey.addPasskey).toHaveBeenCalledTimes(1)
    })

    expect(authClient.passkey.addPasskey).toHaveBeenCalledWith(
      expect.objectContaining({
        fetchOptions: expect.objectContaining({ throw: true })
      })
    )

    expect(authClient.passkey.addPasskey.mock.calls[0][0]).not.toHaveProperty(
      'name'
    )
    expect(authClient.passkey.addPasskey.mock.calls[0][0]).not.toHaveProperty(
      'authenticatorAttachment'
    )
  })

  it('forwards the typed name to addPasskey', async () => {
    const user = userEvent.setup()
    const { authClient } = renderPasskeys()

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /add passkey/i })
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /add passkey/i }))

    const dialog = await screen.findByRole('alertdialog')

    await user.type(
      within(dialog).getByRole('textbox', { name: /^name$/i }),
      '  My MacBook  '
    )

    await user.click(
      within(dialog).getByRole('button', { name: /add passkey/i })
    )

    await waitFor(() => {
      expect(authClient.passkey.addPasskey).toHaveBeenCalledTimes(1)
    })

    expect(authClient.passkey.addPasskey).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'My MacBook',
        fetchOptions: expect.objectContaining({ throw: true })
      })
    )
  })

  it('forwards the configured authenticator preference without a selector', async () => {
    const user = userEvent.setup()
    const authClient = createPasskeysAuthClient()
    renderPasskeys(authClient, { authenticatorAttachment: 'platform' })

    await user.click(
      await screen.findByRole('button', { name: /add passkey/i })
    )

    const dialog = await screen.findByRole('alertdialog')
    expect(within(dialog).queryByRole('combobox')).not.toBeInTheDocument()

    await user.click(
      within(dialog).getByRole('button', { name: /add passkey/i })
    )

    await waitFor(() => {
      expect(authClient.passkey.addPasskey).toHaveBeenCalledWith(
        expect.objectContaining({
          authenticatorAttachment: 'platform',
          fetchOptions: expect.objectContaining({ throw: true })
        })
      )
    })
  })

  it('renders registered passkeys', async () => {
    const authClient = createPasskeysAuthClient([
      { id: 'pk-1', name: 'My MacBook', createdAt: new Date('2024-01-01') },
      { id: 'pk-2', name: null, createdAt: new Date('2024-06-01') }
    ])
    renderPasskeys(authClient)

    await waitFor(() => {
      expect(screen.getByText('My MacBook')).toBeInTheDocument()
      // vx-bot/NOTE: null name falls back to the "Passkey" localization string
      expect(screen.getByText('Passkey')).toBeInTheDocument()
    })
  })

  it('restores the saved passkey name after canceling a rename', async () => {
    const user = userEvent.setup()
    const authClient = createPasskeysAuthClient([
      { id: 'pk-1', name: 'My MacBook', createdAt: new Date('2024-01-01') }
    ])
    renderPasskeys(authClient)

    await user.click(
      await screen.findByRole('button', { name: /rename passkey/i })
    )

    const renameDialog = await screen.findByRole('alertdialog')
    const nameInput = within(renameDialog).getByRole('textbox', {
      name: /^name$/i
    })
    await user.clear(nameInput)
    await user.type(nameInput, 'Work laptop')
    await user.click(
      within(renameDialog).getByRole('button', { name: /^cancel$/i })
    )

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /rename passkey/i }))

    expect(
      within(await screen.findByRole('alertdialog')).getByRole('textbox', {
        name: /^name$/i
      })
    ).toHaveValue('My MacBook')
  })

  it('calls deletePasskey with the correct id', async () => {
    const user = userEvent.setup()
    const authClient = createPasskeysAuthClient([
      { id: 'pk-1', name: 'My MacBook', createdAt: new Date('2024-01-01') }
    ])
    renderPasskeys(authClient)

    await waitFor(() => {
      expect(screen.getByText('My MacBook')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: /delete passkey my macbook/i })
    )

    const deleteDialog = await screen.findByRole('alertdialog')

    await user.click(
      within(deleteDialog).getByRole('button', { name: /^delete passkey$/i })
    )

    await waitFor(() => {
      expect(authClient.passkey.deletePasskey).toHaveBeenCalledTimes(1)
    })

    expect(authClient.passkey.deletePasskey).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'pk-1',
        fetchOptions: expect.objectContaining({ throw: true })
      })
    )
  })

  it('gives every delete button a unique accessible name', async () => {
    const authClient = createPasskeysAuthClient([
      { id: 'pk-1', name: 'My MacBook', createdAt: new Date('2024-01-01') },
      { id: 'pk-2', name: null, createdAt: new Date('2024-06-01') }
    ])
    renderPasskeys(authClient)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /delete passkey my macbook/i })
      ).toBeInTheDocument()
      // vx-bot/NOTE: The unnamed row falls back to the `passkey` localization string.
      expect(
        screen.getByRole('button', { name: /delete passkey passkey/i })
      ).toBeInTheDocument()
    })
  })
})
