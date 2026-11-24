// Adapted documented HeroUI Pro example; see ../README.md.
import type { JSONContent } from '@tiptap/core'

export const featureOverview: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Features', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          content: [
            {
              marks: [{ type: 'italic' }],
              text: 'A composable rich text editor with toolbar controls, contextual menus, JSON persistence, and common writing shortcuts.',
              type: 'text'
            },
            { text: ' Try markdown ', type: 'text' },
            { marks: [{ type: 'code' }], text: '**', type: 'text' },
            { text: ' or keyboard shortcuts for common marks.', type: 'text' }
          ],
          type: 'paragraph'
        }
      ],
      type: 'blockquote'
    },
    {
      content: [
        { text: 'Select the phrase ', type: 'text' },
        {
          marks: [{ type: 'bold' }],
          text: 'contextual selection actions',
          type: 'text'
        },
        {
          text: ' and use the bubble menu to apply bold, italic, underline, strike, or a link without leaving the document.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      attrs: { level: 3 },
      content: [{ text: 'What to try', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: 'Use the toolbar to switch headings, lists, quotes, and code blocks.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                { text: 'Add a link to ', type: 'text' },
                {
                  marks: [
                    { attrs: { href: 'https://tiptap.dev' }, type: 'link' }
                  ],
                  text: 'tiptap.dev',
                  type: 'text'
                },
                {
                  text: ' or remove formatting with the clear actions.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                { text: 'Notice how ', type: 'text' },
                {
                  marks: [{ type: 'code' }],
                  text: 'onValueChange',
                  type: 'text'
                },
                {
                  text: ' can store JSON while still exposing HTML and text details.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    },
    {
      content: [
        {
          text: 'editor.chain().focus().toggleHeading({ level: 2 }).run()',
          type: 'text'
        }
      ],
      type: 'codeBlock'
    }
  ],
  type: 'doc'
}

export const controlledDocument: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Controlled JSON value', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'This demo keeps the editor document in React state. The buttons above replace the ',
          type: 'text'
        },
        { marks: [{ type: 'code' }], text: 'value', type: 'text' },
        {
          text: ' prop, and the JSON preview below updates after every edit.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: 'Edit this paragraph and watch the JSON mirror change.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                { text: 'The footer reads ', type: 'text' },
                { marks: [{ type: 'bold' }], text: 'character', type: 'text' },
                { text: ' and ', type: 'text' },
                { marks: [{ type: 'italic' }], text: 'word', type: 'text' },
                { text: ' counts from Tiptap storage.', type: 'text' }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    },
    {
      content: [
        {
          content: [
            {
              text: 'Controlled mode should feel editable, not fragile: external updates only replace content when the incoming JSON differs.',
              type: 'text'
            }
          ],
          type: 'paragraph'
        }
      ],
      type: 'blockquote'
    }
  ],
  type: 'doc'
}

export const releaseNotes: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Loaded release note', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'Switching documents should preserve the same toolbar, footer, and editor shell while replacing the serialized ',
          type: 'text'
        },
        { marks: [{ type: 'code' }], text: 'JSONContent', type: 'text' },
        { text: ' value.', type: 'text' }
      ],
      type: 'paragraph'
    },
    {
      attrs: { start: 1 },
      content: [
        {
          content: [
            {
              content: [{ text: 'Load the brief again.', type: 'text' }],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [{ text: 'Make a local edit.', type: 'text' }],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                {
                  text: 'Confirm the preview reflects the new document tree.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'orderedList'
    }
  ],
  type: 'doc'
}

export const characterLimitGuide: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Character count', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'This editor has a 240 character limit. Keep typing to see the footer update in real time and flag when the document crosses the configured ceiling.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              content: [{ text: 'Short notes stay green.', type: 'text' }],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    }
  ],
  type: 'doc'
}

export const compositionGuide: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Custom composition', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'This demo moves a compact toolbar into the footer. The editor keeps the same Tiptap instance, but you decide where controls live.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: 'Only bold, italic, list, and link controls are exposed here.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                {
                  text: 'The content area remains the same reusable slot.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    },
    {
      content: [
        {
          content: [
            {
              text: 'Compound parts make layout a product decision instead of a component limitation.',
              type: 'text'
            }
          ],
          type: 'paragraph'
        }
      ],
      type: 'blockquote'
    }
  ],
  type: 'doc'
}

export const disabledGuide: JSONContent = {
  content: [
    {
      attrs: { level: 3 },
      content: [{ text: 'Disabled state', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'Use disabled mode when the entire field is unavailable. Toolbar actions, editing, and link changes are all blocked.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: 'Best for locked forms or pending permissions.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    }
  ],
  type: 'doc'
}

export const readOnlyGuide: JSONContent = {
  content: [
    {
      attrs: { level: 3 },
      content: [{ text: 'Read-only review', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'Read-only mode keeps the same visual surface and selectable text while preventing document mutations.',
          type: 'text'
        }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: 'Best for review screens, previews, and archived records.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    }
  ],
  type: 'doc'
}

export const extensionPlayground: JSONContent = {
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: 'Extensible commands', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          text: 'This demo adds custom buttons, a floating insert menu, and a slash command menu. Type ',
          type: 'text'
        },
        { marks: [{ type: 'code' }], text: '/', type: 'text' },
        { text: ' to open the command list, then filter with ', type: 'text' },
        { marks: [{ type: 'code' }], text: 'h', type: 'text' },
        { text: ', ', type: 'text' },
        { marks: [{ type: 'code' }], text: 'list', type: 'text' },
        { text: ', ', type: 'text' },
        { marks: [{ type: 'code' }], text: 'quote', type: 'text' },
        { text: ', or ', type: 'text' },
        { marks: [{ type: 'code' }], text: 'action', type: 'text' },
        { text: '.', type: 'text' }
      ],
      type: 'paragraph'
    },
    {
      content: [
        {
          content: [
            {
              text: 'Each item runs your own Tiptap command; the component only supplies the accessible menu shell.',
              type: 'text'
            }
          ],
          type: 'paragraph'
        }
      ],
      type: 'blockquote'
    },
    {
      attrs: { level: 3 },
      content: [{ text: 'Try it', type: 'text' }],
      type: 'heading'
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: "Press the date button to insert today's date.",
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                {
                  text: 'Use the sparkle button to insert a launch checklist.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        },
        {
          content: [
            {
              content: [
                {
                  text: 'Move to the empty line below to reveal the floating menu.',
                  type: 'text'
                }
              ],
              type: 'paragraph'
            }
          ],
          type: 'listItem'
        }
      ],
      type: 'bulletList'
    },
    {
      type: 'paragraph'
    }
  ],
  type: 'doc'
}
