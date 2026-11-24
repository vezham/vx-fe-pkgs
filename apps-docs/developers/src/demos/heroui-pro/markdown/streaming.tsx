// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useEffect, useState } from 'react'

import { Markdown } from '@vezham/react-pro-v3/markdown'

const FULL_TEXT = `# Streaming demo

Each token update only re-renders changed markdown blocks.

1. First item
2. Second item
3. Third item

\`\`\`js
console.log("streaming markdown");
\`\`\`
`

export function Streaming() {
  const [text, setText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = window.setInterval(() => {
      index += 8
      setText(FULL_TEXT.slice(0, index))
      if (index >= FULL_TEXT.length) window.clearInterval(interval)
    }, 120)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="w-[640px]">
      <Markdown>{text}</Markdown>
    </div>
  )
}
