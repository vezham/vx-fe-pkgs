// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChatStatus } from '@vezham/react-pro-v3'
import {
  ChainOfThought,
  ChatConversation,
  ChatMessage,
  ChatMessageActions,
  PromptInput
} from '@vezham/react-pro-v3'
import { Markdown } from '@vezham/react-pro-v3/markdown'

type Message = {
  id: string
  role: 'assistant' | 'user'
  trace?: boolean
  text: string
}

const INITIAL: Message[] = [
  {
    id: '1',
    role: 'user',
    text: 'Build a settings page with profile and notifications.'
  },
  {
    id: '2',
    role: 'assistant',
    text: `Here is a **settings layout** outline with profile, notifications, and a danger zone section.

- Profile card for avatar, display name, and email
- Notification preferences grouped by channel
- Danger zone with clear destructive affordances`,
    trace: true
  },
  {
    id: '3',
    role: 'user',
    text: 'Add a compact version that works well in a dashboard drawer.'
  },
  {
    id: '4',
    role: 'assistant',
    text: `For a drawer, I would reduce section padding, keep labels visible, and move destructive actions behind a confirmation step. The same components can stay responsive with container width constraints.`
  }
]

export function FullChat() {
  const [messages, setMessages] = useState(INITIAL)
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<ChatStatus>('ready')
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(timer => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const handleStop = () => {
    clearTimers()
    setStatus('ready')
  }

  const handleSubmit = () => {
    const trimmed = value.trim()

    if (!trimmed || status !== 'ready') return

    const userMessage: Message = {
      id: String(Date.now()),
      role: 'user',
      text: trimmed
    }

    setMessages(current => [...current, userMessage])
    setValue('')
    setStatus('submitted')
    clearTimers()

    timersRef.current.push(
      window.setTimeout(() => setStatus('streaming'), 300),
      window.setTimeout(() => {
        setMessages(current => [
          ...current,
          {
            id: String(Date.now() + 1),
            role: 'assistant',
            text: 'This is a mocked assistant reply rendered with HeroUI Pro AI components.'
          }
        ])
        setStatus('ready')
      }, 1200)
    )
  }

  return (
    <div className="flex h-[640px] w-[760px] flex-col overflow-hidden">
      <ChatConversation className="flex-1">
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {messages.map(message =>
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
                  {message.trace ? (
                    <ChainOfThought defaultExpanded>
                      <ChainOfThought.Trigger>
                        Thought for 3s
                      </ChainOfThought.Trigger>
                      <ChainOfThought.Content>
                        <ChainOfThought.Steps>
                          <ChainOfThought.Step label="Read requirements">
                            Mapped profile, notifications, and danger-zone
                            sections to a settings layout.
                          </ChainOfThought.Step>
                          <ChainOfThought.Step label="Plan responsive behavior">
                            Kept the same structure usable in both full-page and
                            drawer layouts.
                          </ChainOfThought.Step>
                        </ChainOfThought.Steps>
                      </ChainOfThought.Content>
                    </ChainOfThought>
                  ) : null}
                  <ChatMessageActions>
                    <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
                    <ChatMessageActions.Regenerate
                      aria-label="Regenerate"
                      tooltip="Regenerate"
                    />
                  </ChatMessageActions>
                </ChatMessage.Body>
              </ChatMessage.Assistant>
            )
          )}
        </ChatConversation.Content>
      </ChatConversation>

      <div className="bg-background shrink-0 px-4 pt-3 pb-4">
        <PromptInput
          status={status}
          value={value}
          onStop={handleStop}
          onSubmit={handleSubmit}
          onValueChange={setValue}>
          <PromptInput.Shell>
            <PromptInput.Content>
              <PromptInput.TextArea placeholder="What do you want to know?" />
            </PromptInput.Content>
            <PromptInput.Toolbar>
              <PromptInput.ToolbarEnd>
                <PromptInput.Send />
              </PromptInput.ToolbarEnd>
            </PromptInput.Toolbar>
          </PromptInput.Shell>
          <PromptInput.Footer>
            AI can make mistakes. Check important info.
          </PromptInput.Footer>
        </PromptInput>
      </div>
    </div>
  )
}
