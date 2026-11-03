import type {
  ChatConversationRecord,
  ChatMessageRecord
} from '@vezham/tamizhi-contracts'

import { OUTFITS } from './avatar-data'

export const EMPTY_CONVERSATIONS: ChatConversationRecord[] = []

export const parseConversations = (
  saved: unknown
): ChatConversationRecord[] => {
  if (!Array.isArray(saved)) return []
  return saved
    .filter(
      (chat): chat is ChatConversationRecord =>
        typeof chat?.id === 'string' &&
        typeof chat?.title === 'string' &&
        Array.isArray(chat.messages) &&
        chat.messages.length <= 60 &&
        chat.messages.every(
          (message: ChatMessageRecord) =>
            typeof message?.id === 'string' &&
            typeof message.text === 'string' &&
            (message.profileId === undefined ||
              (typeof message.profileId === 'string' &&
                message.profileId.length > 0 &&
                message.profileId.length <= 128)) &&
            (message.outfitLocked === undefined ||
              typeof message.outfitLocked === 'boolean') &&
            ['user', 'assistant'].includes(message.role) &&
            (message.rating === undefined ||
              message.rating === 'up' ||
              message.rating === 'down') &&
            [
              'helper',
              'coder',
              'writer',
              'planner',
              'tutor',
              'explorer'
            ].includes(message.persona) &&
            (message.outfit === undefined ||
              OUTFITS.some(outfit => outfit.id === message.outfit)) &&
            (message.tasks === undefined ||
              (Array.isArray(message.tasks) &&
                message.tasks.every(
                  task =>
                    typeof task?.label === 'string' &&
                    typeof task.done === 'boolean'
                )))
        )
    )
    .slice(0, 24)
}

export const updateConversationMessage = (
  chats: readonly ChatConversationRecord[],
  chatId: string | null,
  messageId: string,
  update: (message: ChatMessageRecord) => ChatMessageRecord
): ChatConversationRecord[] =>
  chats.map(chat =>
    chat.id === chatId
      ? {
          ...chat,
          messages: chat.messages.map(message =>
            message.id === messageId ? update(message) : message
          )
        }
      : chat
  )
