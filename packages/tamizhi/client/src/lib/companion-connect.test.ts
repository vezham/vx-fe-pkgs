import { expect, it, vi } from 'vitest'

import { DEFAULT_COMPANION_URL } from './companion'
import { connectCompanion } from './companion-connect'

const id = 'r'.repeat(43)
const connection = () =>
  new Response(
    JSON.stringify({
      requestId: id,
      code: 'ABC123',
      expiresAt: new Date(Date.now() + 60000).toISOString()
    })
  )
const session = { token: 't'.repeat(43), expiresAt: '2027-01-01T00:00:00Z' }
it('requests approval without supplying an origin override and uses the returned token', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(connection())
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 'approved', session }))
    )
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ user: { id: 'local' } }))
    )
  const onPending = vi.fn()
  const client = await connectCompanion({
    baseURL: DEFAULT_COMPANION_URL,
    fetch,
    onPending
  })
  await client.api?.session()
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    DEFAULT_COMPANION_URL + '/auth/connect',
    expect.objectContaining({ method: 'POST', body: '{}', credentials: 'omit' })
  )
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    DEFAULT_COMPANION_URL + '/auth/connect/poll',
    expect.objectContaining({ body: JSON.stringify({ requestId: id }) })
  )
  expect(onPending).not.toHaveBeenCalled()
  expect(
    new Headers(fetch.mock.calls[2]?.[1]?.headers).get('Authorization')
  ).toBe('Bearer ' + session.token)
})
it('polls pending requests until the terminal approves', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(connection())
    .mockResolvedValueOnce(new Response('{"status":"pending"}'))
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ status: 'approved', session }))
    )
  const onPending = vi.fn()
  await connectCompanion({ baseURL: DEFAULT_COMPANION_URL, fetch, onPending })
  expect(onPending).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ code: 'ABC123' })
  )
  expect(fetch).toHaveBeenCalledTimes(3)
})
it('reports rejection without silently retrying', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(connection())
    .mockResolvedValueOnce(new Response('{"status":"rejected"}'))
  await expect(
    connectCompanion({ baseURL: DEFAULT_COMPANION_URL, fetch })
  ).rejects.toThrow('rejected in the Tamizhi CLI')
  expect(fetch).toHaveBeenCalledTimes(2)
})
it('cancels the server request when the UI aborts', async () => {
  const controller = new AbortController()
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(connection())
    .mockResolvedValueOnce(new Response('{"status":"pending"}'))
    .mockResolvedValue(new Response(null, { status: 204 }))
  await expect(
    connectCompanion({
      baseURL: DEFAULT_COMPANION_URL,
      fetch,
      signal: controller.signal,
      onPending: () => controller.abort()
    })
  ).rejects.toMatchObject({ name: 'AbortError' })
  expect(fetch).toHaveBeenLastCalledWith(
    DEFAULT_COMPANION_URL + '/auth/connect/cancel',
    expect.objectContaining({
      body: JSON.stringify({ requestId: id }),
      credentials: 'omit',
      keepalive: true
    })
  )
})
it.each([403, 404, 409])(
  'handles refused, expired or busy requests: %s',
  async status => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValue(new Response('{}', { status }))
    await expect(
      connectCompanion({ baseURL: DEFAULT_COMPANION_URL, fetch })
    ).rejects.toThrow(status === 409 ? 'busy' : 'expired or was refused')
    expect(fetch).toHaveBeenCalledTimes(1)
  }
)
