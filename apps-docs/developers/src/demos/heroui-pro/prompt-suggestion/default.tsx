// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { PromptSuggestion } from '@vezham/react-pro-v3'

const SUGGESTED_PROMPTS = [
  'Draft a weekly project update email for my team',
  'Summarize this meeting transcript into action items',
  'Help me plan a product launch checklist',
  'Write a friendly reply to a customer support ticket',
  'Brainstorm names for a developer tools startup',
  'Explain this error message in plain language'
]

export function Default() {
  return (
    <div className="mx-auto w-full max-w-[714px]">
      <PromptSuggestion>
        <PromptSuggestion.Header>
          <PromptSuggestion.Title>
            What do you want to work on?
          </PromptSuggestion.Title>
          <PromptSuggestion.Description>
            Ask a question or start from one of the suggestions below.
          </PromptSuggestion.Description>
        </PromptSuggestion.Header>
        <PromptSuggestion.Items>
          {SUGGESTED_PROMPTS.map(prompt => (
            <PromptSuggestion.Item key={prompt}>{prompt}</PromptSuggestion.Item>
          ))}
        </PromptSuggestion.Items>
      </PromptSuggestion>
    </div>
  )
}
