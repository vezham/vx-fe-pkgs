// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

import { DefaultToolbar } from './default-toolbar'
import { disabledGuide, readOnlyGuide } from './documents'

export function Disabled() {
  return (
    <div className="grid w-full max-w-[860px] grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
      <RichTextEditor isDisabled defaultValue={disabledGuide}>
        <RichTextEditor.Shell>
          <DefaultToolbar />
          <RichTextEditor.Content />
          <RichTextEditor.Footer>
            <span>Disabled</span>
            <RichTextEditor.CharacterCount />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>

      <RichTextEditor isReadOnly defaultValue={readOnlyGuide}>
        <RichTextEditor.Shell>
          <DefaultToolbar />
          <RichTextEditor.Content />
          <RichTextEditor.Footer>
            <span>Read only</span>
            <RichTextEditor.CharacterCount />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>
    </div>
  )
}
