// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Markdown } from '@vezham/react-pro-v3/markdown'

const SAMPLE = `# HeroUI Pro AI Markdown

This component uses **react-markdown** with block-level memoization for streaming performance.

## Features

- Headings, lists, and links
- Inline \`code\` snippets
- Fenced code blocks with Shiki highlighting

\`\`\`tsx
<ChatMessage.Assistant>
  <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
  <ChatMessage.Body>
    <ChatMessage.Content>
      <Markdown>{response}</Markdown>
    </ChatMessage.Content>
  </ChatMessage.Body>
</ChatMessage.Assistant>
\`\`\`

> AI responses can include rich formatting without coupling to any SDK.
`

export function Default() {
  return (
    <div className="w-[640px]">
      <Markdown>{SAMPLE}</Markdown>
    </div>
  )
}
