import type { ChatMessageRecord } from '@vezham/tamizhi-contracts'

import { ChatMessage } from './chat-message'
import type { MessageActions } from './message-actions'

interface Props {
  messages: ChatMessageRecord[]
  isStreaming: boolean
  isAnimated: boolean
  isOffline: boolean
  actions: MessageActions
}

export const Conversation = ({
  messages,
  isStreaming,
  isAnimated,
  isOffline,
  actions
}: Props) => (
  <section className="tamizhi-conversation" aria-label="Conversation">
    {messages.map((message, index) => (
      <ChatMessage
        key={message.id}
        message={message}
        isStreaming={isStreaming && index === messages.length - 1}
        isAnimated={isAnimated}
        canBranch={!isStreaming}
        canRetry={!isOffline && !isStreaming && index === messages.length - 1}
        actions={actions}
      />
    ))}
  </section>
)
