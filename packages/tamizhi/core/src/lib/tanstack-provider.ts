import {
  chat,
  createModel,
  extendAdapter,
  maxIterations,
  toolDefinition
} from '@tanstack/ai'
import type { AnyTextAdapter } from '@tanstack/ai'
import { createOpenaiChatCompletions } from '@tanstack/ai-openai'

import type { ModelInfo } from '@vezham/tamizhi-contracts'

import { createLinkedAbortController } from './linked-abort'
import type { TamizhiPlugin } from './types'

export interface TanStackProviderOptions {
  id: string
  models: ModelInfo[]
  adapter: (model: string, fast: boolean) => AnyTextAdapter
  systemPrompt?: string
  maxIterations?: number
}

export const tanstackProviderPlugin = (
  options: TanStackProviderOptions
): TamizhiPlugin => ({
  name: `provider.${options.id}`,
  inject: ['tamizhi'],
  apply: context => {
    context.tamizhi.providers.register(context, options.id, {
      models: options.models,
      stream: async function* (request) {
        const model = request.model ?? options.models[0]?.id
        if (!model) throw new Error('No model is configured')
        const { controller, cleanup } = createLinkedAbortController(
          request.signal
        )
        const tools = request.tools.map(tool =>
          toolDefinition({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema
          }).server((input, execution) =>
            request.executeTool(
              tool.name,
              input,
              execution?.toolCallId ?? crypto.randomUUID()
            )
          )
        )
        try {
          for await (const event of chat({
            adapter: options.adapter(model, request.fast),
            messages: request.messages,
            systemPrompts: [
              options.systemPrompt ??
                'You are Tamizhi, a helpful assistant. Use tools only when needed.'
            ],
            tools,
            abortController: controller,
            agentLoopStrategy: maxIterations(options.maxIterations ?? 8)
          })) {
            if (event.type === 'TEXT_MESSAGE_CONTENT') yield event.delta
            if (event.type === 'RUN_ERROR') throw new Error(event.message)
          }
        } finally {
          cleanup()
        }
      }
    })
  }
})

export interface OpenAICompatibleOptions {
  id: string
  apiKey: string
  baseURL?: string
  models: ModelInfo[]
  systemPrompt?: string
  fastModel?: string
  fetch?: typeof globalThis.fetch
}

export const openaiCompatiblePlugin = (
  options: OpenAICompatibleOptions
): TamizhiPlugin =>
  tanstackProviderPlugin({
    id: options.id,
    models: options.models,
    systemPrompt: options.systemPrompt,
    adapter: (model, fast) =>
      extendAdapter(
        createOpenaiChatCompletions,
        options.models.map(item => createModel(item.id, ['text']))
      )(fast && options.fastModel ? options.fastModel : model, options.apiKey, {
        baseURL: options.baseURL,
        fetch: options.fetch,
        maxRetries: 0
      })
  })
