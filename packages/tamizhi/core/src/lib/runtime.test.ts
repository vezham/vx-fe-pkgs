import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { createTamizhiClient } from '@vezham/tamizhi-client'

import { httpTransportPlugin } from './http'
import {
  memoryStoragePlugin,
  permissionPolicyPlugin,
  toolPlugin
} from './plugins'
import { createTamizhi } from './runtime'
import type { ProviderRequest, TamizhiPlugin } from './types'

const hosts: Awaited<ReturnType<typeof createTamizhi>>[] = []
afterEach(async () => {
  for (const host of hosts.splice(0)) await host.dispose()
})
const provider = (
  stream: (request: ProviderRequest) => AsyncIterable<string>
): TamizhiPlugin => ({
  name: 'test.provider',
  inject: ['tamizhi'],
  apply: context =>
    context.tamizhi.providers.register(context, 'test', {
      models: [{ id: 'test', name: 'Test model', provider: 'test' }],
      stream
    })
})
const setup = async (plugins: TamizhiPlugin[]) => {
  const host = await createTamizhi({
    plugins: [
      memoryStoragePlugin(),
      permissionPolicyPlugin(),
      ...plugins,
      httpTransportPlugin({
        authenticate: request =>
          request.headers.get('authorization') === 'Bearer alice'
            ? { id: 'alice' }
            : null
      })
    ]
  })
  hosts.push(host)
  const client = createTamizhiClient({
    baseURL: 'https://api.test/api/tamizhi',
    headers: { Authorization: 'Bearer alice' },
    fetch: async (input, init) => host.fetch(new Request(String(input), init))
  })
  return { host, client }
}
const request = {
  conversationId: 'chat-1',
  messages: [{ role: 'user' as const, content: 'Hello' }],
  fast: false,
  permission: 'ask' as const
}

describe('Tamizhi plugin composition and client transport', () => {
  it('streams through the real HTTP client and lists mounted models', async () => {
    const { client } = await setup([
      provider(async function* () {
        yield 'Hello '
        yield 'world'
      })
    ])
    expect(await client.models()).toEqual([
      { id: 'test', name: 'Test model', provider: 'test' }
    ])
    const events = []
    for await (const event of client.stream(request)) events.push(event)
    expect(events.map(event => event.type)).toEqual([
      'start',
      'text',
      'text',
      'finish'
    ])
  })

  it('waits for approval, rejects a different owner, and executes only after approval', async () => {
    const execute = vi.fn(async () => ({ saved: true }))
    const { host, client } = await setup([
      toolPlugin({
        name: 'save',
        description: 'Save a record',
        risk: 'write',
        inputSchema: z.object({ value: z.string() }),
        execute
      }),
      provider(async function* (run) {
        const output = await run.executeTool(
          'save',
          { value: 'note' },
          'call-1'
        )
        yield JSON.stringify(output)
      })
    ])
    const types = []
    for await (const event of client.stream(request)) {
      types.push(event.type)
      if (event.type === 'approval') {
        expect(execute).not.toHaveBeenCalled()
        expect(
          host.approve({ id: 'bob' }, event.runId, event.callId, true)
        ).toBe(false)
        await client.approve({
          runId: event.runId,
          callId: event.callId,
          approved: true
        })
      }
    }
    expect(execute).toHaveBeenCalledOnce()
    expect(types).toEqual([
      'start',
      'tool',
      'approval',
      'tool-result',
      'text',
      'finish'
    ])
  })

  it('does not execute denied tools', async () => {
    const execute = vi.fn(async () => 'saved')
    const { client } = await setup([
      toolPlugin({
        name: 'save',
        description: 'Save',
        risk: 'write',
        inputSchema: z.object({}),
        execute
      }),
      provider(async function* (run) {
        yield JSON.stringify(await run.executeTool('save', {}, 'call-2'))
      })
    ])
    for await (const event of client.stream(request)) {
      if (event.type === 'approval')
        await client.approve({
          runId: event.runId,
          callId: event.callId,
          approved: false
        })
    }
    expect(execute).not.toHaveBeenCalled()
  })

  it('cleans up service registrations when plugins unload', async () => {
    const { host } = await setup([])
    const dispose = await host.mount(
      provider(async function* () {
        yield 'hi'
      })
    )
    expect(host.models()).toHaveLength(1)
    await dispose()
    expect(host.models()).toEqual([])
    expect(host.plugins()).not.toContain('test.provider')
  })

  it('rejects unauthenticated requests and unexpected origins', async () => {
    const { host } = await setup([])
    expect(
      (await host.fetch(new Request('https://api.test/api/tamizhi/models')))
        .status
    ).toBe(401)
    expect(
      (
        await host.fetch(
          new Request('https://api.test/api/tamizhi/models', {
            headers: { Origin: 'https://other.test' }
          })
        )
      ).status
    ).toBe(403)
  })

  it('cancels a pending approval without executing its tool', async () => {
    const execute = vi.fn(async () => 'saved')
    const { host } = await setup([
      toolPlugin({
        name: 'save',
        description: 'Save',
        risk: 'write',
        inputSchema: z.object({}),
        execute
      }),
      provider(async function* (run) {
        yield JSON.stringify(await run.executeTool('save', {}, 'call-3'))
      })
    ])
    const controller = new AbortController()
    const events = []
    for await (const event of host.run(
      request,
      { id: 'alice' },
      controller.signal
    )) {
      events.push(event.type)
      if (event.type === 'approval') controller.abort()
    }
    expect(execute).not.toHaveBeenCalled()
    expect(events.at(-1)).toBe('finish')
  })
})

it('loads encoded session ids through the typed client', async () => {
  const { client } = await setup([
    provider(async function* () {
      yield 'Hello'
    })
  ])
  const id = 'session with spaces'
  for await (const event of client.stream({ ...request, conversationId: id }))
    void event
  expect((await client.conversation(id)).messages.at(-1)?.content).toBe('Hello')
})

it('finishes installing each plugin before mounting dependent plugins', async () => {
  const order: string[] = []
  const host = await createTamizhi({
    plugins: [
      {
        name: 'first',
        apply: async () => {
          await new Promise<void>(resolve => queueMicrotask(resolve))
          order.push('first')
        }
      },
      {
        name: 'second',
        apply: () => {
          expect(order).toEqual(['first'])
          order.push('second')
        }
      }
    ]
  })
  hosts.push(host)
  expect(order).toEqual(['first', 'second'])
})
