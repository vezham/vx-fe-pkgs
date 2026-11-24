// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ArrowsRotateLeft, Copy, ThumbsDown, ThumbsUp } from '@gravity-ui/icons'

import { ChatMessage } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
      <ChatMessage.User>
        <ChatMessage.Bubble>
          <ChatMessage.Content>
            Can you explain how compound components help AI chat UIs stay
            SDK-agnostic?
          </ChatMessage.Content>
        </ChatMessage.Bubble>
      </ChatMessage.User>

      <ChatMessage.Assistant>
        <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
        <ChatMessage.Body>
          <ChatMessage.Content>
            Compound components let you compose message layout explicitly while
            keeping state in your app layer.
          </ChatMessage.Content>
          <ChatMessage.Actions>
            <ChatMessage.Action aria-label="Copy" tooltip="Copy">
              <Copy className="size-4" />
            </ChatMessage.Action>
            <ChatMessage.Action
              aria-label="Good response"
              tooltip="Good response">
              <ThumbsUp className="size-4" />
            </ChatMessage.Action>
            <ChatMessage.Action
              aria-label="Bad response"
              tooltip="Bad response">
              <ThumbsDown className="size-4" />
            </ChatMessage.Action>
            <ChatMessage.Action aria-label="Regenerate" tooltip="Regenerate">
              <ArrowsRotateLeft className="size-4" />
            </ChatMessage.Action>
          </ChatMessage.Actions>
        </ChatMessage.Body>
      </ChatMessage.Assistant>
    </div>
  )
}
