// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ArrowUp, Paperclip } from '@gravity-ui/icons'
import { useMemo } from 'react'

import {
  PromptInput,
  TokenFieldValue,
  usePromptInputTokens
} from '@vezham/react-pro-v3'
import { Avatar, Menu } from '@vezham/react-v3'

type MentionSuggestion = {
  avatar: string
  id: string
  kind: 'user'
  name: string
  username: string
}
type CommandSuggestion = {
  description: string
  id: string
  kind: 'command'
  name: string
}
type Suggestion = CommandSuggestion | MentionSuggestion

const users: MentionSuggestion[] = [
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    id: 'sarahjones',
    kind: 'user',
    name: 'Sarah Jones',
    username: 'sarahjones'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    id: 'alexmiller',
    kind: 'user',
    name: 'Alex Miller',
    username: 'alexmiller'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    id: 'davidkim',
    kind: 'user',
    name: 'David Kim',
    username: 'davidkim'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    id: 'ellagreen',
    kind: 'user',
    name: 'Ella Green',
    username: 'ellagreen'
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    id: 'miahernandez',
    kind: 'user',
    name: 'Mia Hernandez',
    username: 'miahernandez'
  }
]

const commands: CommandSuggestion[] = [
  {
    description: 'Summarize the current thread',
    id: 'summarize',
    kind: 'command',
    name: 'summarize'
  },
  {
    description: 'Add a todo list item',
    id: 'todo',
    kind: 'command',
    name: 'todo'
  },
  {
    description: 'Explain the selected code',
    id: 'explain',
    kind: 'command',
    name: 'explain'
  },
  {
    description: 'Insert a quote block',
    id: 'quote',
    kind: 'command',
    name: 'quote'
  },
  {
    description: 'Run the test suite',
    id: 'test',
    kind: 'command',
    name: 'test'
  }
]

const initialValue = new TokenFieldValue<Suggestion>([
  { text: 'Ask ', type: 'text' },
  { text: '@sarahjones', type: 'token' },
  { text: ' to review the release notes, then ', type: 'text' },
  { text: '/summarize', type: 'token' },
  { text: ' the thread', type: 'text' }
])

const tokenTextFor = (item: Suggestion) =>
  item.kind === 'user' ? `@${item.username}` : `/${item.name}`

export function TokenMentions() {
  const tokens = usePromptInputTokens<Suggestion>({
    defaultValue: initialValue
  })
  const { insertToken, query, setValue, trigger } = tokens

  const items = useMemo<Suggestion[]>(() => {
    const needle = query.toLowerCase()

    if (trigger === '/')
      return commands.filter(item => item.name.includes(needle))

    if (trigger === '@') {
      return users.filter(
        item =>
          item.name.toLowerCase().includes(needle) ||
          item.username.includes(needle)
      )
    }

    return []
  }, [query, trigger])

  const isMenuOpen = tokens.isOpen && items.length > 0

  const handleSubmit = () => {
    setValue(new TokenFieldValue<Suggestion>([]))
  }

  return (
    <div className="flex min-h-[340px] w-full max-w-[640px] flex-col justify-end">
      <PromptInput onSubmit={handleSubmit}>
        <PromptInput.Shell>
          {/* Tokens wraps only the field and its menu — a menu in the toolbar would otherwise
              join the suggestion collection. */}
          <PromptInput.Tokens>
            <PromptInput.Content>
              <PromptInput.TokenInput
                placeholder="Ask anything — @ to mention, / for commands"
                tokens={tokens}
              />
            </PromptInput.Content>
            <PromptInput.TokenSuggestions
              isOpen={isMenuOpen}
              placement="top start"
              tokens={tokens}>
              <Menu items={items}>
                {item => (
                  <Menu.Item
                    id={item.id}
                    textValue={item.name}
                    onAction={() =>
                      insertToken(tokenTextFor(item), { value: item })
                    }>
                    {item.kind === 'user' ? (
                      <>
                        <Avatar size="sm">
                          <Avatar.Image alt={item.name} src={item.avatar} />
                          <Avatar.Fallback>
                            {item.name.slice(0, 1)}
                          </Avatar.Fallback>
                        </Avatar>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate">{item.name}</span>
                          <span className="text-muted truncate text-xs">
                            @{item.username}
                          </span>
                        </span>
                      </>
                    ) : (
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate">/{item.name}</span>
                        <span className="text-muted truncate text-xs">
                          {item.description}
                        </span>
                      </span>
                    )}
                  </Menu.Item>
                )}
              </Menu>
            </PromptInput.TokenSuggestions>
          </PromptInput.Tokens>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Attach file"
                tooltip="Attach file">
                <Paperclip className="size-4" />
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send>
                <ArrowUp className="size-4" />
              </PromptInput.Send>
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
        <PromptInput.Footer>
          AI can make mistakes. Check important info.
        </PromptInput.Footer>
      </PromptInput>
    </div>
  )
}
