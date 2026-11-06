import { expect, it, vi } from 'vitest'

import { DEFAULT_COMPANION_URL } from './companion'
import { connectCompanion } from './companion-connect'
import { companionTransport } from './companion-transport'

const origin = 'http://test.vezham.local:3000'
const info = () =>
  new Response(
    JSON.stringify({
      protocol: 'tamizhi-dev-proxy/v1',
      path: '/__tamizhi/companion',
      target: DEFAULT_COMPANION_URL
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
it('keeps HTTPS and localhost connections direct', async () => {
  const fetch = vi.fn<typeof globalThis.fetch>()
  expect(
    await companionTransport({
      baseURL: DEFAULT_COMPANION_URL,
      origin: 'https://tamizhi.example',
      isSecureContext: true,
      fetch
    })
  ).toBe(fetch)
  expect(fetch).not.toHaveBeenCalled()
})
it('pairs and authenticates session requests through the explicit development relay', async () => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(info())
    .mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          requestId: 'r'.repeat(43),
          code: 'ABC123',
          expiresAt: new Date(Date.now() + 60000).toISOString()
        })
      )
    )
    .mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          status: 'approved',
          session: { token: 't'.repeat(40), expiresAt: '2027-01-01T00:00:00Z' }
        })
      )
    )
    .mockResolvedValueOnce(
      new Response(JSON.stringify({ user: { id: 'local' } }))
    )
  const transport = await companionTransport({
    baseURL: DEFAULT_COMPANION_URL,
    origin,
    isSecureContext: false,
    fetch
  })
  const client = await connectCompanion({
    baseURL: DEFAULT_COMPANION_URL,
    fetch: transport
  })
  await client.api?.session()
  expect(fetch.mock.calls.map(call => call[0])).toEqual([
    origin + '/__tamizhi/companion-info',
    origin + '/__tamizhi/companion/auth/connect',
    origin + '/__tamizhi/companion/auth/connect/poll',
    origin + '/__tamizhi/companion/session'
  ])
  expect(
    new Headers(fetch.mock.calls[3]?.[1]?.headers).get('Authorization')
  ).toBe('Bearer ' + 't'.repeat(40))
  expect(fetch.mock.calls[3]?.[1]?.credentials).toBe('omit')
  expect(() => transport('http://remote.example/api/tamizhi/chat')).toThrow(
    'configured companion'
  )
  expect(() => transport(DEFAULT_COMPANION_URL + '-other')).toThrow(
    'configured companion'
  )
})
it.each([
  new Response('<html>App fallback</html>', {
    headers: { 'Content-Type': 'text/html' }
  }),
  new Response(
    JSON.stringify({
      protocol: 'tamizhi-dev-proxy/v1',
      path: '/arbitrary-proxy',
      target: DEFAULT_COMPANION_URL
    }),
    { headers: { 'Content-Type': 'application/json' } }
  ),
  new Response('{}', { status: 404 })
])('rejects unavailable or invalid relay discovery', async response => {
  const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(response)
  await expect(
    companionTransport({
      baseURL: DEFAULT_COMPANION_URL,
      origin,
      isSecureContext: false,
      fetch
    })
  ).rejects.toThrow('restart the dev server')
  expect(fetch).toHaveBeenCalledTimes(1)
})
it.each(['http://production.example', 'http://192.168.1.2:3000'])(
  'does not probe or bypass an insecure deployed origin: %s',
  async origin => {
    const fetch = vi.fn<typeof globalThis.fetch>()
    await expect(
      companionTransport({
        baseURL: DEFAULT_COMPANION_URL,
        origin,
        isSecureContext: false,
        fetch
      })
    ).rejects.toThrow('HTTPS or localhost')
    expect(fetch).not.toHaveBeenCalled()
  }
)
it('preserves cancellation during discovery', async () => {
  const controller = new AbortController()
  controller.abort()
  const failure = new DOMException('Aborted', 'AbortError')
  const fetch = vi.fn<typeof globalThis.fetch>().mockRejectedValue(failure)
  await expect(
    companionTransport({
      baseURL: DEFAULT_COMPANION_URL,
      origin,
      isSecureContext: false,
      fetch,
      signal: controller.signal
    })
  ).rejects.toBe(failure)
})
