// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChatLoader, ChatMessage, TextShimmer } from '@vezham/react-pro-v3'
import { Markdown } from '@vezham/react-pro-v3/markdown'

const ASSISTANT_MARKDOWN = `Here is a concise answer with **markdown** support:

\`\`\`ts
export type ChatStatus = "ready" | "streaming";
\`\`\`

The UI stays presentation-only — your SDK owns the message array.`

export function WithMarkdown() {
  return (
    <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
      <ChatMessage.User>
        <ChatMessage.Bubble>
          <ChatMessage.Content>
            Show me markdown inside assistant messages.
          </ChatMessage.Content>
        </ChatMessage.Bubble>
      </ChatMessage.User>

      <ChatMessage.Assistant>
        <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
        <ChatMessage.Body>
          <ChatMessage.Content>
            <Markdown>{ASSISTANT_MARKDOWN}</Markdown>
          </ChatMessage.Content>
        </ChatMessage.Body>
      </ChatMessage.Assistant>
    </div>
  )
}

export function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
      <ChatMessage.User>
        <ChatMessage.Bubble>
          <ChatMessage.Content>
            What is the weather in San Francisco?
          </ChatMessage.Content>
        </ChatMessage.Bubble>
      </ChatMessage.User>

      <ChatMessage.Assistant>
        <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
        <ChatMessage.Body>
          <TextShimmer>Thinking...</TextShimmer>
          <ChatLoader.Dots label="Thinking..." />
        </ChatMessage.Body>
      </ChatMessage.Assistant>

      <ChatLoader.Skeleton label="Loading response" />
    </div>
  )
}
