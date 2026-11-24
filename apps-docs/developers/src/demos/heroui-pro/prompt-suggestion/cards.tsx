// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { PromptSuggestion } from '@vezham/react-pro-v3'
import { Card } from '@vezham/react-v3'

const EXPLORE_CATEGORY = {
  description: 'Planning, updates, and stakeholder communication.',
  label: 'At work',
  prompts: [
    {
      description: 'Turn rough notes into a clear weekly update.',
      id: 'weekly-update',
      title: 'Weekly project update'
    },
    {
      description: 'Capture decisions, owners, and next steps.',
      id: 'meeting-summary',
      title: 'Meeting summary'
    },
    {
      description: 'Outline milestones, risks, and launch tasks.',
      id: 'launch-plan',
      title: 'Launch planning'
    }
  ]
}

export function Cards() {
  return (
    <div className="mx-auto w-full max-w-[960px]">
      <PromptSuggestion variant="card">
        <PromptSuggestion.Header>
          <PromptSuggestion.Title>
            Starter prompts for everyday work
          </PromptSuggestion.Title>
          <PromptSuggestion.Description>
            Pick one to see what kinds of conversations this template is
            designed for.
          </PromptSuggestion.Description>
        </PromptSuggestion.Header>
        <PromptSuggestion.Group
          description={EXPLORE_CATEGORY.description}
          label={EXPLORE_CATEGORY.label}>
          <PromptSuggestion.Items>
            {EXPLORE_CATEGORY.prompts.map(prompt => (
              <PromptSuggestion.Item key={prompt.id}>
                <Card.Header>
                  <PromptSuggestion.ItemTitle>
                    {prompt.title}
                  </PromptSuggestion.ItemTitle>
                  <PromptSuggestion.ItemDescription>
                    {prompt.description}
                  </PromptSuggestion.ItemDescription>
                </Card.Header>
              </PromptSuggestion.Item>
            ))}
          </PromptSuggestion.Items>
        </PromptSuggestion.Group>
      </PromptSuggestion>
    </div>
  )
}
