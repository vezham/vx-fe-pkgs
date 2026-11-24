// Adapted documented HeroUI Pro example; see ../README.md.
import { Fragment } from 'react'

import { Header, ListBox, Select, Separator } from '@vezham/react-v3'

const MODEL_GROUPS = [
  {
    models: [
      { id: 'gpt-5.4', name: 'GPT-5.4' },
      { id: 'gpt-5.3-mini', name: 'GPT-5.3 Mini' },
      { id: 'gpt-4.1', name: 'GPT-4.1' }
    ],
    provider: 'OpenAI'
  },
  {
    models: [
      { id: 'claude-opus-4.1', name: 'Claude Opus 4.1' },
      { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5' },
      { id: 'claude-haiku-3.5', name: 'Claude Haiku 3.5' }
    ],
    provider: 'Anthropic'
  },
  {
    models: [
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' }
    ],
    provider: 'Google'
  },
  {
    models: [{ id: 'grok-4', name: 'Grok 4' }],
    provider: 'xAI'
  }
]

type ModelSelectorProps = {
  triggerClassName?: string
  variant?: 'secondary'
}

export function ModelSelector({
  triggerClassName,
  variant
}: ModelSelectorProps) {
  return (
    <Select
      aria-label="Model"
      className="w-[160px] sm:w-[220px]"
      defaultValue="gpt-5.4"
      variant={variant}>
      <Select.Trigger className={triggerClassName}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {MODEL_GROUPS.map((group, index) => (
            <Fragment key={group.provider}>
              {index > 0 ? <Separator /> : null}
              <ListBox.Section>
                <Header>{group.provider}</Header>
                {group.models.map(model => (
                  <ListBox.Item
                    key={model.id}
                    id={model.id}
                    textValue={model.name}>
                    {model.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox.Section>
            </Fragment>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
