// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'
import { Surface } from '@vezham/react-v3'

import { BubbleToolbar, DefaultToolbar } from './default-toolbar'
import { featureOverview } from './documents'

export function Secondary() {
  return (
    <Surface className="w-[760px] rounded-3xl p-4">
      <RichTextEditor
        className="w-full"
        defaultValue={featureOverview}
        variant="secondary">
        <RichTextEditor.Shell>
          <DefaultToolbar />
          <RichTextEditor.Content />
          <BubbleToolbar />
          <RichTextEditor.Footer>
            <span>Secondary surface for overlays</span>
            <RichTextEditor.CharacterCount showWords />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>
    </Surface>
  )
}
