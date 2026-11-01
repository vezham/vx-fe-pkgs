import {
  approvalDecisionSchema,
  modelInfoSchema,
  runRequestSchema,
  storedConversationSchema
} from '@vezham/tamizhi-contracts'
import type {
  ApprovalDecision,
  ModelInfo,
  RunRequest,
  StreamEvent
} from '@vezham/tamizhi-contracts'

import { readEventStream } from './stream'

export interface TamizhiClient {
  stream: (
    request: RunRequest,
    signal?: AbortSignal
  ) => AsyncIterable<StreamEvent>
  conversation: (
    id: string,
    signal?: AbortSignal
  ) => Promise<import('@vezham/tamizhi-contracts').StoredConversationData>
  models: (signal?: AbortSignal) => Promise<ModelInfo[]>
  approve: (decision: ApprovalDecision, signal?: AbortSignal) => Promise<void>
}
export interface ClientOptions {
  baseURL: string
  headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>)
  credentials?: RequestCredentials
  fetch?: typeof globalThis.fetch
}

export const createTamizhiClient = (options: ClientOptions): TamizhiClient => {
  const base = options.baseURL.replace(/\/$/, '')
  const fetchRequest = async (path: string, init: RequestInit) => {
    const headers = new Headers(
      typeof options.headers === 'function'
        ? await options.headers()
        : options.headers
    )
    headers.set('Accept', 'application/json')
    if (init.body) headers.set('Content-Type', 'application/json')
    if (path === '/chat') headers.set('Accept', 'text/event-stream')
    const response = await (options.fetch ?? globalThis.fetch)(
      `${base}${path}`,
      { ...init, headers, credentials: options.credentials ?? 'same-origin' }
    )
    if (!response.ok)
      throw new Error(`Tamizhi request failed (${response.status})`)
    return response
  }
  return {
    stream: async function* (request, signal) {
      const input = runRequestSchema.parse(request)
      const response = await fetchRequest('/chat', {
        method: 'POST',
        body: JSON.stringify(input),
        signal
      })
      if (
        !response.headers.get('Content-Type')?.includes('text/event-stream') ||
        !response.body
      )
        throw new Error('Expected a Tamizhi event stream')
      yield* readEventStream(response.body, signal)
    },
    conversation: async (id, signal) =>
      storedConversationSchema.parse(
        await (
          await fetchRequest(`/conversations/${encodeURIComponent(id)}`, {
            signal
          })
        ).json()
      ),
    models: async signal => {
      const response = await fetchRequest('/models', { signal })
      const data: unknown = await response.json()
      if (!Array.isArray(data)) throw new Error('Invalid model catalog')
      return data.map(value => modelInfoSchema.parse(value))
    },
    approve: async (decision, signal) => {
      await fetchRequest('/approvals', {
        method: 'POST',
        body: JSON.stringify(approvalDecisionSchema.parse(decision)),
        signal
      })
    }
  }
}
