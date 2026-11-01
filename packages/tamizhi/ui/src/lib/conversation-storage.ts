import type { Conversation, Message } from '@vezham/tamizhi-contracts'

import { OUTFITS } from './avatar-data'

export const EMPTY_CONVERSATIONS: Conversation[] = []

export const parseConversations = (saved: unknown): Conversation[] => {
  if (!Array.isArray(saved)) return []
  return saved
    .filter(
      (chat): chat is Conversation =>
        typeof chat?.id === 'string' &&
        typeof chat?.title === 'string' &&
        Array.isArray(chat.messages) &&
        chat.messages.length <= 60 &&
        chat.messages.every(
          (message: Message) =>
            typeof message?.id === 'string' &&
            typeof message.text === 'string' &&
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
