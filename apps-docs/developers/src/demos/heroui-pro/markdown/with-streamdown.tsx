// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ClassAttributes, HTMLAttributes, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { Components } from 'streamdown'
import { Streamdown } from 'streamdown'

import { CodeBlock } from '@vezham/react-pro-v3/code-block'

const FULL_TEXT = `# Streamdown demo

Streamdown repairs incomplete markdown while a response streams, so partially typed blocks stay readable.

- Animated words for newly streamed text
- Built-in caret while the response is active
- Graceful handling for unfinished code fences

\`\`\`tsx
<Streamdown animated caret="block" isAnimating={isStreaming}>
  {response}
</Streamdown>
\`\`\`
`

function extractLanguage(className?: string): string {
  if (!className) return 'plaintext'
  const match = className.match(/language-(\w+)/)

  return match?.[1] ?? 'plaintext'
}

function HeroCodeBlock({
  children,
  className
}: ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  const language = extractLanguage(className)
  const code = String(children ?? '').replace(/\n$/, '')

  return (
    <CodeBlock>
      <CodeBlock.Header>
        <span className="text-muted text-xs uppercase">{language}</span>
        <CodeBlock.CopyButton code={code} />
      </CodeBlock.Header>
      <CodeBlock.Code code={code} language={language} />
    </CodeBlock>
  )
}

export function WithStreamdown() {
  const [text, setText] = useState('')
  const isStreaming = true

  useEffect(() => {
    let index = 0

    const interval = window.setInterval(() => {
      index += 8
      setText(FULL_TEXT.slice(0, index))

      if (index >= FULL_TEXT.length) {
        window.clearInterval(interval)
      }
    }, 120)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="w-[640px]">
      <Streamdown
        animated
        caret="block"
        components={{ code: HeroCodeBlock as Components['code'] }}
        isAnimating={isStreaming}>
        {text}
      </Streamdown>
    </div>
  )
}
