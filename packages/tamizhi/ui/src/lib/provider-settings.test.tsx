import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import type { TamizhiAPIClient } from '@vezham/tamizhi-client'

import { ProviderSettings } from './provider-settings'

afterEach(cleanup)

const provider = {
  id: 'openai',
  name: 'OpenAI',
  connected: false,
  oauthAvailable: false,
  models: []
}

it('retains a confirmed connection when catalog refresh fails and retries reads only', async () => {
  const saved = { ...provider, connected: true }
  const api = {
    providers: vi.fn().mockResolvedValue([provider]),
    connectProvider: vi.fn().mockResolvedValue(saved)
  }
  const onChange = vi
    .fn()
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValue(undefined)
  render(
    <ProviderSettings
      api={api as unknown as TamizhiAPIClient}
      onChange={onChange}
    />
  )
  const input = await screen.findByLabelText('API key')
  fireEvent.change(input, { target: { value: 'test-key' } })
  fireEvent.click(screen.getByRole('button', { name: 'Test & save key' }))
  expect(await screen.findByRole('status')).toHaveTextContent(
    'OpenAI connected'
  )
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Connection saved, but the model list could not refresh'
  )
  expect(screen.getByLabelText('Replace API key')).toHaveValue('')
  api.providers.mockResolvedValue([saved])
  fireEvent.click(screen.getByRole('button', { name: 'Refresh status' }))
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull())
  expect(api.connectProvider).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledTimes(2)
})

it('retains a confirmed disconnect when status refresh fails', async () => {
  const api = {
    providers: vi
      .fn()
      .mockResolvedValueOnce([{ ...provider, connected: true }])
      .mockRejectedValue(new Error('offline')),
    removeProvider: vi.fn().mockResolvedValue(undefined)
  }
  render(
    <ProviderSettings
      api={api as unknown as TamizhiAPIClient}
      onChange={vi.fn().mockResolvedValue(undefined)}
    />
  )
  fireEvent.click(await screen.findByRole('button', { name: 'Disconnect' }))
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Provider connection removed'
  )
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Connection removed, but its status could not refresh'
  )
  expect(screen.queryByRole('button', { name: 'Disconnect' })).toBeNull()
  expect(api.removeProvider).toHaveBeenCalledTimes(1)
})
