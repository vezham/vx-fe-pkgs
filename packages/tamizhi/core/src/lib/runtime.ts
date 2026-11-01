import { Context } from '@deepseek-ai/cordis'

import type { ApprovalRequest, StreamEvent } from '@vezham/tamizhi-contracts'
import { runRequestSchema } from '@vezham/tamizhi-contracts'

import { createEventQueue } from './queue'
import { createRegistry } from './registry'
import type { Host, Provider, TamizhiPlugin } from './types'

export interface RuntimeOptions {
  plugins: TamizhiPlugin[]
  defaultModel?: string
  approvalTimeoutMs?: number
  runTimeoutMs?: number
  maxConcurrentRuns?: number
}

export const createTamizhi = async (options: RuntimeOptions) => {
  const context = new Context()
  const running = new Map<string, AbortController>()
  const approvals = new Map<
    string,
    { owner: string; decide: (approved: boolean) => void }
  >()
  let disposed = false
  const cancelAll = () => {
    for (const run of running.values()) run.abort()
  }
  const plugins = new Map<string, Awaited<ReturnType<typeof context.plugin>>>()
  const services = {
    providers: createRegistry<Provider>(cancelAll),
    tools: createRegistry<import('./types').Tool>(cancelAll),
    storage: createRegistry<import('./types').Storage>(cancelAll),
    permissions: createRegistry<import('./types').PermissionPolicy>(cancelAll),
    transports: createRegistry<(request: Request) => Promise<Response>>()
  }
  const host: Host = {
    conversation: (principal, id) =>
      services.storage.get('default')?.get(principal.id, id) ??
      Promise.resolve(undefined),
    models: () =>
      services.providers.entries().flatMap(([, provider]) => provider.models),
    plugins: () => [...plugins.keys()],
    approve: (principal, runId, callId, approved) => {
      const pending = approvals.get(`${runId}:${callId}`)
      if (!pending || pending.owner !== principal.id) return false
      pending.decide(approved)
      return true
    },
    run: async function* (input, principal, externalSignal) {
      if (disposed) throw new Error('Tamizhi runtime has been disposed')
      const request = runRequestSchema.parse(input)
      const key = JSON.stringify([principal.id, request.conversationId])
      if (running.has(key))
        throw new Error('A reply is already running for this conversation')
      if (running.size >= (options.maxConcurrentRuns ?? 32))
        throw new Error('Tamizhi is busy')
      const controller = new AbortController()
      const abort = () => controller.abort()
      externalSignal?.addEventListener('abort', abort, { once: true })
      if (externalSignal?.aborted) controller.abort()
      running.set(key, controller)
      const timeout = setTimeout(abort, options.runTimeoutMs ?? 120_000)
      const queue = createEventQueue<StreamEvent>()
      const identity = {
        runId: crypto.randomUUID(),
        conversationId: request.conversationId
      }
      const emit = (event: StreamEvent) => {
        queue.push(event)
        void context
          .parallel('tamizhi/event', event, principal)
          .catch(() =>
            context.logger('tamizhi').warn('An event observer failed')
          )
      }
      const waitForApproval = (approval: ApprovalRequest) =>
        new Promise<boolean>((resolve, reject) => {
          const id = `${approval.runId}:${approval.callId}`
          let settled = false
          const finish = (approved: boolean) => {
            if (settled) return
            settled = true
            clearTimeout(timer)
            controller.signal.removeEventListener('abort', canceled)
            approvals.delete(id)
            resolve(approved)
          }
          const canceled = () => {
            finish(false)
            reject(new Error('Run canceled'))
          }
          const timer = setTimeout(
            () => finish(false),
            options.approvalTimeoutMs ?? 60_000
          )
          approvals.set(id, { owner: principal.id, decide: finish })
          controller.signal.addEventListener('abort', canceled, { once: true })
          if (controller.signal.aborted) canceled()
          else emit({ ...identity, type: 'approval', ...approval })
        })
      const produce = async () => {
        emit({ ...identity, type: 'start' })
        try {
          const model =
            request.model === 'Auto'
              ? options.defaultModel
              : (request.model ?? options.defaultModel)
          const provider = services.providers
            .entries()
            .find(
              ([, item]) =>
                !model || item.models.some(info => info.id === model)
            )?.[1]
          if (!provider)
            throw new Error('No provider is configured for this model')
          const storage = services.storage.get('default')
          if (!storage)
            throw new Error('No conversation storage plugin is configured')
          const policy = services.permissions.get('default')
          if (!policy)
            throw new Error('No permission policy plugin is configured')
          let text = ''
          const executeTool = async (
            name: string,
            input: unknown,
            callId: string
          ) => {
            controller.signal.throwIfAborted()
            const tool = services.tools.get(name)
            if (!tool) throw new Error(`Unknown tool: ${name}`)
            input = await tool.inputSchema.parseAsync(input)
            emit({ ...identity, type: 'tool', name, input, callId })
            const decision = policy.evaluate(
              request.permission,
              tool,
              principal
            )
            if (
              decision === 'deny' ||
              (decision === 'ask' &&
                !(await waitForApproval({
                  runId: identity.runId,
                  callId,
                  name,
                  input
                })))
            ) {
              const output = { error: 'Tool request was not approved' }
              emit({ ...identity, type: 'tool-result', name, callId, output })
              return output
            }
            controller.signal.throwIfAborted()
            const output = await tool.execute(input, {
              principal,
              conversationId: request.conversationId,
              signal: controller.signal
            })
            emit({ ...identity, type: 'tool-result', name, callId, output })
            return output
          }
          await storage.put(principal.id, {
            id: request.conversationId,
            messages: request.messages,
            updatedAt: Date.now()
          })
          try {
            for await (const delta of provider.stream({
              ...request,
              model: model ?? provider.models[0]?.id,
              signal: controller.signal,
              tools: services.tools.entries().map(([, tool]) => tool),
              executeTool
            })) {
              controller.signal.throwIfAborted()
              if (text.length + delta.length > 100_000)
                throw new Error('Response is too large')
              text += delta
              emit({ ...identity, type: 'text', delta })
            }
          } finally {
            if (text)
              await storage.put(principal.id, {
                id: request.conversationId,
                messages: [
                  ...request.messages,
                  { role: 'assistant' as const, content: text }
                ].slice(-60),
                updatedAt: Date.now()
              })
          }
          emit({
            ...identity,
            type: 'finish',
            reason: controller.signal.aborted ? 'canceled' : 'complete'
          })
        } catch (error) {
          emit(
            controller.signal.aborted
              ? { ...identity, type: 'finish', reason: 'canceled' }
              : {
                  ...identity,
                  type: 'error',
                  message:
                    error instanceof Error && error.message.startsWith('No ')
                      ? error.message
                      : 'The response could not be completed. Please retry.'
                }
          )
        } finally {
          clearTimeout(timeout)
          externalSignal?.removeEventListener('abort', abort)
          running.delete(key)
          queue.close()
        }
      }
      const producer = produce().catch(() => {
        controller.abort()
        queue.fail(new Error('The response stream could not be completed'))
      })
      try {
        yield* queue.stream()
      } finally {
        controller.abort()
        await producer
      }
    }
  }
  const foundation = await context.plugin({
    name: 'tamizhi',
    apply: scope => scope.provide('tamizhi', { ...services, host })
  })
  const mount = async (plugin: TamizhiPlugin) => {
    const name = plugin.name
    if (!name) throw new Error('Tamizhi plugins need a name')
    if (disposed) throw new Error('Tamizhi runtime has been disposed')
    if (plugins.has(name)) throw new Error(`Duplicate plugin: ${name}`)
    const fiber = await foundation.ctx.plugin(plugin)
    plugins.set(name, fiber)
    return async () => {
      cancelAll()
      await fiber.dispose()
      plugins.delete(name)
    }
  }
  try {
    for (const plugin of options.plugins) await mount(plugin)
  } catch (error) {
    await foundation.dispose()
    throw error
  }
  return {
    ...host,
    context,
    mount,
    fetch: (request: Request) => {
      const handler = services.transports.get('http')
      return handler
        ? handler(request)
        : Promise.resolve(
            new Response('HTTP transport is not installed', { status: 503 })
          )
    },
    dispose: async () => {
      disposed = true
      cancelAll()
      await foundation.dispose()
      plugins.clear()
    }
  }
}
