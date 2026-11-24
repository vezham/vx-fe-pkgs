// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

import { BubbleToolbar, DefaultToolbar } from './default-toolbar'
import { featureOverview } from './documents'

export function Default() {
  return (
    <RichTextEditor className="w-[760px]" defaultValue={featureOverview}>
      <RichTextEditor.Shell>
        <DefaultToolbar />
        <RichTextEditor.Content />
        <BubbleToolbar />
        <RichTextEditor.Footer>
          <span>JSON-first editor state</span>
          <RichTextEditor.CharacterCount showWords />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}
