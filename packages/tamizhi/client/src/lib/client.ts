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
  StreamEvent,
  TamizhiAPI
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
  subscribeProviderChanges?: (listener: () => void) => () => void
  api?: TamizhiAPIClient
  approve: (decision: ApprovalDecision, signal?: AbortSignal) => Promise<void>
}
export interface TamizhiAPIClient {
  authorizeProvider: (
    id: string,
    projectId: string,
    returnTo: string
  ) => Promise<TamizhiAPI.ProviderAuthorization>
  providers: (signal?: AbortSignal) => Promise<TamizhiAPI.ProviderSettings[]>
  connectProvider: (
    id: string,
    apiKey: string,
    signal?: AbortSignal
  ) => Promise<TamizhiAPI.ProviderSettings>
  removeProvider: (id: string) => Promise<void>
  capabilities: (signal?: AbortSignal) => Promise<TamizhiAPI.Capabilities>
  session: (signal?: AbortSignal) => Promise<TamizhiAPI.SessionInfo>
  authSession: (signal?: AbortSignal) => Promise<TamizhiAPI.AuthSession>
  getLoginURL: (returnTo?: string, connection?: string) => string
  loginURL: string
  logout: () => Promise<void>
  conversations: (
    query?: string,
    cursor?: string,
    signal?: AbortSignal
  ) => Promise<TamizhiAPI.ConversationPage>
  rename: (id: string, title: string) => Promise<TamizhiAPI.Conversation>
  deleteConversation: (id: string) => Promise<void>
  feedback: (
    id: string,
    message: string,
    rating: string
  ) => Promise<TamizhiAPI.Conversation>
  tasks: (
    id: string,
    message: string,
    tasks: TamizhiAPI.Task[]
  ) => Promise<TamizhiAPI.Conversation>
  branch: (id: string, messageId: string) => Promise<TamizhiAPI.Conversation>
  checkpoints: (id: string) => Promise<TamizhiAPI.Checkpoint[]>
  checkpoint: (id: string, label: string) => Promise<TamizhiAPI.Checkpoint>
  restore: (id: string, checkpoint: string) => Promise<TamizhiAPI.Conversation>
  compact: (id: string) => Promise<TamizhiAPI.Conversation>
  upload: (file: File, signal?: AbortSignal) => Promise<TamizhiAPI.Attachment>
  transcribe: (
    file: File,
    signal?: AbortSignal
  ) => Promise<TamizhiAPI.Transcript>
  speech: (text: string, signal?: AbortSignal) => Promise<Blob>
  memory: (query?: string) => Promise<TamizhiAPI.Memory[]>
  remember: (text: string, tags?: string[]) => Promise<TamizhiAPI.Memory>
  forget: (id: string) => Promise<void>
  plugins: () => Promise<TamizhiAPI.PluginInfo[]>
  setPlugin: (
    name: string,
    enabled: boolean
  ) => Promise<TamizhiAPI.PluginInfo[]>
  run: (id: string, signal?: AbortSignal) => Promise<TamizhiAPI.RunInfo>
  cancel: (id: string) => Promise<void>
  replay: (
    id: string,
    after?: number,
    signal?: AbortSignal
  ) => AsyncIterable<StreamEvent>
}
export interface ClientOptions {
  baseURL: string
  headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>)
  credentials?: RequestCredentials
  fetch?: typeof globalThis.fetch
}

