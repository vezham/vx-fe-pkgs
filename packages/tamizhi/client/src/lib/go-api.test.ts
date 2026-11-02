import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { expect, it } from 'vitest'

import { createTamizhiClient } from './client'

const backend = process.env['TAMIZHI_BACKEND_DIR']
it.skipIf(!backend)(
  'connects the browser client to the real Go API',
  async () => {
    if (!backend) throw new Error('Set TAMIZHI_BACKEND_DIR')
    const folder = await mkdtemp(join(tmpdir(), 'tamizhi-wire-'))
    const token = 'integration-test-only-token-at-least-24'
    const provider = createServer((request, response) => {
      if (request.url !== '/chat/completions') {
        response.writeHead(404).end()
        return
      }
      let body = ''
      request.on('data', data => {
        body += String(data)
      })
      request.on('end', () => {
        const input = JSON.parse(body) as { model: string }
        expect(input.model).toBe('model')
        response.writeHead(200, { 'Content-Type': 'text/event-stream' })
        response.write(
          'data: {"id":"fixture","choices":[{"index":0,"delta":{"content":"Go API reply"}}]}\n\n'
        )
        response.end(
          'data: {"id":"fixture","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'
        )
      })
    })
    provider.listen(0, '127.0.0.1')
    await once(provider, 'listening')
    const providerAddress = provider.address()
    if (!providerAddress || typeof providerAddress === 'string')
      throw new Error('Missing provider address')
    const reservation = createServer()
    reservation.listen(0, '127.0.0.1')
    await once(reservation, 'listening')
    const address = reservation.address()
    if (!address || typeof address === 'string')
      throw new Error('Missing API address')
    await new Promise<void>((resolve, reject) =>
      reservation.close(error => (error ? reject(error) : resolve()))
    )
    const base = `http://127.0.0.1:${address.port}`
    const config = join(folder, 'config.json')
    await writeFile(
      config,
      JSON.stringify({
        address: `127.0.0.1:${address.port}`,
        databaseDriver: 'sqlite',
        databaseURL: join(folder, 'database.sqlite'),
        origins: [],
        defaultModel: 'fixture/model',
        profile: 'assistant',
        providers: [
          {
            id: 'fixture',
            baseURL: `http://127.0.0.1:${providerAddress.port}`,
            apiKeyEnv: 'TAMIZHI_FIXTURE_PROVIDER_KEY',
            models: [
              {
                id: 'fixture/model',
                name: 'Fixture',
                provider: 'fixture',
                modalities: ['text']
              }
            ]
          }
        ],
        auth: {
          tokens: [
            {
              env: 'TAMIZHI_FIXTURE_TOKEN',
              user: 'test-user',
              roles: ['admin']
            }
          ]
        }
      })
    )
    const child = spawn(
      join(backend, 'dist/tamizhi-api'),
      ['-config', config],
      {
        env: {
          ...process.env,
          TAMIZHI_FIXTURE_TOKEN: token,
          TAMIZHI_FIXTURE_PROVIDER_KEY: 'fake-key'
        },
        stdio: ['ignore', 'pipe', 'pipe']
      }
    )
    let logs = ''
    child.stderr.on('data', chunk => {
      logs += String(chunk)
    })
    const exited = once(child, 'exit')
    try {
      let ready = false
      for (let attempt = 0; attempt < 100; attempt++) {
        if (child.exitCode !== null) throw new Error(`API exited: ${logs}`)
        try {
          ready = (await fetch(`${base}/healthz`)).ok
        } catch {
          /* vx-bot/NOTE: Wait for the API listener before sending authenticated requests. */
        }
        if (ready) break
        await delay(50)
      }
      expect(ready, logs).toBe(true)
      const client = createTamizhiClient({
        baseURL: `${base}/api/tamizhi`,
        headers: { Authorization: `Bearer ${token}` }
      })
      const api = client.api
      if (!api) throw new Error('Missing API methods')
      expect((await client.models())[0]?.id).toBe('fixture/model')
      expect((await api.session()).user.id).toBe('test-user')
      const events = []
      for await (const event of client.stream({
        conversationId: 'integration',
        messages: [{ id: 'user-message', role: 'user', content: 'hello' }],
        fast: false,
        permission: 'safe'
      }))
        events.push(event)
      expect(events.map(event => event.type)).toEqual([
        'start',
        'text',
        'finish'
      ])
      expect(events.map(event => event.sequence)).toEqual([1, 2, 3])
      const saved = await client.conversation('integration')
      expect(saved.messages[1]?.content).toBe('Go API reply')
      const messageId = saved.messages[1]?.id
      if (!messageId) throw new Error('Missing persisted assistant message ID')
      expect(
        (await api.feedback('integration', messageId, 'like')).messages[1]
          ?.rating
      ).toBe('like')
      const checkpoint = await api.checkpoint('integration', 'original')
      const branch = await api.branch('integration', messageId)
      expect(branch.parentId).toBe('integration')
      expect((await api.rename(branch.id, 'Branched')).title).toBe('Branched')
      const memory = await api.remember('Use Go for the backend')
      expect((await api.memory('Go'))[0]?.id).toBe(memory.id)
      await api.forget(memory.id)
      expect(await api.memory('Go')).toEqual([])
      const replay = []
      const runId = events[0]?.runId
      if (!runId) throw new Error('Missing run ID')
      for await (const event of api.replay(runId, 1)) replay.push(event.type)
      expect(replay).toEqual(['text', 'finish'])
      expect(
        (await api.restore('integration', checkpoint.id)).messages
      ).toHaveLength(2)
      expect((await api.conversations('Branched')).items[0]?.id).toBe(branch.id)
      const file = new File(['attached text'], 'notes.txt', {
        type: 'text/plain'
      })
      expect((await api.upload(file)).text).toBe('attached text')
      const plugins = await api.setPlugin('http', false)
      expect(plugins.find(plugin => plugin.name === 'http')?.enabled).toBe(
        false
      )
      await api.deleteConversation(branch.id)
      await expect(client.conversation(branch.id)).rejects.toThrow('404')
      const stranger = createTamizhiClient({ baseURL: `${base}/api/tamizhi` })
      await expect(stranger.conversation('integration')).rejects.toThrow('401')
    } finally {
      child.kill('SIGTERM')
      const deadline = setTimeout(() => child.kill('SIGKILL'), 5000)
      await exited
      clearTimeout(deadline)
      provider.closeAllConnections()
      await new Promise<void>(resolve => provider.close(() => resolve()))
      await rm(folder, { recursive: true, force: true })
    }
  },
  20_000
)
