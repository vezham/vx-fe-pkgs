import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, it } from 'vitest'

import { createTamizhiClient } from '@vezham/tamizhi-client'

import { fileStoragePlugin } from './node'
import { createTamizhi } from './runtime'
import type { TamizhiPlugin } from './types'

const provider: TamizhiPlugin = {
  name: 'test',
  inject: ['tamizhi'],
  apply: context =>
    context.tamizhi.providers.register(context, 'test', {
      models: [{ id: 'test', name: 'Test', provider: 'test' }],
      stream: async function* () {
        yield 'Saved response'
      }
    })
}
it('persists sessions across host restarts and isolates owners', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'tamizhi-storage-'))
  const { permissionPolicyPlugin } = await import('./plugins')
  const host = await createTamizhi({
    plugins: [fileStoragePlugin(directory), permissionPolicyPlugin(), provider]
  })
  try {
    for await (const event of host.run(
      {
        conversationId: '../chat',
        messages: [{ role: 'user', content: 'Hello' }],
        permission: 'safe',
        fast: false
      },
      { id: 'alice' }
    )) {
      if (event.type === 'error') throw new Error(event.message)
    }
    await host.dispose()
    const reopened = await createTamizhi({
      plugins: [fileStoragePlugin(directory)]
    })
    try {
      expect(
        (await reopened.conversation({ id: 'alice' }, '../chat'))?.messages.at(
          -1
        )?.content
      ).toBe('Saved response')
      expect(
        await reopened.conversation({ id: 'bob' }, '../chat')
      ).toBeUndefined()
    } finally {
      await reopened.dispose()
    }
  } finally {
    await host.dispose()
    await rm(directory, { recursive: true, force: true })
  }
})

it('serves a streamed chat through the Node HTTP adapter', async () => {
  const { createTamizhiServer } = await import('./node')
  const { httpTransportPlugin } = await import('./http')
  const { memoryStoragePlugin, permissionPolicyPlugin } =
    await import('./plugins')
  const host = await createTamizhi({
    plugins: [
      memoryStoragePlugin(),
      permissionPolicyPlugin(),
      provider,
      httpTransportPlugin({
        authenticate: request =>
          request.headers.get('Authorization') === 'Bearer test'
            ? { id: 'alice' }
            : null
      })
    ]
  })
  const server = createTamizhiServer(host)
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const address = server.address()
    if (!address || typeof address === 'string')
      throw new Error('Expected an HTTP listening address')
    const client = createTamizhiClient({
      baseURL: `http://127.0.0.1:${address.port}/api/tamizhi`,
      headers: { Authorization: 'Bearer test' }
    })
    let text = ''
    for await (const event of client.stream({
      conversationId: 'node-chat',
      messages: [{ role: 'user', content: 'Hi' }],
      fast: false,
      permission: 'safe'
    })) {
      if (event.type === 'text') text += event.delta
      if (event.type === 'error') throw new Error(event.message)
    }
    expect(text).toBe('Saved response')
  } finally {
    await host.dispose()
    await new Promise<void>((resolve, reject) =>
      server.close(error => (error ? reject(error) : resolve()))
    )
  }
})
