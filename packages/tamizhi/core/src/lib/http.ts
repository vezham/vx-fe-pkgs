import {
  approvalDecisionSchema,
  runRequestSchema
} from '@vezham/tamizhi-contracts'

import { createLinkedAbortController } from './linked-abort'
import type { Principal, TamizhiPlugin } from './types'

export interface HttpTransportOptions {
  authenticate: (
    request: Request
  ) => Principal | null | Promise<Principal | null>
  allowedOrigins?: string[]
  basePath?: string
  maxBodyBytes?: number
}

const readJson = async (
  request: Request,
  maximum: number
): Promise<unknown> => {
  const reader = request.body?.getReader()
  if (!reader) throw new Error('A JSON body is required')
  const decoder = new TextDecoder()
  let size = 0
  let text = ''
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maximum) {
        await reader.cancel()
        throw new Error('Request is too large')
      }
      text += decoder.decode(value, { stream: true })
    }
    return JSON.parse(text + decoder.decode()) as unknown
  } finally {
    reader.releaseLock()
  }
}

export const httpTransportPlugin = (
  options: HttpTransportOptions
): TamizhiPlugin => ({
  name: 'transport.http',
  inject: ['tamizhi'],
  apply: context => {
    const base = (options.basePath ?? '/api/tamizhi').replace(/\/$/, '')
    const handler = async (request: Request): Promise<Response> => {
      const origin = request.headers.get('origin')
      const headers = new Headers({
        'Cache-Control': 'no-store',
        Vary: 'Origin'
      })
      const localOrigin = new URL(request.url).origin
      if (
        origin &&
        origin !== localOrigin &&
        !options.allowedOrigins?.includes(origin)
      )
        return new Response('Origin is not allowed', { status: 403 })
      if (origin) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Access-Control-Allow-Credentials', 'true')
      }
      const json = (value: unknown, status = 200) =>
        Response.json(value, { status, headers })
      if (request.method === 'OPTIONS') {
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        headers.set(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        return new Response(null, { status: 204, headers })
      }
      const principal = await options.authenticate(request)
      if (!principal?.id)
        return json({ error: 'Authentication is required' }, 401)
      const path = new URL(request.url).pathname
      const host = context.tamizhi.host
      if (request.method === 'GET' && path === `${base}/models`)
        return json(host.models())
      if (request.method === 'GET' && path === `${base}/plugins`)
        return json(host.plugins())
      if (
        request.method === 'GET' &&
        path.startsWith(`${base}/conversations/`)
      ) {
        let id: string
        try {
          id = decodeURIComponent(path.slice(`${base}/conversations/`.length))
        } catch {
          return json({ error: 'Invalid conversation id' }, 400)
        }
        if (!id || id.length > 128)
          return json({ error: 'Invalid conversation id' }, 400)
        const conversation = await host.conversation(principal, id)
        return conversation
          ? json(conversation)
          : json({ error: 'Conversation not found' }, 404)
      }
      if (request.method !== 'POST')
        return json({ error: 'Route not found' }, 404)
      if (path !== `${base}/chat` && path !== `${base}/approvals`)
        return json({ error: 'Route not found' }, 404)
      try {
        const body = await readJson(request, options.maxBodyBytes ?? 256_000)
        if (path === `${base}/approvals`) {
          const decision = approvalDecisionSchema.parse(body)
          const accepted = host.approve(
            principal,
            decision.runId,
            decision.callId,
            decision.approved
          )
          return json({ accepted }, accepted ? 200 : 404)
        }
        const input = runRequestSchema.parse(body)
        const { controller, abort, cleanup } = createLinkedAbortController(
          request.signal
        )
        const iterator = host
          .run(input, principal, controller.signal)
          [Symbol.asyncIterator]()
        // vx-bot/NOTE: Pull the first event before committing headers so concurrency errors remain HTTP failures.
        const first = await iterator.next()
        let pending = first
        const encoder = new TextEncoder()
        const stream = new ReadableStream<Uint8Array>({
          async pull(output) {
            try {
              const next = pending
              if (next.done) {
                output.close()
                cleanup()
                return
              }
              output.enqueue(
                encoder.encode(`data: ${JSON.stringify(next.value)}\n\n`)
              )
              pending = await iterator.next()
            } catch (error) {
              output.error(error)
              abort()
              cleanup()
            }
          },
          async cancel() {
            abort()
            cleanup()
            await iterator.return?.()
          }
        })
        headers.set('Content-Type', 'text/event-stream; charset=utf-8')
        headers.set('X-Accel-Buffering', 'no')
        return new Response(stream, { headers })
      } catch {
        return json({ error: 'Invalid or conflicting chat request' }, 400)
      }
    }
    context.tamizhi.transports.register(context, 'http', handler)
  }
})
