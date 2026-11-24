// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useEffect, useRef } from 'react'

import { ChatConversation, ChatMessage } from '@vezham/react-pro-v3'
import { Markdown } from '@vezham/react-pro-v3/markdown'

const MESSAGES = [
  {
    id: '1',
    role: 'user' as const,
    text: 'Can you summarize the release notes?'
  },
  {
    id: '2',
    role: 'assistant' as const,
    text: `The release focuses on the chat surface, component polish, and small API cleanup.

- Chat messages now compose with markdown, sources, and actions
- Conversation viewports keep streaming content readable
- AI components share the same spacing and typography rhythm`
  },
  {
    id: '3',
    role: 'user' as const,
    text: 'What changed for long conversations?'
  },
  {
    id: '4',
    role: 'assistant' as const,
    text: `Long threads keep their message column centered while the viewport owns scrolling. The optional jump button can be added when an app wants an explicit return-to-bottom control.`
  },
  {
    id: '5',
    role: 'user' as const,
    text: 'Show me the button treatment.'
  },
  {
    id: '6',
    role: 'assistant' as const,
    text: `Scroll away from the latest response and the button appears over the lower edge of the conversation. Pressing it returns the viewport to the newest message.`
  },
  {
    id: '7',
    role: 'assistant' as const,
    text: `The default conversation examples omit this control so teams can choose whether the extra affordance belongs in their product.`
  }
]

export function WithScrollButton() {
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const element = conversationRef.current

      if (!element) return

      element.scrollTo({
        behavior: 'auto',
        top: Math.max(0, element.scrollHeight - element.clientHeight - 160)
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flex h-[520px] w-[640px] flex-col overflow-hidden">
      <ChatConversation
        ref={conversationRef}
        className="flex-1"
        initial="instant">
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {MESSAGES.map(message =>
            message.role === 'user' ? (
              <ChatMessage.User key={message.id}>
                <ChatMessage.Bubble>
                  <ChatMessage.Content>{message.text}</ChatMessage.Content>
                </ChatMessage.Bubble>
              </ChatMessage.User>
            ) : (
              <ChatMessage.Assistant key={message.id}>
                <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
                <ChatMessage.Body>
                  <ChatMessage.Content>
                    <Markdown>{message.text}</Markdown>
                  </ChatMessage.Content>
                </ChatMessage.Body>
              </ChatMessage.Assistant>
            )
          )}
        </ChatConversation.Content>
        <ChatConversation.ScrollButton
          aria-label="Scroll to bottom"
          tooltip="Scroll to bottom"
        />
      </ChatConversation>
    </div>
  )
}
