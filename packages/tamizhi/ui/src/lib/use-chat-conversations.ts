import { useEffect, useState } from 'react'

import { useIndexedDBStore } from '@vezham/hooks'
import type { TamizhiClient } from '@vezham/tamizhi-client'
import type {
  APICapabilities,
  APIConversation,
  ChatConversationRecord,
  StoredConversationData
} from '@vezham/tamizhi-contracts'
import { wireMessageSchema } from '@vezham/tamizhi-contracts'

import { EMPTY_CONVERSATIONS, parseConversations } from './conversation-storage'
import { createId } from './create-id'

const fromWire = (
  item: StoredConversationData | APIConversation
): ChatConversationRecord => ({
  id: item.id,
  title: item.title ?? 'Chat',
  version: item.version,
  messages: item.messages
    .filter(
      message =>
        message.role === 'user' ||
        (message.role === 'assistant' && message.content.trim())
    )
    .map(message => ({
      id: message.id ?? createId(),
      role: message.role as 'user' | 'assistant',
      text: message.content,
      persona:
        wireMessageSchema.shape.persona.safeParse(message.persona).data ??
        'helper',
      outfit: wireMessageSchema.shape.outfit.safeParse(message.outfit).data,
      profileId: message.profileId,
      outfitLocked: message.outfitLocked,
      attachments: message.attachments,
      rating:
        message.rating === 'like'
          ? 'up'
          : message.rating === 'dislike'
            ? 'down'
            : undefined,
      tasks: message.tasks
    }))
})

export const useChatConversations = (
  client: TamizhiClient | undefined,
  storageKey: string,
  setError: (error: string | null) => void,
  setCapabilities: (capabilities: APICapabilities) => void
) => {
  const local = useIndexedDBStore(storageKey, EMPTY_CONVERSATIONS, {
    parse: parseConversations,
    enabled: !client
  })
  const [remoteConversations, setRemoteConversations] = useState<
    ChatConversationRecord[]
  >([])
  const [loadedClient, setLoadedClient] = useState<TamizhiClient | null>(null)
  const conversations = client
    ? client.api && loadedClient !== client
      ? []
      : remoteConversations
    : local.value
  const setConversations = client ? setRemoteConversations : local.setValue
  const isSaved = client ? true : local.isSaved
  const isReady = client
    ? !client.api || loadedClient === client
    : local.isReady
  const acceptConversation = (
    item: StoredConversationData | APIConversation
  ) => {
    const chat = fromWire(item)
    setConversations(current => [
      chat,
      ...current.filter(value => value.id !== chat.id)
    ])
    return chat
  }
  useEffect(() => {
    if (!client?.api) return
    const controller = new AbortController()
    void Promise.all([
      client.api.conversations('', '', controller.signal),
      client.api.capabilities(controller.signal)
    ])
      .then(([page, features]) => {
        if (controller.signal.aborted) return
        setRemoteConversations(page.items.map(fromWire))
        setCapabilities(features)
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            'Unable to load conversations. Sign in or check the Tamizhi connection.'
          )
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedClient(client)
      })
    return () => controller.abort()
  }, [client, setError, setCapabilities])
  return {
    conversations,
    setConversations,
    isSaved,
    isReady,
    acceptConversation
  }
}
