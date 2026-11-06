import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { connectCompanion } from '@vezham/tamizhi-client'
import type { TamizhiClient } from '@vezham/tamizhi-client'

import { setCompanionConnection } from './companion-connection'
import { CompanionSettings } from './companion-settings'

vi.mock('@vezham/tamizhi-client', async original => ({
  ...(await original<typeof import('@vezham/tamizhi-client')>()),
  connectCompanion: vi.fn()
}))
afterEach(() => {
  setCompanionConnection(undefined)
  vi.restoreAllMocks()
})
it('exposes pairing outside Tuning and clears credentials on disconnect', async () => {
  Object.defineProperty(window, 'isSecureContext', {
    value: true,
    configurable: true
  })
  const logout = vi.fn().mockResolvedValue(undefined)
  const client = {
    api: {
      session: vi.fn().mockResolvedValue({ user: { id: 'local' } }),
      logout
    }
  } as unknown as TamizhiClient
  vi.mocked(connectCompanion).mockResolvedValue(client)
  render(<CompanionSettings />)
  fireEvent.click(screen.getByRole('button', { name: 'Connect companion' }))
  fireEvent.click(screen.getByRole('button', { name: 'Connect' }))
  await waitFor(() =>
    expect(connectCompanion).toHaveBeenCalledWith(
      expect.objectContaining({
        onPending: expect.any(Function),
        signal: expect.any(AbortSignal)
      })
    )
  )
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Local companion' })).toBeTruthy()
  )
  fireEvent.click(screen.getByRole('button', { name: 'Local companion' }))
  fireEvent.click(await screen.findByRole('button', { name: 'Disconnect' }))
  await waitFor(() => expect(logout).toHaveBeenCalled())
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'Connect companion' })
    ).toBeTruthy()
  )
  expect(
    window.localStorage.getItem('tamizhi.companion.endpoint') ?? ''
  ).not.toContain('token')
})

it('shows the terminal verification and cancels a pending connection', async () => {
  Object.defineProperty(window, 'isSecureContext', {
    value: true,
    configurable: true
  })
  let signal: AbortSignal | undefined
  vi.mocked(connectCompanion).mockImplementation(options => {
    signal = options.signal
    options.onPending?.({ code: 'ABC123', expiresAt: '2027-01-01T00:00:00Z' })
    return new Promise((_resolve, reject) =>
      options.signal?.addEventListener(
        'abort',
        () => reject(options.signal?.reason),
        { once: true }
      )
    )
  })
  render(<CompanionSettings />)
  fireEvent.click(screen.getByRole('button', { name: 'Connect companion' }))
  fireEvent.click(await screen.findByRole('button', { name: 'Connect' }))
  expect(await screen.findByText('ABC123')).toBeTruthy()
  expect(screen.queryByLabelText('Pairing code')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Cancel connection' }))
  await waitFor(() => expect(signal?.aborted).toBe(true))
  await waitFor(() =>
    expect(
      screen.queryByRole('button', { name: 'Cancel connection' })
    ).toBeNull()
  )
  expect(screen.queryByRole('alert')).toBeNull()
})
