// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CodeBlock } from '@vezham/react-pro-v3/code-block'

export function Default() {
  const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("HeroUI"));`

  return (
    <div className="w-[480px]">
      <CodeBlock>
        <CodeBlock.Header>
          <span className="text-muted text-xs uppercase">typescript</span>
          <CodeBlock.CopyButton code={code} />
        </CodeBlock.Header>
        <CodeBlock.Code code={code} language="typescript" />
      </CodeBlock>
    </div>
  )
}
