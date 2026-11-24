// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import {
  Calendar,
  CirclePlus,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOl,
  ListUl,
  Minus,
  QuoteOpen,
  Sparkles
} from '@gravity-ui/icons'
import type {} from '@tiptap/starter-kit'

import type { RichTextEditorSuggestionItem } from '@vezham/react-pro-v3/rich-text-editor'
import {
  RichTextEditor,
  filterRichTextEditorSuggestionItems
} from '@vezham/react-pro-v3/rich-text-editor'

import { extensionPlayground } from './documents'

const iconClassName = 'size-4'

const getSlashItems = ({
  query
}: {
  query: string
}): RichTextEditorSuggestionItem[] =>
  filterRichTextEditorSuggestionItems(
    [
      {
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 1 })
            .run()
        },
        description: 'Large section title',
        icon: <Heading1 className={iconClassName} />,
        keywords: ['title', 'h1'],
        title: 'Heading 1'
      },
      {
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 2 })
            .run()
        },
        description: 'Medium section title',
        icon: <Heading2 className={iconClassName} />,
        keywords: ['subtitle', 'h2'],
        title: 'Heading 2'
      },
      {
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 3 })
            .run()
        },
        description: 'Small section title',
        icon: <Heading3 className={iconClassName} />,
        keywords: ['subtitle', 'h3'],
        title: 'Heading 3'
      },
      {
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
        description: 'Simple bulleted list',
        icon: <ListUl className={iconClassName} />,
        keywords: ['list', 'bullet'],
        title: 'Bulleted list'
      },
      {
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
        description: 'List with numbering',
        icon: <ListOl className={iconClassName} />,
        keywords: ['list', 'ordered', 'numbered'],
        title: 'Numbered list'
      },
      {
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run()
        },
        description: 'Capture a quote or callout',
        icon: <QuoteOpen className={iconClassName} />,
        keywords: ['quote', 'note'],
        title: 'Blockquote'
      },
      {
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
        },
        description: 'Preformatted code snippet',
        icon: <Code className={iconClassName} />,
        keywords: ['code', 'snippet', 'pre'],
        title: 'Code block'
      },
      {
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
        description: 'Visually separate sections',
        icon: <Minus className={iconClassName} />,
        keywords: ['divider', 'hr', 'rule', 'separator'],
        title: 'Divider'
      },
      {
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent({
              content: [
                {
                  content: [{ text: 'Action item: ', type: 'text' }],
                  type: 'paragraph'
                }
              ],
              type: 'blockquote'
            })
            .run()
        },
        description: 'Custom snippet from your own command',
        icon: <Sparkles className={iconClassName} />,
        keywords: ['todo', 'action', 'custom'],
        title: 'Action callout'
      }
    ],
    query
  )

function InsertDateButton() {
  const formattedDate = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date())

  return (
    <RichTextEditor.CommandButton
      aria-label="Insert date"
      isDisabled={editor =>
        !editor.can().chain().focus().insertContent(formattedDate).run()
      }
      tooltip="Insert date"
      onCommand={editor => {
        editor.chain().focus().insertContent(formattedDate).run()
      }}>
      <Calendar className={iconClassName} />
    </RichTextEditor.CommandButton>
  )
}

export function Extensible() {
  return (
    <RichTextEditor
      className="w-[720px]"
      defaultValue={extensionPlayground}
      placeholder="Write notes...">
      <RichTextEditor.Shell>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ToolbarGroup aria-label="Custom commands">
            <InsertDateButton />
            <RichTextEditor.CommandButton
              aria-label="Insert launch checklist"
              tooltip="Insert checklist"
              onCommand={editor => {
                editor
                  .chain()
                  .focus()
                  .insertContent([
                    {
                      content: [{ text: 'Preflight checklist', type: 'text' }],
                      type: 'paragraph'
                    },
                    {
                      content: [
                        {
                          content: [
                            {
                              content: [
                                { text: 'Confirm owner', type: 'text' }
                              ],
                              type: 'paragraph'
                            }
                          ],
                          type: 'listItem'
                        }
                      ],
                      type: 'bulletList'
                    }
                  ])
                  .run()
              }}>
              <Sparkles className={iconClassName} />
            </RichTextEditor.CommandButton>
          </RichTextEditor.ToolbarGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
        <RichTextEditor.FloatingMenu>
          <RichTextEditor.CommandButton
            aria-label="Add heading"
            tooltip="Add heading"
            onCommand={editor => {
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }}>
            <CirclePlus className={iconClassName} />
          </RichTextEditor.CommandButton>
        </RichTextEditor.FloatingMenu>
        <RichTextEditor.SuggestionMenu char="/" items={getSlashItems} />
        <RichTextEditor.Footer>
          <span>Extensible command surface</span>
          <RichTextEditor.CharacterCount showWords />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}
