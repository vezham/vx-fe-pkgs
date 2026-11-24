// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowUp,
  CirclePlus,
  Database,
  LayoutHeaderCellsLargeThunderbolt,
  Microphone,
  MusicNote,
  Text
} from '@gravity-ui/icons'
import { useState } from 'react'

import {
  PromptInput,
  PromptSuggestion,
  TextShimmer
} from '@vezham/react-pro-v3'

const SUGGESTIONS = [
  { Icon: LayoutHeaderCellsLargeThunderbolt, label: 'Design a launch page' },
  { Icon: Text, label: 'Summarize meeting notes' },
  { Icon: MusicNote, label: 'Generate a sound brief' },
  { Icon: Database, label: 'Plan a data model' }
]

export function WithSuggestions() {
  const [value, setValue] = useState('')

  return (
    <div className="mx-auto flex min-h-[520px] w-full max-w-[920px] flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-foreground text-3xl font-normal tracking-tight">
          Build something useful with{' '}
          <TextShimmer className="text-muted">HeroUI Pro AI</TextShimmer>
        </h2>
        <p className="text-muted text-sm">
          Start with a prompt, add files, or pick a suggestion to shape the
          first response.
        </p>
      </div>

      <PromptInput
        className="w-full max-w-[780px]"
        value={value}
        onSubmit={() => setValue('')}
        onValueChange={setValue}>
        <PromptInput.Shell className="shadow-overlay">
          <PromptInput.Content>
            <PromptInput.TextArea
              className="min-h-19"
              placeholder="Describe an app, workflow, or interface..."
            />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action aria-label="Use voice" tooltip="Use voice">
                <Microphone className="size-4" />
              </PromptInput.Action>
              <PromptInput.Action
                aria-label="Add context"
                tooltip="Add context">
                <CirclePlus className="size-4" />
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send>
                <ArrowUp className="size-4" />
              </PromptInput.Send>
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>

      <PromptSuggestion className="w-full max-w-[560px]">
        <PromptSuggestion.Items className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SUGGESTIONS.map(({ Icon, label }) => (
            <PromptSuggestion.Item
              key={label}
              className="items-center justify-start"
              showEndIcon={false}
              onPress={() => setValue(label)}>
              <span className="inline-flex min-w-0 items-center gap-2">
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </span>
            </PromptSuggestion.Item>
          ))}
        </PromptSuggestion.Items>
      </PromptSuggestion>
    </div>
  )
}
