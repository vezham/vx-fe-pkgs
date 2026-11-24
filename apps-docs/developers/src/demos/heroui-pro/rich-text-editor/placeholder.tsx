// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

import { BubbleToolbar, DefaultToolbar } from './default-toolbar'

export function Placeholder() {
  return (
    <RichTextEditor
      className="w-[680px]"
      placeholder="Start a component note: describe the editor, type **bold**, then select text for the bubble menu...">
      <RichTextEditor.Shell>
        <DefaultToolbar />
        <RichTextEditor.Content />
        <BubbleToolbar />
        <RichTextEditor.Footer>
          <span>Empty state</span>
          <RichTextEditor.CharacterCount showWords />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}
