// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Copy, ThumbsUp } from '@gravity-ui/icons'
import type { ReactNode } from 'react'

import { ChatMessage, ChatMessageActions } from '@vezham/react-pro-v3'

function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
      <ChatMessage.Body>{children}</ChatMessage.Body>
    </ChatMessage.Assistant>
  )
}

export function Default() {
  return (
    <AssistantMessage>
      <ChatMessage.Content>
        Assistant responses can expose quick actions beneath the message body.
      </ChatMessage.Content>
      <ChatMessageActions>
        <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
        <ChatMessageActions.ThumbsUp
          aria-label="Good response"
          tooltip="Good response"
        />
        <ChatMessageActions.ThumbsDown
          aria-label="Bad response"
          tooltip="Bad response"
        />
        <ChatMessageActions.Regenerate
          aria-label="Regenerate"
          tooltip="Regenerate"
        />
        <ChatMessageActions.Menu aria-label="More actions" tooltip="More" />
      </ChatMessageActions>
    </AssistantMessage>
  )
}

export function Minimal() {
  return (
    <AssistantMessage>
      <ChatMessage.Content>
        Minimal action set for compact layouts.
      </ChatMessage.Content>
      <ChatMessageActions>
        <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
        <ChatMessageActions.Menu aria-label="More actions" tooltip="More" />
      </ChatMessageActions>
    </AssistantMessage>
  )
}

export function CustomIcons() {
  return (
    <AssistantMessage>
      <ChatMessage.Content>
        Swap preset icons via the Icon subcomponents.
      </ChatMessage.Content>
      <ChatMessageActions>
        <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy">
          <ChatMessageActions.CopyIcon>
            <Copy className="text-accent size-4" />
          </ChatMessageActions.CopyIcon>
        </ChatMessageActions.Copy>
        <ChatMessageActions.ThumbsUp
          aria-label="Good response"
          tooltip="Good response">
          <ChatMessageActions.ThumbsUpIcon>
            <ThumbsUp className="text-success size-4" />
          </ChatMessageActions.ThumbsUpIcon>
        </ChatMessageActions.ThumbsUp>
      </ChatMessageActions>
    </AssistantMessage>
  )
}
