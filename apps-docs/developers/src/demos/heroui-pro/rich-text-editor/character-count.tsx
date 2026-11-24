// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

import { BubbleToolbar, DefaultToolbar } from './default-toolbar'
import { characterLimitGuide } from './documents'

export function CharacterCount() {
  return (
    <RichTextEditor
      className="w-[680px]"
      defaultValue={characterLimitGuide}
      maxLength={240}>
      <RichTextEditor.Shell>
        <DefaultToolbar />
        <RichTextEditor.Content />
        <BubbleToolbar />
        <RichTextEditor.Footer>
          <span>240 character limit</span>
          <RichTextEditor.CharacterCount showWords />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}
