import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Readable } from 'node:stream'

import { storedConversationSchema } from '@vezham/tamizhi-contracts'

import type { createTamizhi } from './runtime'
import type { TamizhiPlugin } from './types'

export const fileStoragePlugin = (directory: string): TamizhiPlugin => ({
  name: 'storage.file',
  inject: ['tamizhi'],
  apply: context => {
    const filename = (owner: string, id: string) =>
      join(
        directory,
        `${createHash('sha256')
          .update(JSON.stringify([owner, id]))
          .digest('hex')}.json`
      )
    context.tamizhi.storage.register(context, 'default', {
      get: async (owner, id) => {
        try {
          return storedConversationSchema.parse(
            JSON.parse(await readFile(filename(owner, id), 'utf8'))
          )
        } catch (error) {
          if (
            error instanceof Error &&
            'code' in error &&
            error.code === 'ENOENT'
          )
            return undefined
          throw error
        }
      },
      put: async (owner, conversation) => {
        await mkdir(directory, { recursive: true, mode: 0o700 })
        const target = filename(owner, conversation.id)
        const temporary = `${target}.${randomUUID()}.tmp`
        await writeFile(
          temporary,
          JSON.stringify(storedConversationSchema.parse(conversation)),
          { mode: 0o600 }
        )
        await rename(temporary, target)
      }
    })
  }
})

export const createTamizhiServer = (
  runtime: Pick<Awaited<ReturnType<typeof createTamizhi>>, 'fetch'>
) =>
  createServer(async (incoming, outgoing) => {
    const controller = new AbortController()
    outgoing.on('close', () => {
      if (!outgoing.writableEnded) controller.abort()
    })
    try {
      const headers = new Headers()
      for (const [key, value] of Object.entries(incoming.headers)) {
        if (Array.isArray(value))
          for (const part of value) headers.append(key, part)
        else if (value) headers.set(key, value)
      }
      const init: RequestInit & { duplex?: 'half' } = {
        method: incoming.method,
        headers,
        signal: controller.signal
      }
      if (incoming.method !== 'GET' && incoming.method !== 'HEAD') {
        init.body = Readable.toWeb(incoming) as ReadableStream<Uint8Array>
        init.duplex = 'half'
      }
      const request = new Request(
        `http://localhost${incoming.url ?? '/'}`,
        init
      )
      const response = await runtime.fetch(request)
      outgoing.writeHead(response.status, Object.fromEntries(response.headers))
      if (!response.body) {
        outgoing.end()
        return
      }
      const reader = response.body.getReader()
      try {
        for (;;) {
          controller.signal.throwIfAborted()
          const { done, value } = await reader.read()
          if (done) break
          if (!outgoing.write(value))
            await new Promise<void>((resolve, reject) => {
              const clean = () => {
                outgoing.off('drain', drained)
                outgoing.off('close', closed)
              }
              const drained = () => {
                clean()
                resolve()
              }
              const closed = () => {
                clean()
                reject(new Error('Connection closed'))
              }
              outgoing.once('drain', drained)
              outgoing.once('close', closed)
            })
        }
        outgoing.end()
      } finally {
        await reader.cancel().catch(() => undefined)
        reader.releaseLock()
      }
    } catch {
      if (!outgoing.headersSent)
        outgoing.writeHead(500, { 'Content-Type': 'application/json' })
      outgoing.end(JSON.stringify({ error: 'Tamizhi request failed' }))
    }
  })
