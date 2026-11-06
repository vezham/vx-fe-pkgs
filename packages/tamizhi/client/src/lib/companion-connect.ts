import { z } from 'zod'

import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

import { createTamizhiClient } from './client'
import { companionURL } from './companion'

export type CompanionConnectionPrompt = Pick<
  TamizhiAPI.CompanionConnection,
  'code' | 'expiresAt'
>
const connectionSchema = z.object({
  requestId: z.string().min(32).max(128),
  code: z.string().min(6).max(12),
  expiresAt: z.string().datetime()
})
const resultSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
  session: z
    .object({
      token: z.string().min(32).max(128),
      expiresAt: z.string().datetime()
    })
    .optional()
})
const waitForPoll = (signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer)
      reject(signal.reason)
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort)
      resolve()
    }, 750)
    if (signal.aborted) abort()
    else signal.addEventListener('abort', abort, { once: true })
  })
export const connectCompanion = async (options: {
  baseURL: string
  signal?: AbortSignal
  fetch?: typeof globalThis.fetch
  onPending?: (prompt: CompanionConnectionPrompt) => void
}) => {
  const base = companionURL(options.baseURL)
  const fetcher = options.fetch ?? globalThis.fetch
  const controller = new AbortController()
  const abort = () => controller.abort(options.signal?.reason)
  if (options.signal?.aborted) abort()
  else options.signal?.addEventListener('abort', abort, { once: true })
  const timeout = setTimeout(
    () =>
      controller.abort(
        new Error('Connection request expired. Click Connect to try again.')
      ),
    5 * 60 * 1000
  )
  let requestId: string | undefined
  let complete = false
  let notified = false
  const post = async (path: string, body: object) => {
    controller.signal.throwIfAborted()
    let response: Response
    try {
      response = await fetcher(base + '/auth/connect' + path, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal
      })
    } catch (error) {
      if (controller.signal.aborted) throw controller.signal.reason
      throw new Error(
        'Cannot reach local Tamizhi. Start the companion and allow local network access in your browser.',
        { cause: error }
      )
    }
    if (!response.ok)
      throw new Error(
        response.status === 409
          ? 'Another connection request is pending or the companion is busy. Try again shortly.'
          : 'Connection request expired or was refused by the companion. Click Connect to try again.'
      )
    return response.json() as Promise<unknown>
  }
  try {
    const connection = connectionSchema.parse(await post('', {}))
    requestId = connection.requestId
    if (Date.parse(connection.expiresAt) <= Date.now())
      throw new Error('Connection request expired. Click Connect to try again.')
    while (true) {
      const result = resultSchema.parse(await post('/poll', { requestId }))
      if (result.status === 'rejected') {
        complete = true
        throw new Error('Connection rejected in the Tamizhi CLI.')
      }
      if (result.status === 'approved') {
        if (!result.session)
          throw new Error('The companion returned an invalid session.')
        complete = true
        return createTamizhiClient({
          baseURL: base,
          headers: { Authorization: 'Bearer ' + result.session.token },
          credentials: 'omit',
          fetch: options.fetch
        })
      }
      if (!notified) {
        notified = true
        options.onPending?.({
          code: connection.code,
          expiresAt: connection.expiresAt
        })
      }
      await waitForPoll(controller.signal)
    }
  } finally {
    clearTimeout(timeout)
    options.signal?.removeEventListener('abort', abort)
    if (requestId && !complete) {
      const cleanup = new AbortController()
      const cleanupTimeout = setTimeout(() => cleanup.abort(), 3000)
      void fetcher(base + '/auth/connect/cancel', {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
        signal: cleanup.signal,
        keepalive: true
      })
        .catch(() => {
          // vx-bot/NOTE: An unreachable companion still expires abandoned requests server-side.
        })
        .finally(() => clearTimeout(cleanupTimeout))
    }
  }
}
