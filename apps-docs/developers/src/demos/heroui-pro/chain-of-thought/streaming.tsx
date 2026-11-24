// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ChainOfThought } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="w-full max-w-[640px]">
      <ChainOfThought defaultExpanded={false}>
        <ChainOfThought.Trigger>Thought for 4 seconds</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Steps>
            <ChainOfThought.Step label="Search">
              Looked up HeroUI Pro chat template patterns for message layout and
              composer spacing.
            </ChainOfThought.Step>
            <ChainOfThought.Step label="Plan">
              Mapped the template structure to SDK-agnostic compound components.
            </ChainOfThought.Step>
          </ChainOfThought.Steps>
        </ChainOfThought.Content>
      </ChainOfThought>
    </div>
  )
}

export function Streaming() {
  return (
    <div className="w-full max-w-[640px]">
      <ChainOfThought isExpanded isStreaming>
        <ChainOfThought.Trigger>Thinking...</ChainOfThought.Trigger>
        <ChainOfThought.Content>
          <ChainOfThought.Steps>
            <ChainOfThought.Step label="Analyze">
              Breaking the request into presentation-only Pro components.
            </ChainOfThought.Step>
          </ChainOfThought.Steps>
        </ChainOfThought.Content>
      </ChainOfThought>
    </div>
  )
}