export const createTamizhiClient = (options: ClientOptions): TamizhiClient => {
  const providerListeners = new Set<() => void>()
  const changed = () => {
    for (const listener of providerListeners) listener()
  }
  const base = options.baseURL.replace(/\/$/, '')
  const fetchRequest = async (path: string, init: RequestInit) => {
    const headers = new Headers(
      typeof options.headers === 'function'
        ? await options.headers()
        : options.headers
    )
    headers.set('Accept', 'application/json')
    if (typeof init.body === 'string')
      headers.set('Content-Type', 'application/json')
    if (path === '/chat' || path.includes('/events'))
      headers.set('Accept', 'text/event-stream')
    const response = await (options.fetch ?? globalThis.fetch)(
      `${base}${path}`,
      { ...init, headers, credentials: options.credentials ?? 'same-origin' }
    )
    if (!response.ok) {
      const details: unknown = await response.json().catch(() => null)
      const message =
        details &&
        typeof details === 'object' &&
        'message' in details &&
        typeof details.message === 'string'
          ? details.message.slice(0, 500)
          : ''
      throw new Error(
        `Tamizhi request failed (${response.status})${message ? `: ${message}` : ''}`
      )
    }
    return response
  }
  const json = async <T>(path: string, init: RequestInit = {}): Promise<T> =>
    (await fetchRequest(path, init)).json() as Promise<T>
  const body = (value: unknown, method = 'POST'): RequestInit => ({
    method,
    body: JSON.stringify(value)
  })
  const segment = encodeURIComponent
  const sessionPath = (id: string) => `/conversations/${segment(id)}`
  const upload = async <T>(
    path: string,
    file: File,
    signal?: AbortSignal
  ): Promise<T> => {
    const data = new FormData()
    data.set('file', file)
    return json(path, { method: 'POST', body: data, signal })
  }
  const replay = async function* (id: string, after = 0, signal?: AbortSignal) {
    const response = await fetchRequest(
      `/runs/${segment(id)}/events?after=${after}`,
      { signal }
    )
    if (!response.body) throw new Error('Expected a Tamizhi event stream')
    yield* readEventStream(response.body, signal)
  }
  const api: TamizhiAPIClient = {
    authorizeProvider: (id, projectId, returnTo) =>
      json(`/providers/${segment(id)}/oauth`, body({ projectId, returnTo })),
    providers: signal => json('/providers', { signal }),
    connectProvider: async (id, apiKey, signal) => {
      const result = await json<TamizhiAPI.ProviderSettings>(
        `/providers/${segment(id)}`,
        { ...body({ apiKey }, 'PUT'), signal }
      )
      changed()
      return result
    },
    removeProvider: async id => {
      await fetchRequest(`/providers/${segment(id)}`, { method: 'DELETE' })
      changed()
    },
    capabilities: signal => json('/capabilities', { signal }),
    session: signal => json('/session', { signal }),
    authSession: signal => json('/auth/session', { signal }),
    getLoginURL: (returnTo, connection) => {
      const query = new URLSearchParams()
      if (returnTo) query.set('returnTo', returnTo)
      if (connection) query.set('connection', connection)
      return `${base}/auth/login${query.size ? `?${query}` : ''}`
    },
    loginURL: `${base}/auth/login`,
    logout: async () => {
      await fetchRequest('/auth/logout', { method: 'POST' })
    },
    conversations: (query = '', cursor = '', signal) =>
      json(`/conversations?q=${segment(query)}&cursor=${segment(cursor)}`, {
        signal
      }),
    rename: (id, title) => json(sessionPath(id), body({ title }, 'PATCH')),
    deleteConversation: async id => {
      await fetchRequest(sessionPath(id), { method: 'DELETE' })
    },
    feedback: (id, message, rating) =>
      json(
        `${sessionPath(id)}/messages/${segment(message)}/feedback`,
        body({ rating }, 'PUT')
      ),
    tasks: (id, message, tasks) =>
      json(
        `${sessionPath(id)}/messages/${segment(message)}/tasks`,
        body({ tasks }, 'PUT')
      ),
    branch: (id, messageId) =>
      json(`${sessionPath(id)}/branches`, body({ messageId })),
    checkpoints: id => json(`${sessionPath(id)}/checkpoints`),
    checkpoint: (id, label) =>
      json(`${sessionPath(id)}/checkpoints`, body({ label })),
    restore: (id, checkpoint) =>
      json(`${sessionPath(id)}/checkpoints/${segment(checkpoint)}/restore`, {
        method: 'POST'
      }),
    compact: id => json(`${sessionPath(id)}/compact`, { method: 'POST' }),
    upload: (file, signal) => upload('/attachments', file, signal),
    transcribe: (file, signal) => upload('/audio/transcriptions', file, signal),
    speech: async (text, signal) =>
      (
        await fetchRequest('/audio/speech', { ...body({ text }), signal })
      ).blob(),
    memory: (query = '') => json(`/memory?q=${segment(query)}`),
    remember: (text, tags) => json('/memory', body({ text, tags })),
    forget: async id => {
      await fetchRequest(`/memory/${segment(id)}`, { method: 'DELETE' })
    },
    plugins: () => json('/plugins'),
    setPlugin: (name, enabled) =>
      json(`/plugins/${segment(name)}`, body({ enabled }, 'PATCH')),
    run: (id, signal) => json(`/runs/${segment(id)}`, { signal }),
    cancel: async id => {
      await fetchRequest(`/runs/${segment(id)}/cancel`, { method: 'POST' })
    },
    replay
  }
  return {
    subscribeProviderChanges: listener => {
      providerListeners.add(listener)
      return () => {
        providerListeners.delete(listener)
      }
    },
    api,
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
      let runId = response.headers.get('X-Tamizhi-Run-ID') ?? ''
      let sequence = 0
      let current = response
      for (let attempt = 0; ; attempt++) {
        let terminal = false
        try {
          if (!current.body) throw new Error('Expected a Tamizhi event stream')
          for await (const event of readEventStream(current.body, signal)) {
            runId = event.runId
            if (event.sequence !== undefined && event.sequence <= sequence)
              continue
            sequence = event.sequence ?? sequence
            terminal ||= event.type === 'finish' || event.type === 'error'
            yield event
          }
          return
        } catch (error) {
          if (signal?.aborted || terminal || !runId || attempt >= 3) throw error
          await new Promise<void>((resolve, reject) => {
            const onAbort = () => {
              clearTimeout(timer)
              reject(signal?.reason)
            }
            const timer = setTimeout(
              () => {
                signal?.removeEventListener('abort', onAbort)
                resolve()
              },
              Math.min(500 * 2 ** attempt, 4000)
            )
            signal?.addEventListener('abort', onAbort, { once: true })
          })
          current = await fetchRequest(
            `/runs/${segment(runId)}/events?after=${sequence}`,
            { signal }
          )
        }
      }
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
